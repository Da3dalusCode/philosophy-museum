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
  MUSEUM_CANONICAL_CEILING_MATERIAL,
  MUSEUM_CANONICAL_WALL_EDGE_MATERIAL,
  resolveMuseumWallMaterial,
  type MuseumWallMaterialSpec,
} from '../../data/museum/museumArchitectureMaterials';
import {
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_PALETTE,
} from '../../data/museum/mediterraneanGalleryCuration';
import {
  RENAISSANCE_GALLERY_ID,
  RENAISSANCE_PALETTE,
} from '../../data/museum/renaissanceGalleryCuration';
import {
  MUSEUM_TEXTURE_SPECS,
  museumTextureDimensionsForPlane,
} from '../../data/museum/museumTexturePolicy';
import {resolveMuseumWallRenderGeometry} from '../../data/museum/museumWallGeometry';
import {MuseumTemplateInterfaces} from './MuseumTemplateInterfaces';
import {usePlaqueTexture} from './plaqueTextures';

const FLOOR = '#4e4b45';
const FLOOR_PASSAGE = '#5b554d';
const BLACK_METAL = '#151617';
const BRONZE = '#8b6b43';
const LUMINOUS = '#fff3dc';
const SIGN_REAR = '#d8d2c7';

function CellShell({cell, renaissance, forum}: {
  cell: MuseumSpatialCell;
  renaissance: boolean;
  forum: boolean;
}) {
  const bounds = cell.renderBounds ?? cell.bounds;
  const width = bounds.maxX - bounds.minX;
  const depth = bounds.maxZ - bounds.minZ;
  const x = (bounds.minX + bounds.maxX) / 2;
  const z = (bounds.minZ + bounds.maxZ) / 2;
  const renderCell = bounds === cell.bounds ? cell : {...cell, bounds};
  return <group userData={{
    spatialCellId: cell.id,
    museumStructuralId: `cell:${cell.id}`,
  }}>
    <mesh position={[x, -.11, z]} receiveShadow>
      <boxGeometry args={[width, .22, depth]}/>
      <meshStandardMaterial
        color={cell.kind === 'passage'
          ? FLOOR_PASSAGE
          : forum
            ? '#3f3b34'
            : renaissance
              ? '#443a33'
              : FLOOR}
        roughness={.82}
        metalness={.012}
      />
    </mesh>
    <mesh position={[x, cell.ceilingHeight + .09, z]}>
      <boxGeometry args={[width, .18, depth]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_CEILING_MATERIAL}/>
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
    <meshStandardMaterial color="#e4d7bf" emissive={LUMINOUS} emissiveIntensity={1.05} roughness={.72}/>
  </mesh>;
  const run = Math.max(3, (alongZ ? depth : width) - 4);
  const offset = Math.min(5, (alongZ ? width : depth) * .23);
  return <group>{[-offset, offset].map((lane) => <mesh key={lane} position={alongZ ? [x + lane, y, z] : [x, y, z + lane]}>
    <boxGeometry args={alongZ ? [.7, .035, run] : [run, .035, .7]}/>
    <meshStandardMaterial color="#e4d7bf" emissive={LUMINOUS} emissiveIntensity={1.05} roughness={.72}/>
  </mesh>)}</group>;
}

function GalleryWall({wall, wallMaterial}: {wall: MuseumWallDefinition; wallMaterial: MuseumWallMaterialSpec}) {
  const bottom = wall.bottom ?? 0;
  const {center, size, longAxis} = resolveMuseumWallRenderGeometry(wall);
  const edgeSize = longAxis === 'width'
    ? {width: size.width, depth: size.depth + .025}
    : {width: size.width + .025, depth: size.depth};
  return <group position={[center.x, bottom + wall.height / 2, center.z]} rotation={[0, wall.rotation, 0]} userData={{wallColliderId: wall.id, openingId: wall.openingId}}>
    <mesh receiveShadow><boxGeometry args={[size.width, wall.height, size.depth]}/><meshStandardMaterial {...wallMaterial}/></mesh>
    {bottom === 0 && <mesh position={[0, -wall.height / 2 + .075, 0]}><boxGeometry args={[edgeSize.width, .15, edgeSize.depth]}/><meshStandardMaterial {...MUSEUM_CANONICAL_WALL_EDGE_MATERIAL}/></mesh>}
  </group>;
}

function ThresholdFascia({connection, cells, wallMaterial}: {connection: MuseumSpatialConnection; cells: readonly MuseumSpatialCell[]; wallMaterial: MuseumWallMaterialSpec}) {
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
  return <mesh position={[x, (lower + upper) / 2, z]} userData={{
    thresholdFasciaId: connection.id,
    museumStructuralId: `threshold-fascia:${connection.id}`,
  }}>
    <boxGeometry args={[width, upper - lower + .08, depth]}/>
    <meshStandardMaterial {...wallMaterial}/>
  </mesh>;
}

