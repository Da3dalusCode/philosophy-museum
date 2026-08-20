import type {ThreeEvent} from '@react-three/fiber';
import {useLayoutEffect, useMemo, useRef} from 'react';
import {
  BackSide,
  BoxGeometry,
  CircleGeometry,
  CylinderGeometry,
  Matrix4,
  MeshStandardMaterial,
  Path,
  PlaneGeometry,
  Quaternion,
  RingGeometry,
  Shape,
  ShapeGeometry,
  TorusGeometry,
  Vector3,
  type BufferGeometry,
  type InstancedMesh,
  type Material,
} from 'three';
import type {
  MuseumExhibitLightDefinition,
  MuseumAmbientDiffuserDefinition,
  MuseumCirculationDownlightDefinition,
  MuseumFurnishingDefinition,
  MuseumHallDefinition,
  MuseumLightingDefinition,
  MuseumLightingFixtureDefinition,
  MuseumPassageIlluminatorDefinition,
  MuseumSignDefinition,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from '../../data/museum/museumWorldTypes';
import {GALLERY_02_RECESS_PROFILE} from '../../data/museum/galleryLightingPrototypes';
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
const TRACK_GEOMETRY = new BoxGeometry(1, 1, 1);
const TRACK_HEAD_BODY_GEOMETRY = new BoxGeometry(.14, .3, .13);
const TRACK_HEAD_LENS_GEOMETRY = new CircleGeometry(.075, 6);
const RECESSED_LENS_GEOMETRY = new CircleGeometry(.135, 8);
const WALL_WASHER_APERTURE_GEOMETRY = new PlaneGeometry(1, 1);
const PROTOTYPE_TRACK_HEAD_BODY_GEOMETRY = new CylinderGeometry(.105, .13, .28, 32);
const PROTOTYPE_TRACK_HEAD_SNOOT_GEOMETRY = new CylinderGeometry(.09, .105, .16, 48, 1, true);
const PROTOTYPE_TRACK_HEAD_LENS_GEOMETRY = new CircleGeometry(.076, 64);
const PROTOTYPE_TRACK_HEAD_YOKE_GEOMETRY = new TorusGeometry(.14, .022, 12, 48);
const PROTOTYPE_RECESSED_TRIM_GEOMETRY = new RingGeometry(.145, .215, 96);
const PROTOTYPE_RECESSED_BAFFLE_GEOMETRY = new CylinderGeometry(
  .14,
  .112,
  GALLERY_02_RECESS_PROFILE.baffleDepth,
  64,
  1,
  true,
);
const PROTOTYPE_RECESSED_GIMBAL_GEOMETRY = new TorusGeometry(.13, .021, 16, 64);
const PROTOTYPE_RECESSED_LENS_GEOMETRY = new CircleGeometry(.104, 64);
// Production rollout fixtures stay circular at their rendered size while
// avoiding the prototype-study tessellation cost across 24 permanent halls.
// The locked Gallery 01/02 references continue to use the geometries above.
const ROLLOUT_TRACK_HEAD_BODY_GEOMETRY = new CylinderGeometry(.105, .13, .28, 16);
const ROLLOUT_TRACK_HEAD_SNOOT_GEOMETRY = new CylinderGeometry(.09, .105, .16, 16, 1, true);
const ROLLOUT_TRACK_HEAD_LENS_GEOMETRY = new CircleGeometry(.076, 16);
const ROLLOUT_TRACK_HEAD_YOKE_GEOMETRY = new TorusGeometry(.14, .022, 6, 16);
const ROLLOUT_RECESSED_TRIM_GEOMETRY = new RingGeometry(.145, .215, 24);
const ROLLOUT_RECESSED_BAFFLE_GEOMETRY = new CylinderGeometry(
  .14,
  .112,
  GALLERY_02_RECESS_PROFILE.baffleDepth,
  24,
  1,
  true,
);
const ROLLOUT_RECESSED_GIMBAL_GEOMETRY = new TorusGeometry(.13, .021, 6, 16);
const ROLLOUT_RECESSED_LENS_GEOMETRY = new CircleGeometry(.104, 16);
const FIXTURE_DARK_MATERIAL = new MeshStandardMaterial({
  color: '#252729',
  metalness: .3,
  roughness: .54,
});
const FIXTURE_LENS_MATERIAL = new MeshStandardMaterial({
  color: '#eadcc4',
  emissive: LUMINOUS,
  emissiveIntensity: 1.04,
  roughness: .7,
});
const PROTOTYPE_BLACK_MATERIAL = new MeshStandardMaterial({
  color: '#050606',
  metalness: .22,
  roughness: .46,
});
const PROTOTYPE_RECESS_BAFFLE_MATERIAL = new MeshStandardMaterial({
  color: '#050606',
  metalness: .14,
  roughness: .58,
  side: BackSide,
});
const CEILING_TRIM_MATERIAL = new MeshStandardMaterial({
  ...MUSEUM_CANONICAL_CEILING_MATERIAL,
});
const PROTOTYPE_3000K_STANDARD_MATERIAL = new MeshStandardMaterial({
  color: '#ffd6a0',
  emissive: '#ffd6a0',
  emissiveIntensity: .72,
  roughness: .62,
});
const PROTOTYPE_3000K_ANCHOR_MATERIAL = new MeshStandardMaterial({
  color: '#ffd6a0',
  emissive: '#ffd6a0',
  emissiveIntensity: 1.152,
  roughness: .62,
});
const PROTOTYPE_3000K_CIRCULATION_MATERIAL = new MeshStandardMaterial({
  color: '#ffd6a0',
  emissive: '#ffd6a0',
  emissiveIntensity: .82,
  roughness: .68,
});
const PROTOTYPE_DIFFUSER_MATERIAL = new MeshStandardMaterial({
  color: '#f4d1a0',
  emissive: '#ffd6a0',
  emissiveIntensity: 1.05,
  roughness: .72,
});
const prototypeLightingEnabled = (): boolean => !(
  import.meta.env.DEV
  && typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).get('museumLightingPrototype') === '0'
);

