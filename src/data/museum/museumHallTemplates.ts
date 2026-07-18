import type {MuseumHallId} from '../museumCatalog';
import {
  MUSEUM_BUILDING_MANIFEST,
  type MuseumManifestDoorwaySlot,
  type MuseumManifestNode,
} from './museumBuildingManifest';
import type {
  MuseumBounds,
  MuseumHallLayout,
  MuseumPoint,
  MuseumWallDefinition,
} from './museumWorldTypes';

export type MuseumHallTemplateId = 'standard-rect' | 'sequence-3' | 'crossroads-4' | 'focal-terminal';
export type MuseumTemplatePortalEdge = 'north' | 'south' | 'east' | 'west';

export type MuseumTemplatePortalSlot = {
  id: string;
  edge: MuseumTemplatePortalEdge;
  position: MuseumPoint;
  inwardNormal: MuseumPoint;
  optional: boolean;
};

export type MuseumHallTemplateContract = {
  id: MuseumHallTemplateId;
  title: string;
  availability: 'normal-active' | 'rare-special-case';
  footprintMetres: {width: number; depth: number};
  roomRange: readonly [number, number];
  portalSlots: readonly MuseumTemplatePortalSlot[];
  wallThicknessMetres: number;
  ceilingHeightMetres: number;
  publicPortal: {clearWidthMetres: number; clearHeightMetres: number; transitionDepthMetres: number};
  safeArrivalLanding: {width: number; depth: number; poseOffsetFromPortal: number};
  lightingInterface: readonly ['ambient', 'threshold', 'perimeter-track', 'anchor-track', 'accessible-label-light'];
  collisionPolicy: {
    openingAuthority: 'live-connection-endpoints';
    inactiveSlotClosure: 'full-height-collision-wall';
    activeSlotLintel: 'render-only-above-clear-height';
  };
  mapPolicy: {canonicalShape: 'footprint-rectangle'; legacyAdapterShape: 'spatial-cell-union'};
  exhibitSlotPolicy: {
    standardBayWidth: number;
    anchorBayWidth: number;
    clearViewingFloor: {width: number; depth: number};
  };
};

export type MuseumLegacyGeometryAdapter = {
  id: string;
  templateId: MuseumHallTemplateId;
  resolutionMode: 'legacy-envelope';
  portalBinding: 'cardinal-normal-to-template-slot';
  declaredDeviations: readonly string[];
};

export type MuseumResolvedTemplatePortal = {
  manifestSlotId: string;
  templateSlotId: string;
  position: MuseumPoint;
  inwardNormal: MuseumPoint;
  active: boolean;
  openingMode: 'shell-edge' | 'overlap-seam';
  actual: {clearWidth: number; clearHeight: number; transitionDepth: number};
  dimensionConformance: 'exact' | 'expanded-adapter';
  shellCeilingHeight: number;
  lintelHeight: number;
  thresholdLightAnchor: {
    position: {x: number; y: number; z: number};
    width: number;
    depth: number;
  };
};

export type MuseumResolvedHallTemplate = {
  templateId: MuseumHallTemplateId;
  templateTitle: string;
  availability: MuseumHallTemplateContract['availability'];
  adapterId: string | 'canonical-template';
  conformance: 'canonical' | 'legacy-adapted';
  canonicalFootprint: MuseumHallTemplateContract['footprintMetres'];
  resolvedFootprint: {bounds: MuseumBounds; width: number; depth: number};
  footprintConformance: 'exact' | 'legacy-adapted';
  canonicalCeilingHeight: number;
  resolvedRoomCeilingRange: readonly [number, number];
  portalInterfaces: readonly MuseumResolvedTemplatePortal[];
  mapCells: readonly {id: string; bounds: MuseumBounds}[];
  lightingInterface: {
    roles: MuseumHallTemplateContract['lightingInterface'];
    thresholdAnchors: readonly MuseumResolvedTemplatePortal['thresholdLightAnchor'][];
    perimeterTrackIds: readonly string[];
    anchorTrackIds: readonly string[];
    accessibleLabelAnchorIds: readonly string[];
  };
  collisionPolicy: MuseumHallTemplateContract['collisionPolicy'];
  exhibitSlotPolicy: MuseumHallTemplateContract['exhibitSlotPolicy'];
  exhibitSlots: readonly {
    exhibitId: string;
    tier: 'anchor' | 'standard' | 'supporting' | 'cluster' | 'archive';
    treatment: 'anchor-bay' | 'standard-bay' | 'supporting-panel' | 'cluster-panel' | 'archive-label';
    bayWidth: number;
    bayClass: 'anchor-capable' | 'standard' | 'compact' | 'legacy-below-standard';
    viewingClearance: 'meets-target' | 'legacy-below-target';
    tierConformance: 'meets-tier' | 'below-tier';
  }[];
  deviations: readonly string[];
};

