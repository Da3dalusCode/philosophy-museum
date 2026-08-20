import type {MuseumManifestDoorwaySlot} from './museumBuildingManifest';
import {GALLERY_02_RECESS_PROFILE} from './galleryLightingPrototypes';
import type {
  MuseumAmbientDiffuserDefinition,
  MuseumCirculationDownlightDefinition,
  MuseumExhibitLayout,
  MuseumLightingBeamDefinition,
  MuseumLightingFixtureDefinition,
  MuseumLightingStandardSystem,
  MuseumPassageIlluminatorDefinition,
  MuseumPoint,
  MuseumPoint3,
  MuseumRoomLightingPlan,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumSupplementalExhibitLayout,
  MuseumTrackDefinition,
} from './museumWorldTypes';

export const MUSEUM_LIGHTING_ROLLOUT_REVISION = 'rollout-v1' as const;

type RolloutGalleryRule = Readonly<{
  galleryNumber: number;
  system: MuseumLightingStandardSystem;
  expectedInstallationCount: number;
}>;

export const MUSEUM_LIGHTING_ROLLOUT_RULES = new Map<string, RolloutGalleryRule>([
  ['late-antiquity-inheritance', {galleryNumber: 3, system: 'track', expectedInstallationCount: 18}],
  ['classical-south-asian-worlds', {galleryNumber: 4, system: 'recessed', expectedInstallationCount: 30}],
  ['buddhist-philosophies', {galleryNumber: 5, system: 'recessed', expectedInstallationCount: 30}],
  ['classical-chinese-traditions', {galleryNumber: 6, system: 'recessed', expectedInstallationCount: 24}],
  ['east-asian-continuities', {galleryNumber: 7, system: 'track', expectedInstallationCount: 18}],
  ['islamic-philosophical-worlds', {galleryNumber: 8, system: 'recessed', expectedInstallationCount: 30}],
  ['jewish-philosophy', {galleryNumber: 9, system: 'recessed', expectedInstallationCount: 12}],
  ['latin-christian-scholastic', {galleryNumber: 10, system: 'track', expectedInstallationCount: 24}],
  ['core-questions-forum', {galleryNumber: 11, system: 'recessed', expectedInstallationCount: 25}],
  ['renaissance-humanism-new-method', {galleryNumber: 12, system: 'track', expectedInstallationCount: 18}],
  ['rationalism-mind-nature-system', {galleryNumber: 13, system: 'track', expectedInstallationCount: 18}],
  ['empiricism-science-political-order', {galleryNumber: 14, system: 'track', expectedInstallationCount: 18}],
  ['enlightenment-revolution-kant', {galleryNumber: 15, system: 'recessed', expectedInstallationCount: 26}],
  ['german-idealism-afterlives', {galleryNumber: 16, system: 'track', expectedInstallationCount: 25}],
  ['utility-liberty-history-capital', {galleryNumber: 17, system: 'track', expectedInstallationCount: 25}],
  ['faith-pessimism-life-value', {galleryNumber: 18, system: 'track', expectedInstallationCount: 18}],
  ['pragmatism-democratic-inquiry', {galleryNumber: 19, system: 'track', expectedInstallationCount: 24}],
  ['analytic-traditions', {galleryNumber: 20, system: 'recessed', expectedInstallationCount: 30}],
  ['phenomenology-existence-embodiment', {galleryNumber: 21, system: 'recessed', expectedInstallationCount: 30}],
  ['critique-power-deconstruction', {galleryNumber: 22, system: 'recessed', expectedInstallationCount: 24}],
  ['moral-life-practical-reason', {galleryNumber: 23, system: 'recessed', expectedInstallationCount: 24}],
  ['justice-democratic-reason', {galleryNumber: 24, system: 'track', expectedInstallationCount: 18}],
  ['feminist-philosophies', {galleryNumber: 25, system: 'recessed', expectedInstallationCount: 24}],
  ['colonialism-race-liberation', {galleryNumber: 26, system: 'track', expectedInstallationCount: 18}],
]);

