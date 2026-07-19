import type {ThreeEvent} from '@react-three/fiber';
import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import {
  MUSEUM_CIRCULATION_NODES,
  MUSEUM_RUNTIME_NODES,
  getMuseumReservationBarrierBody,
  getMuseumRuntimeNode,
} from '../../data/museum/museumBuildingRuntime';
import type {
  MuseumFurnishingDefinition,
  MuseumReservation,
  MuseumRuntimeNodeDefinition,
  MuseumSpatialCell,
  MuseumWallDefinition,
} from '../../data/museum/museumWorldTypes';
import {
  MUSEUM_TEXTURE_SPECS,
  museumTextureDimensionsForPlane,
} from '../../data/museum/museumTexturePolicy';
import {usePlaqueTexture} from './plaqueTextures';

const WALL = '#e9e4da';
const WALL_EDGE = '#cfc8bc';
const FLOOR = '#514e48';
const FLOOR_FORUM = '#605744';
const CEILING = '#e7e2d8';
const METAL = '#18191a';
const BRONZE = '#8b6b43';
const SIGN_REAR = '#d8d2c7';
const GALLERY_WALL = '#eeeae2';
const GALLERY_WALL_EDGE = '#d9d4ca';
const OUTER_01_NODE_ID = 'corridor:outer-01-mediterranean-renaissance';

type WorldWallPlane = {
  axis: 'x' | 'z';
  coordinate: number;
  start: number;
  end: number;
  bottom: number;
  top: number;
};

const worldWallPlane = (
  node: MuseumRuntimeNodeDefinition,
  wall: MuseumWallDefinition,
): WorldWallPlane => {
  const yaw = node.worldTransform.yaw;
  const cosine = Math.cos(yaw);
  const sine = Math.sin(yaw);
  const centerX = node.worldTransform.x + cosine * wall.center.x + sine * wall.center.z;
  const centerZ = node.worldTransform.z - sine * wall.center.x + cosine * wall.center.z;
  const directionX = Math.cos(wall.rotation + yaw);
  const directionZ = -Math.sin(wall.rotation + yaw);
  const halfRun = wall.size.width / 2;
  const firstX = centerX - directionX * halfRun;
  const secondX = centerX + directionX * halfRun;
  const firstZ = centerZ - directionZ * halfRun;
  const secondZ = centerZ + directionZ * halfRun;
  const bottom = wall.bottom ?? 0;
  return Math.abs(directionX) >= Math.abs(directionZ)
    ? {
        axis: 'x',
        coordinate: centerZ,
        start: Math.min(firstX, secondX),
        end: Math.max(firstX, secondX),
        bottom,
        top: bottom + wall.height,
      }
    : {
        axis: 'z',
        coordinate: centerX,
        start: Math.min(firstZ, secondZ),
        end: Math.max(firstZ, secondZ),
        bottom,
        top: bottom + wall.height,
      };
};

const sameWallPlane = (first: WorldWallPlane, second: WorldWallPlane): boolean => {
  const epsilon = .012;
  return first.axis === second.axis
    && Math.abs(first.coordinate - second.coordinate) <= epsilon
    && Math.abs(first.start - second.start) <= epsilon
    && Math.abs(first.end - second.end) <= epsilon
    && Math.abs(first.bottom - second.bottom) <= epsilon
    && Math.abs(first.top - second.top) <= epsilon;
};

const isHallOwnedSeamSurface = (
  node: MuseumRuntimeNodeDefinition,
  wall: MuseumWallDefinition,
): boolean => {
  const candidate = worldWallPlane(node, wall);
  return MUSEUM_RUNTIME_NODES
    .filter(({kind}) => kind === 'hall')
    .some((hall) => (hall.architectureWalls ?? hall.layout.wallColliders)
      .some((hallWall) => sameWallPlane(candidate, worldWallPlane(hall, hallWall))));
};