const shared = {
  wallThicknessMetres: .36,
  publicPortal: {clearWidthMetres: 4, clearHeightMetres: 3.2, transitionDepthMetres: 1.2},
  safeArrivalLanding: {width: 4, depth: 4, poseOffsetFromPortal: 2},
  lightingInterface: ['ambient', 'threshold', 'perimeter-track', 'anchor-track', 'accessible-label-light'] as const,
  collisionPolicy: {
    openingAuthority: 'live-connection-endpoints' as const,
    inactiveSlotClosure: 'full-height-collision-wall' as const,
    activeSlotLintel: 'render-only-above-clear-height' as const,
  },
  mapPolicy: {canonicalShape: 'footprint-rectangle' as const, legacyAdapterShape: 'spatial-cell-union' as const},
  exhibitSlotPolicy: {
    standardBayWidth: 3,
    anchorBayWidth: 4.5,
    clearViewingFloor: {width: .9, depth: 1.4},
  },
};

const portal = (
  id: string,
  edge: MuseumTemplatePortalEdge,
  position: MuseumPoint,
  inwardNormal: MuseumPoint,
  optional = false,
): MuseumTemplatePortalSlot => ({id, edge, position, inwardNormal, optional});

export const MUSEUM_HALL_TEMPLATE_REGISTRY = [
  {
    ...shared,
    id: 'standard-rect',
    title: 'Standard rectangular gallery',
    availability: 'normal-active',
    footprintMetres: {width: 20, depth: 24},
    roomRange: [2, 3],
    ceilingHeightMetres: 5.8,
    portalSlots: [
      portal('N0', 'north', {x: 0, z: -12}, {x: 0, z: 1}),
      portal('S0', 'south', {x: 0, z: 12}, {x: 0, z: -1}),
      portal('E0', 'east', {x: 10, z: 0}, {x: -1, z: 0}, true),
      portal('W0', 'west', {x: -10, z: 0}, {x: 1, z: 0}, true),
    ],
  },
  {
    ...shared,
    id: 'sequence-3',
    title: 'Sequential multi-room gallery',
    availability: 'normal-active',
    footprintMetres: {width: 24, depth: 56},
    roomRange: [3, 5],
    ceilingHeightMetres: 5.8,
    portalSlots: [
      portal('N0', 'north', {x: 0, z: -28}, {x: 0, z: 1}),
      portal('S0', 'south', {x: 0, z: 28}, {x: 0, z: -1}),
      portal('E1', 'east', {x: 12, z: 0}, {x: -1, z: 0}, true),
      portal('W1', 'west', {x: -12, z: 0}, {x: 1, z: 0}, true),
    ],
  },
  {
    ...shared,
    id: 'crossroads-4',
    title: 'Crossroads or hub gallery',
    availability: 'normal-active',
    footprintMetres: {width: 28, depth: 28},
    roomRange: [4, 9],
    ceilingHeightMetres: 6.2,
    portalSlots: [
      portal('N0', 'north', {x: 0, z: -14}, {x: 0, z: 1}),
      portal('S0', 'south', {x: 0, z: 14}, {x: 0, z: -1}),
      portal('E0', 'east', {x: 14, z: 0}, {x: -1, z: 0}),
      portal('W0', 'west', {x: -14, z: 0}, {x: 1, z: 0}),
      portal('N1', 'north', {x: 7, z: -14}, {x: 0, z: 1}, true),
      portal('S1', 'south', {x: -7, z: 14}, {x: 0, z: -1}, true),
    ],
  },
  {
    ...shared,
    id: 'focal-terminal',
    title: 'Focal or terminal gallery',
    availability: 'rare-special-case',
    footprintMetres: {width: 20, depth: 26},
    roomRange: [1, 2],
    ceilingHeightMetres: 6.4,
    portalSlots: [
      portal('N0', 'north', {x: 0, z: -13}, {x: 0, z: 1}),
      portal('S0', 'south', {x: 0, z: 13}, {x: 0, z: -1}, true),
    ],
  },
] as const satisfies readonly MuseumHallTemplateContract[];

