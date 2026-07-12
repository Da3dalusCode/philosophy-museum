import {readFileSync, readdirSync, statSync} from 'node:fs';
import {basename, join} from 'node:path';
import {brotliCompressSync, gzipSync} from 'node:zlib';

const distDir = join(process.cwd(), 'dist');
const assetsDir = join(distDir, 'assets');
const indexPath = join(distDir, 'index.html');

const fail = (message) => {
  console.error(`Bundle report failed: ${message}`);
  process.exitCode = 1;
};

try {
  statSync(indexPath);
  statSync(assetsDir);
} catch {
  fail('dist does not exist. Run npm run build first.');
  process.exit();
}

const indexHtml = readFileSync(indexPath, 'utf8');
const assetPath = (url) => {
  const normalized = decodeURIComponent(url.split(/[?#]/, 1)[0]).replaceAll('\\', '/');
  const marker = 'assets/';
  const offset = normalized.lastIndexOf(marker);
  return offset === -1 ? undefined : join(distDir, normalized.slice(offset));
};
const matches = (pattern) => [...indexHtml.matchAll(pattern)].map((match) => match[1]);
const entryUrls = matches(/<script\b[^>]*\btype=["']module["'][^>]*\bsrc=["']([^"']+\.js)["'][^>]*>/gi);
const preloadUrls = matches(/<link\b[^>]*\brel=["']modulepreload["'][^>]*\bhref=["']([^"']+\.js)["'][^>]*>/gi);
const cssUrls = matches(/<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["']([^"']+\.css)["'][^>]*>/gi);
const entryPath = entryUrls.length === 1 ? assetPath(entryUrls[0]) : undefined;

if (!entryPath) {
  fail(`expected one module entry in dist/index.html, found ${entryUrls.length}.`);
  process.exit();
}

const metric = (path) => {
  const bytes = readFileSync(path);
  return {
    raw: bytes.length,
    gzip: gzipSync(bytes).length,
    brotli: brotliCompressSync(bytes).length,
  };
};
const add = (items) => items.reduce((total, item) => ({
  raw: total.raw + item.raw,
  gzip: total.gzip + item.gzip,
  brotli: total.brotli + item.brotli,
}), {raw: 0, gzip: 0, brotli: 0});
const format = ({raw, gzip, brotli}) => `raw=${raw} gzip=${gzip} brotli=${brotli}`;

const jsFiles = readdirSync(assetsDir)
  .filter((name) => name.endsWith('.js'))
  .map((name) => ({name, path: join(assetsDir, name)}))
  .sort((left, right) => left.name.localeCompare(right.name));
const measuredJs = jsFiles.map((file) => ({...file, ...metric(file.path)}));
const initialPaths = [...new Set([entryPath, ...preloadUrls.map(assetPath).filter(Boolean)])];
const initialMetrics = add(initialPaths.map(metric));
const totalMetrics = add(measuredJs);
const entryMetrics = metric(entryPath);

console.log('Philosophy Atlas bundle report');
console.log(`Entry JS: ${basename(entryPath)} ${format(entryMetrics)}`);
console.log(`Initial static JS closure: files=${initialPaths.length} ${format(initialMetrics)}`);
console.log(`Total emitted JS: files=${measuredJs.length} ${format(totalMetrics)}`);
console.log(`JS chunks under 5 KiB: ${measuredJs.filter(({raw}) => raw < 5120).length}`);

for (const cssUrl of cssUrls) {
  const path = assetPath(cssUrl);
  if (path) console.log(`Entry CSS: ${basename(path)} ${format(metric(path))}`);
}

console.log('Largest JS assets:');
for (const file of [...measuredJs].sort((left, right) => right.raw - left.raw).slice(0, 10)) {
  console.log(`  ${file.name} ${format(file)}`);
}
