import type {
  MuseumExhibitLayout,
  MuseumLightingFixtureDefinition,
  MuseumPoint,
  MuseumPoint3,
  MuseumRoomLightingPlan,
  MuseumRoomLightingProfile,
  MuseumSpatialCell,
  MuseumSupplementalExhibitLayout,
  MuseumTrackDefinition,
} from './museumWorldTypes';

type LightingSource = {
  id: string;
  kind: 'primary' | 'supplemental';
  spatialCellId: string;
  target: MuseumPoint3;
  normal: MuseumPoint;
  anchor: boolean;
};

type LightingTargetGroup = {
  id: string;
  sources: readonly LightingSource[];
  target: MuseumPoint3;
  normal: MuseumPoint;
  tangentSpan: number;
  coverageRadius: number;
  anchor: boolean;
};

export type MuseumExhibitLightingPlan = {
  tracks: readonly MuseumTrackDefinition[];
  fixtures: readonly MuseumLightingFixtureDefinition[];
  roomPlans: readonly MuseumRoomLightingPlan[];
};

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.max(minimum, Math.min(maximum, value));

const transformedPoint = (
  position: MuseumPoint,
  rotationY: number,
  local: MuseumPoint3,
): MuseumPoint3 => ({
  x: position.x + local.x * Math.cos(rotationY) + local.z * Math.sin(rotationY),
  y: local.y,
  z: position.z - local.x * Math.sin(rotationY) + local.z * Math.cos(rotationY),
});

const presentationNormal = (rotationY: number): MuseumPoint => {
  const x = Math.round(Math.sin(rotationY));
  const z = Math.round(Math.cos(rotationY));
  return {x: Object.is(x, -0) ? 0 : x, z: Object.is(z, -0) ? 0 : z};
};

const primarySource = (layout: MuseumExhibitLayout): LightingSource => ({
  id: `primary:${layout.id}`,
  kind: 'primary',
  spatialCellId: layout.spatialCellId,
  target: transformedPoint(layout.position, layout.rotationY, layout.scene.focalTarget),
  normal: presentationNormal(layout.rotationY),
  anchor: layout.presentationTier === 'anchor',
});

const supplementalSource = (layout: MuseumSupplementalExhibitLayout): LightingSource => ({
  id: `supplemental:${layout.id}`,
  kind: 'supplemental',
  spatialCellId: layout.spatialCellId,
  target: transformedPoint(layout.position, layout.rotationY, {
    x: layout.mediaMount.position[0],
    y: layout.mediaMount.position[1],
    z: layout.mediaMount.position[2],
  }),
  normal: presentationNormal(layout.rotationY),
  anchor: false,
});

export const resolveMuseumRoomLightingProfile = (
  cell: MuseumSpatialCell,
  crossroads: boolean,
): MuseumRoomLightingProfile => {
  if (crossroads) return 'hub';
  const width = cell.bounds.maxX - cell.bounds.minX;
  const depth = cell.bounds.maxZ - cell.bounds.minZ;
  return Math.min(width, depth) <= 12 || width * depth <= 300 ? 'compact' : 'linear';
};

const averageTarget = (sources: readonly LightingSource[]): MuseumPoint3 => ({
  x: sources.reduce((sum, source) => sum + source.target.x, 0) / sources.length,
  y: sources.reduce((sum, source) => sum + source.target.y, 0) / sources.length,
  z: sources.reduce((sum, source) => sum + source.target.z, 0) / sources.length,
});

const tangentCoordinate = (source: LightingSource): number =>
  source.normal.x === 0 ? source.target.x : source.target.z;

const normalCoordinate = (source: LightingSource): number =>
  source.normal.x === 0 ? source.target.z : source.target.x;

