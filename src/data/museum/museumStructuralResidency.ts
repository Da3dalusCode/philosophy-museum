import type {MuseumPublicHallId} from '../museumCatalog';

/**
 * The structural-residency pilot is deliberately bounded to the two halls
 * whose authored rooms must remain truthful across the two approved seams.
 * Content residency remains governed by the building manifest.
 */
export const MUSEUM_PERMANENT_STRUCTURAL_HALL_IDS = [
  'mediterranean-beginnings-classical',
  'hellenistic-roman-ways',
] as const satisfies readonly MuseumPublicHallId[];

export type MuseumPermanentStructuralHallId =
  (typeof MUSEUM_PERMANENT_STRUCTURAL_HALL_IDS)[number];

const permanentStructuralHallIds = new Set<MuseumPublicHallId>(
  MUSEUM_PERMANENT_STRUCTURAL_HALL_IDS,
);

export const museumHallHasPermanentStructure = (
  hallId: string,
): hallId is MuseumPermanentStructuralHallId =>
  permanentStructuralHallIds.has(hallId as MuseumPublicHallId);

export type MuseumHallStructureMountPolicy = {
  permanentStructure: boolean;
  residentContentOwnsStructure: boolean;
};

/**
 * The resident content subtree and permanent structure must never draw the
 * same hall shell. This pure policy is shared by composition and audits.
 */
export const resolveMuseumHallStructureMountPolicy = (
  hallId: string,
): MuseumHallStructureMountPolicy => {
  const permanentStructure = museumHallHasPermanentStructure(hallId);
  return {
    permanentStructure,
    residentContentOwnsStructure: !permanentStructure,
  };
};
