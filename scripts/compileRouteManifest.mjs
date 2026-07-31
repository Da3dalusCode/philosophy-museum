import assert from 'node:assert/strict';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const routeOutputRelativePath = 'src/data/generated/routeManifest.json';
const searchOutputRelativePath = 'src/data/generated/searchIndex.json';
const routeOutputPath = resolve(repoRoot, routeOutputRelativePath);
const searchOutputPath = resolve(repoRoot, searchOutputRelativePath);
const checkOnly = process.argv.includes('--check');
const virtualEntry = 'virtual:philosophy-atlas-route-manifest';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'route-manifest-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export {branches} from '/src/data/branches.ts';
      export {philosophers} from '/src/data/philosophers.ts';
      export {learningPaths} from '/src/data/learningPaths.ts';
      export {
        MUSEUM_HALLS,
        MUSEUM_HALL_ROUTE_ALIASES,
        MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY,
        MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY,
      } from '/src/data/museumCatalog.ts';
      export {MUSEUM_SUPPLEMENTAL_EXHIBITS} from '/src/data/museum/museumSupplementalExhibits.ts';
    ` : undefined,
  }],
  build: {
    ssr: true,
    write: false,
    minify: false,
    target: 'node22',
    rollupOptions: {
      input: virtualEntry,
      output: {format: 'es', codeSplitting: false},
    },
  },
});

const outputs = (Array.isArray(result) ? result : [result]).flatMap(({output}) => output);
const entry = outputs.find((item) => item.type === 'chunk' && item.isEntry);
assert(entry, 'Vite did not produce an executable route-manifest entry.');
const source = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const {
  branches,
  philosophers,
  learningPaths,
  MUSEUM_HALLS,
  MUSEUM_HALL_ROUTE_ALIASES,
  MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY,
  MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY,
  MUSEUM_SUPPLEMENTAL_EXHIBITS,
} = source;

const articleRecord = (record) => ({
  id: record.id,
  name: record.name,
  sections: (record.articleSections ?? []).map(({id, title}) => ({id, title})),
  hasSources: Boolean(record.sourceLinks?.length || record.editorial?.sources?.length),
});

const supplementalByHall = new Map(MUSEUM_HALLS.map(({id}) => [id, []]));
for (const {hallId, exhibit} of MUSEUM_SUPPLEMENTAL_EXHIBITS) {
  supplementalByHall.get(hallId)?.push({
    id: exhibit.id,
    displayName: exhibit.displayName,
  });
}

const routeManifest = {
  schemaVersion: 1,
  branches: branches.map(articleRecord),
  philosophers: philosophers.map(articleRecord),
  learningPaths: learningPaths.map(({id, title, steps}) => ({
    id,
    title,
    stepCount: steps.length,
  })),
  museumHalls: MUSEUM_HALLS.map((hall) => ({
    id: hall.id,
    title: hall.title,
    primaryExhibits: hall.exhibits.map(({id, displayName}) => ({id, displayName})),
    supplementalExhibits: supplementalByHall.get(hall.id) ?? [],
  })),
  museumHallAliases: MUSEUM_HALL_ROUTE_ALIASES,
  legacyExhibits: [
    ...MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY,
    ...MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY,
  ],
};

const lensTextByEntityId = new Map();
for (const hall of MUSEUM_HALLS) {
  for (const zone of hall.zones) {
    for (const lens of zone.comparativeLenses ?? []) {
      const text = [
        lens.displayName,
        lens.culturalSetting,
        lens.rationale,
        hall.title,
        zone.title,
      ].join(' ');
      lensTextByEntityId.set(
        lens.entityId,
        [...(lensTextByEntityId.get(lens.entityId) ?? []), text],
      );
    }
  }
}

const searchable = (parts) => parts.flat(Infinity).filter(Boolean).join(' ').toLocaleLowerCase();
const searchIndex = {
  schemaVersion: 1,
  branches: branches.map((record) => ({
    id: record.id,
    label: record.name,
    searchText: searchable([
      record.name,
      record.shortDefinition,
      record.coreQuestions,
      record.keyConcepts.map(({name}) => name),
    ]),
  })),
  philosophers: philosophers.map((record) => ({
    id: record.id,
    label: record.name,
    searchText: searchable([
      record.name,
      record.mainIdeas,
      record.keyWorks,
      record.tradition,
      lensTextByEntityId.get(record.id) ?? [],
    ]),
  })),
  museumHalls: MUSEUM_HALLS.map((hall) => ({
    id: hall.id,
    label: hall.title,
    searchText: searchable([hall.title, hall.period, hall.description, hall.sweep]),
  })),
  museumExhibits: [
    ...MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map((exhibit) => ({
      id: exhibit.id,
      hallId: hall.id,
      label: exhibit.displayName,
      searchText: searchable([
        exhibit.displayName,
        exhibit.question,
        hall.title,
        hall.zones.find(({id}) => id === exhibit.zoneId)?.title ?? '',
      ]),
    }))),
    ...MUSEUM_SUPPLEMENTAL_EXHIBITS.map(({hallId, exhibit, layout}) => {
      const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
      assert(hall, `Supplemental search record ${exhibit.id} has no hall.`);
      return {
        id: exhibit.id,
        hallId,
        label: exhibit.displayName,
        searchText: searchable([
          exhibit.displayName,
          exhibit.workLabel,
          exhibit.question,
          exhibit.frontSubtitle,
          exhibit.keyIdeas,
          hall.title,
          hall.zones.find(({id}) => id === layout.zoneId)?.title ?? '',
        ]),
      };
    }),
  ],
};

assert.equal(routeManifest.branches.length, 43, 'Route manifest must contain 43 branches.');
assert.equal(routeManifest.philosophers.length, 146, 'Route manifest must contain 146 philosophers.');
assert.equal(routeManifest.learningPaths.length, 8, 'Route manifest must contain 8 learning paths.');
assert.equal(routeManifest.museumHalls.length, 26, 'Route manifest must contain 26 Museum halls.');
assert.equal(
  routeManifest.museumHalls.reduce(
    (sum, hall) => sum + hall.primaryExhibits.length + hall.supplementalExhibits.length,
    0,
  ),
  595,
  'Route manifest must contain all 595 Museum stops.',
);
assert.equal(searchIndex.museumExhibits.length, 595, 'Search index must contain all 595 Museum stops.');

const serialize = (value) => `${JSON.stringify(value, null, 2)}\n`;
const outputsToWrite = [
  [routeOutputRelativePath, routeOutputPath, serialize(routeManifest)],
  [searchOutputRelativePath, searchOutputPath, serialize(searchIndex)],
];

if (checkOnly) {
  for (const [relativePath, outputPath, generated] of outputsToWrite) {
    const committed = readFileSync(outputPath, 'utf8').replace(/\r\n?/g, '\n');
    assert.equal(committed, generated, `${relativePath} is stale. Run npm run compile:route-manifest.`);
  }
  console.log(
    `Verified lightweight route/search manifests: ${routeManifest.branches.length} branches, `
    + `${routeManifest.philosophers.length} philosophers, ${routeManifest.museumHalls.length} galleries, `
    + `${searchIndex.museumExhibits.length} Museum stops.`,
  );
} else {
  mkdirSync(dirname(routeOutputPath), {recursive: true});
  for (const [relativePath, outputPath, generated] of outputsToWrite) {
    writeFileSync(outputPath, generated, 'utf8');
    console.log(`Wrote ${relativePath}.`);
  }
}
