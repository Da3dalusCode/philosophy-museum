import {ArrowLeft, ArrowRight, ExternalLink, ImageOff, X} from 'lucide-react';
import {useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent} from 'react';
import {getMuseumAsset, museumAssetUrl} from '../../data/museum/museumAssets';
import type {MuseumAssetRecord} from '../../data/museum/museumAssetTypes';
import {museumInterpretationFacts, type MuseumInterpretation} from '../../data/museum/museumInterpretations';
import type {MuseumExhibitRef} from '../../data/museum/museumWorldTypes';
import {getMuseumExhibitCatalog, type MuseumExhibitCatalog, type MuseumPublicHallId} from '../../data/museumCatalog';
import type {RouteHref} from '../../routing/routes';
import type {MuseumExitTrigger} from './museumVisitState';

const focusableSelector = 'a[href],button:not([disabled]),summary,input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const visibleFocusable = (root: HTMLElement): HTMLElement[] => [...root.querySelectorAll<HTMLElement>(focusableSelector)]
  .filter((item) => !item.closest('[inert],[aria-hidden="true"],[hidden]') && Boolean(item.offsetWidth || item.offsetHeight || item.getClientRects().length));

function AssetImage({asset, priority = false}: {asset: MuseumAssetRecord; priority?: boolean}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="museum-asset-fallback" role="img" aria-label={`${asset.title} image unavailable`}><ImageOff aria-hidden="true"/><span>Object image unavailable</span></div>;
  return <img
    src={museumAssetUrl(asset.variants.panel)}
    width={asset.variants.panel.width}
    height={asset.variants.panel.height}
    alt={asset.alt}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    style={{'--museum-focal-x': `${(asset.focalPoint?.x ?? .5) * 100}%`, '--museum-focal-y': `${(asset.focalPoint?.y ?? .5) * 100}%`} as CSSProperties}
    onError={() => setFailed(true)}
  />;
}

function SourceDetails({asset}: {asset: MuseumAssetRecord}) {
  return <details className="museum-object-source">
    <summary>Object record and image rights: “{asset.title}”</summary>
    <dl>
      <div><dt>Object</dt><dd>{asset.title}</dd></div>
      <div><dt>Creator / maker</dt><dd>{asset.creator}</dd></div>
      <div><dt>Date</dt><dd>{asset.objectDate}</dd></div>
      <div><dt>Collection</dt><dd>{asset.institution}</dd></div>
      {asset.imageCreator && <div><dt>Image</dt><dd>{asset.imageCreator}</dd></div>}
      <div><dt>Credit</dt><dd>{asset.attribution}</dd></div>
      <div><dt>{asset.rightsKind === 'license' ? 'Image license' : asset.rightsKind === 'dedication' ? 'Image dedication' : 'Image rights status'}</dt><dd>{asset.license}{asset.derivativeNotice ? ` · ${asset.derivativeNotice}` : ''}</dd></div>
      <div><dt>Historical status</dt><dd>{asset.historicalNote}</dd></div>
    </dl>
    <div className="museum-source-links">
      {asset.objectPageUrl && <a href={asset.objectPageUrl} target="_blank" rel="noreferrer">Institution record <ExternalLink size={14}/></a>}
      <a href={asset.sourcePageUrl} target="_blank" rel="noreferrer">Exact media source <ExternalLink size={14}/></a>
      {asset.licenseUrl && <a href={asset.licenseUrl} target="_blank" rel="noreferrer">{asset.license} <ExternalLink size={14}/></a>}
    </div>
  </details>;
}

