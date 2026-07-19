import {useEffect, useMemo} from 'react';
import {CanvasTexture, LinearMipmapLinearFilter, SRGBColorSpace} from 'three';
import {
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  MEDITERRANEAN_PALETTE,
} from '../../data/museum/mediterraneanGalleryCuration';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';
import type {MuseumAssetId} from '../../data/museum/museumAssetTypes';
import type {MuseumMediaMountDefinition, MuseumSceneVolume} from '../../data/museum/museumWorldTypes';
import {MuseumSceneMedia} from './MuseumSceneMedia';

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

const canvasTexture = (name: string, draw: (context: CanvasRenderingContext2D) => void): CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = MUSEUM_TEXTURE_SPECS.mediterraneanOrientation.width;
  canvas.height = MUSEUM_TEXTURE_SPECS.mediterraneanOrientation.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error(`Unable to create the Gallery 01 ${name} display.`);
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#f5ecdc');
  gradient.addColorStop(.62, '#e9dcc5');
  gradient.addColorStop(1, '#d8c29e');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = MEDITERRANEAN_PALETTE.terracotta;
  context.fillRect(0, 0, 18, canvas.height);
  context.fillStyle = MEDITERRANEAN_PALETTE.aegean;
  context.fillRect(18, 0, 7, canvas.height);
  draw(context);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  texture.name = `museum-gallery-01-orientation-${name}`;
  return texture;
};

const createFrontTexture = (): CanvasTexture => canvasTexture('front', (context) => {
  context.fillStyle = MEDITERRANEAN_PALETTE.terracotta;
  context.font = '700 17px system-ui, sans-serif';
  context.letterSpacing = '2px';
  context.fillText('GALLERY 01 · THE OPENING MOVE', 52, 44);

  context.fillStyle = MEDITERRANEAN_PALETTE.ink;
  context.font = '700 47px Georgia, serif';
  context.letterSpacing = '0px';
  context.fillText('Could nature explain nature?', 52, 102);

  context.fillStyle = '#544d43';
  context.font = '500 19px system-ui, sans-serif';
  drawWrapped(
    context,
    'Before the familiar names, begin with a new kind of move: ask whether a changing world can be explained from within nature itself.',
    54,
    142,
    515,
    25,
  );

  context.fillStyle = MEDITERRANEAN_PALETTE.aegean;
  context.font = '700 14px system-ui, sans-serif';
  context.letterSpacing = '1px';
  context.fillText('THREE THINGS TO WATCH FOR', 54, 237);
  const moves = [
    ['01', 'A natural starting point'],
    ['02', 'A process that explains change'],
    ['03', 'Answers tested against other answers'],
  ];
  moves.forEach(([number, label], index) => {
    const y = 278 + index * 48;
    context.fillStyle = index === 1 ? MEDITERRANEAN_PALETTE.ochre : MEDITERRANEAN_PALETTE.terracotta;
    context.font = '700 22px Georgia, serif';
    context.fillText(number, 54, y);
    context.fillStyle = MEDITERRANEAN_PALETTE.ink;
    context.font = '600 17px system-ui, sans-serif';
    context.fillText(label, 104, y);
  });

  context.fillStyle = MEDITERRANEAN_PALETTE.aegean;
  context.font = '700 13px system-ui, sans-serif';
  context.letterSpacing = '1px';
  context.fillText('MILETUS · A REAL, LAYERED PLACE', 625, 64);
  context.fillStyle = '#5d554a';
  context.font = '500 14px system-ui, sans-serif';
  drawWrapped(
    context,
    'The surviving city is later and incomplete. It gives the questions a place without pretending to illustrate the ideas.',
    626,
    92,
    330,
    19,
  );

  context.fillStyle = '#c46c48';
  context.fillRect(42, 428, 940, 58);
  context.fillStyle = '#fff7ea';
  context.font = '700 13px system-ui, sans-serif';
  context.letterSpacing = '1px';
  context.fillText('THREE CHANGING ANSWERS', 62, 451);
  context.font = '600 21px Georgia, serif';
  context.letterSpacing = '0px';
  context.fillText('Thales  →  Anaximander  →  Anaximenes', 62, 477);
});