function Track({track}: {track: MuseumTrackDefinition}) {
  return <mesh position={[track.center.x, track.center.y, track.center.z]} userData={{
    trackId: track.id,
    museumStructuralId: `track:${track.id}`,
  }}>
    <boxGeometry args={[track.size.width, track.size.height, track.size.depth]}/>
    <meshStandardMaterial color="#252729" roughness={.56} metalness={.32}/>
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
  return <group
    position={[definition.mountPosition.x, definition.mountPosition.y, definition.mountPosition.z]}
    quaternion={quaternion}
    userData={{museumStructuralId: `fixture:${definition.id}`}}
  >
    <mesh position={[0, -.13, 0]}><cylinderGeometry args={[.065, .095, .3, 12]}/><meshStandardMaterial color="#252729" metalness={.3} roughness={.54}/></mesh>
    <mesh position={[0, -.29, 0]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[.08, 16]}/><meshStandardMaterial color="#eadcc4" emissive={LUMINOUS} emissiveIntensity={1.15} roughness={.68}/></mesh>
  </group>;
}

function Bench({definition, mediterranean}: {definition: MuseumFurnishingDefinition; mediterranean: boolean}) {
  const {width, depth} = definition.size;
  return <group position={[definition.center.x, 0, definition.center.z]} rotation={[0, definition.rotation, 0]} userData={{
    furnishingId: definition.id,
    museumStructuralId: `furnishing:${definition.id}`,
  }}>
    <mesh position={[0, .43, 0]}><boxGeometry args={[width, .16, depth]}/><meshStandardMaterial color={mediterranean ? '#9b644a' : '#756957'} roughness={.78}/></mesh>
    {[-width * .34, width * .34].map((x) => <mesh key={x} position={[x, .21, 0]}><boxGeometry args={[.14, .42, depth * .72]}/><meshStandardMaterial color={BLACK_METAL} metalness={.52} roughness={.46}/></mesh>)}
  </group>;
}

const physicalSignPresentation = ({definition, mediterranean, renaissance}: {
  definition: MuseumSignDefinition;
  mediterranean: boolean;
  renaissance: boolean;
}) => {
  const museumIdentity = mediterranean && definition.kind === 'entrance';
  const accent = museumIdentity
    ? '#b88b4a'
    : mediterranean
    ? definition.kind === 'entrance' ? MEDITERRANEAN_PALETTE.terracotta : definition.kind === 'wayfinding' ? MEDITERRANEAN_PALETTE.aegean : MEDITERRANEAN_PALETTE.ochre
    : renaissance
      ? definition.kind === 'entrance' ? RENAISSANCE_PALETTE.agedBrass : definition.kind === 'wayfinding' ? RENAISSANCE_PALETTE.inkBlue : RENAISSANCE_PALETTE.oxblood
      : definition.kind === 'entrance' ? '#7b5d3d' : definition.kind === 'wayfinding' ? '#486d70' : BRONZE;
  return {accent, museumIdentity};
};

function PhysicalSignStructure({definition, mediterranean, renaissance}: {
  definition: MuseumSignDefinition;
  mediterranean: boolean;
  renaissance: boolean;
}) {
  const {accent, museumIdentity} = physicalSignPresentation({
    definition,
    mediterranean,
    renaissance,
  });
  return <>
    <mesh position={[0, 0, -.04]}><boxGeometry args={[definition.width + .1, definition.height + .1, .07]}/><meshStandardMaterial color={mediterranean && !museumIdentity ? SIGN_REAR : BLACK_METAL} roughness={mediterranean && !museumIdentity ? .86 : .52} metalness={mediterranean && !museumIdentity ? .02 : .42}/></mesh>
    {!mediterranean && <>
      <mesh position={[0, 0, -.077]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[definition.width, definition.height]}/>
        <meshStandardMaterial color={renaissance ? RENAISSANCE_PALETTE.walnutEdge : SIGN_REAR} roughness={.88} metalness={.02}/>
      </mesh>
      <mesh position={[0, -definition.height * .36, -.079]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[definition.width * .72, .026]}/>
        <meshStandardMaterial color={accent} roughness={.42} metalness={.38}/>
      </mesh>
    </>}
  </>;
}

function PhysicalSignFace({definition, mediterranean, renaissance}: {
  definition: MuseumSignDefinition;
  mediterranean: boolean;
  renaissance: boolean;
}) {
  const {accent, museumIdentity} = physicalSignPresentation({
    definition,
    mediterranean,
    renaissance,
  });
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
  return <mesh position={[0, 0, .002]} userData={{museumSignFaceId: definition.id}}>
    <planeGeometry args={[definition.width, definition.height]}/>
    <meshBasicMaterial map={texture} toneMapped={false}/>
  </mesh>;
}

