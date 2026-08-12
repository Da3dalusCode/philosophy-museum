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
      {MUSEUM_CANONICAL_PROGRAM},
      {MUSEUM_ASSETS},
      {PRIMARY_PLAQUE_INVITATION_OVERRIDES},
      {MUSEUM_PUBLIC_ROUTE_HALL_IDS},
      {MUSEUM_BUILDING_GUIDED_STOPS},
      hashRouter,
      reviewLock,
      exhibitReview,
    ] = await Promise.all([
      server.ssrLoadModule('/src/data/philosophers.ts'),
      server.ssrLoadModule('/src/data/branches.ts'),
      server.ssrLoadModule('/src/data/canonicalArticles.ts'),
      server.ssrLoadModule('/src/data/museum/museumInterpretations.ts'),
      server.ssrLoadModule('/src/data/museum/museumSupplementalExhibits.ts'),
      server.ssrLoadModule('/src/data/museum/museumCanonicalProgram.ts'),
      server.ssrLoadModule('/src/data/museum/museumAssets.ts'),
      server.ssrLoadModule('/src/components/MuseumGallery/primaryPlaqueContract.ts'),
      server.ssrLoadModule('/src/data/museum/museumPublicRoute.ts'),
      server.ssrLoadModule('/src/components/MuseumGallery/museumGuidedRoute.ts'),
      server.ssrLoadModule('/src/routing/hashRouter.ts'),
      server.ssrLoadModule('/src/editorial/reviewLock.ts'),
      server.ssrLoadModule('/src/editorial/exhibitReview.ts'),
    ]);
    return {
      philosophers,
      branches,
      canonicalArticles,
      museumInterpretations: MUSEUM_INTERPRETATIONS,
      museumSupplementalExhibits: MUSEUM_SUPPLEMENTAL_EXHIBITS,
      museumCanonicalProgram: MUSEUM_CANONICAL_PROGRAM,
      museumAssets: MUSEUM_ASSETS,
      primaryPlaqueInvitationOverrides: PRIMARY_PLAQUE_INVITATION_OVERRIDES,
      museumPublicRouteHallIds: MUSEUM_PUBLIC_ROUTE_HALL_IDS,
      museumBuildingGuidedStops: MUSEUM_BUILDING_GUIDED_STOPS,
      hashRouter,
      reviewLock,
      exhibitReview,
    };
  } finally {
    await server.close();
  }
};