const createBackTexture = (): CanvasTexture => canvasTexture('back', (context) => {
  context.fillStyle = MEDITERRANEAN_PALETTE.aegean;
  context.font = '700 17px system-ui, sans-serif';
  context.letterSpacing = '2px';
  context.fillText('FOLLOW THE ARGUMENT', 52, 44);
  context.fillStyle = MEDITERRANEAN_PALETTE.ink;
  context.font = '700 42px Georgia, serif';
  context.letterSpacing = '0px';
  context.fillText('From Miletus toward Athens', 52, 96);
  context.fillStyle = '#544d43';
  context.font = '500 18px system-ui, sans-serif';
  drawWrapped(
    context,
    'The route moves through connected cities and rival answers. It is one Mediterranean history of philosophy—not philosophy’s universal beginning.',
    54,
    136,
    505,
    24,
  );

  const route = [
    ['01', 'Nature through nature'],
    ['02', 'Being · motion · atoms · elements · mind'],
    ['03', 'Speech and the examined life'],
    ['04', 'Academy and Lyceum'],
  ];
  route.forEach(([number, label], index) => {
    const y = 252 + index * 47;
    context.fillStyle = index < 2 ? MEDITERRANEAN_PALETTE.terracotta : MEDITERRANEAN_PALETTE.ochre;
    context.font = '700 20px Georgia, serif';
    context.fillText(number, 54, y);
    context.fillStyle = MEDITERRANEAN_PALETTE.ink;
    context.font = '600 16px system-ui, sans-serif';
    context.fillText(label, 103, y);
  });

  context.fillStyle = MEDITERRANEAN_PALETTE.terracotta;
  context.font = '700 13px system-ui, sans-serif';
  context.letterSpacing = '1px';
  context.fillText('MEDITERRANEAN NETWORKS · MODERN MAP', 626, 64);
  context.fillStyle = '#5d554a';
  context.font = '500 14px system-ui, sans-serif';
  drawWrapped(
    context,
    'Use the map for orientation, not as a picture of fixed borders or a single cultural world.',
    626,
    92,
    330,
    19,
  );

  context.fillStyle = MEDITERRANEAN_PALETTE.aegean;
  context.fillRect(42, 444, 940, 42);
  context.fillStyle = '#fff7ea';
  context.font = '700 22px Georgia, serif';
  context.letterSpacing = '0px';
  context.fillText('Socrates  →  Plato  →  Aristotle are ahead', 62, 473);
});

const volume = (
  id: string,
  center: {x: number; y: number; z: number},
  size: {width: number; height: number; depth: number},
): MuseumSceneVolume => ({id, role: 'media', center, size});

const orientationMount = (
  id: string,
  assetId: MuseumAssetId,
  position: readonly [number, number, number],
  rotation: readonly [number, number, number],
  width: number,
  height: number,
): MuseumMediaMountDefinition => ({
  id,
  assetId,
  kind: 'wall-frame',
  position,
  rotation,
  width,
  height,
  frameDepth: .09,
  supportHeight: 0,
  anchorId: MEDITERRANEAN_ORIENTATION_DISPLAY.id,
  bounds: volume(`${id}-bounds`, {x: position[0], y: position[1], z: position[2]}, {width: width + .18, height: height + .18, depth: .2}),
  supportBounds: volume(`${id}-support`, {x: position[0], y: position[1], z: position[2] - .08}, {width: width * .72, height: height * .72, depth: .18}),
});

const FRONT_MEDIA = orientationMount(
  'mediterranean-orientation-miletus',
  'thales-miletus-theatre',
  [1.34, 1.5, .14],
  [0, 0, 0],
  2.38,
  .73,
);

const BACK_MEDIA = orientationMount(
  'mediterranean-orientation-map',
  'ancient-greek-colonization-map',
  [1.34, 1.5, -.24],
  [0, Math.PI, 0],
  2.38,
  1.35,
);

/** A double-sided opening installation: question first, route second, real places on both faces. */
export function MediterraneanGalleryCuration() {
  const frontTexture = useMemo(createFrontTexture, []);
  const backTexture = useMemo(createBackTexture, []);
  useEffect(() => () => {
    frontTexture.dispose();
    backTexture.dispose();
  }, [backTexture, frontTexture]);
  const display = MEDITERRANEAN_ORIENTATION_DISPLAY;
  const panelHeight = 2.8;
  return <group userData={{galleryCuration: 'mediterranean-orientation-v2'}}>
    <group position={[display.center.x, 0, display.center.z]} rotation={[0, display.rotation, 0]}>
      <mesh position={[0, 1.72, -.05]}>
        <boxGeometry args={[display.size.width + .18, panelHeight + .18, .2]}/>
        <meshStandardMaterial color={MEDITERRANEAN_PALETTE.limestone} roughness={.84}/>
      </mesh>
      <mesh position={[0, 1.72, .06]}>
        <planeGeometry args={[display.size.width, panelHeight]}/>
        <meshBasicMaterial map={frontTexture} toneMapped={false}/>
      </mesh>
      <mesh position={[0, 1.72, -.16]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[display.size.width, panelHeight]}/>
        <meshBasicMaterial map={backTexture} toneMapped={false}/>
      </mesh>
      <MuseumSceneMedia mount={FRONT_MEDIA} nearby={false} accent={MEDITERRANEAN_PALETTE.terracotta}/>
      <MuseumSceneMedia mount={BACK_MEDIA} nearby={false} accent={MEDITERRANEAN_PALETTE.aegean}/>
      <mesh position={[0, .18, 0]}>
        <boxGeometry args={[display.size.width * .86, .24, display.size.depth]}/>
        <meshStandardMaterial color={MEDITERRANEAN_PALETTE.bronze} roughness={.7} metalness={.12}/>
      </mesh>
    </group>
  </group>;
}
