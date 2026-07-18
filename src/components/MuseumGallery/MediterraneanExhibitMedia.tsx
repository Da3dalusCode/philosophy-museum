import {useEffect, useMemo} from 'react';
import {
  CanvasTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
} from 'three';
import type {MediterraneanVisualKind} from '../../data/museum/mediterraneanGalleryCuration';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';

const DESIGN_WIDTH = 384;
const DESIGN_HEIGHT = 256;
const INK = '#101719';
const PAPER = '#eee5d5';
const MUTED = '#aeb9b6';
const BRONZE = '#c79a5f';
const WATER = '#73a6b2';
const RED = '#bd7057';
const OLIVE = '#9b955b';
const SLATE = '#6d8790';

type DiagramContext = CanvasRenderingContext2D;

type NodeOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle?: string;
  fill?: string;
  stroke?: string;
};

const pathRoundedRect = (
  context: DiagramContext,
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 5,
) => {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
};

const fitText = (
  context: DiagramContext,
  text: string,
  maxWidth: number,
  startSize: number,
  weight = 700,
  family = 'system-ui, sans-serif',
) => {
  let size = startSize;
  do {
    context.font = `${weight} ${size}px ${family}`;
    if (context.measureText(text).width <= maxWidth) break;
    size -= .5;
  } while (size > 6.5);
  return size;
};

const wrappedLines = (
  context: DiagramContext,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else line = candidate;
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length === maxLines && words.join(' ') !== lines.join(' ')) {
    let finalLine = lines[maxLines - 1];
    while (finalLine.length > 1 && context.measureText(`${finalLine}…`).width > maxWidth) {
      finalLine = finalLine.slice(0, -1).trimEnd();
    }
    lines[maxLines - 1] = `${finalLine}…`;
  }
  return lines;
};

const drawNode = (context: DiagramContext, options: NodeOptions) => {
  const {
    x,
    y,
    width,
    height,
    title,
    subtitle,
    fill = '#1c292d',
    stroke = SLATE,
  } = options;
  pathRoundedRect(context, x, y, width, height, 5);
  context.fillStyle = fill;
  context.fill();
  context.strokeStyle = stroke;
  context.lineWidth = 1.25;
  context.stroke();

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = PAPER;
  fitText(context, title, width - 10, subtitle ? 10.5 : 11.5);
  context.fillText(title, x + width / 2, y + height / 2 - (subtitle ? 6 : 0));
  if (subtitle) {
    context.fillStyle = MUTED;
    fitText(context, subtitle, width - 8, 7.8, 600);
    context.fillText(subtitle, x + width / 2, y + height / 2 + 8);
  }
};

const drawArrow = (
  context: DiagramContext,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  label?: string,
  both = false,
) => {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const head = 5;
  context.save();
  context.strokeStyle = BRONZE;
  context.fillStyle = BRONZE;
  context.lineWidth = 1.6;
  context.beginPath();
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
  const arrowHead = (x: number, y: number, direction: number) => {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - Math.cos(direction - .55) * head, y - Math.sin(direction - .55) * head);
    context.lineTo(x - Math.cos(direction + .55) * head, y - Math.sin(direction + .55) * head);
    context.closePath();
    context.fill();
  };
  arrowHead(toX, toY, angle);
  if (both) arrowHead(fromX, fromY, angle + Math.PI);
  if (label) {
    context.font = '600 7.5px system-ui, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'bottom';
    context.fillStyle = MUTED;
    context.fillText(label, (fromX + toX) / 2, (fromY + toY) / 2 - 3);
  }
  context.restore();
};

const drawNote = (context: DiagramContext, note: string) => {
  context.fillStyle = MUTED;
  context.font = '600 7.5px system-ui, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.fillText(note, DESIGN_WIDTH / 2, 194);
};

