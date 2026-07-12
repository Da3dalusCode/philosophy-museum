import {
  getMuseumHallCatalog,
  type MuseumExhibitId,
  type MuseumHallId,
  type MuseumZoneId,
} from '../museumCatalog';

export type MuseumPoint = {x: number; z: number};
export type MuseumPose = MuseumPoint & {yaw: number; pitch: number};
export type MuseumBounds = {minX: number; maxX: number; minZ: number; maxZ: number};
export type MuseumCollider = {
  id: string;
  center: MuseumPoint;
  size: {width: number; depth: number};
  rotation: number;
};
export type MuseumExhibitLayout = {
  id: MuseumExhibitId;
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  interactionRadius: number;
  collider: MuseumCollider;
  viewpoint: MuseumPose;
};
export type MuseumHallLayout = {
  id: MuseumHallId;
  title: string;
  eyeHeight: number;
  playerRadius: number;
  bounds: MuseumBounds;
  spawn: MuseumPose;
  reset: MuseumPose;
  wallColliders: readonly MuseumCollider[];
  obstacleColliders: readonly MuseumCollider[];
  exhibits: readonly MuseumExhibitLayout[];
  guidedOrder: readonly MuseumExhibitId[];
};

const hall = getMuseumHallCatalog('ancient-greek');
if (!hall) throw new Error('The ancient Greek Museum catalog is missing.');

const placement: Record<MuseumExhibitId, Omit<MuseumExhibitLayout, 'id' | 'zoneId'>> = {
  socrates: {position: {x: -6.9, z: 21.5}, rotationY: Math.PI / 2, interactionRadius: 3.4, collider: {id: 'exhibit-socrates', center: {x: -6.9, z: 21.5}, size: {width: 1.6, depth: 1.35}, rotation: 0}, viewpoint: {x: -4.2, z: 21.5, yaw: -Math.PI / 2, pitch: 0}},
  plato: {position: {x: 6.9, z: 16.5}, rotationY: -Math.PI / 2, interactionRadius: 3.4, collider: {id: 'exhibit-plato', center: {x: 6.9, z: 16.5}, size: {width: 1.7, depth: 1.4}, rotation: 0}, viewpoint: {x: 4.2, z: 16.5, yaw: Math.PI / 2, pitch: 0}},
  aristotle: {position: {x: -6.9, z: 11.5}, rotationY: Math.PI / 2, interactionRadius: 3.4, collider: {id: 'exhibit-aristotle', center: {x: -6.9, z: 11.5}, size: {width: 1.7, depth: 1.4}, rotation: 0}, viewpoint: {x: -4.2, z: 11.5, yaw: -Math.PI / 2, pitch: 0}},
  cynicism: {position: {x: 6.8, z: 5.5}, rotationY: -Math.PI / 2, interactionRadius: 3.4, collider: {id: 'exhibit-cynicism', center: {x: 6.8, z: 5.5}, size: {width: 2.2, depth: 1.5}, rotation: 0}, viewpoint: {x: 4, z: 5.5, yaw: Math.PI / 2, pitch: 0}},
  epicureanism: {position: {x: -6.8, z: 0}, rotationY: Math.PI / 2, interactionRadius: 3.4, collider: {id: 'exhibit-epicureanism', center: {x: -6.8, z: 0}, size: {width: 2.2, depth: 1.6}, rotation: 0}, viewpoint: {x: -4, z: 0, yaw: -Math.PI / 2, pitch: 0}},
  stoicism: {position: {x: 6.8, z: -5.5}, rotationY: -Math.PI / 2, interactionRadius: 3.4, collider: {id: 'exhibit-stoicism', center: {x: 6.8, z: -5.5}, size: {width: 2.3, depth: 1.6}, rotation: 0}, viewpoint: {x: 4, z: -5.5, yaw: Math.PI / 2, pitch: 0}},
  skepticism: {position: {x: -6.8, z: -11}, rotationY: Math.PI / 2, interactionRadius: 3.4, collider: {id: 'exhibit-skepticism', center: {x: -6.8, z: -11}, size: {width: 2.2, depth: 1.6}, rotation: 0}, viewpoint: {x: -4, z: -11, yaw: -Math.PI / 2, pitch: 0}},
  neoplatonism: {position: {x: 0, z: -26.3}, rotationY: 0, interactionRadius: 4.2, collider: {id: 'exhibit-neoplatonism', center: {x: 0, z: -26.3}, size: {width: 3, depth: 2.2}, rotation: 0}, viewpoint: {x: 0, z: -22.6, yaw: 0, pitch: 0}},
};

const perimeter: MuseumCollider[] = [
  {id: 'wall-west', center: {x: -9.7, z: 0}, size: {width: .8, depth: 66}, rotation: 0},
  {id: 'wall-east', center: {x: 9.7, z: 0}, size: {width: .8, depth: 66}, rotation: 0},
  {id: 'wall-north', center: {x: 0, z: -31.7}, size: {width: 20, depth: .8}, rotation: 0},
  {id: 'wall-south', center: {x: 0, z: 31.7}, size: {width: 20, depth: .8}, rotation: 0},
  {id: 'arch-classical-left', center: {x: -6.65, z: 9}, size: {width: 5.3, depth: .6}, rotation: 0},
  {id: 'arch-classical-right', center: {x: 6.65, z: 9}, size: {width: 5.3, depth: .6}, rotation: 0},
  {id: 'arch-late-left', center: {x: -6.65, z: -14}, size: {width: 5.3, depth: .6}, rotation: 0},
  {id: 'arch-late-right', center: {x: 6.65, z: -14}, size: {width: 5.3, depth: .6}, rotation: 0},
];

const exhibitLayouts = hall.exhibits.map((exhibit) => ({
  id: exhibit.id,
  zoneId: exhibit.zoneId,
  ...placement[exhibit.id],
}));

export const ANCIENT_GREEK_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: 1.68,
  playerRadius: .38,
  bounds: {minX: -9.3, maxX: 9.3, minZ: -31.3, maxZ: 31.3},
  spawn: {x: 0, z: 28.6, yaw: 0, pitch: 0},
  reset: {x: 0, z: 28.6, yaw: 0, pitch: 0},
  wallColliders: perimeter,
  obstacleColliders: [
    ...exhibitLayouts.map(({collider}) => collider),
    {id: 'directory-kiosk', center: {x: 7.5, z: 27.2}, size: {width: 1.5, depth: 1}, rotation: 0},
  ],
  exhibits: exhibitLayouts,
  guidedOrder: hall.guidedOrder,
};
