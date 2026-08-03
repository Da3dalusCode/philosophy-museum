import {useEffect, useMemo} from 'react';
import {
  CanvasTexture,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
} from 'three';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';

export type PlaqueTextureOptions = {
  title: string;
  kicker?: string;
  subtitle?: string;
  accent?: string;
  width?: number;
  height?: number;
  theme?: 'dark' | 'mediterranean';
  subtitleMaxLines?: 1 | 2 | 3 | 4;
  contentKind?: 'standard' | 'primary' | 'supplemental';
};

export type PlaqueSafeRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PlaqueTextRole = 'kicker' | 'title' | 'subtitle';

export type PlaqueGlyphBounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type PlaqueTextLineLayout = {
  role: PlaqueTextRole;
  text: string;
  font: string;
  fontSize: number;
  color: string;
  x: number;
  y: number;
  bounds: PlaqueGlyphBounds;
  ellipsized: boolean;
};

export type PlaqueTextLayout = {
  contentKind: 'standard' | 'primary' | 'supplemental';
  width: number;
  height: number;
  safeRect: PlaqueSafeRect;
  lines: readonly PlaqueTextLineLayout[];
  lineCounts: Readonly<Record<PlaqueTextRole, number>>;
  fitsSafeRect: boolean;
};

export const plaqueSupportedTitleLines = (width: number, height: number): number =>
  height >= width * 1.15 ? 6 : height >= width * .9 ? 5 : height >= width * .72 ? 4 : height >= width * .48 ? 3 : 2;

export const plaqueSupportedSubtitleLines = (width: number, height: number): number =>
  height >= width * .9 ? 4 : height >= width * .6 ? 3 : height >= 260 ? 2 : 1;

type TextStyle = {
  role: PlaqueTextRole;
  weight: number;
  family: string;
  color: string;
  startingSize: number;
  minimumSize: number;
  maxLines: number;
};

type MeasuredLine = {
  text: string;
  ascent: number;
  descent: number;
  left: number;
  right: number;
};

type PreparedBlock = {
  style: TextStyle;
  font: string;
  fontSize: number;
  lines: readonly MeasuredLine[];
  lineGap: number;
  height: number;
  ellipsized: boolean;
};

export const PRIMARY_PLAQUE_INVITATION_MAX_LINES = 4;
export const SUPPLEMENTAL_PLAQUE_INVITATION_MAX_LINES = 5;

export const supplementalPlaqueSupportedInvitationLines = (width: number, height: number): number =>
  height >= width * .45 ? SUPPLEMENTAL_PLAQUE_INVITATION_MAX_LINES : 4;

export const primaryPlaqueReadableMinimums = (height: number): {
  title: number;
  subtitle: number;
} => ({
  title: Math.min(36, Math.max(18, Math.round(height * .155))),
  subtitle: Math.min(24, Math.max(13, Math.round(height * .095))),
});

export const supplementalPlaqueReadableMinimums = (height: number): {
  title: number;
  subtitle: number;
} => ({
  title: Math.min(32, Math.max(15, Math.round(height * .13))),
  subtitle: Math.min(19, Math.max(10, Math.round(height * .07))),
});

const finiteMetric = (value: number | undefined, fallback: number): number =>
  Number.isFinite(value) ? Math.max(0, value ?? fallback) : fallback;

const setFont = (
  context: CanvasRenderingContext2D,
  weight: number,
  size: number,
  family: string,
): string => {
  const font = `${weight} ${size}px ${family}`;
  context.font = font;
  return font;
};

const measureLine = (
  context: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
): MeasuredLine => {
  const metrics = context.measureText(text);
  const left = finiteMetric(metrics.actualBoundingBoxLeft, 0);
  const right = finiteMetric(metrics.actualBoundingBoxRight, metrics.width);
  return {
    text,
    ascent: finiteMetric(metrics.actualBoundingBoxAscent, fontSize * .78),
    descent: finiteMetric(metrics.actualBoundingBoxDescent, fontSize * .22),
    left,
    right: Math.max(right, metrics.width - left),
  };
};

const measuredWidth = (
  context: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
): number => {
  const measured = measureLine(context, text, fontSize);
  return measured.left + measured.right;
};

const ellipsizeMeasuredText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number,
): string => {
  if (measuredWidth(context, text, fontSize) <= maxWidth) return text;
  const ellipsis = '…';
  if (measuredWidth(context, ellipsis, fontSize) > maxWidth) return '';
  let low = 0;
  let high = text.length;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    const candidate = `${text.slice(0, middle).trimEnd()}${ellipsis}`;
    if (measuredWidth(context, candidate, fontSize) <= maxWidth) low = middle;
    else high = middle - 1;
  }
  return `${text.slice(0, low).trimEnd()}${ellipsis}`;
};

