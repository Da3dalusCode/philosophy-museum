import {LocateFixed, MapPinned, Navigation, X} from 'lucide-react';
import {useId, useState} from 'react';
import type {KeyboardEvent as ReactKeyboardEvent} from 'react';
import type {MuseumPublicHallId as MuseumHallId} from '../../data/museumCatalog';
import type {MuseumPlannedHallId} from '../../data/museum/museumCanonicalProgram';
import {
  MUSEUM_VISITOR_MAP_CROSSCUT_INTERSECTIONS,
  MUSEUM_VISITOR_MAP_DOORWAYS,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_ENTRANCE,
  MUSEUM_VISITOR_MAP_KIOSK_MARKER,
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_VISITOR_MAP_RESERVATIONS,
  MUSEUM_VISITOR_MAP_TURN_COURTS,
  MUSEUM_VISITOR_MAP_VIEWBOX,
  projectMuseumVisitorMapHeading,
  projectMuseumVisitorMapPoint,
  type MuseumVisitorMapPoint,
} from '../../data/museum/museumVisitorMapProjection';
import type {MuseumPhysicalNodeId, MuseumPose} from '../../data/museum/museumWorldTypes';
import {MuseumModal} from './MuseumModal';

const projectionByProgramId = new Map(
  MUSEUM_VISITOR_MAP_PROJECTION.map((projection) => [projection.hall.id, projection]),
);

const projectionByPublicHallId = new Map(
  MUSEUM_VISITOR_MAP_PROJECTION.flatMap((projection) =>
    projection.hall.publicHallId
      ? [[projection.hall.publicHallId, projection] as const]
      : []),
);

const physicalNodeById = new Map(
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.map((node) => [node.id, node]),
);

const galleriesByPublicNumber = [...MUSEUM_VISITOR_MAP_PROJECTION]
  .sort((first, second) =>
    first.hall.publicGalleryNumber - second.hall.publicGalleryNumber);

const curatedCount = MUSEUM_VISITOR_MAP_PROJECTION.filter(
  ({hall}) => hall.galleryState === 'curated-open',
).length;
const plannedCount = MUSEUM_VISITOR_MAP_PROJECTION.length - curatedCount;

const svgPoints = (points: readonly MuseumVisitorMapPoint[]): string =>
  points.map(({x, y}) => `${x},${y}`).join(' ');

const stateLabel = (state: 'curated-open' | 'planned-walkable'): string =>
  state === 'curated-open' ? 'Curated / open' : 'Planned / walkable';

