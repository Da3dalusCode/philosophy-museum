import type {
  MuseumDirectedConnection,
  MuseumHallEntrance,
  MuseumPoint,
  MuseumPose,
  MuseumRuntimeNodeDefinition,
} from '../../data/museum/museumWorldTypes';
import {getMuseumNodeConnections} from '../../data/museum/museumBuildingRuntime';
import {isValidMuseumPosition} from './museumMovement';
import {museumPoseFromWorld, museumPoseToWorld} from './museumWorldTransform';

const insideTransition = (point: MuseumPoint, entrance: MuseumHallEntrance): boolean => {
  const {center, size} = entrance.transitionBounds;
  return Math.abs(point.x - center.x) <= size.width / 2
    && Math.abs(point.z - center.z) <= size.depth / 2;
};

export const museumConnectionAtPose = (
  definition: MuseumRuntimeNodeDefinition,
  pose: MuseumPose,
): MuseumDirectedConnection | undefined => getMuseumNodeConnections(definition.id).find((connection) => {
  const entrance = definition.entrances.find(({id}) => id === connection.localEntranceId);
  return Boolean(entrance && insideTransition(pose, entrance));
});

export const museumConnectionCrossed = (
  definition: MuseumRuntimeNodeDefinition,
  previous: MuseumPoint,
  current: MuseumPoint,
): MuseumDirectedConnection | undefined => getMuseumNodeConnections(definition.id).find((connection) => {
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
  source: MuseumRuntimeNodeDefinition,
  target: MuseumRuntimeNodeDefinition,
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