function StructuralCell({cell, forum}: {cell: MuseumSpatialCell; forum: boolean}) {
  const renderBounds = cell.renderBounds ?? cell.bounds;
  const width = renderBounds.maxX - renderBounds.minX;
  const depth = renderBounds.maxZ - renderBounds.minZ;
  const x = (renderBounds.minX + renderBounds.maxX) / 2;
  const z = (renderBounds.minZ + renderBounds.maxZ) / 2;
  const alongZ = depth >= width;
  const run = alongZ ? depth : width;
  const guideSegmentCount = Math.max(1, Math.ceil(run / 12));
  const guideSegmentLength = Math.min(8, Math.max(1, (run - (guideSegmentCount - 1) * 2) / guideSegmentCount));
  const axisMinimum = alongZ ? renderBounds.minZ : renderBounds.minX;
  const guideCenters = Array.from({length: guideSegmentCount}, (_, index) =>
    axisMinimum + (index + .5) * run / guideSegmentCount);
  const markerCount = !forum && run >= 24 ? Math.floor(run / 16) : 0;
  const markerCenters = Array.from({length: markerCount}, (_, index) =>
    axisMinimum + (index + 1) * run / (markerCount + 1));
  return <group userData={{buildingCellId: cell.id}}>
    <mesh position={[x, -.1, z]} receiveShadow>
      <boxGeometry args={[width, .2, depth]}/>
      <meshStandardMaterial color={forum ? FLOOR_FORUM : FLOOR} roughness={.94}/>
    </mesh>
    <mesh position={[x, cell.ceilingHeight + .08, z]}>
      <boxGeometry args={[width, .16, depth]}/>
      <meshStandardMaterial color={CEILING} roughness={.9}/>
    </mesh>
    {guideCenters.map((center) => <mesh
      key={`ceiling-guide-${center}`}
      position={alongZ ? [x, cell.ceilingHeight - .02, center] : [center, cell.ceilingHeight - .02, z]}
      userData={{circulationGuide: 'ceiling'}}
    >
      <boxGeometry args={alongZ ? [.72, .035, guideSegmentLength] : [guideSegmentLength, .035, .72]}/>
      <meshBasicMaterial color="#fff0d3" toneMapped={false}/>
    </mesh>)}
    {markerCenters.map((center) => <mesh
      key={`floor-marker-${center}`}
      position={alongZ ? [x, -.004, center] : [center, -.004, z]}
      userData={{circulationGuide: 'threshold-marker'}}
    >
      <boxGeometry args={alongZ ? [Math.max(.8, width - .7), .01, .08] : [.08, .01, Math.max(.8, depth - .7)]}/>
      <meshStandardMaterial color={BRONZE} roughness={.48} metalness={.5}/>
    </mesh>)}
  </group>;
}

function StructuralWall({wall, galleryFinish = false}: {wall: MuseumWallDefinition; galleryFinish?: boolean}) {
  const bottom = wall.bottom ?? 0;
  const wallColor = galleryFinish ? GALLERY_WALL : WALL;
  const edgeColor = galleryFinish ? GALLERY_WALL_EDGE : WALL_EDGE;
  return <group
    position={[wall.center.x, bottom + wall.height / 2, wall.center.z]}
    rotation={[0, wall.rotation, 0]}
    userData={{openingId: wall.openingId}}
  >
    <mesh receiveShadow>
      <boxGeometry args={[wall.size.width, wall.height, wall.size.depth]}/>
      <meshStandardMaterial color={wallColor} roughness={.95}/>
    </mesh>
    {bottom === 0 && <mesh position={[0, -wall.height / 2 + .07, 0]}>
      <boxGeometry args={[wall.size.width + .02, .14, wall.size.depth + .02]}/>
      <meshStandardMaterial color={edgeColor} roughness={.86}/>
    </mesh>}
  </group>;
}

function StructuralBench({item}: {item: MuseumFurnishingDefinition}) {
  return <group position={[item.center.x, 0, item.center.z]} rotation={[0, item.rotation, 0]}>
    <mesh position={[0, .42, 0]}><boxGeometry args={[item.size.width, .16, item.size.depth]}/><meshStandardMaterial color="#766a58" roughness={.8}/></mesh>
    {[-item.size.width * .34, item.size.width * .34].map((x) => <mesh key={x} position={[x, .2, 0]}><boxGeometry args={[.14, .4, item.size.depth * .7]}/><meshStandardMaterial color={METAL} metalness={.48} roughness={.5}/></mesh>)}
  </group>;
}

