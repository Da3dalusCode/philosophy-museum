import type {
  MuseumHallConnection,
  MuseumHallDefinition,
  MuseumHallEntrance,
  MuseumPoint,
  MuseumPose,
} from '../../data/museum/museumWorldTypes';
import {isValidMuseumPosition} from './museumMovement';
import {museumPoseFromWorld, museumPoseToWorld} from './museumWorldTransform';

const insideTransition = (point: MuseumPoint, entrance: MuseumHallEntrance): boolean => {
  const {center, size} = entrance.transitionBounds;
  return Math.abs(point.x - center.x) <= size.width / 2
    && Math.abs(point.z - center.z) <= size.depth / 2;
};

export const museumConnectionAtPose = (
  definition: MuseumHallDefinition,
  pose: MuseumPose,
): MuseumHallConnection | undefined => definition.connections.find((connection) => {
  const entrance = definition.entrances.find(({id}) => id === connection.localEntranceId);
  return Boolean(entrance && insideTransition(pose, entrance));
});

export const museumConnectionCrossed = (
  definition: MuseumHallDefinition,
  previous: MuseumPoint,
  current: MuseumPoint,
): MuseumHallConnection | undefined => definition.connections.find((connection) => {
  const entrance = definition.entrances.find(({id}) => id === connection.localEntranceId);
  if (!entrance || !insideTransition(current, entrance)) return false;
  const previousOffset = {x: previous.x - entrance.position.x, z: previous.z - entrance.position.z};
  const currentOffset = {x: current.x - entrance.position.x, z: current.z - entrance.position.z};
  const previousSide = previousOffset.x * entrance.inwardNormal.x + previousOffset.z * entrance.inwardNormal.z;
  const currentSide = currentOffset.x * entrance.inwardNormal.x + currentOffset.z * entrance.inwardNormal.z;
  return previousSide >= 0 && currentSide < 0;
});

/**
 * Preserve the actual world position and heading at the authored overlap. The
 * target entrance pose is only a safe recovery fallback if transformed geometry
 * or collision metadata disagree.
 */
export const resolveMuseumHallArrival = (
  source: MuseumHallDefinition,
  target: MuseumHallDefinition,
  targetEntranceId: string,
  sourcePose: MuseumPose,
): MuseumPose | undefined => {
  const entrance = target.entrances.find(({id}) => id === targetEntranceId);
  if (!entrance) return undefined;
  const mapped = museumPoseFromWorld(target, museumPoseToWorld(source, sourcePose));
  const layout = target.layout;
  const colliders = [...layout.wallColliders, ...layout.obstacleColliders];
  return isValidMuseumPosition(mapped, layout.playerRadius, layout.bounds, colliders, layout.spatialCells)
    ? mapped
    : {...entrance.arrivalPose, yaw: mapped.yaw, pitch: mapped.pitch};
};