const groupedTargets = (
  cell: MuseumSpatialCell,
  sources: readonly LightingSource[],
  profile: MuseumRoomLightingProfile,
): readonly LightingTargetGroup[] => {
  const groups: LightingTargetGroup[] = [];
  const regularByFace = new Map<string, LightingSource[]>();
  for (const source of sources) {
    if (source.anchor) {
      const target = averageTarget([source]);
      groups.push({
        id: `${cell.id}:anchor:${source.id}`,
        sources: [source],
        target,
        normal: source.normal,
        tangentSpan: 0,
        coverageRadius: 0,
        anchor: true,
      });
      continue;
    }
    // The plane bucket keeps opposing and inner display rows separate even
    // when they share the same cardinal facing direction.
    const planeBucket = Math.round(normalCoordinate(source) / 2);
    const key = `${source.normal.x}:${source.normal.z}:${planeBucket}`;
    regularByFace.set(key, [...(regularByFace.get(key) ?? []), source]);
  }

  const maximumSpan = profile === 'linear' ? 6.4 : profile === 'compact' ? 5.4 : 4.8;
  for (const [faceKey, faceSources] of [...regularByFace].sort(([first], [second]) => first.localeCompare(second))) {
    const ordered = [...faceSources].sort((first, second) =>
      tangentCoordinate(first) - tangentCoordinate(second) || first.id.localeCompare(second.id));
    let chunk: LightingSource[] = [];
    for (const source of ordered) {
      const spanWithSource = chunk.length
        ? tangentCoordinate(source) - tangentCoordinate(chunk[0])
        : 0;
      if (chunk.length && (spanWithSource > maximumSpan || chunk.length >= 4)) {
        const target = averageTarget(chunk);
        const tangentValues = chunk.map(tangentCoordinate);
        groups.push({
          id: `${cell.id}:group:${faceKey}:${groups.length + 1}`,
          sources: chunk,
          target,
          normal: chunk[0].normal,
          tangentSpan: Math.max(...tangentValues) - Math.min(...tangentValues),
          coverageRadius: Math.max(...chunk.map(({target: point}) =>
            Math.hypot(point.x - target.x, point.z - target.z))),
          anchor: false,
        });
        chunk = [];
      }
      chunk.push(source);
    }
    if (!chunk.length) continue;
    const target = averageTarget(chunk);
    const tangentValues = chunk.map(tangentCoordinate);
    groups.push({
      id: `${cell.id}:group:${faceKey}:${groups.length + 1}`,
      sources: chunk,
      target,
      normal: chunk[0].normal,
      tangentSpan: Math.max(...tangentValues) - Math.min(...tangentValues),
      coverageRadius: Math.max(...chunk.map(({target: point}) =>
        Math.hypot(point.x - target.x, point.z - target.z))),
      anchor: false,
    });
  }
  return groups;
};

const fixtureKind = (
  profile: MuseumRoomLightingProfile,
  group: LightingTargetGroup,
): MuseumLightingFixtureDefinition['kind'] => {
  if (profile === 'linear') return 'track-head';
  if (group.anchor || group.sources.every(({kind}) => kind === 'primary')) {
    return 'recessed-spot';
  }
  return 'wall-washer';
};

const fixtureForGroup = (
  cell: MuseumSpatialCell,
  profile: MuseumRoomLightingProfile,
  group: LightingTargetGroup,
  index: number,
): MuseumLightingFixtureDefinition => {
  const kind = fixtureKind(profile, group);
  const inset = kind === 'track-head' ? 1.8 : kind === 'recessed-spot' ? 1.15 : .36;
  const margin = .32;
  const mountPosition = {
    x: clamp(group.target.x + group.normal.x * inset, cell.bounds.minX + margin, cell.bounds.maxX - margin),
    y: cell.ceilingHeight - (kind === 'track-head' ? .28 : kind === 'recessed-spot' ? .1 : .18),
    z: clamp(group.target.z + group.normal.z * inset, cell.bounds.minZ + margin, cell.bounds.maxZ - margin),
  };
  const id = `fixture:${cell.id}:${index + 1}`;
  const width = kind === 'wall-washer'
    ? clamp(group.tangentSpan + .8, 1.1, 5.2)
    : .3;
  if (kind !== 'track-head') {
    return {
      id,
      kind,
      spatialCellId: cell.id,
      targetGroupId: group.id,
      sourceIds: group.sources.map(({id: sourceId}) => sourceId),
      mountPosition,
      target: group.target,
      coverageRadius: group.coverageRadius,
      width,
    };
  }
  return {
    id,
    kind,
    spatialCellId: cell.id,
    targetGroupId: group.id,
    sourceIds: group.sources.map(({id: sourceId}) => sourceId),
    mountPosition,
    target: group.target,
    coverageRadius: group.coverageRadius,
    width,
  };
};