const drawWater = (context: DiagramContext) => {
  drawNode(context, {x: 18, y: 91, width: 92, height: 40, title: 'NATURAL WORLD', subtitle: 'seek a material account'});
  drawNode(context, {x: 146, y: 82, width: 92, height: 58, title: 'WATER', subtitle: 'proposed natural source', fill: '#183039', stroke: WATER});
  drawNode(context, {x: 274, y: 91, width: 92, height: 40, title: 'CHANGING FORMS', subtitle: 'one source?'});
  drawArrow(context, 110, 111, 146, 111, 'explain in nature');
  drawArrow(context, 238, 111, 274, 111, 'transformation');
  context.strokeStyle = WATER;
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(156, 126);
  context.bezierCurveTo(174, 120, 192, 132, 210, 126);
  context.bezierCurveTo(218, 123, 224, 123, 230, 126);
  context.stroke();
  drawNote(context, 'Interpretive reconstruction — not a surviving diagram by Thales');
};

const drawBoundless = (context: DiagramContext) => {
  context.fillStyle = MUTED;
  context.font = '700 8px system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText('NOT A FAMILIAR ELEMENT', DESIGN_WIDTH / 2, 67);
  drawNode(context, {x: 133, y: 84, width: 118, height: 52, title: 'APEIRON', subtitle: 'the indefinite', fill: '#252635', stroke: '#8d82a1'});
  drawNode(context, {x: 27, y: 82, width: 75, height: 34, title: 'HOT / COLD'});
  drawNode(context, {x: 282, y: 82, width: 75, height: 34, title: 'WET / DRY'});
  drawNode(context, {x: 147, y: 157, width: 90, height: 28, title: 'ORDERED WORLD'});
  drawArrow(context, 133, 103, 102, 99, 'opposites');
  drawArrow(context, 251, 103, 282, 99, 'opposites');
  drawArrow(context, 192, 136, 192, 157, 'emergence');
  drawNote(context, 'A boundless origin from which differentiated things emerge');
};

const drawAir = (context: DiagramContext) => {
  drawNode(context, {x: 147, y: 103, width: 90, height: 42, title: 'AIR', subtitle: 'material continuum', fill: '#183039', stroke: WATER});
  drawNode(context, {x: 285, y: 68, width: 74, height: 32, title: 'FIRE'});
  drawNode(context, {x: 274, y: 153, width: 94, height: 32, title: 'WIND → WATER', subtitle: 'then earth / stone'});
  drawNode(context, {x: 25, y: 82, width: 82, height: 31, title: 'RAREFACTION'});
  drawNode(context, {x: 20, y: 151, width: 92, height: 31, title: 'CONDENSATION'});
  drawArrow(context, 107, 97, 147, 115);
  drawArrow(context, 237, 113, 285, 88, 'less dense');
  drawArrow(context, 112, 165, 147, 137);
  drawArrow(context, 237, 137, 274, 165, 'more dense');
  drawNote(context, 'Qualitative difference explained as degrees of compression');
};

const drawNumber = (context: DiagramContext) => {
  context.fillStyle = MUTED;
  context.font = '700 8px system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText('CONSONANCE AS MEASURABLE PROPORTION', DESIGN_WIDTH / 2, 67);
  const rows = [
    {y: 91, fraction: .5, label: 'OCTAVE · 1 : 2'},
    {y: 127, fraction: 2 / 3, label: 'FIFTH · 2 : 3'},
    {y: 163, fraction: .75, label: 'FOURTH · 3 : 4'},
  ];
  for (const row of rows) {
    const x1 = 122;
    const x2 = 346;
    const division = x1 + (x2 - x1) * row.fraction;
    context.strokeStyle = PAPER;
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(x1, row.y);
    context.lineTo(x2, row.y);
    context.stroke();
    for (const x of [x1, division, x2]) {
      context.beginPath();
      context.moveTo(x, row.y - 5);
      context.lineTo(x, row.y + 5);
      context.stroke();
    }
    context.fillStyle = BRONZE;
    context.font = '700 9px system-ui, sans-serif';
    context.textAlign = 'right';
    context.fillText(row.label, 108, row.y + 3);
    context.fillStyle = WATER;
    context.fillRect(x1, row.y - 2, division - x1, 4);
  }
  drawNote(context, 'Simple whole-number ratios became evidence of intelligible order');
};

