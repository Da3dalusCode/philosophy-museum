import {useEffect, useMemo} from 'react';
import {CanvasTexture, LinearMipmapLinearFilter, SRGBColorSpace} from 'three';
import {MEDITERRANEAN_ORIENTATION_DISPLAY} from '../../data/museum/mediterraneanGalleryCuration';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';

const BRONZE = '#a77b45';
const INK = '#11171b';
const PAPER = '#eee4d2';
const MUTED = '#b8b4aa';
const WATER = '#79a6b4';

const drawWrapped = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number => {
  const words = text.split(/\s+/);
  let line = '';
  let cursorY = y;
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      context.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else line = candidate;
  }
  if (line) context.fillText(line, x, cursorY);
  return cursorY;
};

const createOrientationTexture = (): CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = MUSEUM_TEXTURE_SPECS.mediterraneanOrientation.width;
  canvas.height = MUSEUM_TEXTURE_SPECS.mediterraneanOrientation.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Unable to create the Gallery 01 orientation display.');

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#10171b');
  gradient.addColorStop(.58, '#182127');
  gradient.addColorStop(1, '#2b241b');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#8e6d4466';
  context.lineWidth = 1;
  for (let x = 20; x < canvas.width; x += 28) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }
  for (let y = 20; y < canvas.height; y += 28) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }

  context.fillStyle = '#d7aa70';
  context.font = '700 18px system-ui, sans-serif';
  context.letterSpacing = '3px';
  context.fillText('GALLERY 01 ORIENTATION', 42, 40);
  context.fillStyle = PAPER;
  context.font = '700 42px Georgia, serif';
  context.letterSpacing = '0px';
  context.fillText('One beginning among many', 42, 88);
  context.fillStyle = '#d2cdc2';
  context.font = '500 19px system-ui, sans-serif';
  drawWrapped(
    context,
    'How did natural explanation, argument, civic life, and ways of living become philosophical practices?',
    44,
    124,
    900,
    25,
  );

  context.fillStyle = '#c7a273';
  context.font = '700 14px system-ui, sans-serif';
  context.letterSpacing = '2px';
  context.fillText('MEDITERRANEAN ROUTES · SCHEMATIC, NOT TO SCALE', 44, 194);
  const places = [
    {name: 'ELEA', x: 80, y: 275},
    {name: 'CROTON', x: 145, y: 330},
    {name: 'ATHENS', x: 360, y: 250},
    {name: 'EPHESUS', x: 500, y: 220},
    {name: 'MILETUS', x: 535, y: 300},
  ];
  context.strokeStyle = WATER;
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(places[4].x, places[4].y);
  context.lineTo(places[3].x, places[3].y);
  context.lineTo(places[2].x, places[2].y);
  context.lineTo(places[1].x, places[1].y);
  context.lineTo(places[0].x, places[0].y);
  context.stroke();
  for (const place of places) {
    context.fillStyle = '#f0d4a5';
    context.beginPath();
    context.arc(place.x, place.y, place.name === 'ATHENS' || place.name === 'MILETUS' ? 8 : 5, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#d7dde0';
    context.font = '700 13px system-ui, sans-serif';
    context.letterSpacing = '1px';
    context.fillText(place.name, place.x + 12, place.y + 5);
  }
  context.fillStyle = MUTED;
  context.font = '500 14px system-ui, sans-serif';
  context.letterSpacing = '0px';
  context.fillText('Begin in Miletus → follow disputes westward toward civic Athens', 44, 370);

  context.strokeStyle = '#7d674d';
  context.lineWidth = 2;
  context.strokeRect(625, 190, 350, 180);
  context.fillStyle = '#c7a273';
  context.font = '700 14px system-ui, sans-serif';
  context.letterSpacing = '2px';
  context.fillText('AHEAD IN ATHENS', 650, 220);
  context.fillStyle = PAPER;
  context.font = '700 29px Georgia, serif';
  context.letterSpacing = '0px';
  context.fillText('Socrates', 650, 265);
  context.fillText('Plato', 650, 305);
  context.fillText('Aristotle', 650, 345);
  context.fillStyle = '#c6c0b4';
  context.font = '500 13px system-ui, sans-serif';
  context.fillText('Preview only · their full exhibits remain ahead', 650, 363);

  context.fillStyle = '#c7a273';
  context.font = '700 13px system-ui, sans-serif';
  context.letterSpacing = '2px';
  context.fillText('COMPACT CHRONOLOGY · DATES APPROXIMATE', 44, 420);
  const startX = 46;
  const endX = 970;
  const lineY = 458;
  context.strokeStyle = '#b79a72';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(startX, lineY);
  context.lineTo(endX, lineY);
  context.stroke();
  const events = [
    {ratio: 0, label: 'c. 625 BCE', sub: 'Miletus'},
    {ratio: .4, label: 'c. 500 BCE', sub: 'Being / change'},
    {ratio: .71, label: '399 BCE', sub: 'Death of Socrates'},
    {ratio: .79, label: 'c. 387 BCE', sub: 'Academy'},
    {ratio: 1, label: 'c. 335 BCE', sub: 'Lyceum'},
  ];
  for (const event of events) {
    const x = startX + (endX - startX) * event.ratio;
    context.fillStyle = '#e7c58e';
    context.fillRect(x - 2, lineY - 7, 4, 14);
    context.font = '700 11px system-ui, sans-serif';
    context.textAlign = event.ratio === 0 ? 'left' : event.ratio === 1 ? 'right' : 'center';
    context.fillText(event.label, x, 482);
    context.fillStyle = '#aeb7b8';
    context.font = '500 10px system-ui, sans-serif';
    context.fillText(event.sub, x, 500);
  }
  context.textAlign = 'left';

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  texture.name = 'museum-gallery-01-orientation';
  return texture;
};

/** One authored, non-interactive orientation object for the bounded Gallery 01 pass. */
export function MediterraneanGalleryCuration() {
  const texture = useMemo(createOrientationTexture, []);
  useEffect(() => () => texture.dispose(), [texture]);
  const display = MEDITERRANEAN_ORIENTATION_DISPLAY;
  const panelHeight = 2.8;
  return <group userData={{galleryCuration: 'mediterranean-orientation-v1'}}>
    <group position={[display.center.x, 0, display.center.z]} rotation={[0, display.rotation, 0]}>
      <mesh position={[0, 1.72, -.08]}>
        <boxGeometry args={[display.size.width + .18, panelHeight + .18, .18]}/>
        <meshStandardMaterial color={INK} roughness={.54} metalness={.28}/>
      </mesh>
      <mesh position={[0, 1.72, .02]}>
        <planeGeometry args={[display.size.width, panelHeight]}/>
        <meshBasicMaterial map={texture} toneMapped={false}/>
      </mesh>
      <mesh position={[0, 1.72, -.18]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[display.size.width, panelHeight]}/>
        <meshBasicMaterial map={texture} toneMapped={false}/>
      </mesh>
      <mesh position={[0, .18, 0]}>
        <boxGeometry args={[display.size.width * .82, .22, display.size.depth]}/>
        <meshStandardMaterial color="#615849" roughness={.78}/>
      </mesh>
      {[-display.size.width * .36, display.size.width * .36].map((x) => <mesh key={x} position={[x, .78, -.09]}>
        <boxGeometry args={[.09, 1.25, .12]}/>
        <meshStandardMaterial color={BRONZE} roughness={.42} metalness={.64}/>
      </mesh>)}
    </group>
  </group>;
}
