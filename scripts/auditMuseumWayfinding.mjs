import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const json = (path) => JSON.parse(read(path));

const plan = json('docs/museum-masterplan/single-level-building-plan.json');
const manifest = json('src/data/museum/museumContinuousEnfiladeManifest.json');
const publicRouteSource = read('src/data/museum/museumPublicRoute.ts');
const canonicalProgram = read('src/data/museum/museumCanonicalProgram.ts');
const buildingManifest = read('src/data/museum/museumBuildingManifest.ts');
const visitorMapData = read('src/data/museum/museumVisitorMap.ts');
const visitorMap = read('src/components/MuseumGallery/MuseumVisitorMap.tsx');
const museumPage = read('src/components/MuseumGallery/MuseumPage.tsx');
const visitState = read('src/components/MuseumGallery/museumVisitState.ts');
const session = read('src/components/MuseumGallery/museumSession.ts');
const museumCss = read('src/components/MuseumGallery/museum.css');

const route = manifest.throughRoute.hallOrder;
assert.equal(route.length, 26, 'runtime through-route must contain 26 galleries');
assert.equal(new Set(route).size, 26, 'runtime through-route IDs must be unique');
assert.deepEqual(plan.throughRoute.hallOrder, route, 'control plan and runtime route must agree');

const planHalls = new Map(plan.halls.map((hall) => [hall.id, hall]));
route.forEach((hallId, index) => {
  const hall = planHalls.get(hallId);
  assert.ok(hall, `control plan is missing ${hallId}`);
  assert.equal(hall.publicGalleryNumber, index + 1, `${hallId} has the wrong public route number`);
  assert.equal(hall.visitSequence, index + 1, `${hallId} has the wrong visit sequence`);
});

assert.match(publicRouteSource, /manifest\.throughRoute\.hallOrder/,
  'public route helper must derive from the executable through-route');
assert.doesNotMatch(canonicalProgram, /'hellenistic-roman-ways':\s*2/,
  'canonical program must not duplicate the route-number table');
assert.match(canonicalProgram, /from '\.\/museumPublicRoute'/,
  'canonical catalog must consume the route helper');
assert.match(buildingManifest, /publicGalleryNumber:\s*MUSEUM_PUBLIC_GALLERY_NUMBERS\[node\.programHallId\]/,
  'runtime nodes must expose route-derived public numbers');
assert.match(visitorMapData, /publicGalleryNumber:\s*MUSEUM_PUBLIC_GALLERY_NUMBERS\[node\.programHallId\]/,
  'map nodes must expose route-derived public numbers');
assert.match(visitorMapData, /label:\s*`Gallery \$\{String\(MUSEUM_PUBLIC_GALLERY_NUMBERS\[node\.programHallId\]\)/,
  'current-location labels must use route-derived public numbers');
assert.match(visitorMapData, /publicGalleryNumber\s*!==\s*visitSequence/,
  'map validation must reject dual public and visit numbering');

for (const exactCopy of [
  'VISITOR MAP · MAIN LEVEL',
  'Museum Map',
  'Follow the numbered route or use the central crosscut to explore freely.',
]) {
  assert.ok(visitorMap.includes(exactCopy), `visitor map is missing exact copy: ${exactCopy}`);
}
for (const forbidden of [
  'Continuous Enfilade',
  'Level 0',
  'Manifest IDs',
  'Curated / open',
  'Planned / walkable',
  'Route {String',
]) {
  assert.ok(!visitorMap.includes(forbidden), `visitor map exposes internal copy: ${forbidden}`);
}
assert.match(visitorMap, /galleriesByRoute[\s\S]*visitSequence/,
  'map destinations must follow physical route order');
assert.doesNotMatch(visitorMap, /<code>\{room\.id\}<\/code>/,
  'public room list must not expose raw IDs');
assert.match(museumPage, /MUSEUM_HALLS_IN_ROUTE_ORDER\.map/,
  'directory must render in physical route order');
assert.ok(!museumPage.includes('Continuous Enfilade circulation'),
  'current-location copy must not expose the construction name');

assert.match(visitState, /shouldShowMuseumResumeVisit/,
  'resume visibility must be a deterministic state policy');
for (const stateFragment of [
  "phase === 'focus-suspended'",
  "phase === 'explicitly-paused'",
  "phase === 'unentered'",
  "controlMode === 'suspended'",
  "controlMode === 'paused'",
  '!interfaceOpen',
  '!unavailable',
]) {
  assert.ok(visitState.includes(stateFragment), `resume state policy is missing ${stateFragment}`);
}
assert.match(museumPage, /modalOpen \|\| atGrandEntrance \|\| atFinalThreshold/,
  'resume overlay must yield to active visitor interfaces');
assert.match(museumPage, /!resumeVisitOffered && <div className="museum-entry-row">/,
  'resume overlay must replace the left entry CTA');
assert.match(museumPage, /resumeButtonRef\.current\?\.focus/,
  'resume overlay must receive keyboard focus');
assert.match(museumCss, /\.museum-resume-visit\{[^}]*inset:0;display:grid;place-items:center/,
  'resume control must be centered in a scene-dimming overlay');
assert.ok(museumPage.includes('Click to continue walking and looking around.'),
  'resume overlay must explain how to restore walking and look controls');
assert.match(museumCss, /prefers-reduced-motion:reduce[^\n]*\.museum-resume-visit/,
  'resume motion must respect reduced-motion preference');

assert.match(session, /hallId:\s*MuseumHallId/,
  'session anchors must use canonical hall IDs');
for (const numericLocationField of ['galleryNumber', 'publicGalleryNumber', 'visitSequence']) {
  assert.ok(!session.includes(numericLocationField),
    `session persistence must not depend on numeric ${numericLocationField}`);
}
assert.match(session, /roomId\?: string/,
  'session persistence must retain semantic room compatibility');
assert.match(session, /exhibitId\?: string/,
  'session persistence must retain semantic exhibit compatibility');

console.log('Museum wayfinding audit passed: route numbering, public copy, directory order, resume state, and ID-based persistence.');
