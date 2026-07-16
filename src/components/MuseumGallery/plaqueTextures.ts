import {useEffect, useMemo} from 'react';
import {
  CanvasTexture,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
} from 'three';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';

export type PlaqueTextureOptions = {
  title: string;
  kicker: string;
  subtitle?: string;
  accent?: string;
  width?: number;
  height?: number;
};

const fitText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startingSize: number,
  family: string,
): number => {
  let size = startingSize;
  while (size > 22) {
    context.font = `600 ${size}px ${family}`;
    if (context.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return size;
};

export const createPlaqueTexture = ({
  title,
  kicker,
  subtitle,
  accent = '#b88b4a',
  width = MUSEUM_TEXTURE_SPECS.plaque.width,
  height = MUSEUM_TEXTURE_SPECS.plaque.height,
}: PlaqueTextureOptions): CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error(`Unable to create the local plaque for ${title}.`);

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#171713');
  gradient.addColorStop(1, '#29251d');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = '#8a7656';
  context.lineWidth = 8;
  context.strokeRect(10, 10, width - 20, height - 20);
  context.strokeStyle = accent;
  context.lineWidth = 3;
  context.strokeRect(25, 25, width - 50, height - 50);

  context.fillStyle = accent;
  context.font = '700 29px system-ui, sans-serif';
  context.textBaseline = 'middle';
  context.fillText(kicker.toLocaleUpperCase(), 58, 64);

  const titleSize = fitText(context, title, width - 116, 68, 'Georgia, serif');
  context.fillStyle = '#f3ead8';
  context.font = `600 ${titleSize}px Georgia, serif`;
  context.fillText(title, 58, subtitle ? 135 : 151);

  if (subtitle) {
    context.fillStyle = '#c7bda9';
    context.font = '400 27px system-ui, sans-serif';
    const trimmed = subtitle.length > 74 ? `${subtitle.slice(0, 71)}…` : subtitle;
    context.fillText(trimmed, 58, 205);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  texture.name = `museum-plaque-${title.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return texture;
};

export const usePlaqueTexture = (options: PlaqueTextureOptions): CanvasTexture => {
  const {title, kicker, subtitle, accent, width, height} = options;
  const texture = useMemo(
    () => createPlaqueTexture({title, kicker, subtitle, accent, width, height}),
    [accent, height, kicker, subtitle, title, width],
  );
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
};