function CellShell({cell, renaissance, forum, customAmbient, recessedCeiling}: {
  cell: MuseumSpatialCell;
  renaissance: boolean;
  forum: boolean;
  customAmbient: boolean;
  recessedCeiling: boolean;
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
    {!recessedCeiling && <mesh position={[x, cell.ceilingHeight + .09, z]} material={CEILING_TRIM_MATERIAL}>
      <boxGeometry args={[width, .18, depth]}/>
    </mesh>}
    {!customAmbient && <CeilingLightStrips cell={renderCell}/>}
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

type FixtureDefinition = MuseumLightingFixtureDefinition | MuseumExhibitLightDefinition;

function InstanceBatch({
  geometry,
  material,
  matrices,
  userData,
}: {
  geometry: BufferGeometry;
  material: Material;
  matrices: readonly Matrix4[];
  userData: Record<string, unknown>;
}) {
  const meshRef = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    matrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [matrices]);
  if (!matrices.length) return null;
  return <instancedMesh
    ref={meshRef}
    args={[geometry, material, matrices.length]}
    dispose={null}
    userData={userData}
  />;
}

function Gallery02RecessedCeiling({cells, lighting}: {
  cells: readonly MuseumSpatialCell[];
  lighting: MuseumLightingDefinition;
}) {
  const cutouts = useMemo(() => [
    ...(lighting.fixtures ?? []).filter(({prototypeRole, lightingRole}) => (
      prototypeRole === 'gallery-02-recessed-gimbal' || lightingRole === 'recessed-gimbal'
    ))
      .map(({mountPosition}) => mountPosition),
    ...(lighting.circulationDownlights ?? []).map(({position}) => position),
    ...(lighting.passageIlluminators ?? [])
      .filter(({kind}) => kind === 'recess')
      .map(({position}) => position),
  ], [lighting]);
  const geometry = useMemo(() => {
    const minX = Math.min(...cells.map((cell) => (cell.renderBounds ?? cell.bounds).minX));
    const maxX = Math.max(...cells.map((cell) => (cell.renderBounds ?? cell.bounds).maxX));
    const minZ = Math.min(...cells.map((cell) => (cell.renderBounds ?? cell.bounds).minZ));
    const maxZ = Math.max(...cells.map((cell) => (cell.renderBounds ?? cell.bounds).maxZ));
    const shape = new Shape();
    shape.moveTo(minX, minZ);
    shape.lineTo(maxX, minZ);
    shape.lineTo(maxX, maxZ);
    shape.lineTo(minX, maxZ);
    shape.closePath();
    for (const cutout of cutouts) {
      const hole = new Path();
      hole.absarc(cutout.x, cutout.z, GALLERY_02_RECESS_PROFILE.cutoutRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }
    const ceilingGeometry = new ShapeGeometry(shape, 16);
    ceilingGeometry.rotateX(Math.PI / 2);
    return ceilingGeometry;
  }, [cells, cutouts]);
  const ceilingHeight = cells[0]?.ceilingHeight ?? 6.2;
  const bounds = cells.reduce((extent, cell) => ({
    minX: Math.min(extent.minX, (cell.renderBounds ?? cell.bounds).minX),
    maxX: Math.max(extent.maxX, (cell.renderBounds ?? cell.bounds).maxX),
    minZ: Math.min(extent.minZ, (cell.renderBounds ?? cell.bounds).minZ),
    maxZ: Math.max(extent.maxZ, (cell.renderBounds ?? cell.bounds).maxZ),
  }), {minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity});
  const width = bounds.maxX - bounds.minX;
  const depth = bounds.maxZ - bounds.minZ;
  const x = (bounds.minX + bounds.maxX) / 2;
  const z = (bounds.minZ + bounds.maxZ) / 2;
  const backingGap = GALLERY_02_RECESS_PROFILE.baffleDepth + .02;
  return <group userData={{museumStructuralId: 'gallery-02-perforated-recess-ceiling', ceilingCutoutCount: cutouts.length}}>
    <mesh geometry={geometry} material={CEILING_TRIM_MATERIAL} position={[0, ceilingHeight, 0]}/>
    <mesh position={[x, ceilingHeight + backingGap + .09, z]} material={CEILING_TRIM_MATERIAL}>
      <boxGeometry args={[width, .18, depth]}/>
    </mesh>
  </group>;
}

const scaledBoxMatrix = (
  center: {x: number; y: number; z: number},
  size: {width: number; height: number; depth: number},
) => new Matrix4().compose(
  new Vector3(center.x, center.y, center.z),
  new Quaternion(),
  new Vector3(size.width, size.height, size.depth),
);

const trackMatrices = (tracks: readonly MuseumTrackDefinition[]): readonly Matrix4[] => tracks.flatMap(
  (track) => (track.segments ?? [track]).map((segment) => new Matrix4().compose(
    new Vector3(segment.center.x, segment.center.y, segment.center.z),
    new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), segment.rotationY ?? 0),
    new Vector3(segment.size.width, segment.size.height, segment.size.depth),
  )),
);