const wrapMeasuredText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
  fontSize: number,
): {lines: readonly string[]; ellipsized: boolean} => {
  const words = text.trim().split(/\s+/u).filter(Boolean);
  if (!words.length) return {lines: [], ellipsized: false};

  const unbounded: string[] = [];
  let current = '';
  let wordEllipsized = false;
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measuredWidth(context, candidate, fontSize) <= maxWidth) {
      current = candidate;
      continue;
    }
    if (current) unbounded.push(current);
    if (measuredWidth(context, word, fontSize) <= maxWidth) current = word;
    else {
      unbounded.push(ellipsizeMeasuredText(context, word, maxWidth, fontSize));
      current = '';
      wordEllipsized = true;
    }
  }
  if (current) unbounded.push(current);
  if (unbounded.length <= maxLines) return {lines: unbounded, ellipsized: wordEllipsized};

  const lines = unbounded.slice(0, maxLines);
  lines[maxLines - 1] = ellipsizeMeasuredText(
    context,
    unbounded.slice(maxLines - 1).join(' '),
    maxWidth,
    fontSize,
  );
  return {lines, ellipsized: true};
};

const prepareBlock = (
  context: CanvasRenderingContext2D,
  text: string,
  style: TextStyle,
  scale: number,
  maxWidth: number,
): PreparedBlock => {
  const fontSize = Math.max(style.minimumSize, Math.round(style.startingSize * scale));
  const font = setFont(context, style.weight, fontSize, style.family);
  const wrapped = wrapMeasuredText(context, text, maxWidth, style.maxLines, fontSize);
  const lines = wrapped.lines.map((line) => measureLine(context, line, fontSize));
  const lineGap = Math.max(2, Math.round(fontSize * .14));
  const height = lines.reduce((sum, line) => sum + line.ascent + line.descent, 0)
    + Math.max(0, lines.length - 1) * lineGap;
  return {style, font, fontSize, lines, lineGap, height, ellipsized: wrapped.ellipsized};
};

const wrapCompleteMeasuredText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number,
): readonly string[] => {
  const words = text.trim().split(/\s+/u).filter(Boolean);
  if (!words.length) return [];
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measuredWidth(context, candidate, fontSize) <= maxWidth) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word;
  }
  if (current) lines.push(current);
  return lines;
};

const prepareCompleteBlock = (
  context: CanvasRenderingContext2D,
  text: string,
  style: TextStyle,
  fontSize: number,
  maxWidth: number,
): PreparedBlock => {
  const font = setFont(context, style.weight, fontSize, style.family);
  const lines = wrapCompleteMeasuredText(context, text, maxWidth, fontSize)
    .map((line) => measureLine(context, line, fontSize));
  const lineGap = Math.max(1, Math.round(fontSize * .08));
  const height = lines.reduce((sum, line) => sum + line.ascent + line.descent, 0)
    + Math.max(0, lines.length - 1) * lineGap;
  return {style, font, fontSize, lines, lineGap, height, ellipsized: false};
};

export const plaqueTextLayoutFitsSafeRect = (layout: Pick<PlaqueTextLayout, 'safeRect' | 'lines'>): boolean => {
  const {safeRect} = layout;
  const right = safeRect.x + safeRect.width;
  const bottom = safeRect.y + safeRect.height;
  const epsilon = .01;
  return layout.lines.every(({bounds}) =>
    bounds.left >= safeRect.x - epsilon
    && bounds.top >= safeRect.y - epsilon
    && bounds.right <= right + epsilon
    && bounds.bottom <= bottom + epsilon);
};

