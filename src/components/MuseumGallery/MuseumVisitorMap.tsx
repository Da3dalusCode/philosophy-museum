import {LocateFixed, MapPinned, Navigation, X} from 'lucide-react';
import {useId, useState} from 'react';
import type {MuseumPublicHallId as MuseumHallId} from '../../data/museumCatalog';
import {
  MUSEUM_CANONICAL_HALL_IDS,
  MUSEUM_PLANNED_HALL_TITLES,
  type MuseumPlannedHallId,
} from '../../data/museum/museumCanonicalProgram';
import {
  MUSEUM_VISITOR_MAP_DOORWAYS,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_ENTRANCE,
  MUSEUM_VISITOR_MAP_KIOSK_MARKER,
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_VISITOR_MAP_RESERVATIONS,
  MUSEUM_VISITOR_MAP_VIEWBOX,
  projectMuseumVisitorMapHeading,
  projectMuseumVisitorMapPoint,
  type MuseumVisitorMapPoint,
} from '../../data/museum/museumVisitorMapProjection';
import type {MuseumPhysicalNodeId, MuseumPose} from '../../data/museum/museumWorldTypes';
import {MuseumModal} from './MuseumModal';

const projectionByHallId = new Map(
  MUSEUM_VISITOR_MAP_PROJECTION.map((projection) => [projection.hall.id, projection]),
);

const physicalNodeById = new Map(
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.map((node) => [node.id, node]),
);

const openProgramHallIds = new Set<MuseumPlannedHallId>(MUSEUM_CANONICAL_HALL_IDS);
const nextProgramHallIds = new Set<MuseumPlannedHallId>([
  'buddhist-philosophies',
  'classical-chinese-traditions',
  'islamic-philosophical-worlds',
]);
const plannedProgramEntries = Object.entries(MUSEUM_PLANNED_HALL_TITLES) as [
  MuseumPlannedHallId,
  string,
][];
const plannedTitle = (hallId: MuseumPlannedHallId): string => MUSEUM_PLANNED_HALL_TITLES[hallId];
const plannedProgram = [
  ...MUSEUM_CANONICAL_HALL_IDS.map((hallId) => [hallId, plannedTitle(hallId)] as const),
  ...[...nextProgramHallIds].map((hallId) => [hallId, plannedTitle(hallId)] as const),
  ...plannedProgramEntries.filter(([hallId]) =>
    !openProgramHallIds.has(hallId) && !nextProgramHallIds.has(hallId)),
];

const svgPoints = (points: readonly MuseumVisitorMapPoint[]): string =>
  points.map(({x, y}) => `${x},${y}`).join(' ');

