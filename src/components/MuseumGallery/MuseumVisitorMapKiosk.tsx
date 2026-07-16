import type {ThreeEvent} from '@react-three/fiber';
import {useEffect, useMemo} from 'react';
import {CanvasTexture, LinearMipmapLinearFilter, SRGBColorSpace} from 'three';
import {
  MUSEUM_VISITOR_MAP_KIOSK,
} from '../../data/museum/museumVisitorMap';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';
import {
  MUSEUM_VISITOR_MAP_DOORWAYS,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_ENTRANCE,
  MUSEUM_VISITOR_MAP_KIOSK_MARKER,
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_VISITOR_MAP_RESERVATIONS,
  MUSEUM_VISITOR_MAP_VIEWBOX,
  type MuseumVisitorMapPoint,
} from '../../data/museum/museumVisitorMapProjection';

const BLACK_METAL = '#151719';
const LIMESTONE = '#d8d2c7';
const BRONZE = '#9b744a';

type CanvasMapPoint = {x: number; y: number};

const tracePolygon = (
  context: CanvasRenderingContext2D,
  points: readonly MuseumVisitorMapPoint[],
  project: (point: MuseumVisitorMapPoint) => CanvasMapPoint,
): void => {
  points.forEach((point, index) => {
    const mapped = project(point);
    if (index === 0) context.moveTo(mapped.x, mapped.y);
    else context.lineTo(mapped.x, mapped.y);
  });
  context.closePath();
};

