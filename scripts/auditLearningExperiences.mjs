import assert from 'node:assert/strict';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const virtualEntry = 'virtual:philosophy-atlas-learning-experiences';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'learning-experiences-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export {branches} from '/src/data/branches.ts';
      export {philosophers} from '/src/data/philosophers.ts';
      export {comparisonCasefiles} from '/src/data/comparisons.ts';
      export {learningPaths} from '/src/data/learningPaths.ts';
      export {MUSEUM_HALLS} from '/src/data/museumCatalog.ts';
    ` : undefined,
  }],
  build: {
    ssr: true,
    write: false,
    minify: false,
    target: 'node22',
    rollupOptions: {input: virtualEntry, output: {format: 'es', codeSplitting: false}},
  },
});

const outputs = (Array.isArray(result) ? result : [result]).flatMap(({output}) => output);
const entry = outputs.find((item) => item.type === 'chunk' && item.isEntry);
assert(entry, 'Vite did not produce an executable learning-experiences entry.');
const {branches, philosophers, comparisonCasefiles, learningPaths, MUSEUM_HALLS} =
  await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const branchesById = new Map(branches.map((record) => [record.id, record]));
const philosophersById = new Map(philosophers.map((record) => [record.id, record]));
const pathsById = new Map(learningPaths.map((path) => [path.id, path]));
const hallsById = new Map(MUSEUM_HALLS.map((hall) => [hall.id, hall]));
const globalStepIds = new Set();

const entityFor = (kind, id) => (kind === 'branch' ? branchesById : philosophersById).get(id);
const normalized = (value) => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();
const readingIsRegistered = (reading, entity) => {
  const candidates = [
    ...(entity.beginnerReadingPath ?? []).map(({title}) => title),
    ...(entity.advancedReadingPath ?? []).map(({title}) => title),
    ...(entity.keyWorks ?? []),
    ...(entity.keyWorksDetailed ?? []).map(({title}) => title),
    ...(entity.suggestedReadingPath ?? []),
    ...(entity.sourceLinks ?? []).map(({label}) => label),
    ...(entity.editorial?.sources ?? []).map(({title, authors}) => `${authors.join(' ')} ${title}`),
  ].map(normalized).filter((title) => title.length >= 5);
  const requested = normalized(reading.title);
  const requestedWithAuthor = normalized(`${reading.author} ${reading.title}`);
  const tokens = (value) => new Set(value.split(' ').filter((token) => token.length >= 4 && !['selected', 'books', 'sections', 'chapter', 'chapters', 'introduction'].includes(token)));
  const requestedTokens = tokens(requestedWithAuthor);
  return candidates.some((candidate) => {
    if (requested.includes(candidate) || candidate.includes(requested)) return true;
    const candidateTokens = tokens(candidate);
    const overlap = [...requestedTokens].filter((token) => candidateTokens.has(token)).length;
    return overlap >= 2 && overlap / Math.min(requestedTokens.size, candidateTokens.size) >= 0.5;
  });
};
const requireReviewedEntity = (kind, id, context) => {
  const entity = entityFor(kind, id);
  assert(entity, `${context} references unknown ${kind} “${id}”.`);
  assert.equal(entity.editorial?.review?.status, 'claim-reviewed', `${context} references ${kind} “${id}” without claim-reviewed status.`);
  assert(entity.editorial?.review?.lock, `${context} references ${kind} “${id}” without a review lock.`);
  return entity;
};

const statementRefs = (value, refs = []) => {
  if (!value || typeof value !== 'object') return refs;
  if (typeof value.text === 'string' && Array.isArray(value.evidence)) {
    assert(value.text.trim().length >= 20, 'Comparison statements must be substantive.');
    assert(value.evidence.length > 0, `Comparison statement lacks evidence: “${value.text}”.`);
  }
  if (typeof value.entityKind === 'string' && typeof value.entityId === 'string' && typeof value.sourceId === 'string') {
    refs.push(value);
    return refs;
  }
  for (const child of Array.isArray(value) ? value : Object.values(value)) statementRefs(child, refs);
  return refs;
};

const casefileKeys = new Set();
const curatedBranchIds = new Set();
const curatedPhilosopherIds = new Set();
const comparisonKey = (kind, participantIds) => `${kind}:${[...participantIds].sort().join(':')}`;
for (const casefile of comparisonCasefiles) {
  assert(['branch', 'philosopher'].includes(casefile.kind), 'Comparison casefiles must use one supported kind.');
  assert.equal(casefile.participantIds.length, 2, 'Comparison casefiles require exactly two participants.');
  assert.notEqual(casefile.participantIds[0], casefile.participantIds[1], 'Comparison participants must be distinct.');
  const key = comparisonKey(casefile.kind, casefile.participantIds);
  assert(!casefileKeys.has(key), `Duplicate normalized comparison casefile “${key}”.`);
  casefileKeys.add(key);
  const participantSet = new Set(casefile.participantIds);
  for (const participantId of participantSet) {
    requireReviewedEntity(casefile.kind, participantId, `Comparison ${key}`);
    (casefile.kind === 'branch' ? curatedBranchIds : curatedPhilosopherIds).add(participantId);
  }
  assert(casefile.axes.length >= 2, `Comparison ${key} needs at least two disagreement axes.`);
  assert(casefile.sharedAssumptions.length >= 1, `Comparison ${key} needs a shared-assumptions statement.`);
  assert(casefile.terminology.length >= 1, `Comparison ${key} needs a terminology comparison.`);
  assert(casefile.interpretiveLimits.length >= 1, `Comparison ${key} needs an interpretive limit.`);
  assert(casefile.followOns.length >= 1, `Comparison ${key} needs a useful follow-on comparison.`);
  for (const axis of casefile.axes) {
    assert.deepEqual(new Set(axis.positions.map(({entityId}) => entityId)), participantSet, `Axis “${axis.label}” in ${key} must preserve both participant identities.`);
  }
  assert.deepEqual(new Set(casefile.arguments.map(({entityId}) => entityId)), participantSet, `Comparison ${key} must present an argument for each participant.`);
  assert.deepEqual(new Set(casefile.readings.map(({entityId}) => entityId)), participantSet, `Comparison ${key} must identify a reading for each participant.`);
  const evidenceRefs = statementRefs(casefile);
  assert(evidenceRefs.length >= 12, `Comparison ${key} has too little mapped evidence.`);
  for (const reference of evidenceRefs) {
    const entity = requireReviewedEntity(reference.entityKind, reference.entityId, `Comparison ${key} evidence`);
    const source = entity.editorial.sources.find(({id}) => id === reference.sourceId);
    assert(source, `Comparison ${key} evidence cannot resolve ${reference.entityKind}:${reference.entityId}:${reference.sourceId}.`);
    assert.match(source.url, /^https:\/\//, `Comparison ${key} source ${reference.sourceId} must use an HTTPS URL.`);
  }
  for (const followOn of casefile.followOns) {
    assert.notEqual(followOn.participantIds[0], followOn.participantIds[1], `Comparison ${key} has a duplicate follow-on pair.`);
    followOn.participantIds.forEach((id) => requireReviewedEntity(followOn.kind, id, `Comparison ${key} follow-on`));
  }
}
for (const casefile of comparisonCasefiles) {
  const key = comparisonKey(casefile.kind, casefile.participantIds);
  for (const followOn of casefile.followOns) {
    const followOnKey = comparisonKey(followOn.kind, followOn.participantIds);
    assert(casefileKeys.has(followOnKey), `Comparison ${key} follow-on must resolve to authored casefile “${followOnKey}”.`);
  }
}
assert.equal(comparisonCasefiles.length, 59, 'Compare must expose the 59 authored casefiles completed through content-expansion run 4.');

const coveredBranchIds = new Set();
const coveredPhilosopherIds = new Set();
let stepCount = 0;
let articleLinkCount = 0;
let museumLinkCount = 0;
let readingCount = 0;
for (const path of learningPaths) {
  assert(path.id && !pathsById.has(`duplicate:${path.id}`), 'Learning path IDs must be present.');
  assert(['foundation', 'intermediate', 'advanced'].includes(path.level), `Learning path ${path.id} has an invalid level.`);
  assert(path.subjectTags.length >= 2, `Learning path ${path.id} needs subject tags.`);
  assert(path.worldTags.length >= 1, `Learning path ${path.id} needs a world/context tag.`);
  assert(path.objectives.length >= 2 && path.outcomes.length >= 2, `Learning path ${path.id} needs explicit objectives and outcomes.`);
  assert(Number.isInteger(path.estimatedMinutes) && path.estimatedMinutes >= 40, `Learning path ${path.id} needs a realistic duration.`);
  assert(path.steps.length >= 4, `Learning path ${path.id} needs at least four sequenced steps.`);
  path.branchIds.forEach((id) => { requireReviewedEntity('branch', id, `Learning path ${path.id}`); coveredBranchIds.add(id); });
  path.philosopherIds.forEach((id) => { requireReviewedEntity('philosopher', id, `Learning path ${path.id}`); coveredPhilosopherIds.add(id); });
  const readingKinds = new Set();
  for (const step of path.steps) {
    stepCount += 1;
    assert(!globalStepIds.has(step.id), `Duplicate learning step ID “${step.id}”.`);
    globalStepIds.add(step.id);
    assert(step.sequenceRationale.trim().length >= 35, `Learning step ${step.id} needs a sequence rationale.`);
    assert(step.explanation.trim().length >= 180, `Learning step ${step.id} needs developed explanatory prose.`);
    assert(step.objectives.length >= 2, `Learning step ${step.id} needs at least two objectives.`);
    assert(step.conceptIds.length >= 2, `Learning step ${step.id} needs working vocabulary.`);
    assert.equal(step.reflectionQuestions.length, 2, `Learning step ${step.id} needs exactly two reflection questions.`);
    assert(step.checkpointQuestion.trim().length >= 20 && step.nextHint.trim().length >= 25, `Learning step ${step.id} needs a real checkpoint and transition.`);
    step.branchIds.forEach((id) => requireReviewedEntity('branch', id, `Learning step ${step.id}`));
    step.philosopherIds.forEach((id) => requireReviewedEntity('philosopher', id, `Learning step ${step.id}`));
    assert(step.articleLinks.length >= 2, `Learning step ${step.id} needs at least two canonical article links.`);
    for (const link of step.articleLinks) {
      requireReviewedEntity(link.kind, link.id, `Learning step ${step.id} article link`);
      assert(link.reason.trim().length >= 25, `Learning step ${step.id} article links need a rationale.`);
      articleLinkCount += 1;
    }
    assert(step.museumLinks.length >= 1, `Learning step ${step.id} needs a Museum destination.`);
    for (const link of step.museumLinks) {
      const hall = hallsById.get(link.hallId);
      assert(hall, `Learning step ${step.id} references unknown Museum hall “${link.hallId}”.`);
      assert(hall.exhibits.some(({id}) => id === link.exhibitId), `Learning step ${step.id} references unknown primary exhibit “${link.exhibitId}” in “${link.hallId}”.`);
      assert(link.reason.trim().length >= 25, `Learning step ${step.id} Museum links need a rationale.`);
      museumLinkCount += 1;
    }
    assert(step.readings.length >= 2, `Learning step ${step.id} needs a primary and secondary reading.`);
    for (const reading of step.readings) {
      assert(reading.title.trim().length >= 3 && reading.author.trim().length >= 3, `Learning step ${step.id} has an unidentified reading.`);
      assert(reading.whyThisStep.trim().length >= 30, `Learning step ${step.id} readings need annotations.`);
      const sourceArticle = requireReviewedEntity(reading.sourceArticle.kind, reading.sourceArticle.id, `Learning step ${step.id} reading`);
      assert(readingIsRegistered(reading, sourceArticle), `Learning step ${step.id} reading “${reading.title}” is not registered on ${reading.sourceArticle.kind}:${reading.sourceArticle.id}.`);
      readingKinds.add(reading.kind);
      readingCount += 1;
    }
  }
  assert(readingKinds.has('primary') && readingKinds.has('secondary'), `Learning path ${path.id} needs both primary and secondary reading routes.`);
}

assert.equal(learningPaths.length, 22, 'Learning Paths must expose the 22-route curriculum.');
assert.equal(stepCount, 88, 'Learning Paths must expose 88 developed steps.');
assert.equal(new Set(learningPaths.map(({id}) => id)).size, learningPaths.length, 'Learning path IDs must be unique.');
assert.deepEqual(new Set(learningPaths.map(({level}) => level)), new Set(['foundation', 'intermediate', 'advanced']), 'Learning Paths must offer foundation, intermediate, and advanced routes.');

console.log(`PASS: ${comparisonCasefiles.length} authored comparison casefiles resolve all evidence to reviewed canonical sources.`);
console.log(`PASS: curated Compare coverage includes ${curatedBranchIds.size} philosophies and ${curatedPhilosopherIds.size} philosophers; all 45/147 remain selectable.`);
console.log(`PASS: ${learningPaths.length} learning paths contain ${stepCount} developed steps, ${articleLinkCount} article links, ${museumLinkCount} primary-exhibit links, and ${readingCount} annotated readings.`);
console.log(`PASS: Learning Paths declared coverage reaches ${coveredBranchIds.size}/45 philosophies and ${coveredPhilosopherIds.size}/147 philosophers.`);
