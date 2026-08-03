import {execFile} from 'node:child_process';
import {existsSync, mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {delimiter, dirname, join, resolve} from 'node:path';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {createServer} from 'vite';

const run = promisify(execFile);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlEntities = new Map([
  ['&amp;', '&'], ['&quot;', '"'], ['&#39;', "'"], ['&lt;', '<'], ['&gt;', '>'],
]);
const decodeHtml = (value) => value.replace(/&(amp|quot|#39|lt|gt);/gu, (entity) => htmlEntities.get(entity) ?? entity);

const executableCandidates = process.platform === 'win32'
  ? [
      process.env.CHROME_PATH,
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    ]
  : [
      process.env.CHROME_PATH,
      ...String(process.env.PATH ?? '').split(delimiter).flatMap((folder) => [
        join(folder, 'google-chrome'),
        join(folder, 'google-chrome-stable'),
        join(folder, 'chromium'),
        join(folder, 'chromium-browser'),
      ]),
    ];
const browser = executableCandidates.find((candidate) => candidate && existsSync(candidate));
if (!browser) {
  console.error('Primary plaque audit requires a local Chrome, Chromium, or Edge executable for real browser-canvas metrics.');
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), 'philosophy-atlas-plaque-audit-'));
const server = await createServer({
  root: repoRoot,
  configFile: false,
  logLevel: 'error',
  server: {host: '127.0.0.1', port: 0, strictPort: false},
});

try {
  await server.listen();
  const address = server.httpServer?.address();
  if (!address || typeof address === 'string') throw new Error('Vite did not expose the plaque-audit port.');
  const url = `http://127.0.0.1:${address.port}/scripts/museumPlaqueAudit.html`;
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profile}`,
    '--dump-dom',
    url,
  ];
  if (process.platform !== 'win32' && typeof process.getuid === 'function' && process.getuid() === 0) {
    args.unshift('--no-sandbox');
  }
  const {stdout} = await run(browser, args, {maxBuffer: 16 * 1024 * 1024, timeout: 120_000});
  const match = stdout.match(/<pre id="museum-plaque-audit-result">([\s\S]*?)<\/pre>/u);
  if (!match) throw new Error(`Browser audit did not return its result payload.\n${stdout.slice(-2_000)}`);
  const report = JSON.parse(decodeHtml(match[1]));
  if (report.fatal) throw new Error(report.fatal);
  if (!report.ok) {
    console.error(`Primary plaque audit failed with ${report.failures.length} contract violation(s):`);
    for (const failure of report.failures) {
      console.error(
        `- ${failure.hall} | ${failure.room} | ${failure.exhibitId} | ${failure.title} | role=${failure.offendingRole}`
        + ` | lines=${failure.finalLineCount} | font=${failure.finalFontSize}px`
        + ` | truncation=${failure.truncation} | overflow=${failure.overflow}`
        + ` | minimum-size=${failure.minimumSizeFailure} | ${failure.message}`,
      );
    }
    process.exitCode = 1;
  } else {
    const titleSizes = report.results.map(({titleFontSize}) => titleFontSize);
    const invitationSizes = report.results.map(({invitationFontSize}) => invitationFontSize);
    const titleLines = report.results.map(({titleLineCount}) => titleLineCount);
    const invitationLines = report.results.map(({invitationLineCount}) => invitationLineCount);
    console.log(`✓ all ${report.results.length} primary plaques use exact canonical titles, complete invitations, and no kicker`);
    console.log(`✓ browser-canvas glyph bounds fit every production safe rectangle with no ellipsis`);
    console.log(`  title fonts: ${Math.min(...titleSizes)}–${Math.max(...titleSizes)}px; maximum lines: ${Math.max(...titleLines)}`);
    console.log(`  invitation fonts: ${Math.min(...invitationSizes)}–${Math.max(...invitationSizes)}px; maximum lines: ${Math.max(...invitationLines)}`);
    console.log(`  wall-only invitation overrides: ${report.invitationOverrideCount}`);
    console.log('  representatives:');
    for (const item of report.representatives) {
      console.log(`    ${item.exhibitId}: ${item.titleLineCount} title line(s) at ${item.titleFontSize}px; ${item.invitationLineCount} invitation line(s) at ${item.invitationFontSize}px`);
    }
  }
} finally {
  await server.close();
  rmSync(profile, {recursive: true, force: true});
}