function PhysicalSign({definition, mediterranean, renaissance, includeFace}: {
  definition: MuseumSignDefinition;
  mediterranean: boolean;
  renaissance: boolean;
  includeFace: boolean;
}) {
  const twoSidedEntrance = mediterranean && definition.kind === 'entrance';
  return <group
    position={[definition.position.x, definition.position.y, definition.position.z]}
    rotation={[0, definition.rotationY, 0]}
    userData={{
      museumSignId: definition.id,
      museumSignKind: definition.kind,
      museumStructuralId: `sign-body:${definition.id}`,
    }}
  >
    <PhysicalSignStructure
      definition={definition}
      mediterranean={mediterranean}
      renaissance={renaissance}
    />
    {includeFace && <>
      <PhysicalSignFace
        definition={definition}
        mediterranean={mediterranean}
        renaissance={renaissance}
      />
      {twoSidedEntrance && <group position={[0, 0, -.08]} rotation={[0, Math.PI, 0]}>
        <PhysicalSignFace
          definition={definition}
          mediterranean={mediterranean}
          renaissance={renaissance}
        />
      </group>}
    </>}
  </group>;
}

/** Texture-bearing sign faces that remain tied to lazy hall-content residency. */
export function ContemporaryHallSignFaces({definition}: {
  definition: MuseumHallDefinition;
}) {
  const mediterranean = definition.id === MEDITERRANEAN_GALLERY_ID;
  const renaissance = definition.id === RENAISSANCE_GALLERY_ID;
  return <group userData={{museumResidentSignFacesFor: definition.id}}>
    {definition.layout.signs?.map((sign) => <group
      key={sign.id}
      position={[sign.position.x, sign.position.y, sign.position.z]}
      rotation={[0, sign.rotationY, 0]}
    >
      <PhysicalSignFace
        definition={sign}
        mediterranean={mediterranean}
        renaissance={renaissance}
      />
    </group>)}
  </group>;
}

export function ContemporaryHallArchitecture({
  definition,
  architectureWalls = definition.architectureWalls,
  ownedPortalIds,
  includeSignFaces = true,
  onSceneGesture,
}: {
  definition: MuseumHallDefinition;
  architectureWalls?: readonly MuseumWallDefinition[];
  ownedPortalIds?: ReadonlySet<string>;
  includeSignFaces?: boolean;
  onSceneGesture: () => void;
}) {
  const {layout} = definition;
  const mediterranean = definition.id === MEDITERRANEAN_GALLERY_ID;
  const renaissance = definition.id === RENAISSANCE_GALLERY_ID;
  const forum = definition.id === 'core-questions-forum';
  const wallMaterial = resolveMuseumWallMaterial(definition.id);
  const activate = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    event.stopPropagation();
    onSceneGesture();
  };
  return <group onClick={activate}>
    {layout.spatialCells.map((cell) => <CellShell key={cell.id} cell={cell} renaissance={renaissance} forum={forum}/>)}
    {forum && <group userData={{forumCirculationCross: true}}>
      <mesh position={[0, .012, 0]}><boxGeometry args={[27.2, .014, .055]}/><meshStandardMaterial color={BRONZE} roughness={.5} metalness={.38}/></mesh>
      <mesh position={[0, .013, 0]}><boxGeometry args={[.055, .015, 27.2]}/><meshStandardMaterial color={BRONZE} roughness={.5} metalness={.38}/></mesh>
      <mesh position={[0, .016, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[.55, .64, 48]}/><meshStandardMaterial color={BRONZE} roughness={.45} metalness={.42}/></mesh>
    </group>}
    {layout.spatialConnections.map((connection) => <ThresholdFascia key={connection.id} connection={connection} cells={layout.spatialCells} wallMaterial={wallMaterial}/>)}
    {architectureWalls.map((wall) => <GalleryWall key={wall.id} wall={wall} wallMaterial={wallMaterial}/>)}
    <MuseumTemplateInterfaces definition={definition} ownedPortalIds={ownedPortalIds}/>
    {layout.furnishings.filter(({kind}) => kind === 'bench').map((item) => <Bench key={item.id} definition={item} mediterranean={mediterranean}/>)}
    {layout.lighting.tracks.map((track) => <Track key={track.id} track={track}/>)}
    {layout.lighting.exhibitLights.map((light) => <Fixture key={light.id} definition={light}/>)}
    {layout.signs?.map((sign) => <PhysicalSign
      key={sign.id}
      definition={sign}
      mediterranean={mediterranean}
      renaissance={renaissance}
      includeFace={includeSignFaces}
    />)}
  </group>;
}
