import type {MuseumHallDefinition} from '../../data/museum/museumWorldTypes';
import {
  museumHallHasPermanentSignFaces,
  resolveMuseumHallStructureMountPolicy,
} from '../../data/museum/museumStructuralResidency';
import {
  ContemporaryHallArchitecture,
  ContemporaryHallSignFaces,
} from './ContemporaryHallArchitecture';

/**
 * The resident structural complement for a canonical hall. Keeping this in a
 * small, pure component lets the production scene and composition audit share
 * the exact shell/sign mount decision.
 */
export function MuseumResidentHallStructure({definition, onSceneGesture}: {
  definition: MuseumHallDefinition;
  onSceneGesture: () => void;
}) {
  const structurePolicy = resolveMuseumHallStructureMountPolicy(definition.id);
  return <>
    {structurePolicy.residentContentOwnsStructure
      && <ContemporaryHallArchitecture
        definition={definition}
        onSceneGesture={onSceneGesture}
      />}
    {structurePolicy.permanentStructure
      && !museumHallHasPermanentSignFaces(definition.id)
      && <ContemporaryHallSignFaces definition={definition}/>}
  </>;
}
