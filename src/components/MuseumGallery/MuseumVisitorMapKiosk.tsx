import type {ThreeEvent} from '@react-three/fiber';
import {useEffect, useMemo} from 'react';
import {CanvasTexture, LinearMipmapLinearFilter, SRGBColorSpace} from 'three';
import {MUSEUM_VISITOR_MAP_KIOSK} from '../../data/museum/museumVisitorMap';
import {
  MUSEUM_VISITOR_MAP_CROSSCUT_INTERSECTIONS,
  MUSEUM_VISITOR_MAP_DOORWAYS,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_ENTRANCE,
  MUSEUM_VISITOR_MAP_KIOSK_MARKER,
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_VISITOR_MAP_RESERVATIONS,
  MUSEUM_VISITOR_MAP_TURN_COURTS,
  MUSEUM_VISITOR_MAP_VIEWBOX,
  type MuseumVisitorMapPoint,
} from '../../data/museum/museumVisitorMapProjection';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';

export const VISITOR_MAP_FRAME_MATERIAL = {
  color: '#151719',
  roughness: .32,
  metalness: .62,
} as const;

const BLACK_METAL = VISITOR_MAP_FRAME_MATERIAL.color;
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

const fitCanvasText = (
  context: CanvasRenderingContext2D,
  text: string,
  maximumWidth: number,
): string => {
  if (context.measureText(text).width <= maximumWidth) return text;
  let fitted = text;
  while (fitted.length > 1 && context.measureText(`${fitted}…`).width > maximumWidth) {
    fitted = fitted.slice(0, -1);
  }
  return `${fitted.trimEnd()}…`;
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
    context.font = '700 24px system-ui, sans-serif';
    context.fillText('PHILOSOPHY ATLAS · CONTINUOUS ENFILADE', 54, 58);
    context.fillStyle = '#f3eadb';
    context.font = '600 52px Georgia, serif';
    context.fillText('Single-level collection plan', 54, 120);
    context.fillStyle = '#b8b2a8';
    context.font = '500 20px system-ui, sans-serif';
    context.fillText(
      '26 galleries · 105 rooms · chronological route · 10 m north–south crosscut',
      56,
      157,
    );

    const mapArea = {x: 40, y: 184, width: 760, height: 636};
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
      const isEntrance = node.id === MUSEUM_VISITOR_MAP_KIOSK.nodeId;
      const isPlanned = node.galleryState === 'planned-walkable';
      context.fillStyle = isEntrance
        ? '#3d3425'
        : node.galleryState === 'curated-open'
          ? '#2b3940'
          : isPlanned
            ? '#1a2429'
            : node.kind === 'turn-court'
              ? '#353127'
              : node.pilotRole === 'north-south-crosscut'
                ? '#203438'
                : '#182328';
      context.strokeStyle = isEntrance
        ? '#e0b475'
        : node.galleryState === 'curated-open'
          ? '#a3845e'
          : isPlanned
            ? '#6d797b'
            : node.kind === 'turn-court'
              ? '#9d815d'
              : '#56676d';
      context.lineWidth = isEntrance ? 4 : node.kind === 'hall' ? 2.2 : 1.6;
      context.setLineDash(isPlanned ? [5, 4] : []);
      node.cells.forEach((cell) => {
        context.beginPath();
        tracePolygon(context, cell.points, point);
        context.fill();
      });
      context.beginPath();
      node.outline.forEach(({start, end}) => {
        const mappedStart = point(start);
        const mappedEnd = point(end);
        context.moveTo(mappedStart.x, mappedStart.y);
        context.lineTo(mappedEnd.x, mappedEnd.y);
      });
      context.stroke();
    });
    context.setLineDash([]);

    context.lineCap = 'round';
    context.lineJoin = 'round';
    MUSEUM_VISITOR_MAP_EDGES.forEach(({points, routeRole}) => {
      const crosscut = routeRole === 'crosscut';
      context.strokeStyle = crosscut ? '#8eb7b7' : '#c79558';
      context.lineWidth = crosscut ? 3.6 : routeRole === 'turn-court' ? 3.2 : 2.4;
      context.setLineDash(crosscut ? [8, 5] : []);
      context.beginPath();
      points.forEach((pathPoint, index) => {
        const mapped = point(pathPoint);
        if (index === 0) context.moveTo(mapped.x, mapped.y);
        else context.lineTo(mapped.x, mapped.y);
      });
      context.stroke();
    });
    context.setLineDash([]);

    MUSEUM_VISITOR_MAP_CROSSCUT_INTERSECTIONS.forEach((intersection) => {
      const mapped = point(intersection.point);
      context.beginPath();
      context.arc(mapped.x, mapped.y, 6, 0, Math.PI * 2);
      context.fillStyle = '#b8d1ce';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#263f42';
      context.stroke();
    });

    MUSEUM_VISITOR_MAP_DOORWAYS.forEach((doorway) => {
      const start = point(doorway.start);
      const end = point(doorway.end);
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = doorway.isMainEntrance ? '#f0c783' : '#dce4df';
      context.lineWidth = doorway.isMainEntrance ? 5 : 2;
      context.stroke();
    });

    MUSEUM_VISITOR_MAP_RESERVATIONS.forEach((reservation) => {
      context.beginPath();
      tracePolygon(context, reservation.points, point);
      context.fillStyle = '#3a302899';
      context.fill();
      context.setLineDash([6, 5]);
      context.strokeStyle = '#a77b5f';
      context.lineWidth = 2;
      context.stroke();
      context.setLineDash([]);
      const label = point(reservation.labelPoint);
      context.fillStyle = '#d1a987';
      context.font = '700 11px system-ui, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('CLOSED', label.x, label.y - 7);
      context.fillText('RESERVE', label.x, label.y + 7);
    });

    MUSEUM_VISITOR_MAP_PROJECTION.forEach(({hall, physicalNode}) => {
      const nodeProjection = MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.find(
        ({id}) => id === physicalNode.id,
      );
      if (!nodeProjection) {
        throw new Error(`The kiosk map has no projection for ${physicalNode.id}.`);
      }
      const mapped = point(nodeProjection.labelPoint);
      const curated = hall.galleryState === 'curated-open';
      context.beginPath();
      context.arc(mapped.x, mapped.y, curated ? 12 : 10, 0, Math.PI * 2);
      context.fillStyle = curated ? '#d2a76f' : '#202b30';
      context.fill();
      context.lineWidth = curated ? 3 : 2;
      context.strokeStyle = curated ? '#fff0ce' : '#879295';
      context.stroke();
      context.fillStyle = curated ? '#231d15' : '#ded7cb';
      context.font = `700 ${curated ? 13 : 11}px system-ui, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(String(hall.publicGalleryNumber).padStart(2, '0'), mapped.x, mapped.y + .5);
    });

    MUSEUM_VISITOR_MAP_TURN_COURTS.forEach((turn, index) => {
      const mapped = point(turn.labelPoint);
      context.fillStyle = '#e0c49c';
      context.font = '700 9px system-ui, sans-serif';
      context.textAlign = 'center';
      context.fillText(`T${index + 1}`, mapped.x, mapped.y);
    });

    const mainEntrance = point(MUSEUM_VISITOR_MAP_ENTRANCE.position);
    context.fillStyle = '#f0c783';
    context.font = '700 12px system-ui, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillText('MAIN ENTRANCE', mainEntrance.x, mainEntrance.y + 11);

    const current = point(MUSEUM_VISITOR_MAP_KIOSK_MARKER.point);
    context.beginPath();
    context.arc(current.x, current.y, 9, 0, Math.PI * 2);
    context.fillStyle = '#f2c681';
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = '#fff0ce';
    context.stroke();
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillStyle = '#f2c681';
    context.font = '700 14px system-ui, sans-serif';
    context.fillText('YOU ARE HERE', current.x + 15, current.y);
    context.restore();

    context.strokeStyle = '#5a4c3c';
    context.lineWidth = 2;
    context.strokeRect(mapArea.x, mapArea.y, mapArea.width, mapArea.height);

    const keyX = 832;
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#d4a76f';
    context.font = '700 16px system-ui, sans-serif';
    context.fillText('GALLERY DIRECTORY · 01–26', keyX, 208);

    const byPublicNumber = [...MUSEUM_VISITOR_MAP_PROJECTION].sort(
      (first, second) =>
        first.hall.publicGalleryNumber - second.hall.publicGalleryNumber,
    );
    byPublicNumber.forEach(({hall}, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = keyX + column * 202;
      const y = 238 + row * 42;
      const curated = hall.galleryState === 'curated-open';
      context.fillStyle = curated ? '#e0b475' : '#839092';
      context.font = '700 13px system-ui, sans-serif';
      context.fillText(String(hall.publicGalleryNumber).padStart(2, '0'), x, y);
      context.fillStyle = curated ? '#e7dfd3' : '#b4bdbd';
      context.font = '600 11px system-ui, sans-serif';
      context.fillText(fitCanvasText(context, hall.title, 164), x + 25, y);
      context.strokeStyle = curated ? '#584a39' : '#344147';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(x, y + 12);
      context.lineTo(x + 188, y + 12);
      context.stroke();
    });

    const legendY = 796;
    context.fillStyle = '#d4a76f';
    context.font = '700 13px system-ui, sans-serif';
    context.fillText('ROUTES & STATUS', keyX, legendY);
    const legend = [
      {label: 'Chronological through-route', color: '#c79558', dash: [] as number[]},
      {label: '10 m crosscut · 6 intersections', color: '#8eb7b7', dash: [8, 5]},
      {label: '22 curated/open · 4 planned/walkable', color: '#879295', dash: [4, 3]},
      {label: '2 closed capacity reserves', color: '#a77b5f', dash: [6, 5]},
    ];
    legend.forEach(({label, color, dash}, index) => {
      const y = legendY + 25 + index * 19;
      context.beginPath();
      context.moveTo(keyX, y - 4);
      context.lineTo(keyX + 32, y - 4);
      context.setLineDash(dash);
      context.strokeStyle = color;
      context.lineWidth = 3;
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = '#b8c0bf';
      context.font = '600 11px system-ui, sans-serif';
      context.fillText(label, keyX + 42, y);
    });

    context.fillStyle = '#aeb5b5';
    context.font = '600 19px system-ui, sans-serif';
    context.fillText('E / ENTER · TAP TO OPEN THE LIVE MAP', 54, 872);

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

export function MuseumVisitorMapKiosk({
  active,
  nearby,
  onActivate,
}: {
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
    userData={{
      museumInteraction: 'visitor-map',
      kioskId: kiosk.id,
      nodeId: kiosk.nodeId,
    }}
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
        {...VISITOR_MAP_FRAME_MATERIAL}
        emissive={nearby ? '#52391f' : '#050505'}
        emissiveIntensity={nearby ? .42 : .08}
      />
    </mesh>
    <mesh position={[0, kiosk.screen.centerY, .151]}>
      <planeGeometry args={[kiosk.screen.width, kiosk.screen.height]}/>
      <meshBasicMaterial map={screen} toneMapped={false}/>
    </mesh>
    <mesh position={[0, kiosk.screen.centerY, -.151]} rotation={[0, Math.PI, 0]}>
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
      <meshStandardMaterial
        color={index === 0 ? '#f1c98d' : BRONZE}
        roughness={.34}
        metalness={.62}
      />
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
