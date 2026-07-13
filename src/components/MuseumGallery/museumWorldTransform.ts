import type {
  MuseumHallDefinition,
  MuseumPoint,
  MuseumPose,
} from '../../data/museum/museumWorldTypes';

export const museumPointToWorld = (
  definition: MuseumHallDefinition,
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
  definition: MuseumHallDefinition,
  pose: MuseumPose,
): MuseumPose => ({
  ...museumPointToWorld(definition, pose),
  yaw: pose.yaw + definition.worldTransform.yaw,
  pitch: pose.pitch,
});
