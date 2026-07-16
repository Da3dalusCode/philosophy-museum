export type MuseumDecodedTextureSpec = {
  width: number;
  height: number;
  mipmaps: boolean;
};

/** Dimensions shared by renderers and the deterministic residency model. */
export const MUSEUM_TEXTURE_SPECS = {
  plaque: {width: 1024, height: 256, mipmaps: true},
  contemporaryNameStrip: {width: 1200, height: 190, mipmaps: true},
  ancientOrientationPlinth: {width: 1024, height: 280, mipmaps: true},
  visitorMapKiosk: {width: 1200, height: 918, mipmaps: true},
  sceneFallback: {width: 512, height: 341, mipmaps: true},
  contemporarySignWidth: 1400,
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
