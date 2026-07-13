import type {ReactNode} from 'react';
import type {MuseumHallDefinition} from '../../data/museum/museumWorldTypes';

/** Applies the registered hall origin to spatial content while scene-wide atmosphere stays outside. */
export function MuseumHallSpatialRoot({definition, children}: {
  definition: MuseumHallDefinition;
  children: ReactNode;
}) {
  const {x, z, yaw} = definition.worldTransform;
  return <group position={[x, 0, z]} rotation={[0, yaw, 0]}>{children}</group>;
}
