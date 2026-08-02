import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {buildArticleDepthInventory} from './buildArticleDepthInventory.mjs';

const manifestUrl = new URL('../docs/editorial/flagship-program.json', import.meta.url);
const categories = new Set(['thinker', 'philosophy']);

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

export const validateFlagshipManifestShape = (manifest) => {
  const errors = [];
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    return ['Manifest root must be an object.'];
  }
  if (manifest.version !== 1) errors.push('Manifest version must be 1.');
  if (!isNonEmptyString(manifest.programId)) errors.push('programId must be a non-empty string.');
  if (!manifest.targets || typeof manifest.targets !== 'object' || Array.isArray(manifest.targets)) {
    errors.push('targets must be an object.');
  } else {
    for (const category of categories) {
      if (!isPositiveInteger(manifest.targets[category])) {
        errors.push(`targets.${category} must be a positive integer.`);
      }
    }
  }
  if (!Array.isArray(manifest.entries)) errors.push('entries must be an array.');
  if (!Array.isArray(manifest.approvedButMissing)) errors.push('approvedButMissing must be an array.');

  const ids = new Set();
  const inspect = (entry, index, collection, idField) => {
    const prefix = `${collection}[${index}]`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      errors.push(`${prefix} must be an object.`);
      return;
    }
    if (!isNonEmptyString(entry.label)) errors.push(`${prefix}.label must be a non-empty string.`);
    if (!categories.has(entry.category)) errors.push(`${prefix}.category must be thinker or philosophy.`);
    if (!isNonEmptyString(entry[idField])) {
      errors.push(`${prefix}.${idField} must be a non-empty string.`);
    } else if (ids.has(entry[idField])) {
      errors.push(`Duplicate flagship ID: ${entry[idField]}.`);
    } else {
      ids.add(entry[idField]);
    }
    if (!isPositiveInteger(entry.target)) errors.push(`${prefix}.target must be a positive integer.`);
    if (categories.has(entry.category) && isPositiveInteger(entry.target)
      && isPositiveInteger(manifest.targets?.[entry.category])
      && entry.target !== manifest.targets[entry.category]) {
      errors.push(`${prefix}.target must equal the ${entry.category} program target.`);
    }
  };

  if (Array.isArray(manifest.entries)) {
    manifest.entries.forEach((entry, index) => inspect(entry, index, 'entries', 'canonicalId'));
  }
  if (Array.isArray(manifest.approvedButMissing)) {
    manifest.approvedButMissing.forEach((entry, index) =>
      inspect(entry, index, 'approvedButMissing', 'proposedCanonicalId'));
  }
  return errors;
};

const loadManifest = async () => {
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read flagship manifest: ${error.message}`);
  }
  const errors = validateFlagshipManifestShape(manifest);
  if (errors.length) throw new Error(`Invalid flagship manifest:\n- ${errors.join('\n- ')}`);
  return manifest;
};

const pad = (value, width, alignRight = false) => {
  const text = String(value);
  return alignRight ? text.padStart(width) : text.padEnd(width);
};

export const reportFlagshipProgram = async () => {
  const [manifest, inventory] = await Promise.all([loadManifest(), buildArticleDepthInventory()]);
  const articleByKey = new Map(inventory.articles.map((record) =>
    [`${record.contentCategory}:${record.canonicalId}`, record]));
  const articleById = new Map(inventory.articles.map((record) => [record.canonicalId, record]));
  const referenceErrors = [];
  const rows = manifest.entries.map((entry) => {
    const articleCategory = entry.category === 'thinker' ? 'philosopher' : 'philosophy';
    const article = articleByKey.get(`${articleCategory}:${entry.canonicalId}`);
    if (!article) {
      referenceErrors.push(
        `${entry.label} references missing or incorrectly categorized canonical article ${entry.canonicalId}.`,
      );
      return undefined;
    }
    const gap = Math.max(0, entry.target - article.substantiveWordCount);
    return {
      label: entry.label,
      category: entry.category,
      canonicalId: entry.canonicalId,
      words: article.substantiveWordCount,
      target: entry.target,
      gap,
      status: gap === 0 ? 'complete' : 'migration-backlog',
    };
  }).filter(Boolean);

  for (const entry of manifest.approvedButMissing) {
    if (articleById.has(entry.proposedCanonicalId)) {
      referenceErrors.push(
        `${entry.label} is listed as approved-but-missing but ${entry.proposedCanonicalId} now resolves canonically.`,
      );
    }
  }
  if (referenceErrors.length) {
    throw new Error(`Invalid flagship references:\n- ${referenceErrors.join('\n- ')}`);
  }

  const displayRows = [
    ...rows,
    ...manifest.approvedButMissing.map((entry) => ({
      label: entry.label,
      category: entry.category,
      canonicalId: entry.proposedCanonicalId,
      words: '—',
      target: entry.target,
      gap: '—',
      status: 'approved-but-missing',
    })),
  ];
  const widths = {
    label: Math.max('Flagship'.length, ...displayRows.map(({label}) => label.length)),
    category: Math.max('Category'.length, ...displayRows.map(({category}) => category.length)),
    canonicalId: Math.max('Canonical ID'.length, ...displayRows.map(({canonicalId}) => canonicalId.length)),
    words: Math.max('Words'.length, ...displayRows.map(({words}) => String(words).length)),
    target: Math.max('Target'.length, ...displayRows.map(({target}) => String(target).length)),
    gap: Math.max('Gap'.length, ...displayRows.map(({gap}) => String(gap).length)),
    status: Math.max('Status'.length, ...displayRows.map(({status}) => status.length)),
  };
  const line = (row) => [
    pad(row.label, widths.label),
    pad(row.category, widths.category),
    pad(row.canonicalId, widths.canonicalId),
    pad(row.words, widths.words, true),
    pad(row.target, widths.target, true),
    pad(row.gap, widths.gap, true),
    pad(row.status, widths.status),
  ].join('  ');
  console.log(line({
    label: 'Flagship', category: 'Category', canonicalId: 'Canonical ID', words: 'Words',
    target: 'Target', gap: 'Gap', status: 'Status',
  }));
  console.log('-'.repeat(line(displayRows[0]).length));
  for (const row of displayRows) console.log(line(row));

  const complete = rows.filter(({status}) => status === 'complete').length;
  const backlog = rows.length - complete;
  console.log(
    `Flagship summary: ${displayRows.length} approved; ${rows.length} canonical; ${complete} complete; `
    + `${backlog} below target; ${manifest.approvedButMissing.length} approved but missing.`,
  );
  console.log('Below-target and approved-but-missing records are migration backlog, not reporter failures.');
  return {manifest, rows};
};

const isMain = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (isMain) {
  reportFlagshipProgram().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