function MuseumDetailedAmbientDiffusers({hallId, diffusers, passages}: {
  hallId: string;
  diffusers: readonly MuseumAmbientDiffuserDefinition[];
  passages: readonly MuseumPassageIlluminatorDefinition[];
}) {
  const ceilingElements = useMemo(() => [
    ...diffusers.map(({id, center, size}) => ({id, center, size})),
    ...passages.filter(({kind}) => kind === 'slot').map(({id, position, size}) => ({
      id,
      center: position,
      size: size!,
    })),
  ], [diffusers, passages]);
  const batches = useMemo(() => ({
    trims: ceilingElements.map(({center, size}) => scaledBoxMatrix(
      {...center, y: center.y + .006},
      {width: size.width + .18, height: .02, depth: size.depth + .18},
    )),
    apertures: ceilingElements.map(({center, size}) => scaledBoxMatrix(
      {...center, y: center.y - .008},
      {width: size.width + .08, height: .025, depth: size.depth + .08},
    )),
    lenses: ceilingElements.map(({center, size}) => scaledBoxMatrix(
      {...center, y: center.y - .022},
      size,
    )),
  }), [ceilingElements]);
  const userData = {museumLightingHallId: hallId, museumDetailedAmbient: true};
  return <group userData={{museumDetailedAmbientFor: hallId}}>
    <InstanceBatch geometry={TRACK_GEOMETRY} material={CEILING_TRIM_MATERIAL} matrices={batches.trims} userData={{...userData, museumStructuralId: `lighting-detailed-diffuser-trims:${hallId}`}}/>
    <InstanceBatch geometry={TRACK_GEOMETRY} material={PROTOTYPE_BLACK_MATERIAL} matrices={batches.apertures} userData={{...userData, museumStructuralId: `lighting-detailed-diffuser-apertures:${hallId}`}}/>
    <InstanceBatch geometry={TRACK_GEOMETRY} material={PROTOTYPE_DIFFUSER_MATERIAL} matrices={batches.lenses} userData={{...userData, museumStructuralId: `lighting-detailed-diffuser-lenses:${hallId}`}}/>
  </group>;
}

