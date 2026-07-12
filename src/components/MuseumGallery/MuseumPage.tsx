import {BookOpen, Compass, DoorOpen, Info, Landmark, MapPinned, X} from 'lucide-react';
import {useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode} from 'react';
import {
  getMuseumExhibitCatalog,
  getMuseumHallCatalog,
  type MuseumExhibitCatalog,
} from '../../data/museumCatalog';
import type {MuseumRoute, RouteHref, RouteNavigator} from '../../routing/routes';
import './museum.css';

const articleRoute = (exhibit: MuseumExhibitCatalog) => exhibit.entityKind === 'philosopher'
  ? {kind: 'philosopher' as const, philosopherId: exhibit.entityId}
  : {kind: 'branch' as const, branchId: exhibit.entityId};

function Modal({labelledBy, describedBy, onClose, children}: {
  labelledBy: string;
  describedBy?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])') ?? [])]
      .filter((item) => !item.hasAttribute('hidden'));
    if (!focusable.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable.at(-1)!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return <div className="museum-modal-backdrop" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <div
      className="museum-modal"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      tabIndex={-1}
      onKeyDown={trapFocus}
    >{children}</div>
  </div>;
}

function Directory({route, href, onClose}: {
  route: MuseumRoute;
  href: RouteHref;
  onClose: () => void;
}) {
  const hall = getMuseumHallCatalog(route.hallId)!;
  const titleId = useId();
  const descriptionId = useId();
  return <Modal labelledBy={titleId} describedBy={descriptionId} onClose={onClose}>
    <div className="museum-modal-head">
      <div><p className="eyebrow">Museum directory</p><h2 id={titleId}>Eight stops across three eras</h2></div>
      <button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum directory"><X/></button>
    </div>
    <p id={descriptionId}>Use this directory at any time. Every exhibit and full article remains available without entering the 3D hall.</p>
    <div className="museum-directory-zones">
      {hall.zones.map((zone) => <section key={zone.id} aria-labelledby={`museum-zone-${zone.id}`}>
        <p className="museum-zone-period">{zone.period}</p>
        <h3 id={`museum-zone-${zone.id}`}>{zone.title}</h3>
        <p>{zone.description}</p>
        <ul>{hall.exhibits.filter((exhibit) => exhibit.zoneId === zone.id).map((exhibit) => <li key={exhibit.id} className={route.exhibitId === exhibit.id ? 'is-current' : ''}>
          <div><b>{exhibit.displayName}</b><span>{exhibit.entityKind === 'philosopher' ? 'Philosopher' : 'School / branch'}</span></div>
          <p>{exhibit.question}</p>
          <div className="museum-directory-actions">
            <a className="btn btn-primary" aria-current={route.exhibitId === exhibit.id ? 'page' : undefined} href={href({kind: 'museum', hallId: route.hallId, exhibitId: exhibit.id})}>View exhibit</a>
            <a className="btn" href={href(articleRoute(exhibit))}>Open full article</a>
          </div>
        </li>)}</ul>
      </section>)}
    </div>
  </Modal>;
}

export function MuseumPage({route, href, push: _push, replace}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  replace: RouteNavigator;
}) {
  const hall = getMuseumHallCatalog(route.hallId);
  const exhibit = route.exhibitId ? getMuseumExhibitCatalog(route.hallId, route.exhibitId) : undefined;
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const exhibitTitleId = useId();
  const exhibitDescriptionId = useId();
  if (!hall) return null;

  const closeExhibit = () => replace({kind: 'museum', hallId: route.hallId});

  return <div className="museum-page">
    <section className="museum-intro" aria-labelledby="museum-title">
      <div>
        <p className="eyebrow"><Landmark size={15}/> Walkable collection · Gallery 01</p>
        <h1 id="museum-title">{hall.title}</h1>
        <p>{hall.description}</p>
      </div>
      <div className="museum-intro-actions">
        <button className="btn btn-primary" type="button"><DoorOpen size={17}/> Enter museum</button>
        <button className="btn" type="button" onClick={() => setDirectoryOpen(true)} aria-expanded={directoryOpen}><MapPinned size={17}/> Directory</button>
        <a className="btn" href={href({kind: 'history'})}><BookOpen size={17}/> Big History</a>
      </div>
    </section>

    <section className="museum-stage-placeholder" aria-label="Ancient Greek and Hellenistic gallery preview">
      <div className="museum-threshold"><Compass aria-hidden="true"/><span>Entrance</span></div>
      <div className="museum-timeline" aria-hidden="true"/>
      {hall.zones.map((zone, index) => <section className="museum-preview-zone" key={zone.id} data-zone={index + 1}>
        <header><span>Zone {String(index + 1).padStart(2, '0')}</span><h2>{zone.title}</h2><p>{zone.period}</p></header>
        <div>{hall.exhibits.filter((item) => item.zoneId === zone.id).map((item) => <a key={item.id} className={`museum-preview-exhibit museum-preview-${item.entityKind}`} href={href({kind: 'museum', hallId: route.hallId, exhibitId: item.id})}>
          <span>{item.entityKind === 'philosopher' ? 'Philosopher' : 'School'}</span>
          <b>{item.displayName}</b>
          <small>{item.question}</small>
        </a>)}</div>
      </section>)}
      <div className="museum-framework-note"><Info size={16}/><span>The walkable scene, controls, and collision system load only after this route shell.</span></div>
    </section>

    {directoryOpen && <Directory route={route} href={href} onClose={() => setDirectoryOpen(false)}/>}
    {exhibit && <Modal labelledBy={exhibitTitleId} describedBy={exhibitDescriptionId} onClose={closeExhibit}>
      <div className="museum-modal-head">
        <div><p className="eyebrow">{exhibit.entityKind === 'philosopher' ? 'Philosopher installation' : 'School installation'}</p><h2 id={exhibitTitleId}>{exhibit.displayName}</h2></div>
        <button className="museum-icon-button" type="button" onClick={closeExhibit} aria-label={`Close ${exhibit.displayName} exhibit`}><X/></button>
      </div>
      <p className="museum-exhibit-question" id={exhibitDescriptionId}>{exhibit.question}</p>
      <p>This concise museum label will draw from the full Atlas record while keeping the complete article one step away.</p>
      <div className="museum-modal-actions">
        <a className="btn btn-primary" href={href(articleRoute(exhibit))}>{exhibit.entityKind === 'philosopher' ? 'Open full philosopher profile' : 'Open Branch Explorer'}</a>
        <button className="btn" type="button" onClick={closeExhibit}>Continue exploring</button>
      </div>
    </Modal>}
  </div>;
}
