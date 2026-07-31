import type {MuseumPoint, MuseumWallDefinition} from './museumWorldTypes';

export type MuseumWallTransform = {
  x: number;
  z: number;
  yaw: number;
};

export type MuseumWallLongAxis = 'width' | 'depth';

export type MuseumWallRenderGeometry = {
  center: MuseumPoint;
  size: {width: number; depth: number};
  longAxis: MuseumWallLongAxis;
  run: number;
  thickness: number;
};

export type MuseumWorldWallPlane = {
  tangent: MuseumPoint;
  normal: MuseumPoint;
  coordinate: number;
  start: number;
  end: number;
  bottom: number;
  top: number;
  longAxis: MuseumWallLongAxis;
  thickness: number;
};

const COPLANAR_EPSILON = .012;
const DIRECTION_EPSILON = 1e-6;
const MINIMUM_FRAGMENT_SIZE = .08;

const transformDirection = (
  transform: MuseumWallTransform,
  direction: MuseumPoint,
): MuseumPoint => {
  const cosine = Math.cos(transform.yaw);
  const sine = Math.sin(transform.yaw);
  return {
    x: cosine * direction.x + sine * direction.z,
    z: -sine * direction.x + cosine * direction.z,
  };
};

const transformPoint = (
  transform: MuseumWallTransform,
  point: MuseumPoint,
): MuseumPoint => {
  const direction = transformDirection(transform, point);
  return {
    x: transform.x + direction.x,
    z: transform.z + direction.z,
  };
};

const inverseTransformPoint = (
  transform: MuseumWallTransform,
  point: MuseumPoint,
): MuseumPoint => {
  const offsetX = point.x - transform.x;
  const offsetZ = point.z - transform.z;
  const cosine = Math.cos(transform.yaw);
  const sine = Math.sin(transform.yaw);
  return {
    x: cosine * offsetX - sine * offsetZ,
    z: sine * offsetX + cosine * offsetZ,
  };
};

const canonicalDirection = (direction: MuseumPoint): MuseumPoint => {
  const reverse = direction.x < -DIRECTION_EPSILON
    || (Math.abs(direction.x) <= DIRECTION_EPSILON && direction.z < 0);
  return reverse
    ? {x: -direction.x, z: -direction.z}
    : direction;
};

const dot = (first: MuseumPoint, second: MuseumPoint): number =>
  first.x * second.x + first.z * second.z;

const alignedPlane = (
  reference: MuseumWorldWallPlane,
  plane: MuseumWorldWallPlane,
): MuseumWorldWallPlane | undefined => {
  const alignment = dot(reference.tangent, plane.tangent);
  if (Math.abs(Math.abs(alignment) - 1) > DIRECTION_EPSILON) return undefined;
  if (alignment >= 0) return plane;
  return {
    ...plane,
    tangent: {x: -plane.tangent.x, z: -plane.tangent.z},
    normal: {x: -plane.normal.x, z: -plane.normal.z},
    coordinate: -plane.coordinate,
    start: -plane.end,
    end: -plane.start,
  };
};

export const resolveMuseumWallRenderGeometry = (
  wall: MuseumWallDefinition,
): MuseumWallRenderGeometry => {
  const center = wall.renderCenter ?? wall.center;
  const size = wall.renderSize ?? wall.size;
  const longAxis: MuseumWallLongAxis = size.width >= size.depth ? 'width' : 'depth';
  return {
    center,
    size,
    longAxis,
    run: size[longAxis],
    thickness: size[longAxis === 'width' ? 'depth' : 'width'],
  };
};

/**
 * Returns all four corners of the exact render footprint, after both the
 * authored wall rotation and its hall/building world transform.
 */
export const museumWallWorldFootprint = (
  transform: MuseumWallTransform,
  wall: MuseumWallDefinition,
): readonly MuseumPoint[] => {
  const {center, size} = resolveMuseumWallRenderGeometry(wall);
  const cosine = Math.cos(wall.rotation);
  const sine = Math.sin(wall.rotation);
  return [
    [-size.width / 2, -size.depth / 2],
    [size.width / 2, -size.depth / 2],
    [size.width / 2, size.depth / 2],
    [-size.width / 2, size.depth / 2],
  ].map(([localX, localZ]) => transformPoint(transform, {
    x: center.x + cosine * localX + sine * localZ,
    z: center.z - sine * localX + cosine * localZ,
  }));
};

/**
 * Describes the same rectangular surface that the Three renderer draws.
 * Unlike the previous axis-snapped representation, this supports width-long,
 * depth-long, render-overridden, and arbitrarily rotated walls.
 */
