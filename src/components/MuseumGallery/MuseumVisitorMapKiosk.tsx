import type {ThreeEvent} from '@react-three/fiber';
import {useEffect, useMemo} from 'react';
import {CanvasTexture, LinearMipmapLinearFilter, SRGBColorSpace} from 'three';
import {
  MUSEUM_VISITOR_MAP_KIOSK,
} from '../../data/museum/museumVisitorMap';
import {
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_PROJECTION,
} from '../../data/museum/museumVisitorMapProjection';

const BLACK_METAL = '#151719';
const LIMESTONE = '#d8d2c7';
const BRONZE = '#9b744a';

const useVisitorMapScreenTexture = (): CanvasTexture => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 740;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Unable to create the Museum visitor-map kiosk screen.');
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#11171b');
    gradient.addColorStop(1, '#24221c');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#8f704b';
    context.lineWidth = 8;
    context.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

    context.fillStyle = '#d4a76f';
    context.font = '700 28px system-ui, sans-serif';
    context.fillText('PHILOSOPHY ATLAS · VISITOR ORIENTATION', 64, 74);
    context.fillStyle = '#f3eadb';
    context.font = '600 68px Georgia, serif';
    context.fillText('Museum map', 64, 154);
    context.fillStyle = '#b8b2a8';
    context.font = '500 25px system-ui, sans-serif';
    context.fillText(`${MUSEUM_VISITOR_MAP_PROJECTION.length} connected galleries · approach to choose your route`, 66, 198);

    const point = ({x, y}: {x: number; y: number}) => ({
      x: 100 + x * 9.8,
      y: 230 + y * 4.3,
    });
    context.strokeStyle = '#a47b4d';
    context.lineWidth = 9;
    context.lineCap = 'round';
    MUSEUM_VISITOR_MAP_EDGES.forEach(({from, to}) => {
      const mappedFrom = point(from);
      const mappedTo = point(to);
      context.beginPath();
      context.moveTo(mappedFrom.x, mappedFrom.y);
      context.lineTo(mappedTo.x, mappedTo.y);
      context.stroke();
    });
    MUSEUM_VISITOR_MAP_PROJECTION.forEach(({hall, node}) => {
      const {mapPosition} = node;
      const current = hall.id === MUSEUM_VISITOR_MAP_KIOSK.hallId;
      const mapped = point(mapPosition);
      context.beginPath();
      context.arc(mapped.x, mapped.y, current ? 23 : 15, 0, Math.PI * 2);
      context.fillStyle = current ? '#f2c681' : '#171d21';
      context.fill();
      context.lineWidth = 7;
      context.strokeStyle = current ? '#fff0ce' : '#b58a56';
      context.stroke();
      context.fillStyle = current ? '#231d15' : '#e5d7c4';
      context.font = `700 ${current ? 22 : 18}px system-ui, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(hall.galleryNumber.replace(/^Gallery\s+/u, ''), mapped.x, mapped.y + 1);
    });
    const currentProjection = MUSEUM_VISITOR_MAP_PROJECTION.find(({hall}) =>
      hall.id === MUSEUM_VISITOR_MAP_KIOSK.hallId);
    if (!currentProjection) throw new Error('The Museum visitor-map kiosk hall is not projected.');
    const current = point(currentProjection.node.mapPosition);
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#f2c681';
    context.font = '700 25px system-ui, sans-serif';
    context.fillText('YOU ARE HERE', current.x + 34, current.y + 8);
    context.fillStyle = '#aeb5b5';
    context.font = '600 22px system-ui, sans-serif';
    context.fillText('E / ENTER · TAP', 66, 680);

    const mapTexture = new CanvasTexture(canvas);
    mapTexture.colorSpace = SRGBColorSpace;
    mapTexture.anisotropy = 4;
    mapTexture.minFilter = LinearMipmapLinearFilter;
    mapTexture.generateMipmaps = true;
    mapTexture.needsUpdate = true;
    mapTexture.name = 'museum-visitor-map-kiosk-screen';
    return mapTexture;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
};

export function MuseumVisitorMapKiosk({active, nearby, onActivate}: {
  active: boolean;
  nearby: boolean;
  onActivate: () => void;
}) {
  const kiosk = MUSEUM_VISITOR_MAP_KIOSK;
  const screen = useVisitorMapScreenTexture();
  const activate = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    event.stopPropagation();
    onActivate();
  };

  return <group
    position={[kiosk.center.x, 0, kiosk.center.z]}
    rotation={[0, kiosk.rotation, 0]}
    onClick={activate}
    userData={{museumInteraction: 'visitor-map', kioskId: kiosk.id}}
  >
    <mesh position={[0, .07, 0]}>
      <boxGeometry args={[kiosk.size.width, .14, kiosk.size.depth]}/>
      <meshStandardMaterial color={BLACK_METAL} roughness={.34} metalness={.72}/>
    </mesh>
    <mesh position={[0, .2, 0]}>
      <boxGeometry args={[kiosk.size.width - .28, .18, kiosk.size.depth - .14]}/>
      <meshStandardMaterial color={LIMESTONE} roughness={.9}/>
    </mesh>
    {[-.86, .86].map((x) => <mesh key={x} position={[x, .77, 0]}>
      <boxGeometry args={[.09, 1.2, .16]}/>
      <meshStandardMaterial color={BLACK_METAL} roughness={.3} metalness={.7}/>
    </mesh>)}
    <mesh position={[0, kiosk.screen.centerY, 0]}>
      <boxGeometry args={[kiosk.size.width - .12, kiosk.screen.height + .22, .28]}/>
      <meshStandardMaterial
        color={BLACK_METAL}
        roughness={.32}
        metalness={.62}
        emissive={nearby ? '#52391f' : '#050505'}
        emissiveIntensity={nearby ? .42 : .08}
      />
    </mesh>
    <mesh position={[0, kiosk.screen.centerY, .151]}>
      <planeGeometry args={[kiosk.screen.width, kiosk.screen.height]}/>
      <meshBasicMaterial map={screen} toneMapped={false}/>
    </mesh>
    <mesh position={[0, kiosk.height - .18, .17]}>
      <boxGeometry args={[kiosk.screen.width + .08, .055, .055]}/>
      <meshBasicMaterial color={nearby ? '#ffe0ad' : '#d0a36a'} toneMapped={false}/>
    </mesh>
    <mesh position={[0, .49, .18]}>
      <boxGeometry args={[1.7, .055, .06]}/>
      <meshStandardMaterial color={BRONZE} roughness={.38} metalness={.64}/>
    </mesh>
    {[-.66, -.33, 0, .33, .66].map((x, index) => <mesh key={x} position={[x, .49, .22]}>
      <sphereGeometry args={[index === 0 ? .055 : .04, 12, 8]}/>
      <meshStandardMaterial color={index === 0 ? '#f1c98d' : BRONZE} roughness={.34} metalness={.62}/>
    </mesh>)}
    {active && <pointLight
      position={[0, kiosk.height - .27, .65]}
      color={kiosk.light.color}
      intensity={kiosk.light.intensity}
      distance={kiosk.light.distance}
      decay={2}
    />}
  </group>;
}