export const MUSEUM_LEGACY_GEOMETRY_ADAPTERS = [
  {
    id: 'legacy-ancient-atrium-sequence', templateId: 'crossroads-4', resolutionMode: 'legacy-envelope', portalBinding: 'cardinal-normal-to-template-slot',
    declaredDeviations: ['Bespoke atrium-to-sequence envelope exceeds the canonical crossroads footprint.', 'Mixed room ceilings and an expanded public entrance are preserved.'],
  },
  {
    id: 'legacy-sequence-west-return', templateId: 'sequence-3', resolutionMode: 'legacy-envelope', portalBinding: 'cardinal-normal-to-template-slot',
    declaredDeviations: ['The reviewed west-return wing extends beyond the canonical sequence width.'],
  },
  {
    id: 'legacy-sequence-forum-branch', templateId: 'crossroads-4', resolutionMode: 'legacy-envelope', portalBinding: 'cardinal-normal-to-template-slot',
    declaredDeviations: ['A long three-zone legacy sequence implements the crossroads portal interface without claiming the canonical square envelope.'],
  },
  {
    id: 'legacy-sequence-straight', templateId: 'standard-rect', resolutionMode: 'legacy-envelope', portalBinding: 'cardinal-normal-to-template-slot',
    declaredDeviations: ['A long three-zone legacy sequence implements the standard two-ended portal interface without claiming the canonical rectangular envelope.'],
  },
  {
    id: 'legacy-sequence-return-and-forum-branch', templateId: 'crossroads-4', resolutionMode: 'legacy-envelope', portalBinding: 'cardinal-normal-to-template-slot',
    declaredDeviations: ['A long return sequence implements three crossroads portal directions without claiming the canonical square envelope.'],
  },
] as const satisfies readonly MuseumLegacyGeometryAdapter[];

export const getMuseumHallTemplate = (id: MuseumHallTemplateId): MuseumHallTemplateContract => {
  const template = MUSEUM_HALL_TEMPLATE_REGISTRY.find((candidate) => candidate.id === id);
  if (!template) throw new Error(`Museum hall template ${id} is not registered.`);
  return template;
};

export const getMuseumLegacyGeometryAdapter = (id: string): MuseumLegacyGeometryAdapter => {
  const adapter = MUSEUM_LEGACY_GEOMETRY_ADAPTERS.find((candidate) => candidate.id === id);
  if (!adapter) throw new Error(`Museum geometry adapter ${id} is not registered.`);
  return adapter;
};

const close = (first: number, second: number, epsilon = .01): boolean => Math.abs(first - second) <= epsilon;
const dot = (first: MuseumPoint, second: MuseumPoint): number => first.x * second.x + first.z * second.z;

const edgeForNormal = ({x, z}: MuseumPoint): MuseumTemplatePortalEdge => {
  if (Math.abs(x) > Math.abs(z)) return x > 0 ? 'west' : 'east';
  return z > 0 ? 'north' : 'south';
};

const templateSlotForManifestSlot = (
  template: MuseumHallTemplateContract,
  slot: MuseumManifestDoorwaySlot,
): MuseumTemplatePortalSlot => {
  const selected = template.portalSlots.find(({id}) => id === slot.id);
  if (!selected) throw new Error(`Template ${template.id} has no portal slot named ${slot.id}.`);
  const edge = edgeForNormal(slot.inwardNormal);
  if (selected.edge !== edge) {
    throw new Error(`Manifest slot ${slot.id} faces ${edge}, not canonical ${selected.edge}.`);
  }
  return selected;
};

const unionBounds = (bounds: readonly MuseumBounds[]): MuseumBounds => ({
  minX: Math.min(...bounds.map(({minX}) => minX)),
  maxX: Math.max(...bounds.map(({maxX}) => maxX)),
  minZ: Math.min(...bounds.map(({minZ}) => minZ)),
  maxZ: Math.max(...bounds.map(({maxZ}) => maxZ)),
});

/**
 * Keep the authored canonical footprint unchanged for rendering and mapping,
 * while giving the collision/navigation union enough overlap to cross an
 * active doorway plane. Circulation nodes use the same seam-overlap contract.
 */