const useVisitorMapScreenTexture = (): CanvasTexture => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = MUSEUM_TEXTURE_SPECS.visitorMapKiosk.width;
    canvas.height = MUSEUM_TEXTURE_SPECS.visitorMapKiosk.height;
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
    context.font = '700 25px system-ui, sans-serif';
    context.fillText('PHILOSOPHY ATLAS · RING OF WINGS', 62, 65);
    context.fillStyle = '#f3eadb';
    context.font = '600 58px Georgia, serif';
    context.fillText('Main-level plan', 62, 132);
    context.fillStyle = '#b8b2a8';
    context.font = '500 21px system-ui, sans-serif';
    context.fillText('Physical circulation · six public fast-travel destinations', 64, 168);

    const mapArea = {x: 48, y: 194, width: 700, height: 646};
    const viewBox = MUSEUM_VISITOR_MAP_VIEWBOX;
    const scale = Math.min(mapArea.width / viewBox.width, mapArea.height / viewBox.height);
    const renderedWidth = viewBox.width * scale;
    const renderedHeight = viewBox.height * scale;
    const offsetX = mapArea.x + (mapArea.width - renderedWidth) / 2;
    const offsetY = mapArea.y + (mapArea.height - renderedHeight) / 2;
    const point = ({x, y}: MuseumVisitorMapPoint): CanvasMapPoint => ({
      x: offsetX + (x - viewBox.minX) * scale,
      y: offsetY + (y - viewBox.minY) * scale,
    });

    context.save();
    context.beginPath();
    context.rect(mapArea.x, mapArea.y, mapArea.width, mapArea.height);
    context.clip();

    MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.forEach((node) => {
      const currentHall = node.publicHallId === MUSEUM_VISITOR_MAP_KIOSK.hallId;
      context.fillStyle = currentHall
        ? '#3b3326'
        : node.kind === 'hall'
          ? '#263239'
          : node.kind === 'court'
            ? '#343127'
            : node.kind === 'entrance'
              ? '#293536'
              : node.pilotRole === 'shortcut'
                ? '#222b2c'
                : '#182328';
      context.strokeStyle = currentHall ? '#e0b475' : node.kind === 'hall' ? '#7a8587' : '#56676d';
      context.lineWidth = currentHall ? 4 : 2;
      node.cells.forEach((cell) => {
        context.beginPath();
        tracePolygon(context, cell.points, point);
        context.fill();
        context.stroke();
      });
    });

    context.lineCap = 'round';
    context.lineJoin = 'round';
    MUSEUM_VISITOR_MAP_EDGES.forEach(({points, routeRole}) => {
      context.strokeStyle = routeRole === 'shortcut' ? '#d6b37b' : routeRole === 'forum-spoke' ? '#a9c0c1' : '#b78b55';
      context.lineWidth = routeRole === 'shortcut' ? 3 : 2.5;
      context.setLineDash(routeRole === 'forum-spoke' ? [8, 6] : routeRole === 'shortcut' ? [2, 7] : []);
      context.beginPath();
      points.forEach((pathPoint, index) => {
        const mapped = point(pathPoint);
        if (index === 0) context.moveTo(mapped.x, mapped.y);
        else context.lineTo(mapped.x, mapped.y);
      });
      context.stroke();
    });

    context.setLineDash([]);
    MUSEUM_VISITOR_MAP_DOORWAYS.forEach((doorway) => {
      const start = point(doorway.start);
      const end = point(doorway.end);
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = doorway.isMainEntrance ? '#f0c783' : '#dce4df';
      context.lineWidth = doorway.isMainEntrance ? 5 : 2.2;
      context.stroke();
    });

    MUSEUM_VISITOR_MAP_RESERVATIONS.forEach((reservation) => {
      context.beginPath();
      tracePolygon(context, reservation.points, point);
      context.fillStyle = '#3a3028aa';
      context.fill();
      context.setLineDash([6, 5]);
      context.strokeStyle = '#a77b5f';
      context.lineWidth = 2;
      context.stroke();
      context.setLineDash([]);
      const label = point(reservation.labelPoint);
      context.fillStyle = '#d1a987';
      context.font = '700 12px system-ui, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(
        reservation.reservationType === 'insertion' ? 'FUTURE' : reservation.expansionPortalId ?? 'PORTAL',
        label.x,
        label.y,
      );
    });

    MUSEUM_VISITOR_MAP_PROJECTION.forEach(({hall, physicalNode}) => {
      const current = hall.id === MUSEUM_VISITOR_MAP_KIOSK.hallId;
      const nodeProjection = MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.find(({id}) => id === physicalNode.id);
      if (!nodeProjection) throw new Error(`The kiosk map has no physical projection for ${physicalNode.id}.`);
      const mapped = point(nodeProjection.labelPoint);
      context.beginPath();
      context.arc(mapped.x, mapped.y, current ? 17 : 14, 0, Math.PI * 2);
      context.fillStyle = current ? '#f2c681' : '#171d21';
      context.fill();
      context.lineWidth = current ? 5 : 3;
      context.strokeStyle = current ? '#fff0ce' : '#b58a56';
      context.stroke();
      context.fillStyle = current ? '#231d15' : '#e5d7c4';
      context.font = `700 ${current ? 17 : 15}px system-ui, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(hall.galleryNumber.replace(/^Gallery\s+/u, ''), mapped.x, mapped.y + 1);
    });

    const forum = MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.find(({kind}) => kind === 'court');
    if (forum) {
      const forumPoint = point(forum.labelPoint);
      context.fillStyle = '#e4d8c3';
      context.font = '700 14px system-ui, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('FORUM', forumPoint.x, forumPoint.y);
    }

    const mainEntrance = point(MUSEUM_VISITOR_MAP_ENTRANCE.position);
    context.fillStyle = '#f0c783';
    context.font = '700 14px system-ui, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillText('MAIN ENTRANCE', mainEntrance.x, mainEntrance.y + 12);

    const current = point(MUSEUM_VISITOR_MAP_KIOSK_MARKER.point);
    context.beginPath();
    context.arc(current.x, current.y, 10, 0, Math.PI * 2);
    context.fillStyle = '#f2c681';
    context.fill();
    context.lineWidth = 4;
    context.strokeStyle = '#fff0ce';
    context.stroke();
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillStyle = '#f2c681';
    context.font = '700 17px system-ui, sans-serif';
    context.fillText('YOU ARE HERE', current.x + 18, current.y);
    context.restore();

    context.strokeStyle = '#5a4c3c';
    context.lineWidth = 2;
    context.strokeRect(mapArea.x, mapArea.y, mapArea.width, mapArea.height);

    const keyX = 790;
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#d4a76f';
    context.font = '700 17px system-ui, sans-serif';
    context.fillText('FAST-TRAVEL GALLERIES', keyX, 224);
    MUSEUM_VISITOR_MAP_PROJECTION.forEach(({hall}, index) => {
      const y = 265 + index * 62;
      context.fillStyle = hall.id === MUSEUM_VISITOR_MAP_KIOSK.hallId ? '#f2c681' : '#d7d2c9';
      context.font = '700 18px system-ui, sans-serif';
      context.fillText(hall.galleryNumber.replace(/^Gallery\s+/u, ''), keyX, y);
      context.fillStyle = '#e7dfd3';
      context.font = '600 16px system-ui, sans-serif';
      context.fillText(hall.title, keyX + 42, y);
      context.strokeStyle = '#3f4c51';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(keyX, y + 17);
      context.lineTo(1140, y + 17);
      context.stroke();
    });

    context.fillStyle = '#d4a76f';
    context.font = '700 15px system-ui, sans-serif';
    context.fillText('ROUTE KEY', keyX, 661);
    const routeLegend = [
      {label: 'Outer loop', dash: [] as number[], color: '#b78b55'},
      {label: 'Forum spokes', dash: [8, 6], color: '#a9c0c1'},
      {label: 'Entrance shortcut', dash: [2, 7], color: '#d6b37b'},
    ];
    routeLegend.forEach(({label, dash, color}, index) => {
      const y = 696 + index * 35;
      context.beginPath();
      context.moveTo(keyX, y);
      context.lineTo(keyX + 48, y);
      context.setLineDash(dash);
      context.strokeStyle = color;
      context.lineWidth = 3;
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = '#b8c0bf';
      context.font = '600 15px system-ui, sans-serif';
      context.fillText(label, keyX + 62, y + 5);
    });

    context.setLineDash([6, 5]);
    context.strokeStyle = '#a77b5f';
    context.strokeRect(keyX, 785, 48, 20);
    context.setLineDash([]);
    context.fillStyle = '#b8c0bf';
    context.font = '600 15px system-ui, sans-serif';
    context.fillText('Future gallery — not yet open', keyX + 62, 801);

    context.fillStyle = '#aeb5b5';
    context.font = '600 20px system-ui, sans-serif';
    context.fillText('E / ENTER · TAP TO OPEN', 62, 880);

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