const drawHarmony = (context: DiagramContext) => {
  drawNode(context, {x: 18, y: 90, width: 100, height: 46, title: 'LIMITERS', subtitle: 'boundary / form'});
  drawNode(context, {x: 266, y: 90, width: 100, height: 46, title: 'UNLIMITEDS', subtitle: 'indeterminate continuities'});
  drawNode(context, {x: 139, y: 146, width: 106, height: 39, title: 'HARMONIA', subtitle: 'a fitting together', fill: '#30291d', stroke: BRONZE});
  drawArrow(context, 118, 117, 157, 146, 'joined');
  drawArrow(context, 266, 117, 227, 146, 'joined');
  context.fillStyle = PAPER;
  context.font = '700 10px system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText('ORDERED COSMOS', DESIGN_WIDTH / 2, 72);
  drawArrow(context, 192, 146, 192, 80, 'makes order possible');
  drawNote(context, 'Philolaus: unlike principles require harmonia to form a cosmos');
};

const drawBeing = (context: DiagramContext) => {
  drawNode(context, {x: 18, y: 105, width: 74, height: 36, title: 'INQUIRY'});
  drawNode(context, {x: 137, y: 72, width: 143, height: 53, title: 'WHAT-IS', subtitle: 'ungenerated · whole · continuous', fill: '#30291d', stroke: BRONZE});
  drawNode(context, {x: 137, y: 151, width: 143, height: 34, title: 'WHAT-IS-NOT', subtitle: 'not a path for knowing', fill: '#211b1b', stroke: RED});
  drawArrow(context, 92, 119, 137, 101, 'path of thought');
  context.save();
  context.setLineDash([4, 3]);
  context.strokeStyle = RED;
  context.beginPath();
  context.moveTo(92, 127);
  context.lineTo(137, 168);
  context.stroke();
  context.restore();
  context.strokeStyle = RED;
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(112, 143);
  context.lineTo(121, 152);
  context.moveTo(121, 143);
  context.lineTo(112, 152);
  context.stroke();
  drawNode(context, {x: 307, y: 83, width: 59, height: 30, title: 'ONE'});
  drawNode(context, {x: 307, y: 126, width: 59, height: 30, title: 'UNMOVING'});
  drawArrow(context, 280, 98, 307, 98);
  drawArrow(context, 280, 111, 307, 141);
  drawNote(context, 'The argument distinguishes what can be thought from coming-to-be');
};

const drawParadox = (context: DiagramContext) => {
  context.fillStyle = PAPER;
  context.font = '700 9px system-ui, sans-serif';
  context.textAlign = 'left';
  context.fillText('START', 23, 91);
  context.textAlign = 'right';
  context.fillText('GOAL', 361, 91);
  const start = 35;
  const goal = 349;
  const points = [start, 192, 270.5, 309.75, 329.4, goal];
  context.strokeStyle = MUTED;
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(start, 112);
  context.lineTo(goal, 112);
  context.stroke();
  const labels = ['½', '¼', '⅛', '1⁄16'];
  points.slice(1, -1).forEach((point, index) => {
    context.strokeStyle = index === 0 ? BRONZE : WATER;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(point, 102);
    context.lineTo(point, 122);
    context.stroke();
    context.fillStyle = PAPER;
    context.font = '700 10px Georgia, serif';
    context.textAlign = 'center';
    context.fillText(labels[index], (points[index] + point) / 2, 143);
  });
  drawArrow(context, start, 112, 188, 112);
  context.fillStyle = MUTED;
  context.font = '600 8px system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText('each remaining distance can be divided again', DESIGN_WIDTH / 2, 169);
  drawNote(context, 'Zeno tests whether ordinary accounts of motion are coherent');
};

const atomShape = (context: DiagramContext, x: number, y: number, shape: number, color = PAPER) => {
  context.fillStyle = color;
  context.strokeStyle = color;
  context.lineWidth = 1.5;
  if (shape % 3 === 0) {
    context.fillRect(x - 3, y - 3, 6, 6);
  } else if (shape % 3 === 1) {
    context.beginPath();
    context.moveTo(x, y - 4);
    context.lineTo(x + 4, y + 3);
    context.lineTo(x - 4, y + 3);
    context.closePath();
    context.fill();
  } else {
    context.beginPath();
    context.moveTo(x - 4, y);
    context.lineTo(x + 4, y);
    context.moveTo(x, y - 4);
    context.lineTo(x, y + 4);
    context.stroke();
  }
};