type SourceOverride = Readonly<{id: string; x: number; z: number}>;

/** The complete and only Phase 1 coordinate-exception surface. */
export const MUSEUM_LIGHTING_SOURCE_OVERRIDES = new Map<string, SourceOverride>([
  ['classical-chinese-traditions/supplemental/china-sunzi-strategic-reason', {id: 'classical-chinese-traditions:supplemental:china-sunzi-strategic-reason:portal-clearance', x: -7.8, z: -1.5}],
  ['classical-chinese-traditions/supplemental/china-confucian-ritual-music', {id: 'classical-chinese-traditions:supplemental:china-confucian-ritual-music:portal-clearance', x: 7.8, z: -1.5}],
  ['classical-chinese-traditions/supplemental/china-zhuangzi-cook-ding', {id: 'classical-chinese-traditions:supplemental:china-zhuangzi-cook-ding:portal-clearance', x: -7.8, z: 1.5}],
  ['classical-chinese-traditions/supplemental/china-mohist-siege-defense', {id: 'classical-chinese-traditions:supplemental:china-mohist-siege-defense:portal-clearance', x: 7.8, z: 1.5}],
  ['core-questions-forum/primary/philosophy-of-language', {id: 'core-questions-forum:primary:philosophy-of-language:portal-clearance', x: 1.5, z: -9.4}],
  ['core-questions-forum/supplemental/forum-mulla-sadra-existence', {id: 'core-questions-forum:supplemental:forum-mulla-sadra-existence:portal-clearance', x: -1.5, z: -9.4}],
  ['core-questions-forum/supplemental/forum-dignaga-pramana', {id: 'core-questions-forum:supplemental:forum-dignaga-pramana:portal-clearance', x: -9.4, z: -1.2}],
  ['core-questions-forum/supplemental/forum-mozi-standards', {id: 'core-questions-forum:supplemental:forum-mozi-standards:portal-clearance', x: 9.4, z: -1.2}],
  ['core-questions-forum/supplemental/forum-avicenna-demonstration', {id: 'core-questions-forum:supplemental:forum-avicenna-demonstration:portal-clearance', x: -1.5, z: 9.4}],
  ['core-questions-forum/supplemental/forum-maimonides-law', {id: 'core-questions-forum:supplemental:forum-maimonides-law:portal-clearance', x: 9.4, z: 1.2}],
  ['core-questions-forum/supplemental/forum-confucian-music', {id: 'core-questions-forum:supplemental:forum-confucian-music:portal-clearance', x: -9.4, z: 1.2}],
  ['core-questions-forum/supplemental/forum-al-ghazali-causation', {id: 'core-questions-forum:supplemental:forum-al-ghazali-causation:portal-clearance', x: 1.5, z: 9.4}],
  ['enlightenment-revolution-kant/supplemental/enlightenment-liberty-slavery-contradiction', {id: 'g15-east-entry-north-gimbal', x: 7.8, z: -1.5}],
  ['enlightenment-revolution-kant/supplemental/enlightenment-rousseau-botany', {id: 'g15-east-entry-south-gimbal', x: 7.8, z: 1.5}],
  ['enlightenment-revolution-kant/supplemental/enlightenment-industry-public-judgment', {id: 'g15-west-entry-south-gimbal', x: -7.8, z: 1.5}],
  ['enlightenment-revolution-kant/supplemental/enlightenment-revolution-from-street', {id: 'g15-west-entry-north-gimbal', x: -7.8, z: -1.5}],
  ['critique-power-deconstruction/supplemental/continental-freiburg-phenomenological-line', {id: 'critique-power-deconstruction:supplemental:continental-freiburg-phenomenological-line:portal-clearance', x: -7.8, z: -1.5}],
  ['critique-power-deconstruction/supplemental/foucault-archive-practice', {id: 'critique-power-deconstruction:supplemental:foucault-archive-practice:portal-clearance', x: 7.8, z: -1.5}],
  ['critique-power-deconstruction/supplemental/derrida-writing-material-trace', {id: 'critique-power-deconstruction:supplemental:derrida-writing-material-trace:portal-clearance', x: 7.8, z: 1.5}],
  ['critique-power-deconstruction/supplemental/critical-theory-adorno-memorial', {id: 'critique-power-deconstruction:supplemental:critical-theory-adorno-memorial:portal-clearance', x: -7.8, z: 1.5}],
  ['moral-life-practical-reason/supplemental/ethics-labor-social-position', {id: 'moral-life-practical-reason:supplemental:ethics-labor-social-position:portal-clearance', x: -7.8, z: -1.5}],
  ['moral-life-practical-reason/supplemental/foot-natural-goodness', {id: 'moral-life-practical-reason:supplemental:foot-natural-goodness:portal-clearance', x: 7.8, z: -1.5}],
  ['moral-life-practical-reason/supplemental/utility-public-health-welfare', {id: 'moral-life-practical-reason:supplemental:utility-public-health-welfare:portal-clearance', x: 7.8, z: 1.5}],
  ['moral-life-practical-reason/supplemental/parfit-future-generations', {id: 'moral-life-practical-reason:supplemental:parfit-future-generations:portal-clearance', x: -7.8, z: 1.5}],
  ['feminist-philosophies/supplemental/feminist-care-dependency-labor', {id: 'feminist-philosophies:supplemental:feminist-care-dependency-labor:portal-clearance', x: -7.8, z: -1.5}],
  ['feminist-philosophies/supplemental/feminist-abolition-convention-exclusion', {id: 'feminist-philosophies:supplemental:feminist-abolition-convention-exclusion:portal-clearance', x: 7.8, z: -1.5}],
  ['feminist-philosophies/supplemental/beauvoir-boupacha-colonial-violence', {id: 'feminist-philosophies:supplemental:beauvoir-boupacha-colonial-violence:portal-clearance', x: 7.8, z: 1.5}],
  ['feminist-philosophies/supplemental/butler-assembly-precarity', {id: 'feminist-philosophies:supplemental:butler-assembly-precarity:portal-clearance', x: -7.8, z: 1.5}],
]);

