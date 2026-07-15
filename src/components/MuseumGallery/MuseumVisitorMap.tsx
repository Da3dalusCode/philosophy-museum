import {LocateFixed, MapPinned, Navigation, X} from 'lucide-react';
import {useId, useState} from 'react';
import type {MuseumHallId} from '../../data/museumCatalog';
import {
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_PROJECTION,
} from '../../data/museum/museumVisitorMapProjection';
import {MuseumModal} from './MuseumModal';

const projectionByHallId = new Map(
  MUSEUM_VISITOR_MAP_PROJECTION.map((projection) => [projection.hall.id, projection]),
);

export function MuseumVisitorMap({currentHallId, returnFocus, onClose, onTravel}: {
  currentHallId: MuseumHallId;
  returnFocus?: HTMLElement | null;
  onClose: () => void;
  onTravel: (hallId: MuseumHallId) => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [selectedHallId, setSelectedHallId] = useState<MuseumHallId>(currentHallId);
  const halls = MUSEUM_VISITOR_MAP_PROJECTION;
  const selected = projectionByHallId.get(selectedHallId) ?? halls[0];

  if (!selected) return null;
  const isCurrentSelection = selected.hall.id === currentHallId;

  return <MuseumModal labelledBy={titleId} describedBy={descriptionId} returnFocus={returnFocus} onClose={onClose}>
    <div className="museum-overlay-head museum-visitor-map-head">
      <div>
        <p className="eyebrow"><MapPinned size={14}/> Entrance visitor map</p>
        <h2 id={titleId}>Find your way through the Museum</h2>
      </div>
      <button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum visitor map"><X/></button>
    </div>
    <p id={descriptionId} className="museum-visitor-map-lead">
      Select any registered gallery, review its historical sweep, then travel to its authored safe entrance.
    </p>

    <div className="museum-visitor-map-layout">
      <section className="museum-visitor-map-plot" aria-label="Connected Museum galleries">
        <div className="museum-visitor-map-compass" aria-hidden="true"><span>N</span><i/></div>
        <svg className="museum-visitor-map-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {MUSEUM_VISITOR_MAP_EDGES.map(({key, from, to}) => <line key={key} x1={from.x} y1={from.y} x2={to.x} y2={to.y}/>)}
        </svg>
        {halls.map(({hall, node}) => {
          const current = hall.id === currentHallId;
          const selectedNode = hall.id === selected.hall.id;
          return <button
            key={hall.id}
            type="button"
            className="museum-visitor-map-node"
            style={{left: `${node.mapPosition.x}%`, top: `${node.mapPosition.y}%`}}
            data-current={current ? 'true' : 'false'}
            data-selected={selectedNode ? 'true' : 'false'}
            aria-current={current ? 'location' : undefined}
            aria-pressed={selectedNode}
            onClick={() => setSelectedHallId(hall.id)}
          >
            <span>{hall.galleryNumber}</span>
            <b>{hall.title}</b>
            {current && <em><LocateFixed size={12}/> You are here</em>}
          </button>;
        })}
        <div className="museum-visitor-map-legend" aria-hidden="true">
          <span><i/> Gallery</span><span><i/> Current hall</span><span><i/> Walkable connection</span>
        </div>
      </section>

      <aside className="museum-visitor-map-detail" aria-live="polite">
        <p className="eyebrow">{selected.hall.galleryNumber} · {selected.hall.period}</p>
        {isCurrentSelection && <strong className="museum-visitor-map-current"><LocateFixed size={14}/> You are currently here</strong>}
        <h3>{selected.hall.title}</h3>
        <p>{selected.hall.description}</p>
        <ol aria-label={`${selected.hall.title} historical sweep`}>
          {selected.hall.sweep.map((item) => <li key={item}>{item}</li>)}
        </ol>
        <button className="btn btn-primary museum-visitor-map-travel" type="button" onClick={() => onTravel(selected.hall.id)}>
          <Navigation size={16}/>{isCurrentSelection ? `Return to ${selected.hall.galleryNumber} entrance` : `Travel to ${selected.hall.galleryNumber}`}
        </button>
        <small>Arrival uses the registered hall’s authored safe spawn. Your current hall position is saved for this session.</small>
      </aside>
    </div>

    <p className="museum-visitor-map-access-note"><kbd>M</kbd> still opens the complete Museum directory, including every exhibit and room viewpoint.</p>
  </MuseumModal>;
}
