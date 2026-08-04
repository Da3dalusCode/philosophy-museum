import {
  MUSEUM_ROUTE_INLAY_MATERIALS,
} from '../../data/museum/museumArchitectureMaterials';
import {
  MUSEUM_ROUTE_INLAY,
  type MuseumRouteInlayKind,
  type MuseumRouteInlayMarker,
  type MuseumRouteInlaySegment,
} from '../../data/museum/museumRouteInlay';

const ROUTE_WIDTHS = Object.freeze({
  main: {border: .3, core: .17},
  crosscut: {border: .17, core: .085},
});

function InlaySegment({segment}: {segment: MuseumRouteInlaySegment}) {
  const dx = segment.to.x - segment.from.x;
  const dz = segment.to.z - segment.from.z;
  const length = Math.hypot(dx, dz);
  const rotationY = -Math.atan2(dz, dx);
  const widths = ROUTE_WIDTHS[segment.kind];
  const borderMaterial = segment.kind === 'main'
    ? MUSEUM_ROUTE_INLAY_MATERIALS.mainBorder
    : MUSEUM_ROUTE_INLAY_MATERIALS.crosscutBorder;
  const coreMaterial = segment.kind === 'main'
    ? MUSEUM_ROUTE_INLAY_MATERIALS.mainCore
    : MUSEUM_ROUTE_INLAY_MATERIALS.crosscutCore;
  const position = [
    (segment.from.x + segment.to.x) / 2,
    MUSEUM_ROUTE_INLAY.floorElevation + MUSEUM_ROUTE_INLAY.renderOffset,
    (segment.from.z + segment.to.z) / 2,
  ] as const;
  return <group
    position={position}
    rotation={[0, rotationY, 0]}
    userData={{
      museumRouteInlaySegmentId: segment.id,
      museumRouteInlayKind: segment.kind,
      museumRouteInlayCollisionOwner: false,
    }}
  >
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[length, widths.border]}/>
      <meshStandardMaterial {...borderMaterial}/>
    </mesh>
    <mesh position={[0, .0005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[length, widths.core]}/>
      <meshStandardMaterial {...coreMaterial}/>
    </mesh>
  </group>;
}

function InlayMarker({marker}: {marker: MuseumRouteInlayMarker}) {
  const main = marker.kind === 'main';
  const radius = marker.role === 'entrance' || marker.role === 'exit'
    ? .25
    : main ? .16 : .105;
  const borderMaterial = main
    ? MUSEUM_ROUTE_INLAY_MATERIALS.mainBorder
    : MUSEUM_ROUTE_INLAY_MATERIALS.crosscutBorder;
  const coreMaterial = main
    ? MUSEUM_ROUTE_INLAY_MATERIALS.mainCore
    : MUSEUM_ROUTE_INLAY_MATERIALS.crosscutCore;
  return <group
    position={[
      marker.point.x,
      MUSEUM_ROUTE_INLAY.floorElevation + MUSEUM_ROUTE_INLAY.renderOffset + .0008,
      marker.point.z,
    ]}
    userData={{museumRouteInlayMarkerId: marker.id, museumRouteInlayCollisionOwner: false}}
  >
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[radius, 24]}/>
      <meshStandardMaterial {...borderMaterial}/>
    </mesh>
    <mesh position={[0, .0005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[radius * .55, 24]}/>
      <meshStandardMaterial {...coreMaterial}/>
    </mesh>
  </group>;
}

const routeSegments = (kind: MuseumRouteInlayKind): readonly MuseumRouteInlaySegment[] =>
  kind === 'main' ? MUSEUM_ROUTE_INLAY.main.segments : MUSEUM_ROUTE_INLAY.crosscut.segments;

/** Zero-thickness, render-only wayfinding derived from the live building route. */
export function MuseumRouteInlay() {
  return <group userData={{
    museumRouteInlay: 'authoritative-runtime-route',
    museumRouteInlayPhysicalHeight: MUSEUM_ROUTE_INLAY.physicalHeight,
    museumRouteInlayCollisionOwnerCount: MUSEUM_ROUTE_INLAY.collisionOwnerIds.length,
  }}>
    {(['main', 'crosscut'] as const).flatMap((kind) =>
      routeSegments(kind).map((segment) => <InlaySegment key={segment.id} segment={segment}/>))}
    {MUSEUM_ROUTE_INLAY.markers.map((marker) => <InlayMarker key={marker.id} marker={marker}/>)}
  </group>;
}