const TRACK_PROFILE = Object.freeze({
  railYInset: .23,
  headYInset: .28,
  sideX: 8.65,
  returnCenterX: 6.75,
  returnInset: 3.05,
  boundaryInset: 1.55,
});

const round = (value: number, places = 4): number =>
  Number(value.toFixed(places));

const effectiveBounds = (cell: MuseumSpatialCell) => cell.renderBounds ?? cell.bounds;

const boundsKey = (cell: MuseumSpatialCell): string => {
  const bounds = effectiveBounds(cell);
  return [bounds.minX, bounds.maxX, bounds.minZ, bounds.maxZ]
    .map((value) => round(value, 3)).join(':');
};

type PhysicalCellGroup = Readonly<{
  cell: MuseumSpatialCell;
  spatialCellIds: readonly string[];
}>;

const groupPhysicalCells = (cells: readonly MuseumSpatialCell[]): readonly PhysicalCellGroup[] => {
  const groups = new Map<string, {cell: MuseumSpatialCell; spatialCellIds: string[]}>();
  for (const cell of cells) {
    const key = boundsKey(cell);
    const group = groups.get(key) ?? {cell, spatialCellIds: []};
    group.spatialCellIds.push(cell.id);
    groups.set(key, group);
  }
  return [...groups.values()];
};

const transformedPoint = (
  position: MuseumPoint,
  rotationY: number,
  local: MuseumPoint3,
): MuseumPoint3 => ({
  x: position.x + local.x * Math.cos(rotationY) + local.z * Math.sin(rotationY),
  y: local.y,
  z: position.z - local.x * Math.sin(rotationY) + local.z * Math.cos(rotationY),
});

