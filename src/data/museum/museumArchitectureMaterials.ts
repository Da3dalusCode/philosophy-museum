export type MuseumWallMaterialSpec = Readonly<{
  color: string;
  roughness: number;
  metalness: number;
}>;

/**
 * Permanent Museum wall standard, approved from the rendered Gallery 01 wall.
 * Hall identity belongs to curated content and accents, not architectural walls.
 */
export const MUSEUM_CANONICAL_WALL_MATERIAL = Object.freeze({
  color: '#eeeae2',
  roughness: .95,
  metalness: 0,
}) satisfies MuseumWallMaterialSpec;

export const MUSEUM_CANONICAL_WALL_EDGE_MATERIAL = Object.freeze({
  color: '#d9d4ca',
  roughness: .86,
  metalness: 0,
}) satisfies MuseumWallMaterialSpec;

export const MUSEUM_CANONICAL_CEILING_MATERIAL = Object.freeze({
  color: '#e7e3dc',
  roughness: .9,
  metalness: 0,
}) satisfies MuseumWallMaterialSpec;

export type MuseumOwnerApprovedWallMaterialException = Readonly<{
  approvalReference: string;
  rationale: string;
  material: MuseumWallMaterialSpec;
}>;

/**
 * A future exception must be entered here with an owner approval reference.
 * No current Museum hall has an approved architectural wall exception.
 */
export const MUSEUM_OWNER_APPROVED_WALL_MATERIAL_EXCEPTIONS:
Readonly<Record<string, MuseumOwnerApprovedWallMaterialException>> = Object.freeze({});

export const resolveMuseumWallMaterial = (hallId?: string): MuseumWallMaterialSpec =>
  hallId
    ? MUSEUM_OWNER_APPROVED_WALL_MATERIAL_EXCEPTIONS[hallId]?.material ?? MUSEUM_CANONICAL_WALL_MATERIAL
    : MUSEUM_CANONICAL_WALL_MATERIAL;