const drawAtomsArchive = (context: DiagramContext) => {
  context.strokeStyle = SLATE;
  context.lineWidth = 1.25;
  context.strokeRect(22, 67, 340, 107);
  context.fillStyle = '#71828733';
  context.font = '700 34px Georgia, serif';
  context.textAlign = 'center';
  context.fillText('VOID', DESIGN_WIDTH / 2, 135);
  const points = [[48, 88], [80, 147], [117, 102], [157, 158], [214, 83], [250, 145], [294, 104], [337, 153]] as const;
  points.forEach(([x, y], index) => atomShape(context, x, y, index, index === 2 ? BRONZE : PAPER));
  drawArrow(context, 118, 101, 168, 81, 'ATOM · indivisible body');
  context.fillStyle = MUTED;
  context.font = '600 7.5px system-ui, sans-serif';
  context.textAlign = 'left';
  context.fillText('bodies move and combine', 28, 187);
  context.textAlign = 'right';
  context.fillText('empty room permits motion', 356, 187);
  drawNote(context, 'Archive note: Leucippus’s biography and writings remain uncertain');
};

const drawAtoms = (context: DiagramContext) => {
  const panels = [
    {x: 18, label: 'SHAPE'},
    {x: 139, label: 'ORDER'},
    {x: 260, label: 'POSITION'},
  ];
  panels.forEach(({x, label}, panelIndex) => {
    context.strokeStyle = SLATE;
    context.lineWidth = 1;
    context.strokeRect(x, 74, 106, 95);
    context.fillStyle = BRONZE;
    context.font = '700 8.5px system-ui, sans-serif';
    context.textAlign = 'center';
    context.fillText(label, x + 53, 91);
    const points = panelIndex === 1
      ? [[x + 34, 116], [x + 53, 116], [x + 72, 116], [x + 53, 143]]
      : panelIndex === 2
        ? [[x + 35, 120], [x + 72, 111], [x + 69, 145], [x + 38, 144]]
        : [[x + 34, 119], [x + 54, 140], [x + 75, 116]];
    points.forEach(([pointX, pointY], index) => atomShape(context, pointX, pointY, panelIndex === 0 ? index : index % 2));
  });
  drawNote(context, 'Atoms differ by shape, arrangement, and position; void permits motion');
};

const drawChange = (context: DiagramContext) => {
  const pairs = [
    {left: 'DAY', right: 'NIGHT', y: 79},
    {left: 'WAKING', right: 'SLEEPING', y: 117},
    {left: 'HOT', right: 'COLD', y: 155},
  ];
  for (const pair of pairs) {
    drawNode(context, {x: 25, y: pair.y, width: 76, height: 27, title: pair.left});
    drawNode(context, {x: 283, y: pair.y, width: 76, height: 27, title: pair.right});
    drawArrow(context, 101, pair.y + 13.5, 283, pair.y + 13.5, 'transition / tension', true);
  }
  drawNode(context, {x: 146, y: 106, width: 92, height: 35, title: 'LOGOS', subtitle: 'common measure', fill: '#30291d', stroke: BRONZE});
  drawNote(context, 'Heraclitean change is presented as ordered, not merely random flux');
};