const presentationNormal = (rotationY: number): MuseumPoint => ({
  x: Math.abs(Math.sin(rotationY)) < .001 ? 0 : Math.round(Math.sin(rotationY)),
  z: Math.abs(Math.cos(rotationY)) < .001 ? 0 : Math.round(Math.cos(rotationY)),
});

type ResolvedMedia = Readonly<{
  id: string;
  position: MuseumPoint3;
  width: number;
  height: number;
}>;

type ResolvedInstallSource = Readonly<{
  kind: 'primary' | 'supplemental';
  id: string;
  sourceId: string;
  installationKey: string;
  spatialCellId: string;
  position: MuseumPoint;
  rotationY: number;
  media: readonly ResolvedMedia[];
  anchor: boolean;
}>;

const resolvedSources = (
  hallId: string,
  exhibits: readonly MuseumExhibitLayout[],
  supplementalExhibits: readonly MuseumSupplementalExhibitLayout[],
): readonly ResolvedInstallSource[] => [
  ...exhibits.map((layout): ResolvedInstallSource => ({
    kind: 'primary',
    id: layout.id,
    sourceId: `primary:${layout.id}`,
    installationKey: `${hallId}/primary/${layout.id}`,
    spatialCellId: layout.spatialCellId,
    position: layout.position,
    rotationY: layout.rotationY,
    media: layout.scene.mediaMounts.map((media) => ({
      id: media.id,
      position: {x: media.position[0], y: media.position[1], z: media.position[2]},
      width: media.width,
      height: media.height,
    })),
    anchor: layout.presentationTier === 'anchor',
  })),
  ...supplementalExhibits.map((layout): ResolvedInstallSource => ({
    kind: 'supplemental',
    id: layout.id,
    sourceId: `supplemental:${layout.id}`,
    installationKey: `${hallId}/supplemental/${layout.id}`,
    spatialCellId: layout.spatialCellId,
    position: layout.position,
    rotationY: layout.rotationY,
    media: [{
      id: layout.mediaMount.id,
      position: {
        x: layout.mediaMount.position[0],
        y: layout.mediaMount.position[1],
        z: layout.mediaMount.position[2],
      },
      width: layout.mediaMount.width,
      height: layout.mediaMount.height,
    }],
    anchor: false,
  })),
];

const angleBetweenDegrees = (a: MuseumPoint3, b: MuseumPoint3): number => {
  const aLength = Math.hypot(a.x, a.y, a.z);
  const bLength = Math.hypot(b.x, b.y, b.z);
  const cosine = Math.max(-1, Math.min(1, (
    a.x * b.x + a.y * b.y + a.z * b.z
  ) / (aLength * bLength)));
  return Math.acos(cosine) * 180 / Math.PI;
};