const placePreparedBlocks = (
  width: number,
  height: number,
  safeRect: PlaqueSafeRect,
  blocks: readonly PreparedBlock[],
  blockGap: number,
  contentKind: 'standard' | 'primary' | 'supplemental',
): PlaqueTextLayout => {
  const totalHeight = blocks.reduce((sum, block) => sum + block.height, 0)
    + Math.max(0, blocks.length - 1) * blockGap;
  let cursorY = safeRect.y + Math.max(0, (safeRect.height - totalHeight) / 2);
  const lines: PlaqueTextLineLayout[] = [];
  const lineCounts: Record<PlaqueTextRole, number> = {kicker: 0, title: 0, subtitle: 0};
  blocks.forEach((block, blockIndex) => {
    block.lines.forEach((line, lineIndex) => {
      const x = safeRect.x + line.left;
      const y = cursorY + line.ascent;
      lines.push({
        role: block.style.role,
        text: line.text,
        font: block.font,
        fontSize: block.fontSize,
        color: block.style.color,
        x,
        y,
        bounds: {
          left: x - line.left,
          top: y - line.ascent,
          right: x + line.right,
          bottom: y + line.descent,
        },
        ellipsized: block.ellipsized && lineIndex === block.lines.length - 1,
      });
      lineCounts[block.style.role] += 1;
      cursorY = y + line.descent;
      if (lineIndex < block.lines.length - 1) cursorY += block.lineGap;
    });
    if (blockIndex < blocks.length - 1) cursorY += blockGap;
  });

  const result: PlaqueTextLayout = {
    contentKind,
    width,
    height,
    safeRect,
    lines,
    lineCounts,
    fitsSafeRect: false,
  };
  result.fitsSafeRect = totalHeight <= safeRect.height && plaqueTextLayoutFitsSafeRect(result);
  return result;
};

const layoutPrimaryPlaqueText = (
  context: CanvasRenderingContext2D,
  {
    title,
    subtitle = '',
    accent = '#b88b4a',
    width = MUSEUM_TEXTURE_SPECS.plaque.width,
    height = MUSEUM_TEXTURE_SPECS.plaque.height,
    theme = 'dark',
  }: PlaqueTextureOptions,
  safeRect: PlaqueSafeRect,
): PlaqueTextLayout => {
  const minimums = primaryPlaqueReadableMinimums(height);
  const titleStyle: TextStyle = {
    role: 'title',
    weight: 600,
    family: 'Georgia, serif',
    color: theme === 'mediterranean' ? '#17313a' : '#f3ead8',
    startingSize: Math.min(68, Math.max(minimums.title, Math.round(height * .28))),
    minimumSize: minimums.title,
    maxLines: plaqueSupportedTitleLines(width, height),
  };
  const invitationStyle: TextStyle = {
    role: 'subtitle',
    weight: 400,
    family: 'system-ui, sans-serif',
    color: theme === 'mediterranean' ? '#5e5549' : '#c7bda9',
    startingSize: Math.min(30, Math.max(minimums.subtitle, Math.round(height * .13))),
    minimumSize: minimums.subtitle,
    maxLines: PRIMARY_PLAQUE_INVITATION_MAX_LINES,
  };
  const blockGap = Math.max(3, Math.round(height * .025));
  let selected: readonly PreparedBlock[] | undefined;

  // The title owns its own scale search and stays dominant. At every size the
  // complete text wraps first; only then is either block reduced independently.
  for (let titleSize = titleStyle.startingSize; titleSize >= titleStyle.minimumSize && !selected; titleSize -= 1) {
    const titleBlock = prepareCompleteBlock(context, title, titleStyle, titleSize, safeRect.width);
    if (!titleBlock.lines.length || titleBlock.lines.length > titleStyle.maxLines) continue;
    for (
      let invitationSize = invitationStyle.startingSize;
      invitationSize >= invitationStyle.minimumSize;
      invitationSize -= 1
    ) {
      const invitationBlock = prepareCompleteBlock(
        context,
        subtitle,
        invitationStyle,
        invitationSize,
        safeRect.width,
      );
      if (!invitationBlock.lines.length || invitationBlock.lines.length > invitationStyle.maxLines) continue;
      const totalHeight = titleBlock.height + blockGap + invitationBlock.height;
      const widestLine = [...titleBlock.lines, ...invitationBlock.lines]
        .reduce((maximum, line) => Math.max(maximum, line.left + line.right), 0);
      if (totalHeight <= safeRect.height && widestLine <= safeRect.width) {
        selected = [titleBlock, invitationBlock];
        break;
      }
    }
  }

  if (!selected) {
    selected = [
      prepareCompleteBlock(context, title, titleStyle, titleStyle.minimumSize, safeRect.width),
      prepareCompleteBlock(context, subtitle, invitationStyle, invitationStyle.minimumSize, safeRect.width),
    ];
  }
  return placePreparedBlocks(width, height, safeRect, selected, blockGap, 'primary');
};

