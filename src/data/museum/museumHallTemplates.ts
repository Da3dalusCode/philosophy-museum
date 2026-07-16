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
    bayWidth: number;
    bayClass: 'anchor-capable' | 'standard' | 'legacy-below-standard';
    viewingClearance: 'meets-target' | 'legacy-below-target';
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
  const edge = edgeForNormal(slot.inwardNormal);
  const candidates = template.portalSlots.filter((candidate) => candidate.edge === edge);
  const selected = candidates.find(({optional}) => !optional) ?? candidates[0];
  if (!selected) throw new Error(`Template ${template.id} has no ${edge} portal for manifest slot ${slot.id}.`);
  return selected;
};

const unionBounds = (bounds: readonly MuseumBounds[]): MuseumBounds => ({
  minX: Math.min(...bounds.map(({minX}) => minX)),
  maxX: Math.max(...bounds.map(({maxX}) => maxX)),
  minZ: Math.min(...bounds.map(({minZ}) => minZ)),
  maxZ: Math.max(...bounds.map(({maxZ}) => maxZ)),
});

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
  const mapCells = layout.spatialCells.map((cell) => ({id: cell.id, bounds: {...(cell.renderBounds ?? cell.bounds)}}));
  const bounds = unionBounds(mapCells.map(({bounds: cellBounds}) => cellBounds));
  const width = bounds.maxX - bounds.minX;
  const depth = bounds.maxZ - bounds.minZ;
  const footprintExact = (close(width, template.footprintMetres.width) && close(depth, template.footprintMetres.depth))
    || (close(width, template.footprintMetres.depth) && close(depth, template.footprintMetres.width));
  const roomCells = layout.spatialCells.filter(({kind}) => kind === 'room');
  const roomCeilings = roomCells.map(({ceilingHeight}) => ceilingHeight);
  const roomCeilingRange = [Math.min(...roomCeilings), Math.max(...roomCeilings)] as const;
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
  if (!roomCeilings.every((height) => close(height, template.ceilingHeightMetres))) deviations.push(`Resolved room ceilings ${roomCeilingRange[0].toFixed(1)}–${roomCeilingRange[1].toFixed(1)} m differ from the canonical ${template.ceilingHeightMetres.toFixed(1)} m interface.`);
  for (const portalInterface of portals.filter(({dimensionConformance}) => dimensionConformance === 'expanded-adapter')) {
    deviations.push(`Portal ${portalInterface.manifestSlotId} expands the canonical 4.0 × 3.2 m interface.`);
  }
  const anchorTrackIds = [...new Set(layout.lighting.exhibitLights.map(({trackId}) => trackId))];
  const accessibleLabelAnchorIds = [
    ...(layout.signs ?? []).map(({id}) => id),
    ...layout.exhibits.map(({scene}) => scene.plaque.id),
  ];
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
    exhibitSlots: layout.exhibits.map((exhibit) => ({
      exhibitId: exhibit.id,
      bayWidth: exhibit.scene.footprint.width,
      bayClass: exhibit.scene.footprint.width >= template.exhibitSlotPolicy.anchorBayWidth
        ? 'anchor-capable'
        : exhibit.scene.footprint.width >= template.exhibitSlotPolicy.standardBayWidth
          ? 'standard'
          : 'legacy-below-standard',
      viewingClearance: exhibit.scene.interactionBounds.size.width >= template.exhibitSlotPolicy.clearViewingFloor.width
        && exhibit.scene.interactionBounds.size.depth >= template.exhibitSlotPolicy.clearViewingFloor.depth
        ? 'meets-target'
        : 'legacy-below-target',
    })),
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
  let collisionWalls: readonly MuseumWallDefinition[] = layout.wallColliders;
  for (const slot of node.doorwaySlots) {
    collisionWalls = activeSlotIds.has(slot.id)
      ? subtractLandingFromWalls(cutMuseumWallsForDoorway(collisionWalls, slot), slot)
      : [...collisionWalls, portalWall(`${node.id}:${slot.id}:inactive-closure`, slot, ceilingAtSlot(slot, layout, resolvedTemplate.canonicalCeilingHeight))];
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
    layout: {...layout, wallColliders: collisionWalls},
    architectureWalls: [...collisionWalls, ...lintels],
    resolvedTemplate,
  };
};

export const getMuseumResolvedTemplateForHall = (
  hallId: MuseumHallId,
  resolved: readonly {id: MuseumHallId; resolvedTemplate: MuseumResolvedHallTemplate}[],
): MuseumResolvedHallTemplate | undefined => resolved.find(({id}) => id === hallId)?.resolvedTemplate;
