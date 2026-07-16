import type {MuseumPoint, MuseumPose, MuseumWorldTransform} from '../../data/museum/museumWorldTypes';

type MuseumPlacedDefinition = {worldTransform: MuseumWorldTransform};

export const museumPointToWorld = (
  definition: MuseumPlacedDefinition,
  point: MuseumPoint,
): MuseumPoint => {
  const {x, z, yaw} = definition.worldTransform;
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  return {
    x: x + point.x * cos + point.z * sin,
    z: z - point.x * sin + point.z * cos,
  };
};

export const museumPoseToWorld = (
  definition: MuseumPlacedDefinition,
  pose: MuseumPose,
): MuseumPose => ({
  ...museumPointToWorld(definition, pose),
  yaw: pose.yaw + definition.worldTransform.yaw,
  pitch: pose.pitch,
});

export const museumPointFromWorld = (
  definition: MuseumPlacedDefinition,
  point: MuseumPoint,
): MuseumPoint => {
  const {x, z, yaw} = definition.worldTransform;
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  const offsetX = point.x - x;
  const offsetZ = point.z - z;
  return {
    x: offsetX * cos - offsetZ * sin,
    z: offsetX * sin + offsetZ * cos,
  };
};

export const museumPoseFromWorld = (
  definition: MuseumPlacedDefinition,
  pose: MuseumPose,
): MuseumPose => ({
  ...museumPointFromWorld(definition, pose),
  yaw: pose.yaw - definition.worldTransform.yaw,
  pitch: pose.pitch,
});