export const museumWorldWallPlane = (
  transform: MuseumWallTransform,
  wall: MuseumWallDefinition,
): MuseumWorldWallPlane => {
  const geometry = resolveMuseumWallRenderGeometry(wall);
  const wallCosine = Math.cos(wall.rotation);
  const wallSine = Math.sin(wall.rotation);
  const localTangent = geometry.longAxis === 'width'
    ? {x: wallCosine, z: -wallSine}
    : {x: wallSine, z: wallCosine};
  const tangent = canonicalDirection(transformDirection(transform, localTangent));
  const normal = {x: -tangent.z, z: tangent.x};
  const center = transformPoint(transform, geometry.center);
  const centerAlongRun = dot(center, tangent);
  const bottom = wall.bottom ?? 0;
  return {
    tangent,
    normal,
    coordinate: dot(center, normal),
    start: centerAlongRun - geometry.run / 2,
    end: centerAlongRun + geometry.run / 2,
    bottom,
    top: bottom + wall.height,
    longAxis: geometry.longAxis,
    thickness: geometry.thickness,
  };
};

export const museumWallPlaneOverlapArea = (
  first: MuseumWorldWallPlane,
  second: MuseumWorldWallPlane,
): number => {
  const aligned = alignedPlane(first, second);
  if (!aligned || Math.abs(aligned.coordinate - first.coordinate) > COPLANAR_EPSILON) return 0;
  const run = Math.min(first.end, aligned.end) - Math.max(first.start, aligned.start);
  const height = Math.min(first.top, aligned.top) - Math.max(first.bottom, aligned.bottom);
  return run > COPLANAR_EPSILON && height > COPLANAR_EPSILON ? run * height : 0;
};

export const subtractMuseumWallPlane = (
  candidate: MuseumWorldWallPlane,
  covering: MuseumWorldWallPlane,
): readonly MuseumWorldWallPlane[] => {
  const aligned = alignedPlane(candidate, covering);
  if (!aligned || Math.abs(aligned.coordinate - candidate.coordinate) > COPLANAR_EPSILON) {
    return [candidate];
  }
  const overlapStart = Math.max(candidate.start, aligned.start);
  const overlapEnd = Math.min(candidate.end, aligned.end);
  const overlapBottom = Math.max(candidate.bottom, aligned.bottom);
  const overlapTop = Math.min(candidate.top, aligned.top);
  if (
    overlapEnd - overlapStart <= COPLANAR_EPSILON
    || overlapTop - overlapBottom <= COPLANAR_EPSILON
  ) return [candidate];

  const fragments: MuseumWorldWallPlane[] = [];
  const append = (start: number, end: number, bottom: number, top: number) => {
    if (end - start < MINIMUM_FRAGMENT_SIZE || top - bottom < MINIMUM_FRAGMENT_SIZE) return;
    fragments.push({...candidate, start, end, bottom, top});
  };
  append(candidate.start, overlapStart, candidate.bottom, candidate.top);
  append(overlapEnd, candidate.end, candidate.bottom, candidate.top);
  append(overlapStart, overlapEnd, candidate.bottom, overlapBottom);
  append(overlapStart, overlapEnd, overlapTop, candidate.top);
  return fragments;
};

export const museumWallFragmentFromPlane = (
  transform: MuseumWallTransform,
  wall: MuseumWallDefinition,
  fragment: MuseumWorldWallPlane,
  fragmentIndex: number,
): MuseumWallDefinition => {
  const runCenter = (fragment.start + fragment.end) / 2;
  const worldCenter = {
    x: fragment.tangent.x * runCenter + fragment.normal.x * fragment.coordinate,
    z: fragment.tangent.z * runCenter + fragment.normal.z * fragment.coordinate,
  };
  const renderGeometry = resolveMuseumWallRenderGeometry(wall);
  const renderSize = {...renderGeometry.size};
  renderSize[renderGeometry.longAxis] = fragment.end - fragment.start;
  const result: MuseumWallDefinition = {
    ...wall,
    id: `${wall.id}:visible-${fragmentIndex + 1}`,
    renderCenter: inverseTransformPoint(transform, worldCenter),
    renderSize,
    height: fragment.top - fragment.bottom,
  };
  if (fragment.bottom > .001) result.bottom = fragment.bottom;
  else delete result.bottom;
  return result;
};

/**
 * Collision geometry remains authored; this produces render-only fragments
 * after surfaces already owned by an earlier structural layer are removed.
 */
export const removeCoveredMuseumWallSurfaces = (
  transform: MuseumWallTransform,
  walls: readonly MuseumWallDefinition[],
  coveringPlanes: readonly MuseumWorldWallPlane[],
): readonly MuseumWallDefinition[] => walls.flatMap((wall) => {
  const original = museumWorldWallPlane(transform, wall);
  const fragments = coveringPlanes.reduce<readonly MuseumWorldWallPlane[]>(
    (visible, covering) =>
      visible.flatMap((candidate) => subtractMuseumWallPlane(candidate, covering)),
    [original],
  );
  if (
    fragments.length === 1
    && Math.abs(fragments[0].start - original.start) <= DIRECTION_EPSILON
    && Math.abs(fragments[0].end - original.end) <= DIRECTION_EPSILON
    && Math.abs(fragments[0].bottom - original.bottom) <= DIRECTION_EPSILON
    && Math.abs(fragments[0].top - original.top) <= DIRECTION_EPSILON
  ) return [wall];
  return fragments.map((fragment, index) =>
    museumWallFragmentFromPlane(transform, wall, fragment, index));
});