const extendNavigationThroughActivePortals = (
  node: MuseumManifestNode,
  layout: MuseumHallLayout,
  activeSlotIds: ReadonlySet<string>,
): MuseumHallLayout => {
  const epsilon = .02;
  const activeSlots = node.doorwaySlots.filter(({id}) => activeSlotIds.has(id));
  const spatialCells = layout.spatialCells.map((cell) => {
    const renderBounds = cell.renderBounds ?? cell.bounds;
    const bounds = {...cell.bounds};
    for (const slot of activeSlots) {
      const seamOverlap = Math.max(.6, slot.transitionDepth / 2);
      const withinX = slot.position.x >= renderBounds.minX - epsilon
        && slot.position.x <= renderBounds.maxX + epsilon;
      const withinZ = slot.position.z >= renderBounds.minZ - epsilon
        && slot.position.z <= renderBounds.maxZ + epsilon;
      if (withinZ && close(slot.position.x, renderBounds.minX, epsilon) && slot.inwardNormal.x > .5) {
        bounds.minX = Math.min(bounds.minX, renderBounds.minX - seamOverlap);
      }
      if (withinZ && close(slot.position.x, renderBounds.maxX, epsilon) && slot.inwardNormal.x < -.5) {
        bounds.maxX = Math.max(bounds.maxX, renderBounds.maxX + seamOverlap);
      }
      if (withinX && close(slot.position.z, renderBounds.minZ, epsilon) && slot.inwardNormal.z > .5) {
        bounds.minZ = Math.min(bounds.minZ, renderBounds.minZ - seamOverlap);
      }
      if (withinX && close(slot.position.z, renderBounds.maxZ, epsilon) && slot.inwardNormal.z < -.5) {
        bounds.maxZ = Math.max(bounds.maxZ, renderBounds.maxZ + seamOverlap);
      }
    }
    const expanded = bounds.minX !== cell.bounds.minX
      || bounds.maxX !== cell.bounds.maxX
      || bounds.minZ !== cell.bounds.minZ
      || bounds.maxZ !== cell.bounds.maxZ;
    return expanded
      ? {...cell, bounds, renderBounds: cell.renderBounds ?? cell.bounds}
      : cell;
  });
  return {
    ...layout,
    bounds: unionBounds(spatialCells.map(({bounds}) => bounds)),
    spatialCells,
  };
};

const slotTouchesCellEdge = (slot: MuseumManifestDoorwaySlot, layout: MuseumHallLayout): boolean =>
  layout.spatialCells.some((cell) => {
    const bounds = cell.renderBounds ?? cell.bounds;
    const withinX = slot.position.x >= bounds.minX - .02 && slot.position.x <= bounds.maxX + .02;
    const withinZ = slot.position.z >= bounds.minZ - .02 && slot.position.z <= bounds.maxZ + .02;
    return withinX && withinZ && (
      close(slot.position.x, bounds.minX, .02)
      || close(slot.position.x, bounds.maxX, .02)
      || close(slot.position.z, bounds.minZ, .02)
      || close(slot.position.z, bounds.maxZ, .02)
    );
  });

const ceilingAtSlot = (
  slot: MuseumManifestDoorwaySlot,
  layout: MuseumHallLayout,
  fallback: number,
): number => {
  const containing = layout.spatialCells.filter((cell) => {
    const bounds = cell.renderBounds ?? cell.bounds;
    return slot.position.x >= bounds.minX - .02 && slot.position.x <= bounds.maxX + .02
      && slot.position.z >= bounds.minZ - .02 && slot.position.z <= bounds.maxZ + .02;
  });
  return containing.length ? Math.min(...containing.map(({ceilingHeight}) => ceilingHeight)) : fallback;
};

const portalWall = (
  id: string,
  slot: MuseumManifestDoorwaySlot,
  height: number,
  bottom = 0,
): MuseumWallDefinition => ({
  id,
  center: slot.position,
  size: Math.abs(slot.inwardNormal.x) > .5
    ? {width: MUSEUM_BUILDING_MANIFEST.physicalContract.wallThickness, depth: slot.clearWidth}
    : {width: slot.clearWidth, depth: MUSEUM_BUILDING_MANIFEST.physicalContract.wallThickness},
  rotation: 0,
  height,
  ...(bottom > 0 ? {bottom} : {}),
  openingId: slot.id,
});

