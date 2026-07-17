import {LocateFixed, MapPinned, Navigation, X} from 'lucide-react';
import {useId, useState} from 'react';
import type {MuseumHallId} from '../../data/museumCatalog';
import {
  MUSEUM_VISITOR_MAP_DOORWAYS,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_ENTRANCE,
  MUSEUM_VISITOR_MAP_KIOSK_MARKER,
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_VISITOR_MAP_RESERVATIONS,
  MUSEUM_VISITOR_MAP_VIEWBOX,
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

const forumSpokeHallIds = new Set<MuseumHallId>();
MUSEUM_VISITOR_MAP_EDGES.filter(({routeRole}) => routeRole === 'forum-spoke').forEach(({fromNodeId, toNodeId}) => {
  [fromNodeId, toNodeId].forEach((nodeId) => {
    const hallId = physicalNodeById.get(nodeId)?.publicHallId;
    if (hallId) forumSpokeHallIds.add(hallId);
  });
});

const svgPoints = (points: readonly MuseumVisitorMapPoint[]): string =>
  points.map(({x, y}) => `${x},${y}`).join(' ');

export function MuseumVisitorMap({currentHallId, currentNodeId, currentPose, returnFocus, onClose, onTravel}: {
  currentHallId: MuseumHallId;
  currentNodeId: MuseumPhysicalNodeId;
  currentPose: Pick<MuseumPose, 'x' | 'z'>;
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

  if (!selected) return null;
  const isCurrentSelection = selected.hall.id === currentPhysicalHallId;
  const viewBox = MUSEUM_VISITOR_MAP_VIEWBOX;
  const entrance = MUSEUM_VISITOR_MAP_ENTRANCE;
  const loopSummary = halls
    .map(({hall}) => `${hall.galleryNumber.replace(/^Gallery\s+/u, '')} ${hall.title}`)
    .join(' ↔ ');
  const spokeSummary = halls
    .filter(({hall}) => forumSpokeHallIds.has(hall.id))
    .map(({hall}) => hall.galleryNumber.replace(/^Gallery\s+/u, ''))
    .join(', ');
  const insertionCount = MUSEUM_VISITOR_MAP_RESERVATIONS.filter(({reservationType}) => reservationType === 'insertion').length;
  const outwardCount = MUSEUM_VISITOR_MAP_RESERVATIONS.filter(({reservationType}) => reservationType === 'outward-expansion').length;
  const routeSummary = `Live Ring pilot scope: ${halls.length} of 26 planned public halls are open. This plan shows constructed, walkable geometry only; the remaining planned halls will appear as they are physically constructed. Walking loop: Entrance ↔ ${loopSummary} ↔ Entrance. Forum spokes connect Galleries ${spokeSummary} to the central orientation court. The entrance–Forum shortcut is also open. The Forum is circulation and orientation only, not an open intellectual hall. ${insertionCount} planned gallery connections and ${outwardCount} reserved outward expansion portals, R1–R8, are blocked and noninteractive.`;

  return <MuseumModal labelledBy={titleId} describedBy={descriptionId} returnFocus={returnFocus} onClose={onClose}>
    <div className="museum-overlay-head museum-visitor-map-head">
      <div>
        <p className="eyebrow"><MapPinned size={14}/> Physical visitor map</p>
        <h2 id={titleId}>Ring of Wings live-pilot visitor map</h2>
      </div>
      <button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum visitor map"><X/></button>
    </div>
    <p id={descriptionId} className="museum-visitor-map-lead">
      Six of 26 planned public halls are open in the live Ring pilot. Read the built main-level footprint, then choose an open gallery for fast travel to its authored safe arrival.
    </p>
    <p id={routeSummaryId} className="museum-visitor-map-route-summary">{routeSummary}</p>
    <p className="museum-visitor-map-pan-note">Scroll the plan horizontally to inspect its full detail.</p>

    <div className="museum-visitor-map-layout">
      <section className="museum-visitor-map-plot" aria-label="Live Ring pilot main-level plan" aria-describedby={routeSummaryId}>
        <div className="museum-visitor-map-scroll" tabIndex={0}>
        <svg
          className="museum-visitor-map-plan"
          viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby={`${mapTitleId} ${mapDescriptionId}`}
        >
          <title id={mapTitleId}>Physical plan of the live Ring pilot</title>
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
            {MUSEUM_VISITOR_MAP_RESERVATIONS.map((reservation) => <g
              key={reservation.id}
              data-reservation={reservation.reservationType}
            >
              <polygon points={svgPoints(reservation.points)}/>
              <text
                x={reservation.labelPoint.x}
                y={reservation.labelPoint.y + (reservation.reservationType === 'insertion' ? -2.4 : 2.4)}
                textAnchor="middle"
              >
                {reservation.reservationType === 'insertion' ? 'PLAN' : reservation.expansionPortalId}
              </text>
            </g>)}
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
            <text x="3" y="1">MAP KIOSK</text>
          </g>

          {currentMarkerPoint && <g
            className="museum-visitor-map-you-are-here"
            aria-hidden="true"
            transform={`translate(${currentMarkerPoint.x} ${currentMarkerPoint.y})`}
          >
            <circle r="3.2"/><circle r="1.15"/>
            <text x="4.6" y="-3">YOU ARE HERE</text>
          </g>}
        </svg>
        </div>

        <div className="museum-visitor-map-compass" aria-hidden="true"><span>N</span><i/></div>
        <div className="museum-visitor-map-legend" aria-label="Map legend">
          <span><i data-legend="gallery"/>01–06 open fast-travel galleries</span>
          <span><i data-legend="outer-loop"/>Outer loop</span>
          <span><i data-legend="forum-spoke"/>Forum spokes</span>
          <span><i data-legend="shortcut"/>Entrance shortcut</span>
          <span><i data-legend="current"/>Current physical location</span>
          <span><i data-legend="planned"/>PLAN · 4 planned gallery connections</span>
          <span><i data-legend="reserve"/>R1–R8 · 8 reserved outward expansion portals</span>
        </div>
      </section>

      <aside className="museum-visitor-map-detail" aria-live="polite">
        <strong className="museum-visitor-map-current"><LocateFixed size={14}/> Physical location: {currentPhysicalNode?.label ?? 'Public gallery'}</strong>
        <p className="museum-visitor-map-destination-heading">Six open fast-travel galleries</p>
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
              <span>{hall.galleryNumber}</span>
              <b>{hall.title}</b>
            </button>;
          })}
        </div>

        <div className="museum-visitor-map-selection">
          <p className="eyebrow">{selected.hall.galleryNumber} · {selected.hall.period}</p>
          {isCurrentSelection && <strong className="museum-visitor-map-selected-current"><LocateFixed size={14}/> Current public gallery</strong>}
          <h3>{selected.hall.title}</h3>
          <p>{selected.hall.description}</p>
          <ol aria-label={`${selected.hall.title} historical sweep`}>
            {selected.hall.sweep.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
        <button className="btn btn-primary museum-visitor-map-travel" type="button" onClick={() => onTravel(selected.hall.id)}>
          <Navigation size={16}/>Fast travel to {selected.hall.galleryNumber}{isCurrentSelection ? ' entrance' : ''}
        </button>
        <small>Fast travel uses the registered hall’s authored safe spawn. Walking routes remain available through every live doorway shown; no unbuilt route geometry is displayed.</small>
      </aside>
    </div>

    <p className="museum-visitor-map-access-note"><kbd>M</kbd> still opens the complete Museum directory, including every exhibit and room viewpoint.</p>
  </MuseumModal>;
}
