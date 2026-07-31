import type {MuseumPublicHallId} from '../museumCatalog';
import {MUSEUM_CANONICAL_HALL_IDS} from './museumCanonicalProgram';

/**
 * Every canonical hall keeps its authored low-cost physical truth mounted.
 * Detailed content, media, interpretation, and exhibit lighting remain under
 * the bounded content-residency policy in the building manifest.
 */
export const MUSEUM_PERMANENT_STRUCTURAL_HALL_IDS = MUSEUM_CANONICAL_HALL_IDS;

/**
 * The visually approved pilot halls retain their generated sign faces in the
 * permanent layer. Other halls keep only the physical sign bodies resident;
 * their texture-bearing faces remain inside lazy hall content.
 */
export const MUSEUM_PERMANENT_SIGN_FACE_HALL_IDS = [
  'mediterranean-beginnings-classical',
  'hellenistic-roman-ways',
] as const satisfies readonly MuseumPublicHallId[];

export type MuseumPermanentStructuralHallId =
  (typeof MUSEUM_PERMANENT_STRUCTURAL_HALL_IDS)[number];

const permanentStructuralHallIds = new Set<MuseumPublicHallId>(
  MUSEUM_PERMANENT_STRUCTURAL_HALL_IDS,
);
const permanentSignFaceHallIds = new Set<MuseumPublicHallId>(
  MUSEUM_PERMANENT_SIGN_FACE_HALL_IDS,
);

export const museumHallHasPermanentStructure = (
  hallId: string,
): hallId is MuseumPermanentStructuralHallId =>
  permanentStructuralHallIds.has(hallId as MuseumPublicHallId);

export type MuseumPermanentSignFaceHallId =
  (typeof MUSEUM_PERMANENT_SIGN_FACE_HALL_IDS)[number];

export const museumHallHasPermanentSignFaces = (
  hallId: string,
): hallId is MuseumPermanentSignFaceHallId =>
  permanentSignFaceHallIds.has(hallId as MuseumPublicHallId);

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
