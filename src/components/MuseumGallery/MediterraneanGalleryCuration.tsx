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
import {VISITOR_MAP_FRAME_MATERIAL} from './MuseumVisitorMapKiosk';

const ORIENTATION_DESIGN_WIDTH = 1024;
const ORIENTATION_DESIGN_HEIGHT = 512;

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
  context.scale(
    canvas.width / ORIENTATION_DESIGN_WIDTH,
    canvas.height / ORIENTATION_DESIGN_HEIGHT,
  );
  const gradient = context.createLinearGradient(
    0,
    0,
    ORIENTATION_DESIGN_WIDTH,
    ORIENTATION_DESIGN_HEIGHT,
  );
  gradient.addColorStop(0, '#f5ecdc');
  gradient.addColorStop(.62, '#e9dcc5');
  gradient.addColorStop(1, '#d8c29e');
  context.fillStyle = gradient;
  context.fillRect(0, 0, ORIENTATION_DESIGN_WIDTH, ORIENTATION_DESIGN_HEIGHT);
  context.fillStyle = MEDITERRANEAN_PALETTE.terracotta;
  context.fillRect(0, 0, 18, ORIENTATION_DESIGN_HEIGHT);
  context.fillStyle = MEDITERRANEAN_PALETTE.aegean;
  context.fillRect(18, 0, 7, ORIENTATION_DESIGN_HEIGHT);
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
  context.fillText('GALLERY 01 · THE JOURNEY', 52, 52);

  context.fillStyle = MEDITERRANEAN_PALETTE.ink;
  context.font = '700 44px Georgia, serif';
  context.letterSpacing = '0px';
  drawWrapped(context, 'From Nature to the Examined Life', 52, 116, 475, 52);

  context.fillStyle = '#544d43';
  context.font = '500 20px system-ui, sans-serif';
  drawWrapped(
    context,
    'Begin with attempts to explain the cosmos through nature. Continue through argument and civic speech to Socrates, Plato, and Aristotle.',
    54,
    238,
    470,
    29,
  );

  context.fillStyle = MEDITERRANEAN_PALETTE.aegean;
  context.fillRect(52, 430, 455, 5);
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
  'mediterranean-orientation-gallery',
  'plato-school-of-athens',
  [1.52, 1.55, .14],
  [0, 0, 0],
  2.46,
  1.61,
);

/** A gallery-wide opening orientation with a finished structural reverse. */
export function MediterraneanGalleryCuration() {
  const frontTexture = useMemo(createFrontTexture, []);
  useEffect(() => () => {
    frontTexture.dispose();
  }, [frontTexture]);
  const display = MEDITERRANEAN_ORIENTATION_DISPLAY;
  const panelHeight = 2.8;
  return <group userData={{galleryCuration: 'mediterranean-orientation-v2'}}>
    <group position={[display.center.x, 0, display.center.z]} rotation={[0, display.rotation, 0]}>
      <mesh position={[0, 1.72, -.07]}>
        <boxGeometry args={[display.size.width + .18, panelHeight + .18, .24]}/>
        {[0, 1, 2, 3, 5].map((materialIndex) => (
          <meshStandardMaterial
            key={materialIndex}
            attach={`material-${materialIndex}`}
            {...VISITOR_MAP_FRAME_MATERIAL}
          />
        ))}
        <meshStandardMaterial
          attach="material-4"
          color={MEDITERRANEAN_PALETTE.limestone}
          roughness={.84}
        />
      </mesh>
      <mesh position={[0, 1.72, .06]}>
        <planeGeometry args={[display.size.width, panelHeight]}/>
        <meshBasicMaterial map={frontTexture} toneMapped={false}/>
      </mesh>
      <MuseumSceneMedia mount={FRONT_MEDIA} nearby={false} accent={MEDITERRANEAN_PALETTE.terracotta}/>
      <mesh position={[0, .18, 0]}>
        <boxGeometry args={[display.size.width * .86, .24, display.size.depth]}/>
        <meshStandardMaterial color={MEDITERRANEAN_PALETTE.bronze} roughness={.7} metalness={.12}/>
      </mesh>
    </group>
  </group>;
}