const drawElements = (context: DiagramContext) => {
  const roots = [
    {x: 19, y: 70, title: 'EARTH', fill: '#332d22', stroke: '#a99468'},
    {x: 19, y: 143, title: 'WATER', fill: '#183039', stroke: WATER},
    {x: 284, y: 70, title: 'AIR', fill: '#243036', stroke: '#a6b8ba'},
    {x: 284, y: 143, title: 'FIRE', fill: '#37231e', stroke: RED},
  ];
  roots.forEach((root) => drawNode(context, {...root, width: 81, height: 31}));
  drawNode(context, {x: 140, y: 101, width: 104, height: 48, title: 'FOUR ROOTS', subtitle: 'persist through mixtures', fill: '#30291d', stroke: BRONZE});
  roots.forEach((root) => drawArrow(
    context,
    root.x < 100 ? root.x + 81 : root.x,
    root.y + 15,
    root.x < 100 ? 140 : 244,
    root.y < 100 ? 111 : 139,
  ));
  context.fillStyle = PAPER;
  context.font = '700 8px system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText('LOVE · combines', 192, 81);
  context.fillText('STRIFE · separates', 192, 174);
  drawNote(context, 'Change comes from mixture and separation, not roots becoming one another');
};

const drawOrderingMind = (context: DiagramContext) => {
  drawNode(context, {x: 18, y: 91, width: 105, height: 52, title: 'ALL THINGS', subtitle: 'together in mixture'});
  drawNode(context, {x: 145, y: 78, width: 94, height: 42, title: 'NOUS', subtitle: 'mind', fill: '#30291d', stroke: BRONZE});
  drawNode(context, {x: 270, y: 91, width: 96, height: 52, title: 'ORDERED COSMOS', subtitle: 'separation unfolds'});
  drawArrow(context, 123, 112, 145, 100, 'initiates');
  drawArrow(context, 239, 100, 270, 112, 'rotation');
  context.strokeStyle = WATER;
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(168, 143);
  context.bezierCurveTo(178, 130, 206, 132, 211, 148);
  context.bezierCurveTo(216, 163, 190, 172, 179, 160);
  context.stroke();
  context.fillStyle = MUTED;
  context.font = '600 7.5px system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText('ingredients remain in mixtures', 192, 183);
  drawNote(context, 'Nous begins a separating motion within an original mixture');
};

const drawCivicSpeech = (context: DiagramContext, exhibitId: string) => {
  if (exhibitId === 'gorgias') {
    drawNode(context, {x: 18, y: 103, width: 74, height: 38, title: 'SPEAKER'});
    drawNode(context, {x: 116, y: 91, width: 83, height: 62, title: 'LOGOS', subtitle: 'speech acts through words', fill: '#30291d', stroke: BRONZE});
    drawNode(context, {x: 224, y: 103, width: 70, height: 38, title: 'HEARER'});
    drawNode(context, {x: 316, y: 103, width: 50, height: 38, title: 'JUDGMENT'});
    drawArrow(context, 92, 122, 116, 122);
    drawArrow(context, 199, 122, 224, 122, 'persuades');
    drawArrow(context, 294, 122, 316, 122);
    drawNote(context, 'Gorgias examines the power of speech over belief and emotion');
    return;
  }
  drawNode(context, {x: 22, y: 75, width: 93, height: 36, title: 'ACCOUNT A', subtitle: 'one logos'});
  drawNode(context, {x: 22, y: 146, width: 93, height: 36, title: 'ACCOUNT B', subtitle: 'opposed logos'});
  drawNode(context, {x: 151, y: 104, width: 90, height: 48, title: 'PUBLIC SPEECH', subtitle: 'teaching / argument', fill: '#30291d', stroke: BRONZE});
  drawNode(context, {x: 279, y: 104, width: 83, height: 48, title: 'CIVIC JUDGMENT', subtitle: 'decision in common'});
  drawArrow(context, 115, 93, 151, 117, 'competes');
  drawArrow(context, 115, 164, 151, 140, 'competes');
  drawArrow(context, 241, 128, 279, 128);
  drawNote(context, 'Protagorean practice places opposed accounts before civic judgment');
};