/** Splits a thin authored shell wall so an active manifest endpoint owns the gap. */
export const cutMuseumWallsForDoorway = (
  walls: readonly MuseumWallDefinition[],
  slot: MuseumManifestDoorwaySlot,
): readonly MuseumWallDefinition[] => {
  const normalLength = Math.hypot(slot.inwardNormal.x, slot.inwardNormal.z) || 1;
  const normal = {x: slot.inwardNormal.x / normalLength, z: slot.inwardNormal.z / normalLength};
  const tangent = {x: -normal.z, z: normal.x};
  const thicknessLimit = MUSEUM_BUILDING_MANIFEST.physicalContract.wallThickness * 1.75;
  return walls.flatMap((wall) => {
    if ((wall.bottom ?? 0) > 0) return [wall];
    const cosine = Math.cos(wall.rotation);
    const sine = Math.sin(wall.rotation);
    const widthAxis = {x: cosine, z: -sine};
    const depthAxis = {x: sine, z: cosine};
    const widthAlongNormal = Math.abs(dot(widthAxis, normal));
    const depthAlongNormal = Math.abs(dot(depthAxis, normal));
    const normalUsesWidth = widthAlongNormal > .999 && Math.abs(dot(depthAxis, tangent)) > .999;
    const normalUsesDepth = depthAlongNormal > .999 && Math.abs(dot(widthAxis, tangent)) > .999;
    if (!normalUsesWidth && !normalUsesDepth) return [wall];
    const normalSize = normalUsesWidth ? wall.size.width : wall.size.depth;
    const tangentSize = normalUsesWidth ? wall.size.depth : wall.size.width;
    if (normalSize > thicknessLimit) return [wall];
    const normalDistance = Math.abs(dot({x: wall.center.x - slot.position.x, z: wall.center.z - slot.position.z}, normal));
    if (normalDistance > normalSize / 2 + .02) return [wall];
    const wallCenter = dot(wall.center, tangent);
    const slotCenter = dot(slot.position, tangent);
    const wallStart = wallCenter - tangentSize / 2;
    const wallEnd = wallCenter + tangentSize / 2;
    const cutStart = Math.max(wallStart, slotCenter - slot.clearWidth / 2);
    const cutEnd = Math.min(wallEnd, slotCenter + slot.clearWidth / 2);
    if (cutEnd - cutStart < .02) return [wall];
    const intervals = [[wallStart, cutStart], [cutEnd, wallEnd]] as const;
    return intervals.flatMap(([start, end], index) => {
      if (end - start < .08) return [];
      const centerAlongTangent = (start + end) / 2;
      const offset = centerAlongTangent - wallCenter;
      const {renderCenter: _renderCenter, renderSize: _renderSize, ...base} = wall;
      return [{
        ...base,
        id: `${wall.id}:manifest-cut-${slot.id}-${index + 1}`,
        center: {x: wall.center.x + tangent.x * offset, z: wall.center.z + tangent.z * offset},
        size: normalUsesWidth
          ? {width: wall.size.width, depth: end - start}
          : {width: end - start, depth: wall.size.depth},
      }];
    });
  });
};

const subtractLandingFromWalls = (
  walls: readonly MuseumWallDefinition[],
  slot: MuseumManifestDoorwaySlot,
): readonly MuseumWallDefinition[] => walls.flatMap((wall) => {
  if ((wall.bottom ?? 0) > 0) return [wall];
  const quarterTurns = Math.round(wall.rotation / (Math.PI / 2));
  if (!close(wall.rotation, quarterTurns * Math.PI / 2, .001)) return [wall];
  const rotated = Math.abs(quarterTurns) % 2 === 1;
  const footprint = rotated
    ? {width: wall.size.depth, depth: wall.size.width}
    : wall.size;
  const wallBounds = {
    minX: wall.center.x - footprint.width / 2,
    maxX: wall.center.x + footprint.width / 2,
    minZ: wall.center.z - footprint.depth / 2,
    maxZ: wall.center.z + footprint.depth / 2,
  };
  const overlap = {
    minX: Math.max(wallBounds.minX, slot.landingBounds.minX),
    maxX: Math.min(wallBounds.maxX, slot.landingBounds.maxX),
    minZ: Math.max(wallBounds.minZ, slot.landingBounds.minZ),
    maxZ: Math.min(wallBounds.maxZ, slot.landingBounds.maxZ),
  };
  if (overlap.maxX - overlap.minX <= .001 || overlap.maxZ - overlap.minZ <= .001) return [wall];
  const fragments = [
    {minX: wallBounds.minX, maxX: overlap.minX, minZ: wallBounds.minZ, maxZ: wallBounds.maxZ},
    {minX: overlap.maxX, maxX: wallBounds.maxX, minZ: wallBounds.minZ, maxZ: wallBounds.maxZ},
    {minX: overlap.minX, maxX: overlap.maxX, minZ: wallBounds.minZ, maxZ: overlap.minZ},
    {minX: overlap.minX, maxX: overlap.maxX, minZ: overlap.maxZ, maxZ: wallBounds.maxZ},
  ].filter((bounds) => bounds.maxX - bounds.minX >= .04 && bounds.maxZ - bounds.minZ >= .04);
  const {renderCenter: _renderCenter, renderSize: _renderSize, ...base} = wall;
  return fragments.map((bounds, index) => ({
    ...base,
    id: `${wall.id}:manifest-landing-${slot.id}-${index + 1}`,
    center: {x: (bounds.minX + bounds.maxX) / 2, z: (bounds.minZ + bounds.maxZ) / 2},
    size: {width: bounds.maxX - bounds.minX, depth: bounds.maxZ - bounds.minZ},
    rotation: 0,
  }));
});

