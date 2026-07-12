/** Match the browser and bundler messages produced when a deferred route asset fails. */
export const isRouteLoadError = (error: unknown): boolean => {
  const name = error instanceof Error ? error.name : '';
  const message = error instanceof Error ? error.message : String(error);
  return name === 'ChunkLoadError'
    || /failed to fetch dynamically imported module/i.test(message)
    || /error loading dynamically imported module/i.test(message)
    || /importing a module script failed/i.test(message)
    || /loading (?:css )?chunk/i.test(message)
    || /unable to preload css/i.test(message);
};