const fixtureRootMatrix = (definition: FixtureDefinition): Matrix4 => {
  const direction = new Vector3(
    definition.target.x - definition.mountPosition.x,
    definition.target.y - definition.mountPosition.y,
    definition.target.z - definition.mountPosition.z,
  ).normalize();
  const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, -1, 0), direction);
  return new Matrix4().compose(
    new Vector3(definition.mountPosition.x, definition.mountPosition.y, definition.mountPosition.z),
    quaternion,
    new Vector3(1, 1, 1),
  );
};

const horizontalRoundMatrix = ({x, y, z}: {x: number; y: number; z: number}) => new Matrix4()
  .makeTranslation(x, y, z)
  .multiply(new Matrix4().makeRotationX(Math.PI / 2));

const recessedOpticRootMatrix = (definition: MuseumLightingFixtureDefinition): Matrix4 => {
  const direction = new Vector3(
    definition.target.x - definition.mountPosition.x,
    definition.target.y - definition.mountPosition.y,
    definition.target.z - definition.mountPosition.z,
  ).normalize();
  const ceilingPlaneY = definition.mountPosition.y + GALLERY_02_RECESS_PROFILE.mountInset;
  return new Matrix4().compose(
    new Vector3(
      definition.mountPosition.x,
      ceilingPlaneY + GALLERY_02_RECESS_PROFILE.opticCenterInset,
      definition.mountPosition.z,
    ),
    new Quaternion().setFromUnitVectors(new Vector3(0, -1, 0), direction),
    new Vector3(1, 1, 1),
  );
};

const detailedFixtureRole = (
  fixture: MuseumLightingFixtureDefinition,
): 'track-head' | 'recessed-gimbal' | undefined => fixture.lightingRole
  ?? (fixture.prototypeRole === 'gallery-01-track-head'
    ? 'track-head'
    : fixture.prototypeRole === 'gallery-02-recessed-gimbal'
      ? 'recessed-gimbal'
      : undefined);

const pushCirculationRecess = (
  downlight: MuseumCirculationDownlightDefinition,
  trims: Matrix4[],
  baffles: Matrix4[],
  lenses: Matrix4[],
) => {
  const {position} = downlight;
  trims.push(horizontalRoundMatrix({...position, y: position.y - GALLERY_02_RECESS_PROFILE.trimInset}));
  baffles.push(new Matrix4().makeTranslation(
    position.x,
    position.y + GALLERY_02_RECESS_PROFILE.baffleDepth / 2,
    position.z,
  ));
  lenses.push(horizontalRoundMatrix({
    ...position,
    y: position.y + GALLERY_02_RECESS_PROFILE.opticCenterInset,
  }));
};