const deriveCoverage = (
  source: ResolvedInstallSource,
  mountPosition: MuseumPoint3,
): Readonly<{target: MuseumPoint3; beam: MuseumLightingBeamDefinition}> => {
  if (!source.media.length) throw new Error(`${source.installationKey} has no resolved media.`);
  const expanded = source.media.map((media) => {
    const marginX = Math.max(.1, media.width * .05);
    const marginY = Math.max(.1, media.height * .05);
    return {
      id: media.id,
      minX: media.position.x - media.width / 2 - marginX,
      maxX: media.position.x + media.width / 2 + marginX,
      minY: media.position.y - media.height / 2 - marginY,
      maxY: media.position.y + media.height / 2 + marginY,
      z: media.position.z,
    };
  });
  const bounds = {
    minX: Math.min(...expanded.map(({minX}) => minX)),
    maxX: Math.max(...expanded.map(({maxX}) => maxX)),
    minY: Math.min(...expanded.map(({minY}) => minY)),
    maxY: Math.max(...expanded.map(({maxY}) => maxY)),
    minZ: Math.min(...expanded.map(({z}) => z)),
    maxZ: Math.max(...expanded.map(({z}) => z)),
  };
  const target = transformedPoint(source.position, source.rotationY, {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
    z: (bounds.minZ + bounds.maxZ) / 2,
  });
  const axis = {
    x: target.x - mountPosition.x,
    y: target.y - mountPosition.y,
    z: target.z - mountPosition.z,
  };
  const corners = expanded.flatMap((media) => [
    {x: media.minX, y: media.minY, z: media.z},
    {x: media.minX, y: media.maxY, z: media.z},
    {x: media.maxX, y: media.minY, z: media.z},
    {x: media.maxX, y: media.maxY, z: media.z},
  ].map((corner) => transformedPoint(source.position, source.rotationY, corner)));
  const maximumCornerAngle = Math.max(...corners.map((corner) => angleBetweenDegrees(axis, {
    x: corner.x - mountPosition.x,
    y: corner.y - mountPosition.y,
    z: corner.z - mountPosition.z,
  })));
  const requiredFullFieldAngleDegrees = maximumCornerAngle * 2;
  const installationToleranceReserveDegrees = 2;
  const selectedMinimumFullFieldAngleDegrees = Math.max(
    20,
    Math.ceil((requiredFullFieldAngleDegrees + installationToleranceReserveDegrees) / 5) * 5,
  );
  if (selectedMinimumFullFieldAngleDegrees > 90) {
    throw new Error(`${source.installationKey} cannot satisfy the approved one-fixture coverage envelope.`);
  }
  const category: MuseumLightingBeamDefinition['category'] =
    selectedMinimumFullFieldAngleDegrees <= 30
      ? 'narrow'
      : selectedMinimumFullFieldAngleDegrees <= 45
        ? 'medium'
        : selectedMinimumFullFieldAngleDegrees <= 60
          ? 'wide-flood'
          : selectedMinimumFullFieldAngleDegrees <= 75
            ? 'extra-wide-flood'
            : 'very-wide-framing-or-wallwash';
  return {
    target,
    beam: {
      category,
      requiredFullFieldAngleDegrees: round(requiredFullFieldAngleDegrees, 2),
      selectedMinimumFullFieldAngleDegrees,
      installationToleranceReserveDegrees,
      expandedMediaBounds: {
        minX: round(bounds.minX), maxX: round(bounds.maxX),
        minY: round(bounds.minY), maxY: round(bounds.maxY),
        minZ: round(bounds.minZ), maxZ: round(bounds.maxZ),
      },
      mediaMountIds: expanded.map(({id}) => id),
    },
  };
};

