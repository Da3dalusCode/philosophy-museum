import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const touchInputUrl = new URL('src/components/MuseumGallery/museumTouchInput.ts', root);
const touchInputSource = await readFile(touchInputUrl, 'utf8');
const transpiled = ts.transpileModule(touchInputSource, {
  compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  fileName: touchInputUrl.pathname,
}).outputText;
const touchInput = await import(`data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`);

const near = (actual, expected, label) => {
  assert.ok(Math.abs(actual - expected) < 1e-9, `${label}: expected ${expected}, received ${actual}`);
};

const center = {x: 100, y: 100};
const forward = touchInput.resolveMuseumTouchAxes(center.x, center.y, 100, 48);
const backward = touchInput.resolveMuseumTouchAxes(center.x, center.y, 100, 152);
const left = touchInput.resolveMuseumTouchAxes(center.x, center.y, 48, 100);
const right = touchInput.resolveMuseumTouchAxes(center.x, center.y, 152, 100);
near(forward.forward, 1, 'forward hold');
near(backward.forward, -1, 'backward hold');
near(left.strafe, -1, 'left strafe hold');
near(right.strafe, 1, 'right strafe hold');
assert.deepEqual(touchInput.resolveMuseumTouchAxes(center.x, center.y, 103, 103), {strafe: 0, forward: 0});
const diagonal = touchInput.resolveMuseumTouchAxes(center.x, center.y, 180, 20);
near(Math.hypot(diagonal.strafe, diagonal.forward), 1, 'bounded diagonal');

assert.equal(touchInput.canClaimMuseumTouchPointer(11, undefined, undefined), true);
assert.equal(touchInput.canClaimMuseumTouchPointer(12, undefined, 11), true, 'a second pointer can own look while movement is held');
assert.equal(touchInput.canClaimMuseumTouchPointer(11, undefined, 11), false, 'one pointer cannot own move and look');
assert.equal(touchInput.canClaimMuseumTouchPointer(12, 12, 11), false, 'one look surface accepts one pointer');

const controlsSource = await readFile(new URL('src/components/MuseumGallery/useMuseumControls.ts', root), 'utf8');
const touchControlsSource = await readFile(new URL('src/components/MuseumGallery/MuseumTouchControls.tsx', root), 'utf8');
const pageSource = await readFile(new URL('src/components/MuseumGallery/MuseumPage.tsx', root), 'utf8');
const sceneSource = await readFile(new URL('src/components/MuseumGallery/MuseumWorldScene.tsx', root), 'utf8');
const cssSource = await readFile(new URL('src/components/MuseumGallery/museum.css', root), 'utf8');

assert.match(controlsSource, /getBoundingClientRect\(\)/, 'movement must anchor to the pad center');
assert.match(controlsSource, /touchMoveRef\.current = axes;[\s\S]{0,300}updateMovement\(\);/, 'pointer down/move must publish axes');
assert.match(controlsSource, /touchMoveRef\.current = \{strafe: 0, forward: 0\};[\s\S]{0,350}updateMovement\(\);/, 'release/cancel must stop movement');
assert.match(controlsSource, /window\.addEventListener\('pointerup', finishPointer, true\)/, 'window release fallback must be installed');
assert.match(controlsSource, /window\.addEventListener\('pointercancel', finishPointer, true\)/, 'window cancel fallback must be installed');
assert.match(controlsSource, /controlSchemeRef\.current === 'touch'[\s\S]{0,180}setMode\('drag-look'\)/, 'touch entry must bypass Pointer Lock');
assert.match(sceneSource, /arcadeFrame\.forward \|\| arcadeFrame\.strafe[\s\S]{0,160}invalidate\(\)/, 'held axes must schedule the next demand frame');
assert.match(touchControlsSource, /onClick=\{onInteract\}/, 'touch Interact must call the shared interaction callback');
assert.match(pageSource, /onInteract=\{interactNearby\}/, 'touch Interact must share desktop exhibit and sign activation');
assert.match(pageSource, /Use both controls together\./, 'first-visit touch guidance must document multitouch');
assert.match(cssSource, /data-control-scheme=touch[\s\S]{0,500}touch-action:none/, 'active touch surfaces must suppress page gestures');

console.log('Museum mobile control audit passed: fixed-center movement, hold/release, multitouch ownership, touch look, shared interaction, and guidance contracts are present.');