const drawExaminedLife = (context: DiagramContext) => {
  const nodes = [
    {x: 13, title: 'CLAIM'},
    {x: 105, title: 'QUESTION'},
    {x: 204, title: 'REASONS'},
    {x: 296, title: 'REVISE'},
  ];
  nodes.forEach((node) => drawNode(context, {x: node.x, y: 99, width: 75, height: 38, title: node.title}));
  for (let index = 0; index < nodes.length - 1; index += 1) {
    drawArrow(context, nodes[index].x + 75, 118, nodes[index + 1].x, 118);
  }
  context.save();
  context.strokeStyle = BRONZE;
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(333, 142);
  context.bezierCurveTo(314, 180, 84, 180, 51, 142);
  context.stroke();
  context.restore();
  drawArrow(context, 57, 147, 50, 137, 'examine again');
  context.fillStyle = MUTED;
  context.font = '600 8px system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText('dialogue tests how a life and its reasons fit together', 192, 79);
  drawNote(context, 'A method map — not a portrait or a single fixed Socratic doctrine');
};

const drawAcademy = (context: DiagramContext) => {
  const nodes = [
    {x: 13, width: 60, title: 'PLATO'},
    {x: 97, width: 78, title: 'ACADEMY'},
    {x: 199, width: 76, title: 'SUCCESSORS'},
    {x: 299, width: 72, title: 'PLATONISMS'},
  ];
  nodes.forEach((node, index) => drawNode(context, {
    x: node.x,
    y: 99,
    width: node.width,
    height: 39,
    title: node.title,
    fill: index === 1 ? '#30291d' : undefined,
    stroke: index === 1 ? BRONZE : undefined,
  }));
  for (let index = 0; index < nodes.length - 1; index += 1) {
    drawArrow(context, nodes[index].x + nodes[index].width, 118, nodes[index + 1].x, 118);
  }
  context.fillStyle = MUTED;
  context.font = '600 8.5px system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText('dialogue · teaching · argument · institutional memory', 192, 162);
  drawNote(context, 'Institutional lineage — not a reconstruction of the Academy building');
};

const drawLyceum = (context: DiagramContext) => {
  drawNode(context, {x: 132, y: 70, width: 120, height: 42, title: 'ARISTOTLE + LYCEUM', subtitle: 'research and teaching', fill: '#30291d', stroke: BRONZE});
  const fields = [
    {x: 18, title: 'LOGIC'},
    {x: 107, title: 'NATURE'},
    {x: 196, title: 'ETHICS'},
    {x: 285, title: 'POLITICS'},
  ];
  fields.forEach((field) => {
    drawNode(context, {x: field.x, y: 151, width: 80, height: 32, title: field.title});
    drawArrow(context, 192, 112, field.x + 40, 151, 'inquiry');
  });
  drawNote(context, 'A field map of inquiry — categories overlap and later texts vary');
};

const drawPortraitAlternative = (context: DiagramContext, exhibitId: string) => {
  if (exhibitId === 'ancient-greek') {
    const places = [
      {x: 30, y: 137, title: 'MILETUS'},
      {x: 133, y: 91, title: 'ELEA / CROTON'},
      {x: 273, y: 137, title: 'ATHENS'},
    ];
    places.forEach((place) => drawNode(context, {x: place.x, y: place.y, width: 82, height: 31, title: place.title}));
    drawArrow(context, 112, 137, 133, 109, 'disputes move west');
    drawArrow(context, 215, 109, 273, 137, 'civic turn');
    context.fillStyle = MUTED;
    context.font = '700 8px system-ui, sans-serif';
    context.textAlign = 'center';
    context.fillText('SCHEMATIC ROUTE · c. 600–300 BCE', DESIGN_WIDTH / 2, 72);
    drawNote(context, 'One Mediterranean route through a wider, plural history of philosophy');
    return;
  }
  const isPlato = exhibitId === 'plato';
  const first = isPlato ? 'DIALOGUES' : exhibitId === 'aristotle' ? 'TREATISES' : 'TEXTS';
  const second = isPlato ? 'ARGUMENT IN VOICES' : exhibitId === 'aristotle' ? 'FIELDS OF INQUIRY' : 'ARGUMENTS';
  const third = isPlato ? 'ACADEMY' : exhibitId === 'aristotle' ? 'LYCEUM' : 'RECEPTION';
  drawNode(context, {x: 22, y: 101, width: 92, height: 42, title: first});
  drawNode(context, {x: 145, y: 94, width: 94, height: 56, title: second, subtitle: 'textual legacy', fill: '#30291d', stroke: BRONZE});
  drawNode(context, {x: 270, y: 101, width: 92, height: 42, title: third});
  drawArrow(context, 114, 122, 145, 122);
  drawArrow(context, 239, 122, 270, 122);
  drawNote(context, 'No invented likeness — this panel maps works and institutional afterlife');
};

