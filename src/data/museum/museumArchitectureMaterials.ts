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

/** Shared structural finish for exposed exhibit backing panels in Galleries 01–02. */
export const MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL = Object.freeze({
  color: '#d8d1c3',
  roughness: .92,
  metalness: 0,
}) satisfies MuseumWallMaterialSpec;

/** The pale-stone finish established by the Plato and Platonism bases. */
export const MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL = Object.freeze({
  color: '#d7c6aa',
  roughness: .9,
  metalness: .03,
}) satisfies MuseumWallMaterialSpec;

export const MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY = Object.freeze({
  height: .16,
  depth: .62,
  largeDepth: .75,
  sideOverhang: .15,
});

/**
 * Gallery 02 uses the same two structural finishes for every primary and
 * supplemental installation. Their restrained self-fill keeps side-wall and
 * front-wall faces in the same light-neutral family without flattening the
 * normal-based shading that gives the millwork its depth.
 */
export const MUSEUM_GALLERY_02_EXHIBIT_BACKING_MATERIAL = Object.freeze({
  color: '#706b60',
  roughness: .92,
  metalness: 0,
  emissive: '#d3c0a7',
  emissiveIntensity: .235,
});

export const MUSEUM_GALLERY_02_EXHIBIT_PLINTH_MATERIAL = Object.freeze({
  color: '#6a6961',
  roughness: .9,
  metalness: .03,
  emissive: '#d7c5ad',
  emissiveIntensity: .225,
});

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