export function MuseumVisitorMap({currentHallId, currentNodeId, currentPose, returnFocus, onClose, onTravel}: {
  currentHallId: MuseumHallId;
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
  const [selectedHallId, setSelectedHallId] = useState<MuseumHallId>(currentHallId);
  const halls = MUSEUM_VISITOR_MAP_PROJECTION;
  const selected = projectionByHallId.get(selectedHallId) ?? halls[0];
  const currentPhysicalNode = physicalNodeById.get(currentNodeId)
    ?? physicalNodeById.get(projectionByHallId.get(currentHallId)?.node.physicalNodeId ?? '');
  const currentPhysicalHallId = currentPhysicalNode?.publicHallId;
  const currentMarkerPoint = projectMuseumVisitorMapPoint(currentNodeId, currentPose)
    ?? currentPhysicalNode?.labelPoint;
  const currentMarkerHeading = projectMuseumVisitorMapHeading(currentNodeId, currentPose.yaw) ?? 0;

  if (!selected) return null;
  const isCurrentSelection = selected.hall.id === currentPhysicalHallId;
  const viewBox = MUSEUM_VISITOR_MAP_VIEWBOX;
  const entrance = MUSEUM_VISITOR_MAP_ENTRANCE;
  const insertionCount = MUSEUM_VISITOR_MAP_RESERVATIONS.filter(({reservationType}) => reservationType === 'insertion').length;
  const outwardCount = MUSEUM_VISITOR_MAP_RESERVATIONS.filter(({reservationType}) => reservationType === 'outward-expansion').length;
  const futureCount = plannedProgram.length - halls.length;
  const routeSummary = `The live main-level plan shows ${halls.length} open galleries and every walkable public route. Galleries 01 through 05 form the current outer loop, Gallery 06 is the central Core Questions Forum, and Gallery 07 branches from the Galleries 01–02 connector. Closed construction thresholds are shown separately from the approved 26-gallery collection program. Fast travel returns visitors to a safe gallery entrance.`;

  return <MuseumModal panelClassName="museum-visitor-map-panel" labelledBy={titleId} describedBy={descriptionId} returnFocus={returnFocus} onClose={onClose}>
    <div className="museum-overlay-head museum-visitor-map-head">
      <div>
        <p className="eyebrow"><MapPinned size={14}/> Physical visitor map · Level 0</p>
        <div className="museum-visitor-map-title-row">
          <h2 id={titleId}>Ring of Wings</h2>
          <span>{halls.length} open · {futureCount} planned</span>
        </div>
        <p id={descriptionId} className="museum-visitor-map-lead">
          Your live position, facing direction, walking routes, and fast travel—on one screen.
        </p>
      </div>
      <button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum visitor map"><X/></button>
    </div>
    <p id={routeSummaryId} className="sr-only">{routeSummary}</p>

    <div className="museum-visitor-map-layout">
      <section className="museum-visitor-map-plot" aria-label="Main-level visitor plan" aria-describedby={routeSummaryId}>
        <div className="museum-visitor-map-program" aria-label={`Approved collection program: ${halls.length} open galleries and ${futureCount} planned galleries`}>
          <div>
            <strong>26-gallery collection plan</strong>
            <span><b>{halls.length} open</b> · 3 next · {plannedProgram.length - halls.length - nextProgramHallIds.size} later</span>
          </div>
          <div className="museum-visitor-map-program-rail" aria-hidden="true">
            {plannedProgram.map(([hallId, title]) => <i
              key={hallId}
              data-status={openProgramHallIds.has(hallId) ? 'open' : nextProgramHallIds.has(hallId) ? 'next' : 'planned'}
              title={title}
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
            <title id={mapTitleId}>Live physical plan of the seven open galleries</title>
            <desc id={mapDescriptionId}>{routeSummary}</desc>
            <defs>
              <pattern id="museum-map-future-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line className="museum-visitor-map-hatch-line" x1="0" y1="0" x2="0" y2="3"/>
              </pattern>
            </defs>

            <g className="museum-visitor-map-footprints" aria-hidden="true">
              {MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.map((node) => <g
                key={node.id}
                className="museum-visitor-map-physical-node"
                data-kind={node.kind}
                data-role={node.pilotRole}
                data-current-node={node.id === currentPhysicalNode?.id ? 'true' : 'false'}
                data-current-hall={currentPhysicalHallId !== undefined && node.publicHallId === currentPhysicalHallId ? 'true' : 'false'}
                data-selected-hall={node.publicHallId === selected.hall.id ? 'true' : 'false'}
              >
                {node.cells.map((cell) => <polygon key={cell.id} points={svgPoints(cell.points)}/>)}
              </g>)}
            </g>

            <g className="museum-visitor-map-walking-edges" aria-hidden="true">
              {MUSEUM_VISITOR_MAP_EDGES.map((edge) => <polyline
                key={edge.key}
                points={svgPoints(edge.points)}
                data-route={edge.routeRole}
              />)}
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
              {MUSEUM_VISITOR_MAP_RESERVATIONS.map((reservation) => <polygon
                key={reservation.id}
                points={svgPoints(reservation.points)}
                data-reservation={reservation.reservationType}
              />)}
            </g>

            <g className="museum-visitor-map-labels" aria-hidden="true">
              {MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.filter(({kind}) => kind !== 'corridor').map((node) => {
                const publicGallery = node.publicHallId ? projectionByHallId.get(node.publicHallId) : undefined;
                const labelParts = node.label.split('·').map((part) => part.trim());
                const compactGalleryTitle = publicGallery?.hall.title.split(/,|\s+&\s+/u)[0];
                return <text
                  key={node.id}
                  className="museum-visitor-map-label"
                  data-kind={node.kind}
                  x={node.labelPoint.x}
                  y={node.labelPoint.y}
                  textAnchor="middle"
                >
                  <tspan x={node.labelPoint.x} dy={publicGallery ? '-.25em' : '0'}>
                    {publicGallery?.hall.galleryNumber ?? labelParts[0]}
                  </tspan>
                  {(publicGallery || labelParts[1]) && <tspan x={node.labelPoint.x} dy="1.25em">
                    {compactGalleryTitle ?? labelParts[1]}
                  </tspan>}
                </text>;
              })}
            </g>

            <g className="museum-visitor-map-main-entrance" aria-hidden="true">
              <line x1={entrance.position.x} y1={entrance.position.y} x2={entrance.inwardPoint.x} y2={entrance.inwardPoint.y}/>
              <circle cx={entrance.position.x} cy={entrance.position.y} r="1.8"/>
              <text x={entrance.position.x} y={entrance.position.y + 5.2} textAnchor="middle">MAIN ENTRANCE</text>
            </g>

            <g className="museum-visitor-map-kiosk-marker" aria-hidden="true" transform={`translate(${MUSEUM_VISITOR_MAP_KIOSK_MARKER.point.x} ${MUSEUM_VISITOR_MAP_KIOSK_MARKER.point.y})`}>
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
          <span><i data-legend="gallery"/>Open gallery</span>
          <span><i data-legend="outer-loop"/>Walkable loop</span>
          <span><i data-legend="forum-spoke"/>Forum route</span>
          <span><i data-legend="shortcut"/>Shortcut</span>
          <span><i data-legend="current"/>You + facing</span>
          <span><i data-legend="planned"/>Closed construction threshold · {insertionCount + outwardCount}</span>
        </div>
      </section>

      <aside className="museum-visitor-map-detail" aria-live="polite">
        <strong className="museum-visitor-map-current"><LocateFixed size={14}/> You are in {currentPhysicalNode?.label ?? 'a public gallery'}</strong>
        <div className="museum-visitor-map-destination-row">
          <p className="museum-visitor-map-destination-heading">{halls.length} open galleries · choose a destination</p>
          <span>Fast travel</span>
        </div>
        <div className="museum-visitor-map-destinations" aria-label="Choose a fast-travel gallery">
          {halls.map(({hall}) => {
            const current = hall.id === currentPhysicalHallId;
            const isSelected = hall.id === selected.hall.id;
            return <button
              key={hall.id}
              type="button"
              className="museum-visitor-map-destination"
              data-current={current ? 'true' : 'false'}
              data-selected={isSelected ? 'true' : 'false'}
              aria-current={current ? 'location' : undefined}
              aria-pressed={isSelected}
              onClick={() => setSelectedHallId(hall.id)}
            >
              <span>{hall.galleryNumber.replace('Gallery ', 'G')}</span>
              <b>{hall.title}</b>
            </button>;
          })}
        </div>

        <div className="museum-visitor-map-selection">
          <p className="eyebrow">{selected.hall.galleryNumber} · {selected.hall.period}</p>
          {isCurrentSelection && <strong className="museum-visitor-map-selected-current"><LocateFixed size={14}/> Current gallery</strong>}
          <h3>{selected.hall.title}</h3>
          <p>{selected.hall.description}</p>
          <div className="museum-visitor-map-sweep" aria-label={`${selected.hall.title} historical sweep`}>
            {selected.hall.sweep.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="museum-visitor-map-action">
          <button className="btn btn-primary museum-visitor-map-travel" type="button" onClick={() => onTravel(selected.hall.id)}>
            <Navigation size={16}/>Fast travel to {selected.hall.galleryNumber}
          </button>
          <small>Returns you to the gallery entrance. All solid routes remain walkable.</small>
        </div>
      </aside>
    </div>
  </MuseumModal>;
}