const drawDiagram = (context: DiagramContext, kind: MediterraneanVisualKind, exhibitId: string) => {
  switch (kind) {
    case 'water': drawWater(context); break;
    case 'boundless': drawBoundless(context); break;
    case 'air': drawAir(context); break;
    case 'number': drawNumber(context); break;
    case 'harmony': drawHarmony(context); break;
    case 'being': drawBeing(context); break;
    case 'paradox': drawParadox(context); break;
    case 'atoms-archive': drawAtomsArchive(context); break;
    case 'atoms': drawAtoms(context); break;
    case 'change': drawChange(context); break;
    case 'elements': drawElements(context); break;
    case 'ordering-mind': drawOrderingMind(context); break;
    case 'civic-speech': drawCivicSpeech(context, exhibitId); break;
    case 'examined-life': drawExaminedLife(context); break;
    case 'academy': drawAcademy(context); break;
    case 'lyceum': drawLyceum(context); break;
    case 'portrait': drawPortraitAlternative(context, exhibitId); break;
  }
};

const visualKindLabel = (kind: MediterraneanVisualKind) => ({
  water: 'MILESIAN PROPOSAL',
  boundless: 'MILESIAN PROPOSAL',
  air: 'MILESIAN PROCESS',
  number: 'RATIO STUDY',
  harmony: 'COSMIC ORDER',
  being: 'ARGUMENT MAP',
  paradox: 'MOTION PROBLEM',
  'atoms-archive': 'ATTRIBUTED FRAMEWORK',
  atoms: 'ATOMIST FRAMEWORK',
  change: 'OPPOSITIONS + MEASURE',
  elements: 'FOUR-ROOT MODEL',
  'ordering-mind': 'MIXTURE + NOUS',
  'civic-speech': 'SPEECH + JUDGMENT',
  'examined-life': 'INQUIRY METHOD',
  academy: 'INSTITUTIONAL LINEAGE',
  lyceum: 'FIELDS OF INQUIRY',
  portrait: 'HISTORICAL ROUTE',
})[kind];

const createMediaTexture = ({
  kind,
  exhibitId,
  title,
  caption,
}: {
  kind: MediterraneanVisualKind;
  exhibitId: string;
  title: string;
  caption: string;
}): CanvasTexture => {
  const spec = MUSEUM_TEXTURE_SPECS.mediterraneanExhibitMedia;
  const canvas = document.createElement('canvas');
  canvas.width = spec.width;
  canvas.height = spec.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error(`Unable to create Gallery 01 media for ${exhibitId}.`);
  context.scale(canvas.width / DESIGN_WIDTH, canvas.height / DESIGN_HEIGHT);
  context.fillStyle = INK;
  context.fillRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  const headerGradient = context.createLinearGradient(0, 0, DESIGN_WIDTH, 0);
  headerGradient.addColorStop(0, '#2e251b');
  headerGradient.addColorStop(.55, '#172126');
  headerGradient.addColorStop(1, INK);
  context.fillStyle = headerGradient;
  context.fillRect(0, 0, DESIGN_WIDTH, 49);
  context.fillStyle = BRONZE;
  context.fillRect(0, 0, 5, DESIGN_HEIGHT);
  context.fillStyle = BRONZE;
  context.font = '700 7.5px system-ui, sans-serif';
  context.textAlign = 'left';
  context.textBaseline = 'alphabetic';
  context.fillText(`INTERPRETIVE DIAGRAM · ${visualKindLabel(kind)}`, 16, 14);
  context.fillStyle = PAPER;
  fitText(context, title, 350, 18, 700, 'Georgia, serif');
  context.fillText(title, 16, 37);
  context.strokeStyle = '#896b4666';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(14, 49);
  context.lineTo(370, 49);
  context.moveTo(14, 202);
  context.lineTo(370, 202);
  context.stroke();

  drawDiagram(context, kind, exhibitId);

  context.fillStyle = '#d2ccc0';
  context.font = '500 8.5px system-ui, sans-serif';
  context.textAlign = 'left';
  context.textBaseline = 'alphabetic';
  const lines = wrappedLines(context, caption, 350, 3);
  lines.forEach((line, index) => context.fillText(line, 16, 216 + index * 11));

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = spec.mipmaps ? LinearMipmapLinearFilter : LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = spec.mipmaps;
  texture.needsUpdate = true;
  texture.name = `museum-gallery-01-media-${exhibitId}`;
  return texture;
};

