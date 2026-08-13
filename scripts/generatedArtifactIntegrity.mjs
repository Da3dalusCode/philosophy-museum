import {readFile, writeFile} from 'node:fs/promises';

export const normalizeGeneratedArtifactEol = (source) => source.replaceAll('\r\n', '\n');

export const generatedArtifactMatches = (actual, expected) =>
  normalizeGeneratedArtifactEol(actual) === normalizeGeneratedArtifactEol(expected);

export const writeGeneratedArtifactIfChanged = async (url, generated) => {
  try {
    const existing = await readFile(url, 'utf8');
    if (generatedArtifactMatches(existing, generated)) return false;
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  await writeFile(url, generated, 'utf8');
  return true;
};
