import {
  MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL,
  MUSEUM_GALLERY_02_EXHIBIT_BACKING_MATERIAL,
  MUSEUM_GALLERY_02_EXHIBIT_PLINTH_MATERIAL,
} from '../../data/museum/museumArchitectureMaterials';
import type {
  MuseumExhibitLayout,
  MuseumHallDefinition,
  MuseumSceneVolume,
} from '../../data/museum/museumWorldTypes';
import {museumHallUsesPrimaryEmphasis} from './primaryPlaqueContract';

const MEDITERRANEAN_GALLERY_ID = 'mediterranean-beginnings-classical';
const RENAISSANCE_GALLERY_ID = 'renaissance-humanism-new-method';
const PRIMARY_UNIT_BOX = new BoxGeometry(1, 1, 1);
const PRIMARY_MATERIALS = Object.freeze({
  canonicalBacking: new MeshStandardMaterial(MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL),
  canonicalPlinth: new MeshStandardMaterial(MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL),
  renaissanceBacking: new MeshStandardMaterial(MUSEUM_GALLERY_02_EXHIBIT_BACKING_MATERIAL),
  renaissancePlinth: new MeshStandardMaterial(MUSEUM_GALLERY_02_EXHIBIT_PLINTH_MATERIAL),
  neutralBacking: new MeshStandardMaterial({color: '#d9d5cd', roughness: .9, metalness: .03}),
  neutralPlinth: new MeshStandardMaterial({color: '#6e6b65', roughness: .9, metalness: .03}),
});

type PrimaryStructureKind = 'backing' | 'plinth';
type PrimaryStructureInstance = Readonly<{
  exhibitId: string;
  volumeId: string;
  matrix: Matrix4;
}>;

const sharedPrimaryMaterial = (
  kind: PrimaryStructureKind,
  canonical: boolean,
  renaissance: boolean,
): MeshStandardMaterial => renaissance
  ? kind === 'backing' ? PRIMARY_MATERIALS.renaissanceBacking : PRIMARY_MATERIALS.renaissancePlinth
  : canonical
    ? kind === 'backing' ? PRIMARY_MATERIALS.canonicalBacking : PRIMARY_MATERIALS.canonicalPlinth
    : kind === 'backing' ? PRIMARY_MATERIALS.neutralBacking : PRIMARY_MATERIALS.neutralPlinth;

function StructureSurfaceMaterial({kind, renaissance}: {
  kind: 'backing' | 'plinth';
  renaissance: boolean;
}) {
  const material = renaissance
    ? kind === 'backing'
      ? MUSEUM_GALLERY_02_EXHIBIT_BACKING_MATERIAL
      : MUSEUM_GALLERY_02_EXHIBIT_PLINTH_MATERIAL
    : kind === 'backing'
      ? MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL
      : MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL;
  return <meshStandardMaterial {...material}/>;
}

function StructureBox({volume, kind, canonical, renaissance}: {
  volume: MuseumSceneVolume;
  kind: 'backing' | 'plinth';
  canonical: boolean;
  renaissance: boolean;
}) {
  return <mesh
    position={[volume.center.x, volume.center.y, volume.center.z]}
    userData={{museumPrimaryStructureVolumeId: volume.id}}
  >
    <boxGeometry args={[volume.size.width, volume.size.height, volume.size.depth]}/>
    {canonical
      ? <StructureSurfaceMaterial kind={kind} renaissance={renaissance}/>
      : <meshStandardMaterial
        color={kind === 'backing' ? '#d9d5cd' : '#6e6b65'}
        roughness={.9}
        metalness={.03}
      />}
  </mesh>;
}

function PrimaryStructureBatch({
  kind,
  instances,
  material,
  hallId,
  shadowed,
}: {
  kind: PrimaryStructureKind;
  instances: readonly PrimaryStructureInstance[];
  material: MeshStandardMaterial;
  hallId: string;
  shadowed: boolean;
}) {
  const meshRef = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    instances.forEach(({matrix}, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingBox();
    mesh.computeBoundingSphere();
  }, [instances]);
  if (!instances.length) return null;
  return <instancedMesh
    ref={meshRef}
    args={[PRIMARY_UNIT_BOX, material, instances.length]}
    castShadow={shadowed}
    receiveShadow
    userData={{
      museumStructuralId: `primary-installation-batch:${hallId}:${kind}`,
      museumPrimaryStructureBatchKind: kind,
      museumPrimaryStructureInstanceIds: instances.map(({exhibitId, volumeId}) => `${exhibitId}:${volumeId}`),
    }}
  />;
}

export function MuseumPrimaryExhibitStructure({layout, definition, canonical}: {
  layout: MuseumExhibitLayout;
  definition: MuseumHallDefinition;
  canonical: boolean;
}) {
  const plinth = layout.scene.objectBounds.find(({id}) => id.endsWith('-plinth'));
  const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'));
  if (!plinth || !backing) return null;
  const renaissance = definition.id === RENAISSANCE_GALLERY_ID;
  return <>
    <StructureBox
      volume={plinth}
      kind="plinth"
      canonical={canonical}
      renaissance={renaissance}
    />
    <StructureBox
      volume={backing}
      kind="backing"
      canonical={canonical}
      renaissance={renaissance}
    />
  </>;
}

/** Texture-free, noninteractive authored installation bodies for a structural hall. */
export function MuseumPrimaryExhibitStructures({definition, shadowed = false}: {
  definition: MuseumHallDefinition;
  shadowed?: boolean;
}) {
  const primaryEmphasis = museumHallUsesPrimaryEmphasis(definition);
  const canonical = definition.id === MEDITERRANEAN_GALLERY_ID
    || definition.id === RENAISSANCE_GALLERY_ID
    || primaryEmphasis;
  const instances = useMemo(() => {
    const result: Record<PrimaryStructureKind, PrimaryStructureInstance[]> = {backing: [], plinth: []};
    const identityRotation = new Quaternion();
    for (const layout of definition.layout.exhibits) {
      const installationMatrix = new Matrix4()
        .makeRotationY(layout.rotationY)
        .setPosition(layout.position.x, 0, layout.position.z);
      for (const kind of ['backing', 'plinth'] as const) {
        const volume = layout.scene.objectBounds.find(({id}) => id.endsWith(`-${kind}`));
        if (!volume) continue;
        const localMatrix = new Matrix4().compose(
          new Vector3(volume.center.x, volume.center.y, volume.center.z),
          identityRotation,
          new Vector3(volume.size.width, volume.size.height, volume.size.depth),
        );
        result[kind].push({
          exhibitId: layout.id,
          volumeId: volume.id,
          matrix: installationMatrix.clone().multiply(localMatrix),
        });
      }
    }
    return result;
  }, [definition]);
  const renaissance = definition.id === RENAISSANCE_GALLERY_ID;
  return <group dispose={null} userData={{museumPrimaryStructuresFor: definition.id}}>
    <PrimaryStructureBatch
      kind="plinth"
      instances={instances.plinth}
      material={sharedPrimaryMaterial('plinth', canonical, renaissance)}
      hallId={definition.id}
      shadowed={shadowed}
    />
    <PrimaryStructureBatch
      kind="backing"
      instances={instances.backing}
      material={sharedPrimaryMaterial('backing', canonical, renaissance)}
      hallId={definition.id}
      shadowed={shadowed}
    />
  </group>;
}
import {useLayoutEffect, useMemo, useRef} from 'react';
import {BoxGeometry, InstancedMesh, Matrix4, MeshStandardMaterial, Quaternion, Vector3} from 'three';
