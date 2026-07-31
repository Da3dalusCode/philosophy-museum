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

const MEDITERRANEAN_GALLERY_ID = 'mediterranean-beginnings-classical';
const RENAISSANCE_GALLERY_ID = 'renaissance-humanism-new-method';

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

export const museumHallUsesPrimaryEmphasis = (
  definition: MuseumHallDefinition,
): boolean => {
  const supplementalLayouts = definition.layout.supplementalExhibits ?? [];
  const largestSupplementalWidth = Math.max(
    0,
    ...supplementalLayouts.map(({footprint}) => footprint.width),
  );
  const largestSupplementalHeight = Math.max(
    0,
    ...supplementalLayouts.map(({footprint}) => footprint.height),
  );
  return definition.id === 'core-questions-forum'
    || (
      definition.id !== MEDITERRANEAN_GALLERY_ID
      && definition.id !== RENAISSANCE_GALLERY_ID
      && supplementalLayouts.length > 0
      && definition.layout.exhibits.every(({scene}) =>
        scene.footprint.width >= largestSupplementalWidth - .001
        && scene.footprint.height >= largestSupplementalHeight - .001)
    );
};

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
export function MuseumPrimaryExhibitStructures({definition}: {
  definition: MuseumHallDefinition;
}) {
  const primaryEmphasis = museumHallUsesPrimaryEmphasis(definition);
  const canonical = definition.id === MEDITERRANEAN_GALLERY_ID
    || definition.id === RENAISSANCE_GALLERY_ID
    || primaryEmphasis;
  return <group userData={{museumPrimaryStructuresFor: definition.id}}>
    {definition.layout.exhibits.map((layout) => <group
      key={layout.id}
      position={[layout.position.x, 0, layout.position.z]}
      rotation={[0, layout.rotationY, 0]}
      userData={{
        museumPrimaryStructureId: layout.id,
        museumStructuralId: `primary-installation:${layout.id}`,
      }}
    >
      <MuseumPrimaryExhibitStructure
        layout={layout}
        definition={definition}
        canonical={canonical}
      />
    </group>)}
  </group>;
}