const createTrackCeiling = (
  physicalCells: readonly PhysicalCellGroup[],
  activeDoorwaySlots: readonly MuseumManifestDoorwaySlot[],
): Readonly<{
  tracks: readonly MuseumTrackDefinition[];
  diffusers: readonly MuseumAmbientDiffuserDefinition[];
  circulation: readonly MuseumCirculationDownlightDefinition[];
}> => {
  const tracks: MuseumTrackDefinition[] = [];
  const diffusers: MuseumAmbientDiffuserDefinition[] = [];
  const circulation: MuseumCirculationDownlightDefinition[] = [];
  for (const {cell} of physicalCells) {
    const bounds = effectiveBounds(cell);
    const centerZ = (bounds.minZ + bounds.maxZ) / 2;
    const railY = cell.ceilingHeight - TRACK_PROFILE.railYInset;
    for (const side of [-1, 1]) {
      const sideName = side < 0 ? 'west' : 'east';
      const serviceId = `track:${cell.id}:${sideName}-service`;
      tracks.push({
        id: serviceId,
        center: {x: side * TRACK_PROFILE.returnCenterX, y: railY, z: centerZ},
        size: {width: 6.1, height: .07, depth: .08},
        segments: [
          {
            id: `track:${cell.id}:${sideName}-side`,
            center: {x: side * TRACK_PROFILE.sideX, y: railY, z: centerZ},
            size: {
              width: .08,
              height: .07,
              depth: bounds.maxZ - bounds.minZ - TRACK_PROFILE.boundaryInset * 2,
            },
          },
          {
            id: `track:${cell.id}:lower-${sideName}`,
            center: {
              x: side * TRACK_PROFILE.returnCenterX,
              y: railY,
              z: bounds.minZ + TRACK_PROFILE.returnInset,
            },
            size: {width: 6.1, height: .07, depth: .08},
          },
          {
            id: `track:${cell.id}:upper-${sideName}`,
            center: {
              x: side * TRACK_PROFILE.returnCenterX,
              y: railY,
              z: bounds.maxZ - TRACK_PROFILE.returnInset,
            },
            size: {width: 6.1, height: .07, depth: .08},
          },
        ],
      });
    }
    let diffuserStart = bounds.minZ + TRACK_PROFILE.boundaryInset;
    let diffuserEnd = bounds.maxZ - TRACK_PROFILE.boundaryInset;
    for (const doorway of activeDoorwaySlots) {
      if (Math.abs(doorway.inwardNormal.z) < .5) continue;
      if (Math.abs(doorway.position.z - bounds.minZ) < .7) diffuserStart = bounds.minZ + 4.7;
      if (Math.abs(doorway.position.z - bounds.maxZ) < .7) diffuserEnd = bounds.maxZ - 4.7;
    }
    for (const x of [-2.9, 2.9]) {
      diffusers.push({
        id: `diffuser:${cell.id}:${x < 0 ? 'west' : 'east'}`,
        spatialCellId: cell.id,
        center: {x, y: cell.ceilingHeight - .018, z: (diffuserStart + diffuserEnd) / 2},
        size: {width: .7, height: .035, depth: diffuserEnd - diffuserStart},
        colorTemperatureK: 3000,
      });
    }
    circulation.push({
      id: `circulation:${cell.id}:center`,
      position: {x: 0, y: cell.ceilingHeight, z: centerZ},
      colorTemperatureK: 3000,
    });
  }
  return {tracks, diffusers, circulation};
};

const createRecessedCeiling = (
  physicalCells: readonly PhysicalCellGroup[],
): Readonly<{
  diffusers: readonly MuseumAmbientDiffuserDefinition[];
  circulation: readonly MuseumCirculationDownlightDefinition[];
}> => {
  const diffusers: MuseumAmbientDiffuserDefinition[] = [];
  const circulation: MuseumCirculationDownlightDefinition[] = [];
  const isHub = physicalCells.length === 4 && physicalCells.every(({cell}) => {
    const bounds = effectiveBounds(cell);
    return bounds.maxX - bounds.minX <= 15 && bounds.maxZ - bounds.minZ <= 15;
  });
  for (const {cell} of physicalCells) {
    const bounds = effectiveBounds(cell);
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerZ = (bounds.minZ + bounds.maxZ) / 2;
    for (const offset of [-.72, .72]) {
      diffusers.push({
        id: `slot:${cell.id}:${offset < 0 ? 'a' : 'b'}`,
        spatialCellId: cell.id,
        center: {x: centerX, y: cell.ceilingHeight - .018, z: centerZ + offset},
        size: {width: 3, height: .035, depth: .5},
        colorTemperatureK: 3000,
      });
    }
    circulation.push({
      id: `circulation:${cell.id}:center`,
      position: {x: centerX, y: cell.ceilingHeight, z: centerZ},
      colorTemperatureK: 3000,
    });
  }
  if (isHub) {
    const ceilingHeight = physicalCells[0].cell.ceilingHeight;
    const hubPoints = [
      ['center', 0, 0],
      ['north', 0, -5.4],
      ['east', 5.4, 0],
      ['south', 0, 5.4],
      ['west', -5.4, 0],
    ] as const;
    circulation.push(...hubPoints.map(([id, x, z]) => ({
      id: `circulation:hub-${id}`,
      position: {x, y: ceilingHeight, z},
      colorTemperatureK: 3000,
    })));
  }
  return {diffusers, circulation};
};

