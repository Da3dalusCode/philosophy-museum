import type {ThreeEvent} from '@react-three/fiber';
import {
  MUSEUM_BUILDING_MANIFEST,
  type MuseumManifestReserve,
} from '../../data/museum/museumBuildingManifest';
import {
  MUSEUM_CIRCULATION_NODES,
  getMuseumRuntimeNode,
} from '../../data/museum/museumBuildingRuntime';
import type {
  MuseumFurnishingDefinition,
  MuseumRuntimeNodeDefinition,
  MuseumSignDefinition,
  MuseumSpatialCell,
  MuseumWallDefinition,
} from '../../data/museum/museumWorldTypes';
import {
  MUSEUM_CANONICAL_CEILING_MATERIAL,
  MUSEUM_CANONICAL_WALL_EDGE_MATERIAL,
  resolveMuseumWallMaterial,
} from '../../data/museum/museumArchitectureMaterials';
import {
  MUSEUM_TEXTURE_SPECS,
  museumTextureDimensionsForPlane,
} from '../../data/museum/museumTexturePolicy';
import {MUSEUM_VISITOR_MAP_KIOSK} from '../../data/museum/museumVisitorMapKioskDefinition';
import {MuseumVisitorMapKiosk} from './MuseumVisitorMapKiosk';
import {usePlaqueTexture} from './plaqueTextures';

const FLOOR = '#514e48';
const FLOOR_FORUM = '#605744';
const METAL = '#18191a';
const BRONZE = '#8b6b43';
const SIGN_REAR = '#d8d2c7';

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
      <meshStandardMaterial {...MUSEUM_CANONICAL_CEILING_MATERIAL}/>
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

function StructuralWall({wall}: {wall: MuseumWallDefinition}) {
  const bottom = wall.bottom ?? 0;
  const wallMaterial = resolveMuseumWallMaterial();
  return <group
    position={[wall.center.x, bottom + wall.height / 2, wall.center.z]}
    rotation={[0, wall.rotation, 0]}
    userData={{openingId: wall.openingId}}
  >
    <mesh receiveShadow>
      <boxGeometry args={[wall.size.width, wall.height, wall.size.depth]}/>
      <meshStandardMaterial {...wallMaterial}/>
    </mesh>
    {bottom === 0 && <mesh position={[0, -wall.height / 2 + .07, 0]}>
      <boxGeometry args={[wall.size.width + .02, .14, wall.size.depth + .02]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_WALL_EDGE_MATERIAL}/>
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

function AuthoredBuildingSign({sign}: {sign: MuseumSignDefinition}) {
  return <BuildingSign
    title={sign.title}
    kicker={sign.kicker}
    subtitle={sign.subtitle}
    position={[sign.position.x, sign.position.y, sign.position.z]}
    rotation={sign.rotationY}
    width={sign.width}
  />;
}

function ReservationBarrier({reservation}: {reservation: MuseumManifestReserve}) {
  const authoredWall = reservation.boundaryWall;
  if (!authoredWall) return null;
  const body = {
    id: reservation.id,
    center: {x: authoredWall.center.x, z: authoredWall.center.z},
    size: {width: authoredWall.size.width, depth: authoredWall.size.depth},
    rotation: authoredWall.rotationY,
    height: authoredWall.size.height,
  };
  const labelWidth = body.size.width * .9;
  const labelHeight = Math.min(1.1, body.size.width * .245);
  const textureSize = museumTextureDimensionsForPlane(
    labelWidth,
    labelHeight,
    MUSEUM_TEXTURE_SPECS.reservationSign,
  );
  const texture = usePlaqueTexture({
    title: reservation.label ?? 'Future gallery — not yet open',
    kicker: 'This doorway is closed',
    subtitle: 'Continue along the open Museum route.',
    accent: '#a56d45',
    width: textureSize.width,
    height: textureSize.height,
  });
  return <group
    position={[body.center.x, 0, body.center.z]}
    rotation={[0, body.rotation, 0]}
    userData={{reservationId: reservation.id, blocked: true, label: reservation.label ?? reservation.title}}
  >
    <mesh position={[0, body.height / 2, 0]}><boxGeometry args={[body.size.width, body.height, body.size.depth]}/><meshStandardMaterial color="#ddd7cc" roughness={.84} metalness={.02}/></mesh>
    <mesh position={[0, 2.05, body.size.depth / 2 + .02]}><planeGeometry args={[labelWidth, labelHeight]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    <mesh position={[0, 2.05, -body.size.depth / 2 - .02]} rotation={[0, Math.PI, 0]}><planeGeometry args={[labelWidth, labelHeight]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
  </group>;
}

function CirculationNode({node}: {node: MuseumRuntimeNodeDefinition}) {
  const forum = node.programHallId === 'core-questions-forum';
  const architectureWalls = node.architectureWalls ?? node.layout.wallColliders;
  const entranceCell = node.id === MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId
    ? node.layout.spatialCells.find(({id}) => id.endsWith(':orientation-court'))
      ?? node.layout.spatialCells[0]
    : undefined;
  return <group position={[node.worldTransform.x, 0, node.worldTransform.z]} rotation={[0, node.worldTransform.yaw, 0]}>
    {node.layout.spatialCells.map((cell) => <StructuralCell key={cell.id} cell={cell} forum={forum}/>)}
    {architectureWalls.map((wall) => <StructuralWall key={wall.id} wall={wall}/>)}
    {node.layout.furnishings
      .filter(({kind}) => kind !== 'visitor-map-kiosk')
      .map((item) => <StructuralBench key={item.id} item={item}/>)}
    {(node.layout.signs ?? []).map((sign) => <AuthoredBuildingSign key={sign.id} sign={sign}/>)}
    {entranceCell && <BuildingSign
      title="Philosophy Atlas Museum"
      kicker="Grand Entrance & Orientation"
      subtitle="Chronological enfilade · North–south crosscut · 26 galleries on one public level"
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

export function MuseumBuildingArchitecture({
  activeNodeId,
  visitorMapNearby,
  onSelectVisitorMap,
  onSceneGesture,
}: {
  activeNodeId: string;
  visitorMapNearby: boolean;
  onSelectVisitorMap: () => void;
  onSceneGesture: () => void;
}) {
  const activate = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    event.stopPropagation();
    onSceneGesture();
  };
  const kioskHost = getMuseumRuntimeNode(MUSEUM_VISITOR_MAP_KIOSK.nodeId);
  return <group onClick={activate} userData={{museumBuilding: MUSEUM_BUILDING_MANIFEST.manifestVersion}}>
    {MUSEUM_CIRCULATION_NODES.map((node) => <CirculationNode key={node.id} node={node}/>)}
    {kioskHost && <group
      position={[kioskHost.worldTransform.x, 0, kioskHost.worldTransform.z]}
      rotation={[0, kioskHost.worldTransform.yaw, 0]}
    >
      <MuseumVisitorMapKiosk
        active={activeNodeId === kioskHost.id}
        nearby={visitorMapNearby}
        onActivate={onSelectVisitorMap}
      />
    </group>}
    {MUSEUM_BUILDING_MANIFEST.reserves.map((reservation) =>
      <ReservationBarrier key={reservation.id} reservation={reservation}/>)}
  </group>;
}
