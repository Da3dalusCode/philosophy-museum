export type MuseumDecodedTextureSpec = {
  width: number;
  height: number;
  mipmaps: boolean;
};

/** Dimensions shared by renderers and the deterministic residency model. */
export const MUSEUM_TEXTURE_SPECS = {
  plaque: {width: 768, height: 192, mipmaps: true},
  contemporaryNameStrip: {width: 960, height: 180, mipmaps: true},
  ancientOrientationPlinth: {width: 1024, height: 280, mipmaps: true},
  visitorMapKiosk: {width: 1200, height: 918, mipmaps: true},
  sceneFallback: {width: 512, height: 341, mipmaps: true},
  buildingSign: {width: 1200, height: 320, mipmaps: true},
  reservationSign: {width: 1400, height: 380, mipmaps: true},
  readinessSign: {width: 1200, height: 320, mipmaps: true},
  contemporarySignWidth: 900,
  ancientGallerySignCount: 4,
} as const;

export const MUSEUM_TEXTURE_BYTES_PER_PIXEL = 4;

/** Exact RGBA8 allocation including every generated mip level. */
export const decodedTextureBytes = ({width, height, mipmaps}: MuseumDecodedTextureSpec): number => {
  let levelWidth = Math.max(1, Math.floor(width));
  let levelHeight = Math.max(1, Math.floor(height));
  let pixels = levelWidth * levelHeight;
  if (mipmaps) {
    while (levelWidth > 1 || levelHeight > 1) {
      levelWidth = Math.max(1, Math.floor(levelWidth / 2));
      levelHeight = Math.max(1, Math.floor(levelHeight / 2));
      pixels += levelWidth * levelHeight;
    }
  }
  return pixels * MUSEUM_TEXTURE_BYTES_PER_PIXEL;
};

export const bytesToMiB = (bytes: number): number => bytes / (1024 * 1024);

/**
 * Fits a generated texture to a rendered plane without exceeding the reference
 * texture's decoded base-level pixel allocation. The integer result differs
 * from the physical aspect by less than one pixel on its shorter axis.
 */
export const museumTextureDimensionsForPlane = (
  planeWidth: number,
  planeHeight: number,
  reference: MuseumDecodedTextureSpec,
): MuseumDecodedTextureSpec => {
  if (
    !Number.isFinite(planeWidth)
    || !Number.isFinite(planeHeight)
    || planeWidth <= 0
    || planeHeight <= 0
  ) throw new Error(`Museum texture plane must have positive finite dimensions, received ${planeWidth} × ${planeHeight}.`);

  const pixelBudget = Math.max(1, Math.floor(reference.width) * Math.floor(reference.height));
  const aspect = planeWidth / planeHeight;
  let width: number;
  let height: number;
  if (aspect >= 1) {
    height = Math.max(1, Math.floor(Math.sqrt(pixelBudget / aspect)));
    width = Math.max(1, Math.floor(height * aspect));
  } else {
    width = Math.max(1, Math.floor(Math.sqrt(pixelBudget * aspect)));
    height = Math.max(1, Math.floor(width / aspect));
  }

  return {width, height, mipmaps: reference.mipmaps};
};