const createPassageIlluminators = (
  cells: readonly MuseumSpatialCell[],
  connections: readonly MuseumSpatialConnection[],
  system: MuseumLightingStandardSystem,
): readonly MuseumPassageIlluminatorDefinition[] => connections.map((connection) => {
  const from = cells.find(({id}) => id === connection.fromCellId);
  const to = cells.find(({id}) => id === connection.toCellId);
  if (!from || !to) throw new Error(`Lighting passage ${connection.id} references a missing room.`);
  const width = connection.openingBounds.maxX - connection.openingBounds.minX;
  const depth = connection.openingBounds.maxZ - connection.openingBounds.minZ;
  return {
    id: `passage:${connection.id}`,
    position: {
      x: (connection.openingBounds.minX + connection.openingBounds.maxX) / 2,
      y: Math.min(from.ceilingHeight, to.ceilingHeight) - (system === 'track' ? .018 : 0),
      z: (connection.openingBounds.minZ + connection.openingBounds.maxZ) / 2,
    },
    kind: system === 'track' ? 'slot' : 'recess',
    ...(system === 'track' ? {
      size: depth > width
        ? {width: 1.6, height: .035, depth: .55}
        : {width: .55, height: .035, depth: 1.6},
    } : {}),
    colorTemperatureK: 3000,
  };
});

export type MuseumLightingRolloutPlan = Readonly<{
  lightingStandard: {system: MuseumLightingStandardSystem; revision: typeof MUSEUM_LIGHTING_ROLLOUT_REVISION};
  tracks: readonly MuseumTrackDefinition[];
  fixtures: readonly MuseumLightingFixtureDefinition[];
  ambientDiffusers: readonly MuseumAmbientDiffuserDefinition[];
  circulationDownlights: readonly MuseumCirculationDownlightDefinition[];
  passageIlluminators: readonly MuseumPassageIlluminatorDefinition[];
  roomPlans: readonly MuseumRoomLightingPlan[];
}>;