const layoutSupplementalPlaqueText = (
  context: CanvasRenderingContext2D,
  {
    title,
    subtitle = '',
    width = MUSEUM_TEXTURE_SPECS.plaque.width,
    height = MUSEUM_TEXTURE_SPECS.plaque.height,
    theme = 'dark',
  }: PlaqueTextureOptions,
  safeRect: PlaqueSafeRect,
): PlaqueTextLayout => {
  const minimums = supplementalPlaqueReadableMinimums(height);
  const titleStyle: TextStyle = {
    role: 'title',
    weight: 600,
    family: 'Georgia, serif',
    color: theme === 'mediterranean' ? '#17313a' : '#f3ead8',
    startingSize: Math.min(58, Math.max(minimums.title, Math.round(height * .22))),
    minimumSize: minimums.title,
    maxLines: Math.min(3, plaqueSupportedTitleLines(width, height)),
  };
  const invitationStyle: TextStyle = {
    role: 'subtitle',
    weight: 400,
    family: 'system-ui, sans-serif',
    color: theme === 'mediterranean' ? '#5e5549' : '#c7bda9',
    startingSize: Math.min(25, Math.max(minimums.subtitle, Math.round(height * .105))),
    minimumSize: minimums.subtitle,
    maxLines: supplementalPlaqueSupportedInvitationLines(width, height),
  };
  const blockGap = Math.max(3, Math.round(height * .022));
  let selected: readonly PreparedBlock[] | undefined;

  for (let titleSize = titleStyle.startingSize; titleSize >= titleStyle.minimumSize && !selected; titleSize -= 1) {
    const titleBlock = prepareCompleteBlock(context, title, titleStyle, titleSize, safeRect.width);
    if (!titleBlock.lines.length || titleBlock.lines.length > titleStyle.maxLines) continue;
    for (
      let invitationSize = invitationStyle.startingSize;
      invitationSize >= invitationStyle.minimumSize;
      invitationSize -= 1
    ) {
      if (titleSize <= invitationSize) continue;
      const invitationBlock = prepareCompleteBlock(
        context,
        subtitle,
        invitationStyle,
        invitationSize,
        safeRect.width,
      );
      if (!invitationBlock.lines.length || invitationBlock.lines.length > invitationStyle.maxLines) continue;
      const totalHeight = titleBlock.height + blockGap + invitationBlock.height;
      const widestLine = [...titleBlock.lines, ...invitationBlock.lines]
        .reduce((maximum, line) => Math.max(maximum, line.left + line.right), 0);
      if (totalHeight <= safeRect.height && widestLine <= safeRect.width) {
        selected = [titleBlock, invitationBlock];
        break;
      }
    }
  }

  if (!selected) {
    selected = [
      prepareCompleteBlock(context, title, titleStyle, titleStyle.minimumSize, safeRect.width),
      prepareCompleteBlock(context, subtitle, invitationStyle, invitationStyle.minimumSize, safeRect.width),
    ];
  }
  return placePreparedBlocks(width, height, safeRect, selected, blockGap, 'supplemental');
};

/**
 * Deterministically measures, wraps, fits, and positions all plaque text. Its
 * returned glyph boxes are the browser canvas metrics used for the actual draw.
 */
