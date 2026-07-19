import type {
  MuseumDirectedConnection,
  MuseumHallEntrance,
  MuseumPoint,
  MuseumPose,
  MuseumRuntimeNodeDefinition,
} from '../../data/museum/museumWorldTypes';
import {getMuseumNodeConnections} from '../../data/museum/museumBuildingRuntime';
import {getMuseumRuntimeNode} from '../../data/museum/museumBuildingRuntime';
import {
  clampFrameDelta,
  isValidMuseumPosition,
  MUSEUM_FAST_WALK_SPEED,
  MUSEUM_STANDARD_WALK_SPEED,
  moveWithCollisions,
  normalizeMoveInput,
  setMuseumMovementDisplacement,
} from './museumMovement';
import {
  museumHallEntryReadinessKey,
  type MuseumInputState,
  type MuseumNodeTransition,
} from './museumRuntime';
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

export type MuseumPhysicalFrameResult = {
  kind: 'moved';
  previousPose: MuseumPose;
  pose: MuseumPose;
} | {
  kind: 'blocked';
  previousPose: MuseumPose;
  pose: MuseumPose;
  connection: MuseumDirectedConnection;
  reason: 'unready' | 'invalid-target';
} | {
  kind: 'transition';
  previousPose: MuseumPose;
  pose: MuseumPose;
  transition: MuseumNodeTransition;
};

/**
 * Advance one held-movement frame through the production collision, portal,
 * readiness, and arrival path. React owns only the resulting state commit.
 */
export const advanceMuseumPhysicalFrame = ({
  definition,
  pose,
  input,
  rawDelta,
  readyHallEntryKeys,
}: {
  definition: MuseumRuntimeNodeDefinition;
  pose: MuseumPose;
  input: Pick<MuseumInputState, 'forward' | 'strafe' | 'walkingSpeed'>;
  rawDelta: number;
  readyHallEntryKeys: ReadonlySet<string>;
}): MuseumPhysicalFrameResult => {
  const previousPose = {...pose};
  const direction = normalizeMoveInput(input.strafe, input.forward);
  const walkingSpeed = Number.isFinite(input.walkingSpeed)
    ? Math.min(MUSEUM_FAST_WALK_SPEED, Math.max(0, input.walkingSpeed))
    : MUSEUM_STANDARD_WALK_SPEED;
  const displacement = setMuseumMovementDisplacement(
    {x: 0, z: 0},
    direction,
    pose.yaw,
    walkingSpeed * clampFrameDelta(rawDelta, .05),
  );
  const layout = definition.layout;
  const moved = moveWithCollisions(
    pose,
    displacement,
    layout.playerRadius,
    layout.bounds,
    [...layout.wallColliders, ...layout.obstacleColliders],
    layout.spatialCells,
  );
  const crossingPose = {...pose, x: moved.x, z: moved.z};
  const connection = museumConnectionCrossed(definition, previousPose, crossingPose);
  if (!connection) return {kind: 'moved', previousPose, pose: crossingPose};

  const targetNode = getMuseumRuntimeNode(connection.targetNodeId);
  if (!targetNode) {
    return {kind: 'blocked', previousPose, pose: previousPose, connection, reason: 'invalid-target'};
  }
  const targetReady = !targetNode.publicHallId || readyHallEntryKeys.has(museumHallEntryReadinessKey(
    targetNode.publicHallId,
    connection.targetEntranceId,
  ));
  if (!targetReady) {
    return {kind: 'blocked', previousPose, pose: previousPose, connection, reason: 'unready'};
  }
  const arrival = resolveMuseumHallArrival(
    definition,
    targetNode,
    connection.targetEntranceId,
    crossingPose,
  );
  if (!arrival) {
    return {kind: 'blocked', previousPose, pose: previousPose, connection, reason: 'invalid-target'};
  }
  return {
    kind: 'transition',
    previousPose,
    pose: crossingPose,
    transition: {connection, targetNode, crossingPose, arrival},
  };
};