const installLinearTracks = (
  cell: MuseumSpatialCell,
  fixtures: readonly MuseumLightingFixtureDefinition[],
): {fixtures: readonly MuseumLightingFixtureDefinition[]; tracks: readonly MuseumTrackDefinition[]} => {
  const width = cell.bounds.maxX - cell.bounds.minX;
  const depth = cell.bounds.maxZ - cell.bounds.minZ;
  const alongX = width >= depth;
  const longMinimum = alongX ? cell.bounds.minX : cell.bounds.minZ;
  const longMaximum = alongX ? cell.bounds.maxX : cell.bounds.maxZ;
  const longCenter = (longMinimum + longMaximum) / 2;
  const shortMinimum = alongX ? cell.bounds.minZ : cell.bounds.minX;
  const shortMaximum = alongX ? cell.bounds.maxZ : cell.bounds.maxX;
  const shortCenter = (shortMinimum + shortMaximum) / 2;
  const laneOffset = Math.min(3.2, (shortMaximum - shortMinimum) * .2);
  const railLength = Math.max(3.2, longMaximum - longMinimum - 3.2);
  const lanes = [shortCenter - laneOffset, shortCenter + laneOffset];
  const assigned = lanes.map(() => [] as MuseumLightingFixtureDefinition[]);

  for (const fixture of fixtures) {
    const shortTarget = alongX ? fixture.target.z : fixture.target.x;
    const laneIndex = Math.abs(shortTarget - lanes[0]) <= Math.abs(shortTarget - lanes[1]) ? 0 : 1;
    assigned[laneIndex].push(fixture);
  }

  const tracks: MuseumTrackDefinition[] = [];
  const installed: MuseumLightingFixtureDefinition[] = [];
  assigned.forEach((laneFixtures, laneIndex) => {
    if (!laneFixtures.length) return;
    const trackId = `track:${cell.id}:lane-${laneIndex + 1}`;
    const lane = lanes[laneIndex];
    tracks.push({
      id: trackId,
      center: {
        x: alongX ? longCenter : lane,
        y: cell.ceilingHeight - .23,
        z: alongX ? lane : longCenter,
      },
      size: {width: railLength, height: .07, depth: .08},
      rotationY: alongX ? 0 : Math.PI / 2,
    });
    const endpointMargin = .28;
    const usableMinimum = longCenter - railLength / 2 + endpointMargin;
    const usableMaximum = longCenter + railLength / 2 - endpointMargin;
    for (const fixture of laneFixtures) {
      const targetAlong = alongX ? fixture.target.x : fixture.target.z;
      const mountAlong = clamp(targetAlong, usableMinimum, usableMaximum);
      installed.push({
        ...fixture,
        trackId,
        mountPosition: {
          x: alongX ? mountAlong : lane,
          y: cell.ceilingHeight - .28,
          z: alongX ? lane : mountAlong,
        },
      });
    }
  });
  return {fixtures: installed, tracks};
};

/**
 * Deterministic fixture planning for all primary and supplemental displays.
 * Fixtures are visible architecture only; canonical runtime illumination uses
 * shared fill/material response instead of one WebGL light per display.
 */
export const createMuseumExhibitLightingPlan = ({
  cells,
  exhibits,
  supplementalExhibits,
  crossroads,
}: {
  cells: readonly MuseumSpatialCell[];
  exhibits: readonly MuseumExhibitLayout[];
  supplementalExhibits: readonly MuseumSupplementalExhibitLayout[];
  crossroads: boolean;
}): MuseumExhibitLightingPlan => {
  const allSources = [
    ...exhibits.map(primarySource),
    ...supplementalExhibits.map(supplementalSource),
  ];
  const tracks: MuseumTrackDefinition[] = [];
  const fixtures: MuseumLightingFixtureDefinition[] = [];
  const roomPlans: MuseumRoomLightingPlan[] = [];
  for (const cell of cells) {
    const profile = resolveMuseumRoomLightingProfile(cell, crossroads);
    const sources = allSources.filter(({spatialCellId}) => spatialCellId === cell.id);
    const groups = groupedTargets(cell, sources, profile);
    const cellFixtures: MuseumLightingFixtureDefinition[] = [];
    const cellTracks: MuseumTrackDefinition[] = [];
    groups.forEach((group, index) => {
      cellFixtures.push(fixtureForGroup(cell, profile, group, index));
    });
    if (profile === 'linear') {
      const installed = installLinearTracks(cell, cellFixtures);
      cellFixtures.splice(0, cellFixtures.length, ...installed.fixtures);
      cellTracks.push(...installed.tracks);
    }
    fixtures.push(...cellFixtures);
    tracks.push(...cellTracks);
    roomPlans.push({
      spatialCellId: cell.id,
      profile,
      sourceIds: sources.map(({id}) => id).sort(),
      fixtureIds: cellFixtures.map(({id}) => id),
      trackIds: cellTracks.map(({id}) => id),
    });
  }
  return {tracks, fixtures, roomPlans};
};