const resolveTemplate = (
  node: MuseumManifestNode,
  layout: MuseumHallLayout,
  activeSlotIds: ReadonlySet<string>,
): MuseumResolvedHallTemplate => {
  if (!node.templateId) throw new Error(`Museum hall node ${node.id} has no template contract.`);
  const template = getMuseumHallTemplate(node.templateId);
  const adapter = node.geometryAdapterId ? getMuseumLegacyGeometryAdapter(node.geometryAdapterId) : undefined;
  if (adapter && adapter.templateId !== template.id) {
    throw new Error(`Museum adapter ${adapter.id} targets ${adapter.templateId}, not ${template.id}.`);
  }
  const authoredMapCells = layout.spatialCells.map((cell) => ({id: cell.id, bounds: {...(cell.renderBounds ?? cell.bounds)}}));
  const bounds = unionBounds(authoredMapCells.map(({bounds: cellBounds}) => cellBounds));
  const width = bounds.maxX - bounds.minX;
  const depth = bounds.maxZ - bounds.minZ;
  const footprintExact = close(width, template.footprintMetres.width)
    && close(depth, template.footprintMetres.depth)
    && close(bounds.minX, -template.footprintMetres.width / 2)
    && close(bounds.maxX, template.footprintMetres.width / 2)
    && close(bounds.minZ, -template.footprintMetres.depth / 2)
    && close(bounds.maxZ, template.footprintMetres.depth / 2);
  const roomCells = layout.spatialCells.filter(({kind}) => kind === 'room');
  if (!roomCells.length) throw new Error(`Museum hall ${node.id} has no canonical room cells.`);
  const roomCeilings = roomCells.map(({ceilingHeight}) => ceilingHeight);
  const roomCeilingRange = [Math.min(...roomCeilings), Math.max(...roomCeilings)] as const;
  const manifestSlotIds = new Set(node.doorwaySlots.map(({id}) => id));
  for (const required of template.portalSlots.filter(({optional}) => !optional)) {
    if (!manifestSlotIds.has(required.id)) {
      throw new Error(`Museum hall ${node.id} omits required template portal ${required.id}.`);
    }
  }
  const portals = node.doorwaySlots.map((slot): MuseumResolvedTemplatePortal => {
    const templateSlot = templateSlotForManifestSlot(template, slot);
    if (
      slot.clearWidth + .001 < template.publicPortal.clearWidthMetres
      || slot.clearHeight + .001 < template.publicPortal.clearHeightMetres
      || slot.transitionDepth + .001 < template.publicPortal.transitionDepthMetres
    ) throw new Error(`Museum slot ${node.id}/${slot.id} falls below template ${template.id}'s public portal contract.`);
    const exact = close(slot.clearWidth, template.publicPortal.clearWidthMetres)
      && close(slot.clearHeight, template.publicPortal.clearHeightMetres)
      && close(slot.transitionDepth, template.publicPortal.transitionDepthMetres);
    const landingWidth = slot.landingBounds.maxX - slot.landingBounds.minX;
    const landingDepth = slot.landingBounds.maxZ - slot.landingBounds.minZ;
    const arrivalOffset = Math.hypot(
      slot.arrivalPose.x - slot.position.x,
      slot.arrivalPose.z - slot.position.z,
    );
    const interfaceExact = close(slot.position.x, templateSlot.position.x)
      && close(slot.position.z, templateSlot.position.z)
      && close(slot.inwardNormal.x, templateSlot.inwardNormal.x)
      && close(slot.inwardNormal.z, templateSlot.inwardNormal.z)
      && close(landingWidth, template.safeArrivalLanding.width)
      && close(landingDepth, template.safeArrivalLanding.depth)
      && close(arrivalOffset, template.safeArrivalLanding.poseOffsetFromPortal);
    if (!adapter && (!exact || !interfaceExact)) {
      throw new Error(`Canonical museum slot ${node.id}/${slot.id} deviates from template ${template.id}.`);
    }
    const shellCeilingHeight = ceilingAtSlot(slot, layout, template.ceilingHeightMetres);
    return {
      manifestSlotId: slot.id,
      templateSlotId: templateSlot.id,
      position: slot.position,
      inwardNormal: slot.inwardNormal,
      active: activeSlotIds.has(slot.id),
      openingMode: slotTouchesCellEdge(slot, layout) ? 'shell-edge' : 'overlap-seam',
      actual: {clearWidth: slot.clearWidth, clearHeight: slot.clearHeight, transitionDepth: slot.transitionDepth},
      dimensionConformance: exact ? 'exact' : 'expanded-adapter',
      shellCeilingHeight,
      lintelHeight: Math.max(0, shellCeilingHeight - slot.clearHeight),
      thresholdLightAnchor: {
        position: {x: slot.position.x, y: slot.clearHeight - .08, z: slot.position.z},
        width: Math.max(.8, slot.clearWidth - .42),
        depth: .08,
      },
    };
  });
  const deviations = [...(adapter?.declaredDeviations ?? [])];
  if (!footprintExact) deviations.push(`Resolved footprint ${width.toFixed(1)} × ${depth.toFixed(1)} m differs from canonical ${template.footprintMetres.width} × ${template.footprintMetres.depth} m.`);
  if (roomCells.length < template.roomRange[0] || roomCells.length > template.roomRange[1]) deviations.push(`Resolved room count ${roomCells.length} falls outside canonical range ${template.roomRange[0]}–${template.roomRange[1]}.`);
  if (!close(layout.floorArea, template.footprintMetres.width * template.footprintMetres.depth)) deviations.push(`Resolved floor area ${layout.floorArea.toFixed(1)} m² differs from canonical ${template.footprintMetres.width * template.footprintMetres.depth} m².`);
  if (!roomCeilings.every((height) => close(height, template.ceilingHeightMetres))) deviations.push(`Resolved room ceilings ${roomCeilingRange[0].toFixed(1)}–${roomCeilingRange[1].toFixed(1)} m differ from the canonical ${template.ceilingHeightMetres.toFixed(1)} m interface.`);
  for (const portalInterface of portals.filter(({dimensionConformance}) => dimensionConformance === 'expanded-adapter')) {
    deviations.push(`Portal ${portalInterface.manifestSlotId} expands the canonical 4.0 × 3.2 m interface.`);
  }
  const anchorTrackIds = [...new Set(layout.lighting.exhibitLights.map(({trackId}) => trackId))];
  const accessibleLabelAnchorIds = [
    ...(layout.signs ?? []).map(({id}) => id),
    ...layout.exhibits.map(({scene}) => scene.plaque.id),
  ];
  const exhibitSlots = layout.exhibits.map((exhibit) => {
    const tier = exhibit.presentationTier;
    const treatment = exhibit.treatment;
    if (!tier || !treatment) {
      if (!adapter) throw new Error(`Canonical exhibit ${exhibit.id} has no presentation tier or treatment.`);
    }
    const resolvedTier = tier ?? 'standard';
    const resolvedTreatment = treatment ?? 'standard-bay';
    const bayWidth = exhibit.bayWidth ?? exhibit.scene.footprint.width;
    const minimumWidth = resolvedTier === 'anchor'
      ? template.exhibitSlotPolicy.anchorBayWidth
      : resolvedTier === 'standard'
        ? template.exhibitSlotPolicy.standardBayWidth
        : resolvedTier === 'cluster'
          ? 3
          : resolvedTier === 'supporting'
            ? 2.4
            : 1.8;
    const viewingClearance = exhibit.scene.interactionBounds.size.width >= template.exhibitSlotPolicy.clearViewingFloor.width
      && exhibit.scene.interactionBounds.size.depth >= template.exhibitSlotPolicy.clearViewingFloor.depth
      ? 'meets-target' as const
      : 'legacy-below-target' as const;
    const tierConformance = bayWidth + .001 >= minimumWidth ? 'meets-tier' as const : 'below-tier' as const;
    if (!adapter && (viewingClearance !== 'meets-target' || tierConformance !== 'meets-tier')) {
      throw new Error(`Canonical exhibit ${exhibit.id} does not meet its ${resolvedTier} bay and viewing-clearance contract.`);
    }
    return {
      exhibitId: exhibit.id,
      tier: resolvedTier,
      treatment: resolvedTreatment,
      bayWidth,
      bayClass: bayWidth >= template.exhibitSlotPolicy.anchorBayWidth
        ? 'anchor-capable' as const
        : bayWidth >= template.exhibitSlotPolicy.standardBayWidth
          ? 'standard' as const
          : exhibit.scene.footprint.width >= 1.8
            ? 'compact' as const
            : 'legacy-below-standard' as const,
      viewingClearance,
      tierConformance,
    };
  });
  if (!adapter && deviations.length) {
    throw new Error(`Canonical museum hall ${node.id} failed template ${template.id}: ${deviations.join(' ')}`);
  }
  const mapCells = adapter
    ? authoredMapCells
    : [{id: `${layout.id}:canonical-footprint`, bounds: {...bounds}}];
  return {
    templateId: template.id,
    templateTitle: template.title,
    availability: template.availability,
    adapterId: adapter?.id ?? 'canonical-template',
    conformance: adapter ? 'legacy-adapted' : 'canonical',
    canonicalFootprint: template.footprintMetres,
    resolvedFootprint: {bounds, width, depth},
    footprintConformance: footprintExact ? 'exact' : 'legacy-adapted',
    canonicalCeilingHeight: template.ceilingHeightMetres,
    resolvedRoomCeilingRange: roomCeilingRange,
    portalInterfaces: portals,
    mapCells,
    lightingInterface: {
      roles: template.lightingInterface,
      thresholdAnchors: portals.filter(({active}) => active).map(({thresholdLightAnchor}) => thresholdLightAnchor),
      perimeterTrackIds: layout.lighting.tracks.map(({id}) => id),
      anchorTrackIds,
      accessibleLabelAnchorIds,
    },
    collisionPolicy: template.collisionPolicy,
    exhibitSlotPolicy: template.exhibitSlotPolicy,
    exhibitSlots,
    deviations,
  };
};

