import {createServer} from 'vite';

export const loadAppData = async () => {
  const server = await createServer({
    configFile: false,
    appType: 'custom',
    logLevel: 'silent',
    server: {middlewareMode: true},
  });

  try {
    const [
      {philosophers},
      {branches},
      {canonicalArticles},
      {MUSEUM_INTERPRETATIONS},
      {MUSEUM_SUPPLEMENTAL_EXHIBITS},
      reviewLock,
    ] = await Promise.all([
      server.ssrLoadModule('/src/data/philosophers.ts'),
      server.ssrLoadModule('/src/data/branches.ts'),
      server.ssrLoadModule('/src/data/canonicalArticles.ts'),
      server.ssrLoadModule('/src/data/museum/museumInterpretations.ts'),
      server.ssrLoadModule('/src/data/museum/museumSupplementalExhibits.ts'),
      server.ssrLoadModule('/src/editorial/reviewLock.ts'),
    ]);
    return {
      philosophers,
      branches,
      canonicalArticles,
      museumInterpretations: MUSEUM_INTERPRETATIONS,
      museumSupplementalExhibits: MUSEUM_SUPPLEMENTAL_EXHIBITS,
      reviewLock,
    };
  } finally {
    await server.close();
  }
};