function MuseumLightingInstallationDefault({hallId, lighting}: {
  hallId: string;
  lighting: MuseumLightingDefinition;
}) {
  const batches = useMemo(() => {
    const tracks = trackMatrices(lighting.tracks);
    const fixtures: readonly FixtureDefinition[] = lighting.fixtures ?? lighting.exhibitLights;
    const trackHeadBodies: Matrix4[] = [];
    const trackHeadLenses: Matrix4[] = [];
    const recessedLenses: Matrix4[] = [];
    const wallWashers: Matrix4[] = [];
    for (const fixture of fixtures) {
      const kind = 'kind' in fixture ? fixture.kind : 'track-head';
      const root = fixtureRootMatrix(fixture);
      if (kind === 'track-head') {
        trackHeadBodies.push(root.clone().multiply(new Matrix4().makeTranslation(0, -.13, 0)));
        trackHeadLenses.push(root.clone()
          .multiply(new Matrix4().makeTranslation(0, -.292, 0))
          .multiply(new Matrix4().makeRotationX(Math.PI / 2)));
      } else if (kind === 'recessed-spot') {
        recessedLenses.push(root.clone()
          .multiply(new Matrix4().makeTranslation(0, -.055, 0))
          .multiply(new Matrix4().makeRotationX(Math.PI / 2)));
      } else {
        const width = 'width' in fixture ? fixture.width : .9;
        wallWashers.push(root.clone()
          .multiply(new Matrix4().makeTranslation(0, -.075, 0))
          .multiply(new Matrix4().makeRotationX(Math.PI / 2))
          .multiply(new Matrix4().makeScale(Math.max(.7, width - .18), .12, 1)));
      }
    }
    const fixtureMetadata = fixtures.map((fixture) => ({
      id: fixture.id,
      kind: 'kind' in fixture ? fixture.kind : 'track-head',
      ...('targetGroupId' in fixture ? {
        targetGroupId: fixture.targetGroupId,
        sourceIds: fixture.sourceIds,
        spatialCellId: fixture.spatialCellId,
      } : {}),
    }));
    return {tracks, trackHeadBodies, trackHeadLenses, recessedLenses, wallWashers, fixtureMetadata};
  }, [lighting]);
  const sharedUserData = {
    museumLightingHallId: hallId,
    museumFixtureInstances: batches.fixtureMetadata,
  };
  return <group userData={{museumLightingInstallationFor: hallId}}>
    <InstanceBatch
      geometry={TRACK_GEOMETRY}
      material={FIXTURE_DARK_MATERIAL}
      matrices={batches.tracks}
      userData={{...sharedUserData, museumStructuralId: `lighting-tracks:${hallId}`}}
    />
    <InstanceBatch
      geometry={TRACK_HEAD_BODY_GEOMETRY}
      material={FIXTURE_DARK_MATERIAL}
      matrices={batches.trackHeadBodies}
      userData={{...sharedUserData, museumStructuralId: `lighting-track-heads:${hallId}`}}
    />
    <InstanceBatch
      geometry={TRACK_HEAD_LENS_GEOMETRY}
      material={FIXTURE_LENS_MATERIAL}
      matrices={batches.trackHeadLenses}
      userData={{...sharedUserData, museumStructuralId: `lighting-track-lenses:${hallId}`}}
    />
    <InstanceBatch
      geometry={RECESSED_LENS_GEOMETRY}
      material={FIXTURE_LENS_MATERIAL}
      matrices={batches.recessedLenses}
      userData={{...sharedUserData, museumStructuralId: `lighting-recessed-lenses:${hallId}`}}
    />
    <InstanceBatch
      geometry={WALL_WASHER_APERTURE_GEOMETRY}
      material={FIXTURE_LENS_MATERIAL}
      matrices={batches.wallWashers}
      userData={{...sharedUserData, museumStructuralId: `lighting-wall-washers:${hallId}`}}
    />
  </group>;
}

