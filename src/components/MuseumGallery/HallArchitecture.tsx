import type {ThreeEvent} from '@react-three/fiber';
import {useMemo} from 'react';
import {Quaternion, Vector3} from 'three';
import type {
  MuseumExhibitLightDefinition,
  MuseumHallDefinition,
  MuseumSpatialCell,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from '../../data/museum/museumWorldTypes';
import {usePlaqueTexture} from './plaqueTextures';

const WALL = '#eeeae2';
const WALL_EDGE = '#d9d4ca';
const CEILING = '#e7e3dc';
const FLOOR = '#1d1c1a';
const FLOOR_PASSAGE = '#24221f';
const BLACK_METAL = '#151617';
const LUMINOUS = '#fff3dc';

function CellShell({cell}: {cell: MuseumSpatialCell}) {
  const width = cell.bounds.maxX - cell.bounds.minX;
  const depth = cell.bounds.maxZ - cell.bounds.minZ;
  const x = (cell.bounds.minX + cell.bounds.maxX) / 2;
  const z = (cell.bounds.minZ + cell.bounds.maxZ) / 2;
  const floorColor = cell.kind === 'passage' ? FLOOR_PASSAGE : FLOOR;
  return <group userData={{spatialCellId: cell.id}}>
    <mesh position={[x, -.11, z]} receiveShadow>
      <boxGeometry args={[width, .22, depth]}/>
      <meshStandardMaterial color={floorColor} roughness={.93} metalness={.015}/>
    </mesh>
    <mesh position={[x, cell.ceilingHeight + .09, z]}>
      <boxGeometry args={[width, .18, depth]}/>
      <meshStandardMaterial color={CEILING} roughness={.88}/>
    </mesh>
    <CeilingLightStrips cell={cell}/>
  </group>;
}

function CeilingLightStrips({cell}: {cell: MuseumSpatialCell}) {
  const width = cell.bounds.maxX - cell.bounds.minX;
  const depth = cell.bounds.maxZ - cell.bounds.minZ;
  const x = (cell.bounds.minX + cell.bounds.maxX) / 2;
  const z = (cell.bounds.minZ + cell.bounds.maxZ) / 2;
  const y = cell.ceilingHeight - .015;

  if (cell.kind === 'passage') {
    const alongZ = depth >= width;
    return <mesh position={[x, y, z]}>
      <boxGeometry args={alongZ ? [1.05, .035, Math.max(1.2, depth - .7)] : [Math.max(1.2, width - .7), .035, 1.05]}/>
      <meshBasicMaterial color={LUMINOUS} toneMapped={false}/>
    </mesh>;
  }

  const alongZ = depth >= width;
  const run = Math.max(3, (alongZ ? depth : width) - 4);
  const offset = Math.min(5, (alongZ ? width : depth) * .23);
  return <group>
    {[-offset, offset].map((lane) => <mesh
      key={lane}
      position={alongZ ? [x + lane, y, z] : [x, y, z + lane]}
    >
      <boxGeometry args={alongZ ? [.72, .035, run] : [run, .035, .72]}/>
      <meshBasicMaterial color={LUMINOUS} toneMapped={false}/>
    </mesh>)}
  </group>;
}

function GalleryWall({wall}: {wall: MuseumWallDefinition}) {
  return <group
    position={[wall.center.x, wall.height / 2, wall.center.z]}
    rotation={[0, wall.rotation, 0]}
    userData={{wallColliderId: wall.id}}
  >
    <mesh receiveShadow>
      <boxGeometry args={[wall.size.width, wall.height, wall.size.depth]}/>
      <meshStandardMaterial color={WALL} roughness={.94}/>
    </mesh>
    <mesh position={[0, -wall.height / 2 + .075, 0]}>
      <boxGeometry args={[wall.size.width + .015, .15, wall.size.depth + .025]}/>
      <meshStandardMaterial color={WALL_EDGE} roughness={.84}/>
    </mesh>
  </group>;
}

function LightingTrack({track}: {track: MuseumTrackDefinition}) {
  return <mesh position={[track.center.x, track.center.y, track.center.z]} userData={{trackId: track.id}}>
    <boxGeometry args={[track.size.width, track.size.height, track.size.depth]}/>
    <meshStandardMaterial color={BLACK_METAL} roughness={.3} metalness={.72}/>
  </mesh>;
}

function TrackFixture({definition}: {definition: MuseumExhibitLightDefinition}) {
  const quaternion = useMemo(() => {
    const direction = new Vector3(
      definition.target.x - definition.mountPosition.x,
      definition.target.y - definition.mountPosition.y,
      definition.target.z - definition.mountPosition.z,
    ).normalize();
    return new Quaternion().setFromUnitVectors(new Vector3(0, -1, 0), direction);
  }, [definition.mountPosition.x, definition.mountPosition.y, definition.mountPosition.z, definition.target.x, definition.target.y, definition.target.z]);
  return <group
    position={[definition.mountPosition.x, definition.mountPosition.y, definition.mountPosition.z]}
    quaternion={quaternion}
    userData={{trackId: definition.trackId, exhibitId: definition.exhibitId}}
  >
    <mesh position={[0, -.08, 0]}>
      <cylinderGeometry args={[.055, .055, .18, 10]}/>
      <meshStandardMaterial color={BLACK_METAL} roughness={.28} metalness={.7}/>
    </mesh>
    <mesh position={[0, -.23, 0]}>
      <cylinderGeometry args={[.13, .085, .22, 12]}/>
      <meshStandardMaterial color={BLACK_METAL} roughness={.3} metalness={.68}/>
    </mesh>
    <mesh position={[0, -.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <circleGeometry args={[.075, 16]}/>
      <meshBasicMaterial color={LUMINOUS} toneMapped={false}/>
    </mesh>
  </group>;
}

function GallerySign({
  title,
  kicker,
  subtitle,
  position,
  rotationY = 0,
  width = 4.4,
}: {
  title: string;
  kicker: string;
  subtitle: string;
  position: readonly [number, number, number];
  rotationY?: number;
  width?: number;
}) {
  const texture = usePlaqueTexture({title, kicker, subtitle, accent: '#7b5d3d'});
  const height = width / 4;
  return <group position={position} rotation={[0, rotationY, 0]}>
    <mesh position={[0, 0, -.035]}>
      <boxGeometry args={[width + .12, height + .12, .07]}/>
      <meshStandardMaterial color={BLACK_METAL} roughness={.38} metalness={.58}/>
    </mesh>
    <mesh position={[0, 0, .01]}>
      <planeGeometry args={[width, height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

export function HallArchitecture({definition, onSceneGesture}: {
  definition: MuseumHallDefinition;
  onSceneGesture: () => void;
}) {
  const {layout} = definition;
  const activateScene = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    event.stopPropagation();
    onSceneGesture();
  };
  return <group onClick={activateScene}>
    {layout.spatialCells.map((cell) => <CellShell key={cell.id} cell={cell}/>)}
    {layout.wallColliders.map((wall) => <GalleryWall key={wall.id} wall={wall}/>)}
    {layout.lighting.tracks.map((track) => <LightingTrack key={track.id} track={track}/>)}
    {layout.lighting.exhibitLights.map((light) => <TrackFixture key={light.id} definition={light}/>)}

    <GallerySign
      title="Ancient Greek Thought"
      kicker="Orientation gallery"
      subtitle="Questions become schools, practices, and inheritances"
      position={[0, 4.55, 44.78]}
      rotationY={Math.PI}
      width={5.8}
    />
    <GallerySign
      title="Classical Foundations"
      kicker="Gallery 01"
      subtitle="Socrates · Plato · Aristotle"
      position={[0, 4.15, 21.79]}
      width={4.7}
    />
    <GallerySign
      title="Hellenistic Ways of Life"
      kicker="Gallery 02"
      subtitle="Practice · freedom · judgment · flourishing"
      position={[16, 4.15, -3.79]}
      width={5.2}
    />
    <GallerySign
      title="Late Antiquity"
      kicker="Gallery 03"
      subtitle="Unity · intellect · soul · return"
      position={[-13, 4.35, -37.79]}
      width={4.7}
    />
  </group>;
}