export const createMuseumLightingRolloutPlan = ({
  hallId,
  cells,
  spatialConnections,
  exhibits,
  supplementalExhibits,
  activeDoorwaySlots,
}: {
  hallId: string;
  cells: readonly MuseumSpatialCell[];
  spatialConnections: readonly MuseumSpatialConnection[];
  exhibits: readonly MuseumExhibitLayout[];
  supplementalExhibits: readonly MuseumSupplementalExhibitLayout[];
  activeDoorwaySlots: readonly MuseumManifestDoorwaySlot[];
}): MuseumLightingRolloutPlan | undefined => {
  const rule = MUSEUM_LIGHTING_ROLLOUT_RULES.get(hallId);
  if (!rule) return undefined;
  const sources = resolvedSources(hallId, exhibits, supplementalExhibits);
  if (sources.length !== rule.expectedInstallationCount) {
    throw new Error(`${hallId} lighting expected ${rule.expectedInstallationCount} resolved installations; found ${sources.length}.`);
  }
  const physicalCells = groupPhysicalCells(cells);
  const physicalBySpatialCell = new Map<string, PhysicalCellGroup>();
  physicalCells.forEach((group) => group.spatialCellIds.forEach((id) => physicalBySpatialCell.set(id, group)));
  const trackCeiling = rule.system === 'track'
    ? createTrackCeiling(physicalCells, activeDoorwaySlots)
    : {tracks: [], diffusers: [], circulation: []};
  const recessedCeiling = rule.system === 'recessed'
    ? createRecessedCeiling(physicalCells)
    : {diffusers: [], circulation: []};
  const fixtures = sources.map((source): MuseumLightingFixtureDefinition => {
    const cell = cells.find(({id}) => id === source.spatialCellId);
    const physical = physicalBySpatialCell.get(source.spatialCellId);
    if (!cell || !physical) throw new Error(`${source.installationKey} references a missing physical room.`);
    const bounds = effectiveBounds(physical.cell);
    const normal = presentationNormal(source.rotationY);
    let mountPosition: MuseumPoint3;
    let trackId: string | undefined;
    let trackSegmentId: string | undefined;
    const sourceOverride = MUSEUM_LIGHTING_SOURCE_OVERRIDES.get(source.installationKey);
    if (rule.system === 'track') {
      const sideName = source.position.x < 0 ? 'west' : 'east';
      trackId = `track:${physical.cell.id}:${sideName}-service`;
      if (Math.abs(normal.x) > .5) {
        mountPosition = {
          x: (source.position.x < 0 ? -1 : 1) * TRACK_PROFILE.sideX,
          y: cell.ceilingHeight - TRACK_PROFILE.headYInset,
          z: source.position.z,
        };
        trackSegmentId = `track:${physical.cell.id}:${sideName}-side`;
      } else {
        const lower = normal.z > 0;
        mountPosition = {
          x: source.position.x,
          y: cell.ceilingHeight - TRACK_PROFILE.headYInset,
          z: lower ? bounds.minZ + TRACK_PROFILE.returnInset : bounds.maxZ - TRACK_PROFILE.returnInset,
        };
        trackSegmentId = `track:${physical.cell.id}:${lower ? 'lower' : 'upper'}-${sideName}`;
      }
    } else {
      mountPosition = {
        x: sourceOverride?.x ?? source.position.x + normal.x * 2.35,
        y: cell.ceilingHeight - GALLERY_02_RECESS_PROFILE.mountInset,
        z: sourceOverride?.z ?? source.position.z + normal.z * 2.35,
      };
    }
    const {target, beam} = deriveCoverage(source, mountPosition);
    const horizontalAim = Math.hypot(target.x - mountPosition.x, target.z - mountPosition.z);
    const aimDegrees = Math.atan2(horizontalAim, mountPosition.y - target.y) * 180 / Math.PI;
    if (aimDegrees > 50 + .001) {
      throw new Error(`${source.installationKey} exceeds the 50 degree aiming envelope.`);
    }
    return {
      id: `g${String(rule.galleryNumber).padStart(2, '0')}:${source.sourceId}`,
      kind: rule.system === 'track' ? 'track-head' : 'recessed-spot',
      lightingRole: rule.system === 'track' ? 'track-head' : 'recessed-gimbal',
      spatialCellId: source.spatialCellId,
      targetGroupId: `rollout:${source.sourceId}`,
      sourceIds: [source.sourceId],
      trackId,
      trackSegmentId,
      mountPosition,
      target,
      coverageRadius: 0,
      width: .3,
      beam,
      sourceOverrideId: sourceOverride?.id,
      contrastScale: source.anchor ? 1.6 : 1,
    };
  });
  const passageIlluminators = rule.system === 'recessed' && physicalCells.length === 4
    ? []
    : createPassageIlluminators(cells, spatialConnections, rule.system);
  const tracks = trackCeiling.tracks;
  const ambientDiffusers = rule.system === 'track' ? trackCeiling.diffusers : recessedCeiling.diffusers;
  const circulationDownlights = rule.system === 'track' ? trackCeiling.circulation : recessedCeiling.circulation;
  const roomPlans = cells.map((cell): MuseumRoomLightingPlan => {
    const roomFixtures = fixtures.filter(({spatialCellId}) => spatialCellId === cell.id);
    const physical = physicalBySpatialCell.get(cell.id)!;
    const roomTracks = rule.system === 'track'
      ? tracks.filter(({id}) => id.startsWith(`track:${physical.cell.id}:`))
      : [];
    return {
      spatialCellId: cell.id,
      profile: rule.system === 'track' ? 'linear' : physicalCells.length === 4 ? 'hub' : 'compact',
      sourceIds: roomFixtures.flatMap(({sourceIds}) => sourceIds).sort(),
      fixtureIds: roomFixtures.map(({id}) => id),
      trackIds: roomTracks.map(({id}) => id),
    };
  });
  return {
    lightingStandard: {system: rule.system, revision: MUSEUM_LIGHTING_ROLLOUT_REVISION},
    tracks,
    fixtures,
    ambientDiffusers,
    circulationDownlights,
    passageIlluminators,
    roomPlans,
  };
};