function MuseumDetailedLightingInstallation({hallId, lighting}: {
  hallId: string;
  lighting: MuseumLightingDefinition;
}) {
  const productionRollout = Boolean(lighting.lightingStandard);
  const batches = useMemo(() => {
    const fixtures = lighting.fixtures ?? [];
    const tracks = trackMatrices(lighting.tracks);
    const trackBodies: Matrix4[] = [];
    const trackSnoots: Matrix4[] = [];
    const trackYokes: Matrix4[] = [];
    const trackStandardLenses: Matrix4[] = [];
    const trackAnchorLenses: Matrix4[] = [];
    const recessedTrims: Matrix4[] = [];
    const recessedBaffles: Matrix4[] = [];
    const recessedGimbals: Matrix4[] = [];
    const recessedStandardLenses: Matrix4[] = [];
    const recessedAnchorLenses: Matrix4[] = [];
    const circulationLenses: Matrix4[] = [];
    const surfaceCirculationLenses: Matrix4[] = [];

    for (const fixture of fixtures) {
      const root = fixtureRootMatrix(fixture);
      const anchor = (fixture.contrastScale ?? 1) > 1;
      const role = detailedFixtureRole(fixture);
      if (role === 'track-head') {
        trackBodies.push(root.clone().multiply(new Matrix4().makeTranslation(0, -.15, 0)));
        trackSnoots.push(root.clone().multiply(new Matrix4().makeTranslation(0, -.3, 0)));
        trackYokes.push(root.clone()
          .multiply(new Matrix4().makeTranslation(0, -.14, 0))
          .multiply(new Matrix4().makeRotationX(Math.PI / 2)));
        (anchor ? trackAnchorLenses : trackStandardLenses).push(root.clone()
          .multiply(new Matrix4().makeTranslation(0, -.255, 0))
          .multiply(new Matrix4().makeRotationX(Math.PI / 2)));
      } else if (role === 'recessed-gimbal') {
        const ceilingPlaneY = fixture.mountPosition.y + GALLERY_02_RECESS_PROFILE.mountInset;
        const opticRoot = recessedOpticRootMatrix(fixture);
        recessedTrims.push(horizontalRoundMatrix({
          x: fixture.mountPosition.x,
          y: ceilingPlaneY - GALLERY_02_RECESS_PROFILE.trimInset,
          z: fixture.mountPosition.z,
        }));
        recessedBaffles.push(new Matrix4().makeTranslation(
          fixture.mountPosition.x,
          ceilingPlaneY + GALLERY_02_RECESS_PROFILE.baffleDepth / 2,
          fixture.mountPosition.z,
        ));
        recessedGimbals.push(opticRoot.clone().multiply(new Matrix4().makeRotationX(Math.PI / 2)));
        (anchor ? recessedAnchorLenses : recessedStandardLenses).push(opticRoot.clone()
          .multiply(new Matrix4().makeTranslation(0, .012, 0))
          .multiply(new Matrix4().makeRotationX(Math.PI / 2)));
      }
    }
    for (const downlight of lighting.circulationDownlights ?? []) {
      if (lighting.lightingStandard?.system === 'track') {
        surfaceCirculationLenses.push(horizontalRoundMatrix({
          ...downlight.position,
          y: downlight.position.y - .022,
        }));
      } else {
        pushCirculationRecess(downlight, recessedTrims, recessedBaffles, circulationLenses);
      }
    }
    for (const passage of lighting.passageIlluminators ?? []) {
      if (passage.kind !== 'recess') continue;
      pushCirculationRecess(
        {id: passage.id, position: passage.position, colorTemperatureK: passage.colorTemperatureK},
        recessedTrims,
        recessedBaffles,
        circulationLenses,
      );
    }
    return {
      fixtures,
      tracks,
      trackBodies,
      trackSnoots,
      trackYokes,
      trackStandardLenses,
      trackAnchorLenses,
      recessedTrims,
      recessedBaffles,
      recessedGimbals,
      recessedStandardLenses,
      recessedAnchorLenses,
      circulationLenses,
      surfaceCirculationLenses,
    };
  }, [lighting]);
  const fixtureMetadata = batches.fixtures.map((fixture) => ({
    id: fixture.id,
    prototypeRole: fixture.prototypeRole,
    lightingRole: fixture.lightingRole,
    trackSegmentId: fixture.trackSegmentId,
    sourceOverrideId: fixture.sourceOverrideId,
    contrastScale: fixture.contrastScale,
    sourceIds: fixture.sourceIds,
    spatialCellId: fixture.spatialCellId,
  }));
  const userData = {museumLightingHallId: hallId, museumFixtureInstances: fixtureMetadata};
  const detailedGeometry = productionRollout ? {
    trackBody: ROLLOUT_TRACK_HEAD_BODY_GEOMETRY,
    trackSnoot: ROLLOUT_TRACK_HEAD_SNOOT_GEOMETRY,
    trackYoke: ROLLOUT_TRACK_HEAD_YOKE_GEOMETRY,
    trackLens: ROLLOUT_TRACK_HEAD_LENS_GEOMETRY,
    recessedTrim: ROLLOUT_RECESSED_TRIM_GEOMETRY,
    recessedBaffle: ROLLOUT_RECESSED_BAFFLE_GEOMETRY,
    recessedGimbal: ROLLOUT_RECESSED_GIMBAL_GEOMETRY,
    recessedLens: ROLLOUT_RECESSED_LENS_GEOMETRY,
  } : {
    trackBody: PROTOTYPE_TRACK_HEAD_BODY_GEOMETRY,
    trackSnoot: PROTOTYPE_TRACK_HEAD_SNOOT_GEOMETRY,
    trackYoke: PROTOTYPE_TRACK_HEAD_YOKE_GEOMETRY,
    trackLens: PROTOTYPE_TRACK_HEAD_LENS_GEOMETRY,
    recessedTrim: PROTOTYPE_RECESSED_TRIM_GEOMETRY,
    recessedBaffle: PROTOTYPE_RECESSED_BAFFLE_GEOMETRY,
    recessedGimbal: PROTOTYPE_RECESSED_GIMBAL_GEOMETRY,
    recessedLens: PROTOTYPE_RECESSED_LENS_GEOMETRY,
  };
  return <group userData={{museumDetailedLightingFor: hallId}}>
    <InstanceBatch geometry={TRACK_GEOMETRY} material={FIXTURE_DARK_MATERIAL} matrices={batches.tracks} userData={{...userData, museumStructuralId: `lighting-detailed-tracks:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.trackBody} material={FIXTURE_DARK_MATERIAL} matrices={batches.trackBodies} userData={{...userData, museumStructuralId: `lighting-detailed-track-bodies:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.trackSnoot} material={PROTOTYPE_BLACK_MATERIAL} matrices={batches.trackSnoots} userData={{...userData, museumStructuralId: `lighting-detailed-track-snoots:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.trackYoke} material={FIXTURE_DARK_MATERIAL} matrices={batches.trackYokes} userData={{...userData, museumStructuralId: `lighting-detailed-track-yokes:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.trackLens} material={PROTOTYPE_3000K_STANDARD_MATERIAL} matrices={batches.trackStandardLenses} userData={{...userData, museumStructuralId: `lighting-detailed-track-standard-lenses:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.trackLens} material={PROTOTYPE_3000K_ANCHOR_MATERIAL} matrices={batches.trackAnchorLenses} userData={{...userData, museumStructuralId: `lighting-detailed-track-anchor-lenses:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.recessedTrim} material={CEILING_TRIM_MATERIAL} matrices={batches.recessedTrims} userData={{...userData, museumStructuralId: `lighting-detailed-recessed-trims:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.recessedBaffle} material={PROTOTYPE_RECESS_BAFFLE_MATERIAL} matrices={batches.recessedBaffles} userData={{...userData, museumStructuralId: `lighting-detailed-recessed-baffles:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.recessedGimbal} material={FIXTURE_DARK_MATERIAL} matrices={batches.recessedGimbals} userData={{...userData, museumStructuralId: `lighting-detailed-recessed-gimbals:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.recessedLens} material={PROTOTYPE_3000K_STANDARD_MATERIAL} matrices={batches.recessedStandardLenses} userData={{...userData, museumStructuralId: `lighting-detailed-recessed-standard-lenses:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.recessedLens} material={PROTOTYPE_3000K_ANCHOR_MATERIAL} matrices={batches.recessedAnchorLenses} userData={{...userData, museumStructuralId: `lighting-detailed-recessed-anchor-lenses:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.recessedLens} material={PROTOTYPE_3000K_CIRCULATION_MATERIAL} matrices={batches.circulationLenses} userData={{...userData, museumStructuralId: `lighting-detailed-recessed-circulation-lenses:${hallId}`}}/>
    <InstanceBatch geometry={detailedGeometry.recessedLens} material={PROTOTYPE_3000K_CIRCULATION_MATERIAL} matrices={batches.surfaceCirculationLenses} userData={{...userData, museumStructuralId: `lighting-detailed-surface-circulation-lenses:${hallId}`}}/>
    {lighting.circulationLightPool && <rectAreaLight
      position={[
        lighting.circulationLightPool.position.x,
        lighting.circulationLightPool.position.y,
        lighting.circulationLightPool.position.z,
      ]}
      color={lighting.circulationLightPool.color}
      intensity={lighting.circulationLightPool.intensity}
      width={lighting.circulationLightPool.width}
      height={lighting.circulationLightPool.height}
      rotation={[-Math.PI / 2, 0, 0]}
      userData={{museumLightingPool: 'gallery-02-circulation', museumLightingHallId: hallId}}
    />}
  </group>;
}

function MuseumLightingInstallation({hallId, lighting, detailedEnabled}: {
  hallId: string;
  lighting: MuseumLightingDefinition;
  detailedEnabled: boolean;
}) {
  return detailedEnabled
    ? <MuseumDetailedLightingInstallation hallId={hallId} lighting={lighting}/>
    : <MuseumLightingInstallationDefault hallId={hallId} lighting={lighting}/>;
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
  const prototypeEnabled = Boolean(layout.lighting.prototypeId) && prototypeLightingEnabled();
  const productionDetailed = Boolean(layout.lighting.lightingStandard);
  const detailedEnabled = productionDetailed || prototypeEnabled;
  const recessedCeiling = layout.lighting.lightingStandard?.system === 'recessed'
    || (prototypeEnabled && layout.lighting.prototypeId === 'gallery-02-option-a');
  const wallMaterial = resolveMuseumWallMaterial(definition.id);
  const activate = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    event.stopPropagation();
    onSceneGesture();
  };
  return <group onClick={activate}>
    {layout.spatialCells.map((cell) => <CellShell
      key={cell.id}
      cell={cell}
      renaissance={renaissance}
      forum={forum}
      customAmbient={detailedEnabled}
      recessedCeiling={recessedCeiling}
    />)}
    {recessedCeiling && <Gallery02RecessedCeiling
      cells={layout.spatialCells}
      lighting={layout.lighting}
    />}
    {detailedEnabled && layout.lighting.ambientDiffusers && <MuseumDetailedAmbientDiffusers
      hallId={definition.id}
      diffusers={layout.lighting.ambientDiffusers}
      passages={layout.lighting.passageIlluminators ?? []}
    />}
    {forum && <group userData={{forumCirculationCross: true}}>
      <mesh position={[0, .012, 0]}><boxGeometry args={[27.2, .014, .055]}/><meshStandardMaterial color={BRONZE} roughness={.5} metalness={.38}/></mesh>
      <mesh position={[0, .013, 0]}><boxGeometry args={[.055, .015, 27.2]}/><meshStandardMaterial color={BRONZE} roughness={.5} metalness={.38}/></mesh>
      <mesh position={[0, .016, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[.55, .64, 48]}/><meshStandardMaterial color={BRONZE} roughness={.45} metalness={.42}/></mesh>
    </group>}
    {layout.spatialConnections.map((connection) => <ThresholdFascia key={connection.id} connection={connection} cells={layout.spatialCells} wallMaterial={wallMaterial}/>)}
    {architectureWalls.map((wall) => <GalleryWall key={wall.id} wall={wall} wallMaterial={wallMaterial}/>)}
    <MuseumTemplateInterfaces definition={definition} ownedPortalIds={ownedPortalIds}/>
    {layout.furnishings.filter(({kind}) => kind === 'bench').map((item) => <Bench key={item.id} definition={item} mediterranean={mediterranean}/>)}
    <MuseumLightingInstallation hallId={definition.id} lighting={layout.lighting} detailedEnabled={detailedEnabled}/>
    {layout.signs?.map((sign) => <PhysicalSign
      key={sign.id}
      definition={sign}
      mediterranean={mediterranean}
      renaissance={renaissance}
      includeFace={includeSignFaces}
    />)}
  </group>;
}