export function MuseumVisitorMap({
  currentHallId,
  currentNodeId,
  currentPose,
  returnFocus,
  onClose,
  onTravel,
}: {
  /** Undefined while the visitor is in the entrance, crosscut, or a connector. */
  currentHallId?: MuseumHallId;
  currentNodeId: MuseumPhysicalNodeId;
  currentPose: Pick<MuseumPose, 'x' | 'z' | 'yaw'>;
  returnFocus?: HTMLElement | null;
  onClose: () => void;
  onTravel: (hallId: MuseumHallId) => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const mapTitleId = useId();
  const mapDescriptionId = useId();
  const routeSummaryId = useId();
  const currentPhysicalNode = physicalNodeById.get(currentNodeId)
    ?? (currentHallId
      ? physicalNodeById.get(projectionByPublicHallId.get(currentHallId)?.node.physicalNodeId ?? '')
      : undefined);
  const initialProgramHallId = currentPhysicalNode?.programHallId
    ?? (currentHallId ? projectionByPublicHallId.get(currentHallId)?.hall.id : undefined)
    ?? MUSEUM_VISITOR_MAP_PROJECTION[0]?.hall.id;
  const [selectedProgramHallId, setSelectedProgramHallId] =
    useState<MuseumPlannedHallId | undefined>(initialProgramHallId);
  const selected = selectedProgramHallId
    ? projectionByProgramId.get(selectedProgramHallId)
    : MUSEUM_VISITOR_MAP_PROJECTION[0];
  const currentMarkerPoint = projectMuseumVisitorMapPoint(currentNodeId, currentPose)
    ?? currentPhysicalNode?.labelPoint;
  const currentMarkerHeading = projectMuseumVisitorMapHeading(currentNodeId, currentPose.yaw) ?? 0;

  if (!selected) return null;

  const selectedNodeIsCurrent = selected.node.physicalNodeId === currentNodeId;
  const viewBox = MUSEUM_VISITOR_MAP_VIEWBOX;
  const entrance = MUSEUM_VISITOR_MAP_ENTRANCE;
  const crosscutPoints = [...MUSEUM_VISITOR_MAP_CROSSCUT_INTERSECTIONS]
    .sort((first, second) => second.point.y - first.point.y)
    .map(({point}) => point);
  const crosscutLabelPoint = crosscutPoints[Math.floor(crosscutPoints.length / 2)];
  const routeSummary = `The Continuous Enfilade is a single-level, 26-gallery museum. The chronological through-route passes every gallery in sequence and uses five turn courts. A 10 metre north–south crosscut has six truthful intersections, including the Core Questions Forum. Twenty curated galleries are open for fast travel; six planned gallery shells are walkable but have no travel control. Two northern capacity reserves remain closed and are not routes.`;

  const selectGallery = (programHallId: MuseumPlannedHallId) =>
    setSelectedProgramHallId(programHallId);

  return <MuseumModal
    panelClassName="museum-visitor-map-panel"
    labelledBy={titleId}
    describedBy={descriptionId}
    returnFocus={returnFocus}
    onClose={onClose}
  >
    <div className="museum-overlay-head museum-visitor-map-head">
      <div>
        <p className="eyebrow"><MapPinned size={14}/> Physical visitor map · Level 0</p>
        <div className="museum-visitor-map-title-row">
          <h2 id={titleId}>Continuous Enfilade</h2>
          <span>{curatedCount} curated / open · {plannedCount} planned / walkable</span>
        </div>
        <p id={descriptionId} className="museum-visitor-map-lead">
          One chronological route, a six-intersection crosscut, and your live facing direction.
        </p>
      </div>
      <button
        className="museum-icon-button"
        type="button"
        onClick={onClose}
        aria-label="Close Museum visitor map"
      ><X/></button>
    </div>
    <p id={routeSummaryId} className="sr-only">{routeSummary}</p>

    <div className="museum-visitor-map-layout">
      <section
        className="museum-visitor-map-plot"
        aria-label="Continuous Enfilade main-level visitor plan"
        aria-describedby={routeSummaryId}
      >
        <div className="museum-visitor-map-program" aria-label="Complete 26-gallery program">
          <div>
            <strong>26-gallery collection plan</strong>
            <span><b>{curatedCount} curated</b> · {plannedCount} installations planned · 105 rooms</span>
          </div>
          <div className="museum-visitor-map-program-rail" aria-hidden="true">
            {galleriesByPublicNumber.map(({hall}) => <i
              key={hall.id}
              data-status={hall.galleryState}
              title={`${hall.galleryNumber} · ${hall.title} · ${stateLabel(hall.galleryState)}`}
            />)}
          </div>
        </div>

        <div className="museum-visitor-map-scroll">
          <svg
            className="museum-visitor-map-plan"
            viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-labelledby={`${mapTitleId} ${mapDescriptionId}`}
          >
            <title id={mapTitleId}>Continuous Enfilade physical plan</title>
            <desc id={mapDescriptionId}>{routeSummary}</desc>
            <defs>
              <pattern
                id="museum-map-future-hatch"
                width="3"
                height="3"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line className="museum-visitor-map-hatch-line" x1="0" y1="0" x2="0" y2="3"/>
              </pattern>
              <pattern
                id="museum-map-planned-hatch"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line className="museum-visitor-map-planned-hatch-line" x1="0" y1="0" x2="0" y2="4"/>
              </pattern>
            </defs>

            <g className="museum-visitor-map-footprints">
              {MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.map((node) => {
                const gallery = node.programHallId
                  ? projectionByProgramId.get(node.programHallId)
                  : undefined;
                const selectable = gallery !== undefined;
                const selectedNode = gallery?.hall.id === selected.hall.id;
                const commonProps = selectable ? {
                  role: 'button' as const,
                  tabIndex: 0,
                  'aria-label': `Select Gallery ${String(gallery.hall.publicGalleryNumber).padStart(2, '0')}, ${gallery.hall.title}`,
                  onClick: () => selectGallery(gallery.hall.id),
                  onKeyDown: (event: ReactKeyboardEvent<SVGGElement>) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      selectGallery(gallery.hall.id);
                    }
                  },
                } : {'aria-hidden': true as const};
                return <g
                  key={node.id}
                  className="museum-visitor-map-physical-node"
                  data-kind={node.kind}
                  data-role={node.pilotRole}
                  data-gallery-state={node.galleryState}
                  data-current-node={node.id === currentNodeId ? 'true' : 'false'}
                  data-selected-hall={selectedNode ? 'true' : 'false'}
                  {...commonProps}
                >
                  {node.cells.map((cell) =>
                    <polygon key={cell.id} points={svgPoints(cell.points)}/>)}
                  <g className="museum-visitor-map-node-outline" aria-hidden="true">
                    {node.outline.map((segment, index) => <line
                      key={`${index}:${segment.start.x}:${segment.start.y}`}
                      x1={segment.start.x}
                      y1={segment.start.y}
                      x2={segment.end.x}
                      y2={segment.end.y}
                    />)}
                  </g>
                  {selectable && <title>
                    {gallery.hall.galleryNumber} · {gallery.hall.title} · {stateLabel(gallery.hall.galleryState)}
                  </title>}
                </g>;
              })}
            </g>

            <g className="museum-visitor-map-walking-edges" aria-hidden="true">
              {MUSEUM_VISITOR_MAP_EDGES.map((edge) => <polyline
                key={edge.key}
                points={svgPoints(edge.points)}
                data-route={edge.routeRole}
              />)}
            </g>

            <g className="museum-visitor-map-crosscut-guide" aria-hidden="true">
              <polyline points={svgPoints(crosscutPoints)}/>
              {MUSEUM_VISITOR_MAP_CROSSCUT_INTERSECTIONS.map((intersection, index) =>
                <g key={intersection.id}>
                  <circle cx={intersection.point.x} cy={intersection.point.y} r="2.1"/>
                  <text x={intersection.point.x + 3.6} y={intersection.point.y - 2.4}>
                    {intersection.occupiedByHallId ? 'FORUM' : `X${index + 1}`}
                  </text>
                </g>)}
              {crosscutLabelPoint && <text
                className="museum-visitor-map-crosscut-label"
                x={crosscutLabelPoint.x + 7}
                y={crosscutLabelPoint.y}
                transform={`rotate(-90 ${crosscutLabelPoint.x + 7} ${crosscutLabelPoint.y})`}
                textAnchor="middle"
              >10 M NORTH–SOUTH CROSSCUT</text>}
            </g>

            <g className="museum-visitor-map-doorways" aria-hidden="true">
              {MUSEUM_VISITOR_MAP_DOORWAYS.map((doorway) => <line
                key={doorway.key}
                x1={doorway.start.x}
                y1={doorway.start.y}
                x2={doorway.end.x}
                y2={doorway.end.y}
                data-main-entrance={doorway.isMainEntrance ? 'true' : 'false'}
              />)}
            </g>

            <g className="museum-visitor-map-reservations" aria-hidden="true">
              {MUSEUM_VISITOR_MAP_RESERVATIONS.map((reservation) => <g key={reservation.id}>
                <polygon
                  points={svgPoints(reservation.points)}
                  data-reservation={reservation.reservationType}
                />
                <text x={reservation.labelPoint.x} y={reservation.labelPoint.y} textAnchor="middle">
                  CLOSED RESERVE
                </text>
              </g>)}
            </g>

            <g className="museum-visitor-map-labels" aria-hidden="true">
              {MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.map((node) => {
                const gallery = node.programHallId
                  ? projectionByProgramId.get(node.programHallId)
                  : undefined;
                if (gallery) {
                  return <text
                    key={node.id}
                    className="museum-visitor-map-label"
                    data-kind="hall"
                    data-gallery-state={gallery.hall.galleryState}
                    x={node.labelPoint.x}
                    y={node.labelPoint.y}
                    textAnchor="middle"
                  >
                    <tspan x={node.labelPoint.x} dy="-.15em">
                      {String(gallery.hall.publicGalleryNumber).padStart(2, '0')}
                    </tspan>
                    <tspan x={node.labelPoint.x} dy="1.15em">
                      {gallery.hall.galleryState === 'curated-open' ? 'OPEN' : 'PLANNED'}
                    </tspan>
                  </text>;
                }
                if (
                  node.kind !== 'entrance'
                  && node.pilotRole !== 'final-return-threshold'
                  && node.pilotRole !== 'turn-court'
                ) return null;
                if (node.kind === 'entrance') {
                  return <text
                    key={node.id}
                    className="museum-visitor-map-label"
                    data-kind={node.kind}
                    x={node.labelPoint.x}
                    y={node.labelPoint.y - 17}
                    textAnchor="middle"
                  >
                    <tspan x={node.labelPoint.x}>GRAND ENTRANCE</tspan>
                    <tspan x={node.labelPoint.x} dy="1.15em">& ORIENTATION</tspan>
                  </text>;
                }
                return <text
                  key={node.id}
                  className="museum-visitor-map-label"
                  data-kind={node.kind}
                  x={node.labelPoint.x}
                  y={node.labelPoint.y}
                  textAnchor="middle"
                >
                  {node.pilotRole === 'turn-court'
                    ? 'TURN'
                    : 'FINAL RETURN / EXIT'}
                </text>;
              })}
            </g>

            <g className="museum-visitor-map-main-entrance" aria-hidden="true">
              <line
                x1={entrance.position.x}
                y1={entrance.position.y}
                x2={entrance.inwardPoint.x}
                y2={entrance.inwardPoint.y}
              />
              <circle cx={entrance.position.x} cy={entrance.position.y} r="1.8"/>
              <text
                x={entrance.position.x + 3}
                y={entrance.position.y - 3}
                textAnchor="start"
              >MAIN ENTRANCE</text>
            </g>

            <g
              className="museum-visitor-map-kiosk-marker"
              aria-hidden="true"
              transform={`translate(${MUSEUM_VISITOR_MAP_KIOSK_MARKER.point.x} ${MUSEUM_VISITOR_MAP_KIOSK_MARKER.point.y})`}
            >
              <rect x="-1.5" y="-1.5" width="3" height="3" transform="rotate(45)"/>
            </g>

            {currentMarkerPoint && <g
              className="museum-visitor-map-you-are-here"
              aria-hidden="true"
              transform={`translate(${currentMarkerPoint.x} ${currentMarkerPoint.y})`}
            >
              <circle r="4.2"/>
              <path
                d="M 0 -4.4 L 2.8 2.8 L 0 1.65 L -2.8 2.8 Z"
                transform={`rotate(${currentMarkerHeading})`}
              />
              <text x="5.5" y="-3.4">YOU ARE HERE</text>
            </g>}
          </svg>
        </div>

        <div className="museum-visitor-map-compass" aria-hidden="true"><span>N</span><i/></div>
        <div className="museum-visitor-map-legend" aria-label="Map legend">
          <span><i data-legend="curated"/>Curated / open</span>
          <span><i data-legend="planned"/>Planned / walkable</span>
          <span><i data-legend="through-route"/>Chronological route</span>
          <span><i data-legend="crosscut"/>10 m crosscut</span>
          <span><i data-legend="turn-court"/>Turn court · {MUSEUM_VISITOR_MAP_TURN_COURTS.length}</span>
          <span><i data-legend="current"/>You + facing</span>
          <span><i data-legend="reserve"/>Closed reserve · {MUSEUM_VISITOR_MAP_RESERVATIONS.length}</span>
        </div>
      </section>

      <aside className="museum-visitor-map-detail" aria-live="polite">
        <strong className="museum-visitor-map-current">
          <LocateFixed size={14}/>
          You are in {currentPhysicalNode?.label ?? 'the Continuous Enfilade'}
        </strong>
        <div className="museum-visitor-map-destination-row">
          <p className="museum-visitor-map-destination-heading">Complete gallery directory</p>
          <span>{curatedCount} fast travel</span>
        </div>
        <div className="museum-visitor-map-destinations" aria-label="Select any gallery">
          {galleriesByPublicNumber.map(({hall, node}) => {
            const current = node.physicalNodeId === currentNodeId;
            const isSelected = hall.id === selected.hall.id;
            return <button
              key={hall.id}
              type="button"
              className="museum-visitor-map-destination"
              data-state={hall.galleryState}
              data-current={current ? 'true' : 'false'}
              data-selected={isSelected ? 'true' : 'false'}
              aria-current={current ? 'location' : undefined}
              aria-pressed={isSelected}
              onClick={() => selectGallery(hall.id)}
            >
              <span>G{String(hall.publicGalleryNumber).padStart(2, '0')}</span>
              <b>{hall.title}</b>
              <small>{hall.galleryState === 'curated-open' ? 'Open' : 'Walk only'}</small>
            </button>;
          })}
        </div>

        <div className="museum-visitor-map-selection">
          <p className="eyebrow">
            {selected.hall.galleryNumber} · Route {String(selected.hall.visitSequence).padStart(2, '0')}
          </p>
          <div className="museum-visitor-map-selection-status">
            <span data-state={selected.hall.galleryState}>{stateLabel(selected.hall.galleryState)}</span>
            {selectedNodeIsCurrent && <strong className="museum-visitor-map-selected-current">
              <LocateFixed size={13}/> Current location
            </strong>}
          </div>
          <h3>{selected.hall.title}</h3>
          <p>{selected.hall.description}</p>
          <div className="museum-visitor-map-room-heading">
            <strong>{selected.hall.roomCount} named rooms</strong>
            <span>Manifest IDs</span>
          </div>
          <ul
            className="museum-visitor-map-rooms"
            aria-label={`${selected.hall.title} room list`}
          >
            {selected.hall.rooms.map((room) => <li key={room.id}>
              <span>{room.title}</span>
              <code>{room.id}</code>
            </li>)}
          </ul>
        </div>

        <div className="museum-visitor-map-action">
          {selected.hall.fastTravelEligible && selected.hall.publicHallId
            ? <button
              className="btn btn-primary museum-visitor-map-travel"
              type="button"
              onClick={() => onTravel(selected.hall.publicHallId!)}
            >
              <Navigation size={16}/>Fast travel to {selected.hall.galleryNumber}
            </button>
            : <div className="museum-visitor-map-walk-only">
              <strong>Walkable gallery shell</strong>
              <span>Installations are planned. Enter from the chronological route or crosscut; fast travel is unavailable.</span>
            </div>}
          <small>Fast travel is limited to the 20 curated/open galleries.</small>
        </div>
      </aside>
    </div>
  </MuseumModal>;
}
