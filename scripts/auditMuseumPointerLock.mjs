import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const stateUrl = new URL('src/components/MuseumGallery/museumPointerLockState.ts', root);
const stateSource = await readFile(stateUrl, 'utf8');
const stateModule = ts.transpileModule(stateSource, {
  compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  fileName: stateUrl.pathname,
}).outputText;
const pointerState = await import(`data:text/javascript;base64,${Buffer.from(stateModule).toString('base64')}`);

assert.equal(
  pointerState.museumControlModeAfterUngesturedResume(true),
  'locked',
  'an exact surviving browser canvas lock must retain locked mouse-look',
);
assert.equal(
  pointerState.museumControlModeAfterUngesturedResume(false),
  'drag-look',
  'an unlocked resume must retain the existing drag-look fallback',
);

const controlsSource = await readFile(new URL('src/components/MuseumGallery/useMuseumControls.ts', root), 'utf8');
const pageSource = await readFile(new URL('src/components/MuseumGallery/MuseumPage.tsx', root), 'utf8');
assert.match(
  controlsSource,
  /setMode\(museumControlModeAfterUngesturedResume\(locked\)\)/,
  'readiness and route resumes must synchronize application mode with the exact browser lock',
);
assert.doesNotMatch(
  pageSource,
  /interfaceOpen:\s*modalOpen\s*\|\|\s*atGrandEntrance/,
  'Grand Entrance location alone must not suppress Resume Visit after focus loss',
);

console.log('Museum pointer-lock audit passed: surviving exact-canvas locks remain active and Grand Entrance recovery stays available.');