export function MuseumInterpretationPanel({
  exhibit,
  content,
  href,
  guided,
  exhibitIndex,
  exhibitCount,
  continueLabel,
  onClose,
  onArticleIntent,
  onGuidedPrevious,
  onGuidedNext,
  onRelated,
  focusReturn,
}: {
  exhibit: MuseumExhibitCatalog;
  content: MuseumInterpretation;
  href: RouteHref;
  guided: boolean;
  exhibitIndex: number;
  exhibitCount: number;
  continueLabel: string;
  onClose: (trigger: MuseumExitTrigger) => void;
  onArticleIntent: () => void;
  onGuidedPrevious: () => void;
  onGuidedNext: () => void;
  onRelated: (reference: MuseumExhibitRef, exhibit: MuseumExhibitCatalog, event: MouseEvent<HTMLAnchorElement>) => void;
  focusReturn: 'canvas' | 'entry' | 'none';
}) {
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const principal = exhibit.principalAssetId ? getMuseumAsset(exhibit.principalAssetId) : undefined;
  const supporting = (exhibit.supportingAssetIds ?? []).map(getMuseumAsset);
  const related = content.relatedExhibits.flatMap((reference) => {
    const relatedExhibit = getMuseumExhibitCatalog(reference.hallId, reference.exhibitId);
    return relatedExhibit ? [{reference, exhibit: relatedExhibit}] : [];
  });
  const facts = museumInterpretationFacts(content);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => document.getElementById(titleId)?.focus({preventScroll: true}));
    return () => {
      window.cancelAnimationFrame(frame);
      if (focusReturn === 'none') return;
      window.requestAnimationFrame(() => {
        const target = focusReturn === 'canvas'
          ? document.querySelector<HTMLCanvasElement>('canvas.museum-scene-canvas')
          : document.getElementById('museum-enter-button');
        target?.focus({preventScroll: true});
      });
    };
  }, [focusReturn, titleId]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose('history');
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
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return <div className="museum-interpretation-layer" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose('gesture');
  }}>
    <article
      ref={panelRef}
      className="museum-interpretation-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      data-entity-kind={exhibit.entityKind}
      onKeyDown={handleKeyDown}
    >
      <header className="museum-panel-header">
        <div><p className="museum-panel-kicker">{content.entityType} · {content.dateLabel}</p><h2 id={titleId} tabIndex={-1}>{content.name}</h2></div>
        <button className="museum-icon-button" type="button" onClick={() => onClose('gesture')} aria-label={`Close ${content.name} exhibit`}><X/></button>
      </header>

      <div className="museum-panel-scroll">
        <section className="museum-panel-opening" data-has-object={principal ? 'true' : 'false'}>
          {principal && <figure className="museum-object-hero">
            <AssetImage asset={principal} priority/>
            <figcaption><strong>{principal.caption}</strong><span>{content.objectInterpretations[principal.id] ?? principal.historicalNote}</span></figcaption>
          </figure>}
          <div className="museum-panel-opening-copy">
            {content.tier && <p className="museum-presentation-tier">{content.tier.replaceAll('-', ' ')}</p>}
            <p className="museum-exhibit-question" id={descriptionId}>{content.centralQuestion}</p>
            <p className="museum-panel-lead">{content.lead}</p>
          </div>
        </section>

        <dl className="museum-fact-grid">
          {facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
        </dl>

        <div className="museum-idea-grid">
          <section><p className="museum-object-role">Key ideas</p><ul>{content.keyIdeas.map((idea) => <li key={idea}>{idea}</li>)}</ul></section>
          <section><p className="museum-object-role">Works and witnesses</p><ul>{content.keyWorks.map((work) => <li key={work}>{work}</li>)}</ul></section>
        </div>

        <div className="museum-interpretive-sections">
          {content.sections.map((section) => <section key={section.heading}>
            <h3>{section.heading}</h3>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
          </section>)}
        </div>

        {supporting.map((asset) => <section className="museum-supporting-object" key={asset.id}>
          <div><p className="museum-object-role">{asset.role.replace('-', ' ')}</p><h3>{asset.title}</h3><p>{content.objectInterpretations[asset.id] ?? asset.caption}</p></div>
          <figure><AssetImage asset={asset}/><figcaption>{asset.historicalNote}</figcaption></figure>
          <SourceDetails asset={asset}/>
        </section>)}

        {principal && <SourceDetails asset={principal}/>}

        {content.connections && content.connections.length > 0 && <aside className="museum-interpretive-connections">
          <p className="museum-object-role">Curatorial routes</p>
          <h3>Compare without collapsing</h3>
          <div>{content.connections.map((connection, index) => <article key={`${connection.kind}:${connection.label}:${index}`}>
            <div><strong>{connection.label}</strong><span>{connection.status === 'open' ? 'Open now' : 'Planned wing'}</span></div>
            <p>{connection.relationship}</p>
            {connection.route && <a href={href(connection.route)}>Follow this route <ArrowRight size={15}/></a>}
          </article>)}</div>
        </aside>}

        <details className="museum-interpretation-sources">
          <summary>Sources for this interpretation</summary>
          <ul>{content.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} <ExternalLink size={13}/></a><span>{source.kind.replace('-', ' ')}</span></li>)}</ul>
        </details>

        {related.length > 0 && <aside className="museum-related-exhibit">
          <p>Continue the conversation</p><h3>Related Museum exhibits</h3>
          <div className="museum-related-exhibit-list">{related.map(({reference, exhibit: relatedExhibit}) => <div key={`${reference.hallId}:${reference.exhibitId}`}>
            <strong>{relatedExhibit.displayName}</strong><span>{relatedExhibit.question}</span>
            <a href={href({kind: 'museum', hallId: reference.hallId as MuseumPublicHallId, exhibitId: relatedExhibit.id})} onClick={(event) => onRelated(reference as MuseumExhibitRef, relatedExhibit, event)}>Visit related exhibit <ArrowRight size={15}/></a>
          </div>)}</div>
        </aside>}
      </div>

      <footer className="museum-panel-actions">
        {guided && <div className="museum-guided-controls" aria-label="Guided exhibit navigation">
          <button type="button" disabled={exhibitIndex <= 0} onClick={onGuidedPrevious}><ArrowLeft size={15}/> Previous</button>
          <span>{exhibitIndex + 1} / {exhibitCount}</span>
          <button type="button" disabled={exhibitIndex >= exhibitCount - 1} onClick={onGuidedNext}>Next <ArrowRight size={15}/></button>
        </div>}
        <div>
          <a className="btn btn-primary" href={href(content.articleRoute)} onClick={onArticleIntent}>{exhibit.entityKind === 'philosopher' ? 'Full philosopher profile' : 'Open Branch Explorer'}</a>
          <button className="btn" type="button" onClick={() => onClose('gesture')}>{continueLabel}</button>
        </div>
      </footer>
    </article>
  </div>;
}
