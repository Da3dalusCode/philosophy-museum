import type {ThreeEvent} from '@react-three/fiber';
import {useMemo} from 'react';
import {Quaternion, Vector3} from 'three';
import type {
  MuseumExhibitLightDefinition,
  MuseumFurnishingDefinition,
  MuseumHallDefinition,
  MuseumSignDefinition,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from '../../data/museum/museumWorldTypes';
import {
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_PALETTE,
} from '../../data/museum/mediterraneanGalleryCuration';
import {
  MUSEUM_TEXTURE_SPECS,
  museumTextureDimensionsForPlane,
} from '../../data/museum/museumTexturePolicy';
import {MuseumTemplateInterfaces} from './MuseumTemplateInterfaces';
import {usePlaqueTexture} from './plaqueTextures';

const WALL = '#eeeae2';
const WALL_EDGE = '#d9d4ca';
const CEILING = '#e7e3dc';
const FLOOR = '#4e4b45';
const FLOOR_PASSAGE = '#5b554d';
const BLACK_METAL = '#151617';
const BRONZE = '#8b6b43';
const LUMINOUS = '#fff3dc';
const SIGN_REAR = '#d8d2c7';

function CellShell({cell}: {cell: MuseumSpatialCell}) {
  const bounds = cell.renderBounds ?? cell.bounds;
  const width = bounds.maxX - bounds.minX;
  const depth = bounds.maxZ - bounds.minZ;
  const x = (bounds.minX + bounds.maxX) / 2;
  const z = (bounds.minZ + bounds.maxZ) / 2;
  const renderCell = bounds === cell.bounds ? cell : {...cell, bounds};
  return <group userData={{spatialCellId: cell.id}}>
    <mesh position={[x, -.11, z]} receiveShadow>
      <boxGeometry args={[width, .22, depth]}/>
      <meshStandardMaterial
        color={cell.kind === 'passage' ? FLOOR_PASSAGE : FLOOR}
        roughness={.94}
        metalness={.012}
      />
    </mesh>
    <mesh position={[x, cell.ceilingHeight + .09, z]}>
      <boxGeometry args={[width, .18, depth]}/>
      <meshStandardMaterial color={CEILING} roughness={.9}/>
    </mesh>
    <CeilingLightStrips cell={renderCell}/>
  </group>;
}

function CeilingLightStrips({cell}: {cell: MuseumSpatialCell}) {
  const width = cell.bounds.maxX - cell.bounds.minX;
  const depth = cell.bounds.maxZ - cell.bounds.minZ;
  const x = (cell.bounds.minX + cell.bounds.maxX) / 2;
  const z = (cell.bounds.minZ + cell.bounds.maxZ) / 2;
  const y = cell.ceilingHeight - .015;
  const alongZ = depth >= width;
  if (cell.kind === 'passage') return <mesh position={[x, y, z]}>
    <boxGeometry args={alongZ ? [1.02, .035, Math.max(1.1, depth - .65)] : [Math.max(1.1, width - .65), .035, 1.02]}/>
    <meshBasicMaterial color={LUMINOUS} toneMapped={false}/>
  </mesh>;
  const run = Math.max(3, (alongZ ? depth : width) - 4);
  const offset = Math.min(5, (alongZ ? width : depth) * .23);
  return <group>{[-offset, offset].map((lane) => <mesh key={lane} position={alongZ ? [x + lane, y, z] : [x, y, z + lane]}>
    <boxGeometry args={alongZ ? [.7, .035, run] : [run, .035, .7]}/>
    <meshBasicMaterial color={LUMINOUS} toneMapped={false}/>
  </mesh>)}</group>;
}

function GalleryWall({wall}: {wall: MuseumWallDefinition}) {
  const bottom = wall.bottom ?? 0;
  const center = wall.renderCenter ?? wall.center;
  const size = wall.renderSize ?? wall.size;
  return <group position={[center.x, bottom + wall.height / 2, center.z]} rotation={[0, wall.rotation, 0]} userData={{wallColliderId: wall.id, openingId: wall.openingId}}>
    <mesh receiveShadow><boxGeometry args={[size.width, wall.height, size.depth]}/><meshStandardMaterial color={WALL} roughness={.95}/></mesh>
    {bottom === 0 && <mesh position={[0, -wall.height / 2 + .075, 0]}><boxGeometry args={[size.width + .015, .15, size.depth + .025]}/><meshStandardMaterial color={WALL_EDGE} roughness={.86}/></mesh>}
  </group>;
}

function ThresholdFascia({connection, cells}: {connection: MuseumSpatialConnection; cells: readonly MuseumSpatialCell[]}) {
  const from = cells.find(({id}) => id === connection.fromCellId);
  const to = cells.find(({id}) => id === connection.toCellId);
  if (!from || !to) return null;
  const lower = Math.min(from.ceilingHeight, to.ceilingHeight);
  const upper = Math.max(from.ceilingHeight, to.ceilingHeight);
  if (upper - lower < .02) return null;
  const {openingBounds} = connection;
  const x = (openingBounds.minX + openingBounds.maxX) / 2;
  const z = (openingBounds.minZ + openingBounds.maxZ) / 2;
  const width = Math.max(.42, openingBounds.maxX - openingBounds.minX);
  const depth = Math.max(.42, openingBounds.maxZ - openingBounds.minZ);
  return <mesh position={[x, (lower + upper) / 2, z]} userData={{thresholdFasciaId: connection.id}}>
    <boxGeometry args={[width, upper - lower + .08, depth]}/>
    <meshStandardMaterial color={WALL} roughness={.95}/>
  </mesh>;
}

function Track({track}: {track: MuseumTrackDefinition}) {
  return <mesh position={[track.center.x, track.center.y, track.center.z]} userData={{trackId: track.id}}>
    <boxGeometry args={[track.size.width, track.size.height, track.size.depth]}/>
    <meshStandardMaterial color={BLACK_METAL} roughness={.3} metalness={.72}/>
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
    <mesh position={[0, -.13, 0]}><cylinderGeometry args={[.065, .095, .3, 12]}/><meshStandardMaterial color={BLACK_METAL} metalness={.7} roughness={.32}/></mesh>
    <mesh position={[0, -.29, 0]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[.08, 16]}/><meshBasicMaterial color={LUMINOUS} toneMapped={false}/></mesh>
  </group>;
}

function Bench({definition, mediterranean}: {definition: MuseumFurnishingDefinition; mediterranean: boolean}) {
  const {width, depth} = definition.size;
  return <group position={[definition.center.x, 0, definition.center.z]} rotation={[0, definition.rotation, 0]} userData={{furnishingId: definition.id}}>
    <mesh position={[0, .43, 0]}><boxGeometry args={[width, .16, depth]}/><meshStandardMaterial color={mediterranean ? '#9b644a' : '#756957'} roughness={.78}/></mesh>
    {[-width * .34, width * .34].map((x) => <mesh key={x} position={[x, .21, 0]}><boxGeometry args={[.14, .42, depth * .72]}/><meshStandardMaterial color={BLACK_METAL} metalness={.52} roughness={.46}/></mesh>)}
  </group>;
}

function PhysicalSign({definition, mediterranean}: {definition: MuseumSignDefinition; mediterranean: boolean}) {
  const museumIdentity = mediterranean && definition.kind === 'entrance';
  const accent = museumIdentity
    ? '#b88b4a'
    : mediterranean
    ? definition.kind === 'entrance' ? MEDITERRANEAN_PALETTE.terracotta : definition.kind === 'wayfinding' ? MEDITERRANEAN_PALETTE.aegean : MEDITERRANEAN_PALETTE.ochre
    : definition.kind === 'entrance' ? '#7b5d3d' : definition.kind === 'wayfinding' ? '#486d70' : BRONZE;
  const referenceWidth = mediterranean ? 600 : MUSEUM_TEXTURE_SPECS.contemporarySignWidth;
  const referenceHeight = Math.round(
    referenceWidth * definition.height / definition.width,
  );
  const textureSize = museumTextureDimensionsForPlane(
    definition.width,
    definition.height,
    {width: referenceWidth, height: referenceHeight, mipmaps: true},
  );
  const texture = usePlaqueTexture({
    title: definition.title,
    kicker: definition.kicker,
    subtitle: definition.subtitle,
    accent,
    width: textureSize.width,
    height: textureSize.height,
    theme: mediterranean && !museumIdentity ? 'mediterranean' : 'dark',
  });
  return <group
    position={[definition.position.x, definition.position.y, definition.position.z]}
    rotation={[0, definition.rotationY, 0]}
    userData={{museumSignId: definition.id, museumSignKind: definition.kind}}
  >
    <mesh position={[0, 0, -.04]}><boxGeometry args={[definition.width + .1, definition.height + .1, .07]}/><meshStandardMaterial color={mediterranean && !museumIdentity ? SIGN_REAR : BLACK_METAL} roughness={mediterranean && !museumIdentity ? .86 : .52} metalness={mediterranean && !museumIdentity ? .02 : .42}/></mesh>
    <mesh position={[0, 0, .002]}><planeGeometry args={[definition.width, definition.height]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    {!mediterranean && <>
      <mesh position={[0, 0, -.077]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[definition.width, definition.height]}/>
        <meshStandardMaterial color={SIGN_REAR} roughness={.88} metalness={.02}/>
      </mesh>
      <mesh position={[0, -definition.height * .36, -.079]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[definition.width * .72, .026]}/>
        <meshStandardMaterial color={accent} roughness={.42} metalness={.38}/>
      </mesh>
    </>}
  </group>;
}

export function ContemporaryHallArchitecture({definition, onSceneGesture}: {definition: MuseumHallDefinition; onSceneGesture: () => void}) {
  const {layout} = definition;
  const mediterranean = definition.id === MEDITERRANEAN_GALLERY_ID;
  const activate = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    event.stopPropagation();
    onSceneGesture();
  };
  return <group onClick={activate}>
    {layout.spatialCells.map((cell) => <CellShell key={cell.id} cell={cell}/>)}
    {layout.spatialConnections.map((connection) => <ThresholdFascia key={connection.id} connection={connection} cells={layout.spatialCells}/>)}
    {definition.architectureWalls.map((wall) => <GalleryWall key={wall.id} wall={wall}/>)}
    <MuseumTemplateInterfaces definition={definition}/>
    {layout.furnishings.filter(({kind}) => kind === 'bench').map((item) => <Bench key={item.id} definition={item} mediterranean={mediterranean}/>)}
    {layout.lighting.tracks.map((track) => <Track key={track.id} track={track}/>)}
    {layout.lighting.exhibitLights.map((light) => <Fixture key={light.id} definition={light}/>)}
    {layout.signs?.map((sign) => <PhysicalSign key={sign.id} definition={sign} mediterranean={mediterranean}/>)}
  </group>;
}
