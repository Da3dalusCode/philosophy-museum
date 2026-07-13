import type {ThreeEvent} from '@react-three/fiber';
import {useMemo} from 'react';
import {Quaternion, Vector3} from 'three';
import type {
  MuseumExhibitLightDefinition,
  MuseumFurnishingDefinition,
  MuseumHallDefinition,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from '../../data/museum/museumWorldTypes';
import {usePlaqueTexture} from './plaqueTextures';

const PLASTER = '#d8cbb8';
const PLASTER_EDGE = '#bca98f';
const STONE = '#3c3834';
const THRESHOLD_STONE = '#4b4036';
const TIMBER = '#4b3022';
const BRASS = '#8b6b38';
const IRON = '#171513';
const LIGHT = '#ffe5b8';

function CellShell({cell}: {cell: MuseumSpatialCell}) {
  const width = cell.bounds.maxX - cell.bounds.minX;
  const renderMaxZ = cell.id === 'ancient-transition-passage' ? 0 : cell.bounds.maxZ;
  const renderCell = renderMaxZ === cell.bounds.maxZ ? cell : {...cell, bounds: {...cell.bounds, maxZ: renderMaxZ}};
  const depth = renderMaxZ - cell.bounds.minZ;
  const x = (cell.bounds.minX + cell.bounds.maxX) / 2;
  const z = (cell.bounds.minZ + renderMaxZ) / 2;
  const passage = cell.kind === 'passage';
  return <group userData={{spatialCellId: cell.id}}>
    <mesh position={[x, -.11, z]} receiveShadow>
      <boxGeometry args={[width, .22, depth]}/>
      <meshStandardMaterial color={passage ? THRESHOLD_STONE : STONE} roughness={.96} metalness={.01}/>
    </mesh>
    <mesh position={[x, cell.ceilingHeight + .08, z]}>
      <boxGeometry args={[width, .16, depth]}/>
      <meshStandardMaterial color="#c9baa5" roughness={.94}/>
    </mesh>
    <CeilingLamps cell={renderCell}/>
  </group>;
}

function CeilingLamps({cell}: {cell: MuseumSpatialCell}) {
  const width = cell.bounds.maxX - cell.bounds.minX;
  const depth = cell.bounds.maxZ - cell.bounds.minZ;
  const x = (cell.bounds.minX + cell.bounds.maxX) / 2;
  const z = (cell.bounds.minZ + cell.bounds.maxZ) / 2;
  const y = cell.ceilingHeight - .05;
  if (cell.kind === 'passage') return <group position={[x, y, z]}>
    <mesh><boxGeometry args={[Math.min(width - .5, 1.15), .05, Math.max(1, depth - .6)]}/><meshBasicMaterial color={LIGHT} toneMapped={false}/></mesh>
    <mesh position={[0, .03, 0]}><boxGeometry args={[Math.min(width - .3, 1.35), .09, Math.max(1.1, depth - .45)]}/><meshStandardMaterial color={BRASS} metalness={.5} roughness={.48}/></mesh>
  </group>;
  const lane = Math.min(4.8, width * .27);
  return <group>{[-lane, lane].map((offset) => <group key={offset} position={[x + offset, y, z]}>
    {[-depth * .27, 0, depth * .27].map((lampZ) => <group key={lampZ} position={[0, 0, lampZ]}>
      <mesh position={[0, .025, 0]}><cylinderGeometry args={[.34, .34, .08, 20]}/><meshStandardMaterial color={BRASS} metalness={.56} roughness={.45}/></mesh>
      <mesh position={[0, -.025, 0]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[.25, 20]}/><meshBasicMaterial color={LIGHT} toneMapped={false}/></mesh>
    </group>)}
  </group>)}</group>;
}

function GalleryWall({wall}: {wall: MuseumWallDefinition}) {
  const renderWall = wall.id === 'transition-west' || wall.id === 'transition-east'
    ? {...wall, center: {...wall.center, z: -2}, size: {...wall.size, depth: 4}}
    : wall;
  return <group position={[renderWall.center.x, renderWall.height / 2, renderWall.center.z]} rotation={[0, renderWall.rotation, 0]} userData={{wallColliderId: wall.id}}>
    <mesh receiveShadow><boxGeometry args={[renderWall.size.width, renderWall.height, renderWall.size.depth]}/><meshStandardMaterial color={PLASTER} roughness={.96}/></mesh>
    <mesh position={[0, -renderWall.height / 2 + .11, 0]}><boxGeometry args={[renderWall.size.width + .02, .22, renderWall.size.depth + .03]}/><meshStandardMaterial color={PLASTER_EDGE} roughness={.9}/></mesh>
    <mesh position={[0, renderWall.height / 2 - .14, 0]}><boxGeometry args={[renderWall.size.width + .02, .16, renderWall.size.depth + .03]}/><meshStandardMaterial color={TIMBER} roughness={.72}/></mesh>
  </group>;
}

function ThresholdFascia({connection, cells}: {connection: MuseumSpatialConnection; cells: readonly MuseumSpatialCell[]}) {
  const from = cells.find(({id}) => id === connection.fromCellId);
  const to = cells.find(({id}) => id === connection.toCellId);
  if (!from || !to) return null;
  const lowerCeiling = Math.min(from.ceilingHeight, to.ceilingHeight);
  const upperCeiling = Math.max(from.ceilingHeight, to.ceilingHeight);
  if (upperCeiling - lowerCeiling < .02) return null;
  const {openingBounds} = connection;
  const x = (openingBounds.minX + openingBounds.maxX) / 2;
  const z = (openingBounds.minZ + openingBounds.maxZ) / 2;
  const width = openingBounds.maxX - openingBounds.minX;
  const depth = Math.max(.42, openingBounds.maxZ - openingBounds.minZ);
  const height = upperCeiling - lowerCeiling + .08;
  return <group userData={{thresholdFasciaId: connection.id}}>
    <mesh position={[x, (lowerCeiling + upperCeiling) / 2, z]}>
      <boxGeometry args={[width, height, depth]}/><meshStandardMaterial color={PLASTER} roughness={.96}/>
    </mesh>
    <mesh position={[x, lowerCeiling + .07, z]}>
      <boxGeometry args={[width + .04, .14, depth + .03]}/><meshStandardMaterial color={TIMBER} roughness={.72}/>
    </mesh>
  </group>;
}

function Track({track}: {track: MuseumTrackDefinition}) {
  return <mesh position={[track.center.x, track.center.y, track.center.z]} userData={{trackId: track.id}}>
    <boxGeometry args={[track.size.width, track.size.height, track.size.depth]}/><meshStandardMaterial color={IRON} roughness={.34} metalness={.68}/>
  </mesh>;
}

function Fixture({definition}: {definition: MuseumExhibitLightDefinition}) {
  const quaternion = useMemo(() => {
    const direction = new Vector3(
      definition.target.x - definition.mountPosition.x,
      definition.target.y - definition.mountPosition.y,
      definition.target.z - definition.mountPosition.z,
    ).normalize();
    return new Quaternion().setFromUnitVectors(new Vector3(0, -1, 0), direction);
  }, [definition]);
  return <group position={[definition.mountPosition.x, definition.mountPosition.y, definition.mountPosition.z]} quaternion={quaternion}>
    <mesh position={[0, -.13, 0]}><cylinderGeometry args={[.07, .1, .32, 12]}/><meshStandardMaterial color={IRON} metalness={.68} roughness={.34}/></mesh>
    <mesh position={[0, -.3, 0]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[.085, 16]}/><meshBasicMaterial color={LIGHT} toneMapped={false}/></mesh>
  </group>;
}

function GallerySign({title, kicker, subtitle, position, width = 4.6}: {
  title: string;
  kicker: string;
  subtitle: string;
  position: readonly [number, number, number];
  width?: number;
}) {
  const texture = usePlaqueTexture({title, kicker, subtitle, accent: '#8b6b38'});
  const height = width / 4;
  return <group position={position}>
    {[-width * .34, width * .34].map((x) => <mesh key={x} position={[x, height / 2 + .28, -.045]}><cylinderGeometry args={[.012, .012, .56, 6]}/><meshStandardMaterial color={BRASS} metalness={.58} roughness={.44}/></mesh>)}
    <mesh position={[0, 0, -.04]}><boxGeometry args={[width + .14, height + .14, .08]}/><meshStandardMaterial color={TIMBER} roughness={.62}/></mesh>
    <mesh position={[0, 0, .01]}><planeGeometry args={[width, height]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
  </group>;
}

function GallerySignBack({title, kicker, subtitle, position, width = 4.6}: {
  title: string;
  kicker: string;
  subtitle: string;
  position: readonly [number, number, number];
  width?: number;
}) {
  const texture = usePlaqueTexture({title, kicker, subtitle, accent: '#8b6b38'});
  const height = width / 4;
  return <mesh position={[position[0], position[1], position[2] - .091]} rotation={[0, Math.PI, 0]}>
    <planeGeometry args={[width, height]}/><meshBasicMaterial map={texture} toneMapped={false}/>
  </mesh>;
}

function Bench({definition}: {definition: MuseumFurnishingDefinition}) {
  const {width, depth} = definition.size;
  return <group position={[definition.center.x, 0, definition.center.z]} rotation={[0, definition.rotation, 0]} userData={{furnishingId: definition.id}}>
    <mesh position={[0, .43, 0]}><boxGeometry args={[width, .16, depth]}/><meshStandardMaterial color="#6f4931" roughness={.76}/></mesh>
    {[-width * .34, width * .34].map((x) => <mesh key={x} position={[x, .21, 0]}><boxGeometry args={[.16, .42, depth * .72]}/><meshStandardMaterial color={IRON} metalness={.52} roughness={.46}/></mesh>)}
  </group>;
}

function TranslationTable({definition}: {definition: MuseumFurnishingDefinition}) {
  const texture = usePlaqueTexture({title: 'Networks of Translation', kicker: 'Greek · Syriac · Arabic · Hebrew · Latin', subtitle: 'Texts travelled through people, institutions, adaptation, and dispute.', accent: '#8b6b38'});
  const {width, depth} = definition.size;
  return <group position={[definition.center.x, 0, definition.center.z]} rotation={[0, definition.rotation, 0]} userData={{furnishingId: definition.id}}>
    <mesh position={[0, .82, 0]}><boxGeometry args={[width, .14, depth]}/><meshStandardMaterial color={TIMBER} roughness={.72}/></mesh>
    {[-width * .38, width * .38].flatMap((x) => [-depth * .3, depth * .3].map((z) => <mesh key={`${x}-${z}`} position={[x, .39, z]}><boxGeometry args={[.12, .78, .12]}/><meshStandardMaterial color={IRON} metalness={.52} roughness={.46}/></mesh>))}
    <mesh position={[0, .9, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[width - .22, depth - .16]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    {[-.72, 0, .72].map((x, index) => <group key={x} position={[x, .94, 0]} rotation={[0, index * .08 - .08, 0]}>
      <mesh><boxGeometry args={[.5, .07, .34]}/><meshStandardMaterial color={index === 1 ? '#9e7444' : '#78553a'} roughness={.8}/></mesh>
      <mesh position={[0, .041, 0]}><boxGeometry args={[.43, .016, .29]}/><meshStandardMaterial color="#d9c79f" roughness={.92}/></mesh>
    </group>)}
  </group>;
}

export function MedievalHallArchitecture({definition, onSceneGesture}: {definition: MuseumHallDefinition; onSceneGesture: () => void}) {
  const {layout} = definition;
  const activate = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    event.stopPropagation();
    onSceneGesture();
  };
  return <group onClick={activate}>
    {layout.spatialCells.map((cell) => <CellShell key={cell.id} cell={cell}/>)}
    {layout.spatialConnections.map((connection) => <ThresholdFascia key={connection.id} connection={connection} cells={layout.spatialCells}/>)}
    {layout.wallColliders.map((wall) => <GalleryWall key={wall.id} wall={wall}/>)}
    {layout.furnishings.map((item) => item.kind === 'bench' ? <Bench key={item.id} definition={item}/> : <TranslationTable key={item.id} definition={item}/>)}
    {layout.lighting.tracks.map((track) => <Track key={track.id} track={track}/>)}
    {layout.lighting.exhibitLights.map((light) => <Fixture key={light.id} definition={light}/>)}
    <GallerySign title="Late Antique Inheritance" kicker="Room I · 4th–6th centuries" subtitle="Roman worlds transformed through Christian inquiry" position={[0, 4.18, -17.76]} width={4.4}/>
    <GallerySign title="From Inheritance to Many Worlds" kicker="Greek · Syriac · Arabic · Hebrew · Latin" subtitle="Texts travelled through communities, institutions, adaptation, and dispute" position={[0, 3.3, -3.76]} width={4.2}/>
    <GallerySignBack title="Ancient Greek & Hellenistic Gallery" kicker="Return · Late Antiquity" subtitle="Neoplatonism and the ancient wing" position={[0, 3.3, -3.76]} width={4.2}/>
    <GallerySign title="Translation Networks" kicker="8th–13th centuries · courts · libraries · schools" subtitle="Greek→Syriac→Arabic · Greek→Latin · Arabic→Latin/Hebrew · Hebrew→Latin" position={[0, 3.3, -20.76]} width={5.4}/>
    <GallerySign title="Arabic & Islamic Worlds" kicker="Room II · 10th–12th centuries" subtitle="Falsafa · kalām · medicine · law · spiritual discipline" position={[0, 4.3, -34.76]} width={5.2}/>
    <GallerySign title="Jewish & Latin Scholastic Conversations" kicker="Room III · 12th–14th centuries" subtitle="Reason and revelation across Arabic, Hebrew, and Latin traditions" position={[0, 4.3, -51.76]} width={5.8}/>
  </group>;
}
