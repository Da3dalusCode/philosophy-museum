import {useEffect, useMemo} from 'react';
import {CanvasTexture, LinearMipmapLinearFilter, SRGBColorSpace} from 'three';
import {MUSEUM_GRAND_ENTRANCE_WELCOME_COPY} from '../../data/museum/museumGrandEntranceFurnishings';

const BRONZE = '#b88b4a';
const IVORY = '#f3ead8';
const WARM_GRAY = '#c7bda9';

type TextPart = {
  text: string;
  color: string;
  weight: number;
};

const textWidth = (
  context: CanvasRenderingContext2D,
  parts: readonly TextPart[],
  size: number,
  family: string,
): number => parts.reduce((width, part) => {
  context.font = `${part.weight} ${size}px ${family}`;
  return width + context.measureText(part.text).width;
}, 0);

const fittedSize = (
  context: CanvasRenderingContext2D,
  parts: readonly TextPart[],
  family: string,
  maximumWidth: number,
  preferredSize: number,
  minimumSize: number,
): number => {
  for (let size = preferredSize; size >= minimumSize; size -= 1) {
    if (textWidth(context, parts, size, family) <= maximumWidth) return size;
  }
  return minimumSize;
};

const drawParts = (
  context: CanvasRenderingContext2D,
  parts: readonly TextPart[],
  x: number,
  y: number,
  size: number,
  family: string,
): void => {
  let cursor = x;
  for (const part of parts) {
    context.font = `${part.weight} ${size}px ${family}`;
    context.fillStyle = part.color;
    context.fillText(part.text, cursor, y);
    cursor += context.measureText(part.text).width;
  }
};

const createGrandEntranceWelcomeTexture = (width: number, height: number): CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Unable to create the Grand Entrance welcome sign texture.');

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#151512');
  gradient.addColorStop(.58, '#201d17');
  gradient.addColorStop(1, '#2b261d');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const shortEdge = Math.min(width, height);
  const outerInset = Math.max(6, Math.round(shortEdge * .04));
  const innerInset = Math.max(13, Math.round(shortEdge * .09));
  context.strokeStyle = '#6f6148';
  context.lineWidth = Math.max(3, Math.round(shortEdge * .024));
  context.strokeRect(outerInset, outerInset, width - outerInset * 2, height - outerInset * 2);
  context.strokeStyle = BRONZE;
  context.lineWidth = Math.max(1, Math.round(shortEdge * .011));
  context.strokeRect(innerInset, innerInset, width - innerInset * 2, height - innerInset * 2);

  const safeX = Math.max(innerInset + 12, Math.round(width * .052));
  const safeWidth = width - safeX * 2;
  context.textAlign = 'left';
  context.textBaseline = 'alphabetic';

  const kickerSize = Math.max(13, Math.round(height * .094));
  context.font = `700 ${kickerSize}px system-ui, sans-serif`;
  context.fillStyle = BRONZE;
  context.fillText(MUSEUM_GRAND_ENTRANCE_WELCOME_COPY.kicker, safeX, Math.round(height * .245));

  const titleParts = [
    {text: `${MUSEUM_GRAND_ENTRANCE_WELCOME_COPY.titleLead} `, color: BRONZE, weight: 600},
    {text: MUSEUM_GRAND_ENTRANCE_WELCOME_COPY.titleRest, color: IVORY, weight: 600},
  ] as const;
  const titleSize = fittedSize(context, titleParts, 'Georgia, serif', safeWidth, Math.round(height * .29), 36);
  drawParts(context, titleParts, safeX, Math.round(height * .59), titleSize, 'Georgia, serif');

  const subtitleParts = [
    {text: MUSEUM_GRAND_ENTRANCE_WELCOME_COPY.subtitleLead, color: BRONZE, weight: 700},
    {text: MUSEUM_GRAND_ENTRANCE_WELCOME_COPY.subtitleRest, color: WARM_GRAY, weight: 400},
  ] as const;
  const subtitleSize = fittedSize(context, subtitleParts, 'system-ui, sans-serif', safeWidth, Math.round(height * .106), 14);
  drawParts(context, subtitleParts, safeX, Math.round(height * .795), subtitleSize, 'system-ui, sans-serif');

  context.strokeStyle = '#7e633e';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(safeX, Math.round(height * .865));
  context.lineTo(width - safeX, Math.round(height * .865));
  context.stroke();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  texture.name = 'museum-grand-entrance-enter-the-conversation';
  texture.userData = {
    ...texture.userData,
    welcomeCopy: MUSEUM_GRAND_ENTRANCE_WELCOME_COPY,
    typography: {kickerSize, titleSize, subtitleSize},
  };
  return texture;
};

export const useGrandEntranceWelcomeTexture = (width: number, height: number): CanvasTexture => {
  const texture = useMemo(() => createGrandEntranceWelcomeTexture(width, height), [height, width]);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
};