export const layoutPlaqueText = (
  context: CanvasRenderingContext2D,
  {
    title,
    kicker,
    subtitle,
    accent = '#b88b4a',
    width = MUSEUM_TEXTURE_SPECS.plaque.width,
    height = MUSEUM_TEXTURE_SPECS.plaque.height,
    theme = 'dark',
    subtitleMaxLines,
    contentKind = 'standard',
  }: PlaqueTextureOptions,
): PlaqueTextLayout => {
  context.textAlign = 'left';
  context.textBaseline = 'alphabetic';

  const shortEdge = Math.min(width, height);
  const innerFrameInset = Math.max(10, Math.round(shortEdge * .09));
  const twoLevelContent = contentKind === 'primary' || contentKind === 'supplemental';
  const safeX = twoLevelContent
    ? Math.max(innerFrameInset + 5, Math.round(width * .035))
    : Math.max(innerFrameInset + 8, Math.round(width * .04));
  const safeY = twoLevelContent
    ? Math.max(innerFrameInset + 3, Math.round(height * .08))
    : Math.max(innerFrameInset + 5, Math.round(height * .11));
  const safeRect = {
    x: safeX,
    y: safeY,
    width: Math.max(1, width - safeX * 2),
    height: Math.max(1, height - safeY * 2),
  };
  if (contentKind === 'primary') {
    return layoutPrimaryPlaqueText(
      context,
      {title, subtitle, accent, width, height, theme, contentKind},
      safeRect,
    );
  }
  if (contentKind === 'supplemental') {
    return layoutSupplementalPlaqueText(
      context,
      {title, subtitle, width, height, theme, contentKind},
      safeRect,
    );
  }
  const styles: readonly TextStyle[] = [
    {
      role: 'kicker',
      weight: 700,
      family: 'system-ui, sans-serif',
      color: accent,
      startingSize: Math.min(30, Math.max(14, height * .105)),
      minimumSize: Math.min(12, Math.max(10, height * .075)),
      maxLines: 1,
    },
    {
      role: 'title',
      weight: 600,
      family: 'Georgia, serif',
      color: theme === 'mediterranean' ? '#17313a' : '#f3ead8',
      startingSize: Math.min(68, Math.max(28, height * .255)),
      minimumSize: Math.min(24, Math.max(19, height * .15)),
      maxLines: plaqueSupportedTitleLines(width, height),
    },
    {
      role: 'subtitle',
      weight: 400,
      family: 'system-ui, sans-serif',
      color: theme === 'mediterranean' ? '#5e5549' : '#c7bda9',
      startingSize: Math.min(27, Math.max(14, height * .1)),
      minimumSize: Math.min(13, Math.max(10, height * .075)),
      maxLines: subtitleMaxLines ?? plaqueSupportedSubtitleLines(width, height),
    },
  ];
  const textByRole: Record<PlaqueTextRole, string> = {
    kicker: (kicker ?? '').toLocaleUpperCase(),
    title,
    subtitle: subtitle ?? '',
  };
  const blockGap = Math.max(3, Math.round(height * .025));

  let blocks: readonly PreparedBlock[] = [];
  for (let step = 0; step <= 24; step += 1) {
    const scale = 1 - step * .025;
    const candidate = styles
      .filter(({role}) => Boolean(textByRole[role]))
      .map((style) => prepareBlock(context, textByRole[style.role], style, scale, safeRect.width));
    const totalHeight = candidate.reduce((sum, block) => sum + block.height, 0)
      + Math.max(0, candidate.length - 1) * blockGap;
    blocks = candidate;
    const hasEllipsizedText = candidate.some(({ellipsized}) => ellipsized);
    const allAtMinimumSize = candidate.every(({fontSize, style}) => fontSize <= style.minimumSize);
    if (totalHeight <= safeRect.height && (!hasEllipsizedText || allAtMinimumSize)) break;
  }

  return placePreparedBlocks(width, height, safeRect, blocks, blockGap, 'standard');
};

export const createPlaqueTexture = ({
  title,
  kicker,
  subtitle,
  accent = '#b88b4a',
  width = MUSEUM_TEXTURE_SPECS.plaque.width,
  height = MUSEUM_TEXTURE_SPECS.plaque.height,
  theme = 'dark',
  subtitleMaxLines,
  contentKind = 'standard',
}: PlaqueTextureOptions): CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error(`Unable to create the local plaque for ${title}.`);

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, theme === 'mediterranean' ? '#f4ead9' : '#171713');
  gradient.addColorStop(1, theme === 'mediterranean' ? '#d9c7aa' : '#29251d');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const shortEdge = Math.min(width, height);
  const outerInset = Math.max(5, Math.round(shortEdge * .04));
  const innerInset = Math.max(10, Math.round(shortEdge * .09));
  context.strokeStyle = theme === 'mediterranean' ? '#a95339' : '#8a7656';
  context.lineWidth = Math.max(2, Math.round(shortEdge * .025));
  context.strokeRect(outerInset, outerInset, width - outerInset * 2, height - outerInset * 2);
  context.strokeStyle = accent;
  context.lineWidth = Math.max(1, Math.round(shortEdge * .011));
  context.strokeRect(innerInset, innerInset, width - innerInset * 2, height - innerInset * 2);

  const layout = layoutPlaqueText(context, {title, kicker, subtitle, accent, width, height, theme, subtitleMaxLines, contentKind});
  for (const line of layout.lines) {
    context.fillStyle = line.color;
    context.font = line.font;
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.fillText(line.text, line.x, line.y);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  texture.name = `museum-plaque-${title.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  texture.userData = {...texture.userData, plaqueTextLayout: layout};
  return texture;
};

export const usePlaqueTexture = (options: PlaqueTextureOptions): CanvasTexture => {
  const {title, kicker, subtitle, accent, width, height, theme, subtitleMaxLines, contentKind} = options;
  const texture = useMemo(
    () => createPlaqueTexture({title, kicker, subtitle, accent, width, height, theme, subtitleMaxLines, contentKind}),
    [accent, contentKind, height, kicker, subtitle, subtitleMaxLines, theme, title, width],
  );
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
};
