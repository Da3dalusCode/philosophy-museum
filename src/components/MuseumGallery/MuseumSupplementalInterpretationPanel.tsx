import {ExternalLink, X} from 'lucide-react';
import {useEffect, useId, useRef, type KeyboardEvent} from 'react';
import {getMuseumAsset} from '../../data/museum/museumAssets';
import type {MuseumSupplementalExhibit} from '../../data/museum/platoSupplementalExhibits';
import type {RouteHref} from '../../routing/routes';
import {MuseumAssetImage, MuseumSourceDetails} from './MuseumInterpretationPanel';

const focusableSelector = 'a[href],button:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';

const visibleFocusable = (root: HTMLElement): HTMLElement[] => [...root.querySelectorAll<HTMLElement>(focusableSelector)]
  .filter((item) => !item.closest('[inert],[aria-hidden="true"],[hidden]') && Boolean(item.offsetWidth || item.offsetHeight || item.getClientRects().length));

export function MuseumSupplementalInterpretationPanel({
  exhibit,
  href,
  onClose,
  onArticleIntent,
}: {
  exhibit: MuseumSupplementalExhibit;
  href: RouteHref;
  onClose: () => void;
  onArticleIntent: () => void;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const asset = getMuseumAsset(exhibit.panelAssetId);
  const presentation = exhibit.presentation ?? {
    panelKicker: 'Supplemental Plato work exhibit',
    proximityKicker: 'Supplemental Plato work',
    factRows: [
      {label: 'Author', value: 'Plato'},
      {label: 'Work', value: exhibit.workLabel},
      {label: 'Museum status', value: 'Supplemental work-and-idea installation; not a new primary assignment'},
      {label: 'Primary route', value: 'Plato’s full Atlas profile'},
    ],
    articleActionLabel: 'Open Plato’s full Atlas article',
    entityKind: 'philosopher' as const,
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => document.getElementById(titleId)?.focus({preventScroll: true}));
    return () => window.cancelAnimationFrame(frame);
  }, [titleId]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) return;
    const focusable = visibleFocusable(panelRef.current);
    if (!focusable.length) {
      event.preventDefault();
      panelRef.current.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable.at(-1)!;
    if (!focusable.includes(document.activeElement as HTMLElement)) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return <div className="museum-interpretation-layer" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <article
      ref={panelRef}
      className="museum-interpretation-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      data-entity-kind={presentation.entityKind}
      data-supplemental-id={exhibit.id}
      onKeyDown={handleKeyDown}
    >
      <header className="museum-panel-header">
        <div>
          <p className="museum-panel-kicker">{presentation.panelKicker} · {exhibit.dateLabel}</p>
          <h2 id={titleId} tabIndex={-1}>{exhibit.displayName}</h2>
        </div>
        <button className="museum-icon-button" type="button" onClick={onClose} aria-label={`Close ${exhibit.displayName} exhibit`}><X/></button>
      </header>

      <div className="museum-panel-scroll">
        <section className="museum-panel-opening" data-has-object="true">
          <figure className="museum-object-hero">
            <MuseumAssetImage asset={asset} priority/>
            <figcaption><strong>{asset.caption}</strong><span>{asset.historicalNote}</span></figcaption>
          </figure>
          <div className="museum-panel-opening-copy">
            <p className="museum-exhibit-question" id={descriptionId}>{exhibit.question}</p>
            <p className="museum-panel-lead">{exhibit.lead}</p>
          </div>
        </section>

        <dl className="museum-fact-grid">
          {presentation.factRows.map(({label, value}) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>

        <div className="museum-idea-grid">
          <section><p className="museum-object-role">{presentation.keyIdeasLabel ?? 'Argument map'}</p><ul>{exhibit.keyIdeas.map((idea) => <li key={idea}>{idea}</li>)}</ul></section>
          <section><p className="museum-object-role">{presentation.cautionsLabel ?? 'Historical cautions'}</p><ul>{exhibit.cautions.map((caution) => <li key={caution}>{caution}</li>)}</ul></section>
        </div>

        <div className="museum-interpretive-sections">
          {exhibit.sections.map((section) => <section key={section.heading}>
            <h3>{section.heading}</h3>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
          </section>)}
        </div>

        <MuseumSourceDetails asset={asset}/>

        <details className="museum-interpretation-sources">
          <summary>Sources for this interpretation</summary>
          <ul>{exhibit.sources.map((source) => <li key={source.url}>
            <a href={source.url} target="_blank" rel="noreferrer">{source.label} <ExternalLink size={13}/></a>
            <span>{source.kind.replace('-', ' ')}</span>
          </li>)}</ul>
        </details>
      </div>

      <footer className="museum-panel-actions">
        <div>
          <a className="btn btn-primary" href={href(exhibit.articleRoute)} onClick={onArticleIntent}>{presentation.articleActionLabel}</a>
          <button className="btn" type="button" onClick={onClose}>Return to the room</button>
        </div>
      </footer>
    </article>
  </div>;
}