export type MuseumResolvedHallShell = {
  layout: MuseumHallLayout;
  architectureWalls: readonly MuseumWallDefinition[];
  resolvedTemplate: MuseumResolvedHallTemplate;
};

/**
 * Compiles a legacy hall through its canonical interface. Live connection
 * endpoints cut openings; every unconnected manifest slot receives a closure.
 */
export const resolveMuseumHallShell = (
  node: MuseumManifestNode,
  layout: MuseumHallLayout,
  activeSlotIds: ReadonlySet<string>,
): MuseumResolvedHallShell => {
  const resolvedTemplate = resolveTemplate(node, layout, activeSlotIds);
  const navigationLayout = extendNavigationThroughActivePortals(node, layout, activeSlotIds);
  let collisionWalls: readonly MuseumWallDefinition[] = layout.wallColliders;
  for (const slot of node.doorwaySlots) {
    collisionWalls = activeSlotIds.has(slot.id)
      ? subtractLandingFromWalls(cutMuseumWallsForDoorway(collisionWalls, slot), slot)
      : [
          ...cutMuseumWallsForDoorway(collisionWalls, slot),
          portalWall(
            `${node.id}:${slot.id}:inactive-closure`,
            slot,
            ceilingAtSlot(slot, layout, resolvedTemplate.canonicalCeilingHeight),
          ),
        ];
  }
  const lintels = node.doorwaySlots.flatMap((slot) => {
    if (!activeSlotIds.has(slot.id)) return [];
    const portalInterface = resolvedTemplate.portalInterfaces.find(({manifestSlotId}) => manifestSlotId === slot.id);
    if (!portalInterface || portalInterface.lintelHeight < .08) return [];
    return [portalWall(
      `${node.id}:${slot.id}:active-lintel`,
      slot,
      portalInterface.lintelHeight,
      slot.clearHeight,
    )];
  });
  return {
    layout: {...navigationLayout, wallColliders: collisionWalls},
    architectureWalls: [...collisionWalls, ...lintels],
    resolvedTemplate,
  };
};

export const getMuseumResolvedTemplateForHall = (
  hallId: MuseumHallId,
  resolved: readonly {id: MuseumHallId; resolvedTemplate: MuseumResolvedHallTemplate}[],
): MuseumResolvedHallTemplate | undefined => resolved.find(({id}) => id === hallId)?.resolvedTemplate;