function BuildingSign({title, kicker, subtitle, position, rotation = 0, width = 4.8}: {
  title: string;
  kicker: string;
  subtitle: string;
  position: readonly [number, number, number];
  rotation?: number;
  width?: number;
}) {
  const height = width * .27;
  const textureSize = museumTextureDimensionsForPlane(
    width,
    height,
    MUSEUM_TEXTURE_SPECS.buildingSign,
  );
  const texture = usePlaqueTexture({
    title,
    kicker,
    subtitle,
    accent: BRONZE,
    width: textureSize.width,
    height: textureSize.height,
  });
  return <group position={position} rotation={[0, rotation, 0]}>
    <mesh position={[0, 0, -.035]}><boxGeometry args={[width + .12, height + .12, .07]}/><meshStandardMaterial color={METAL} roughness={.4} metalness={.5}/></mesh>
    <mesh position={[0, 0, .005]}><planeGeometry args={[width, height]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    <mesh position={[0, 0, -.072]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[width, height]}/>
      <meshStandardMaterial color={SIGN_REAR} roughness={.88} metalness={.02}/>
    </mesh>
    <mesh position={[0, -height * .36, -.074]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[width * .72, .026]}/>
      <meshStandardMaterial color={BRONZE} roughness={.42} metalness={.38}/>
    </mesh>
  </group>;
}

function ReservationBarrier({reservation}: {reservation: MuseumReservation}) {
  const body = getMuseumReservationBarrierBody(reservation);
  const labelWidth = body.size.width * .9;
  const labelHeight = body.size.width * .245;
  const textureSize = museumTextureDimensionsForPlane(
    labelWidth,
    labelHeight,
    MUSEUM_TEXTURE_SPECS.reservationSign,
  );
  const texture = usePlaqueTexture({
    title: reservation.label,
    kicker: 'This doorway is closed',
    subtitle: 'Continue along the open Museum route.',
    accent: '#a56d45',
    width: textureSize.width,
    height: textureSize.height,
  });
  return <group
    position={[body.center.x, 0, body.center.z]}
    rotation={[0, body.rotation, 0]}
    userData={{reservationId: reservation.id, blocked: true, label: reservation.label}}
  >
    <mesh position={[0, body.height / 2, 0]}><boxGeometry args={[body.size.width, body.height, body.size.depth]}/><meshStandardMaterial color="#ddd7cc" roughness={.84} metalness={.02}/></mesh>
    <mesh position={[0, body.height + .18, body.size.depth / 2 + .02]}><planeGeometry args={[labelWidth, labelHeight]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    <mesh position={[0, body.height + .18, -body.size.depth / 2 - .02]} rotation={[0, Math.PI, 0]}><planeGeometry args={[labelWidth, labelHeight]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    {[-body.size.width * .42, body.size.width * .42].map((x) => <mesh key={x} position={[x, .72, 0]}><cylinderGeometry args={[.055, .075, 1.45, 10]}/><meshStandardMaterial color={BRONZE} metalness={.55} roughness={.4}/></mesh>)}
  </group>;
}

function CirculationNode({node}: {node: MuseumRuntimeNodeDefinition}) {
  const forum = false;
  const outer01 = node.id === OUTER_01_NODE_ID;
  const architectureWalls = (node.architectureWalls ?? node.layout.wallColliders)
    // Hall shells own exact seam matches. Rendering the connector copy in the
    // same plane causes depth fighting while leaving collision geometry intact.
    .filter((wall) => !outer01 || !isHallOwnedSeamSurface(node, wall));
  const entranceCell = node.id === MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId
    ? node.layout.spatialCells.find(({id}) => id.endsWith(':orientation-court'))
    : undefined;
  return <group position={[node.worldTransform.x, 0, node.worldTransform.z]} rotation={[0, node.worldTransform.yaw, 0]}>
    {node.layout.spatialCells.map((cell) => <StructuralCell key={cell.id} cell={cell} forum={forum}/>)}
    {architectureWalls.map((wall) => <StructuralWall key={wall.id} wall={wall} galleryFinish={outer01}/>)}
    {node.layout.furnishings.map((item) => <StructuralBench key={item.id} item={item}/>)}
    {entranceCell && <BuildingSign
      title="Philosophy Atlas Museum"
      kicker="Entrance and orientation"
      subtitle="Walk the full Ring in either direction · Central shortcuts are open"
      position={[
        (entranceCell.bounds.minX + entranceCell.bounds.maxX) / 2,
        4.25,
        entranceCell.bounds.maxZ - .2,
      ]}
      rotation={Math.PI}
      width={5.6}
    />}
  </group>;
}

export function MuseumBuildingArchitecture({onSceneGesture}: {onSceneGesture: () => void}) {
  const activate = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    event.stopPropagation();
    onSceneGesture();
  };
  return <group onClick={activate} userData={{museumBuilding: MUSEUM_BUILDING_MANIFEST.manifestVersion}}>
    {MUSEUM_CIRCULATION_NODES.map((node) => <CirculationNode key={node.id} node={node}/>)}
    {MUSEUM_BUILDING_MANIFEST.reservations.map((reservation) => {
      const host = getMuseumRuntimeNode(reservation.hostNodeId);
      if (!host) return null;
      return <group key={reservation.id} position={[host.worldTransform.x, 0, host.worldTransform.z]} rotation={[0, host.worldTransform.yaw, 0]}>
        <ReservationBarrier reservation={reservation}/>
      </group>;
    })}
  </group>;
}