/** A labeled, framed interpretive plate; all imagery is diagrammatic rather than portraiture. */
export function MediterraneanExhibitMedia({
  kind,
  exhibitId,
  title,
  caption,
  width,
  height,
  nearby,
}: {
  kind: MediterraneanVisualKind;
  exhibitId: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  nearby: boolean;
}) {
  const texture = useMemo(
    () => createMediaTexture({kind, exhibitId, title, caption}),
    [caption, exhibitId, kind, title],
  );
  useEffect(() => () => texture.dispose(), [texture]);

  const availableWidth = Math.max(.34, width);
  const availableHeight = Math.max(.3, height);
  const rail = Math.min(.04, availableWidth * .055, availableHeight * .07);
  const supportHeight = Math.min(.12, availableHeight * .2);
  let imageWidth = availableWidth - rail * 2;
  let imageHeight = imageWidth * DESIGN_HEIGHT / DESIGN_WIDTH;
  const maximumImageHeight = Math.max(.2, availableHeight - supportHeight - rail * 2);
  if (imageHeight > maximumImageHeight) {
    imageHeight = maximumImageHeight;
    imageWidth = imageHeight * DESIGN_WIDTH / DESIGN_HEIGHT;
  }
  const outerWidth = imageWidth + rail * 2;
  const panelHeight = imageHeight + rail * 2;
  const panelY = supportHeight + panelHeight / 2;
  const metal = nearby ? '#c99757' : '#765a39';
  const postX = Math.max(.1, outerWidth * .3);

  return <group userData={{interpretiveMedia: exhibitId, visualKind: kind}}>
    <mesh position={[0, panelY, -.035]}>
      <boxGeometry args={[outerWidth, panelHeight, .07]}/>
      <meshStandardMaterial color="#161c1e" roughness={.72} metalness={.16}/>
    </mesh>
    <mesh position={[0, panelY, .004]}>
      <planeGeometry args={[imageWidth, imageHeight]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
    <mesh position={[0, panelY + panelHeight / 2 - rail / 2, .028]}>
      <boxGeometry args={[outerWidth, rail, .055]}/>
      <meshStandardMaterial color={metal} roughness={.42} metalness={.62}/>
    </mesh>
    <mesh position={[0, panelY - panelHeight / 2 + rail / 2, .028]}>
      <boxGeometry args={[outerWidth, rail, .055]}/>
      <meshStandardMaterial color={metal} roughness={.42} metalness={.62}/>
    </mesh>
    {[-outerWidth / 2 + rail / 2, outerWidth / 2 - rail / 2].map((x) => <mesh key={`rail-${x}`} position={[x, panelY, .028]}>
      <boxGeometry args={[rail, panelHeight, .055]}/>
      <meshStandardMaterial color={metal} roughness={.42} metalness={.62}/>
    </mesh>)}
    {[-postX, postX].map((x) => <group key={`support-${x}`}>
      <mesh position={[x, supportHeight / 2, -.025]}>
        <boxGeometry args={[rail, supportHeight, .06]}/>
        <meshStandardMaterial color={metal} roughness={.48} metalness={.56}/>
      </mesh>
      <mesh position={[x, rail / 2, .005]}>
        <boxGeometry args={[Math.min(.18, outerWidth * .24), rail, .14]}/>
        <meshStandardMaterial color={metal} roughness={.5} metalness={.52}/>
      </mesh>
    </group>)}
  </group>;
}
