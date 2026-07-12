import {useEffect, useId, useState, type MouseEvent} from 'react';
import {ArrowRight, BookOpen, GitBranch, Users} from 'lucide-react';
import {branchById} from '../../data/branches';
import {philosopherById} from '../../data/philosophers';
import {getArticleRouteEntries} from '../../routing/routeMetadata';
import type {ArticleRoute, RouteHref} from '../../routing/routes';
import {scrollToArticleTarget} from '../../routing/useArticleSection';
import type {ArticleSection} from '../../types/philosophy';

export function ArticleBody({sections, href}: {sections: ArticleSection[]; href: RouteHref}) {
  return <div className="reference-article">
    {sections.map((section, index) => <section className="article-section" id={`article-${section.id}`} key={section.id}>
      <header><span>{String(index + 1).padStart(2, '0')}</span><h2>{section.title}</h2></header>
      <div className="article-prose">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      {(section.relatedBranchIds?.length || section.relatedPhilosopherIds?.length || section.relatedWorkTitles?.length) ? <aside className="article-connections" aria-label={`Connections for ${section.title}`}>
        {section.relatedBranchIds && section.relatedBranchIds.length > 0 && <div><b><GitBranch size={12}/> Related branches</b>{section.relatedBranchIds.map((id) => branchById(id) ? <a href={href({kind: 'branch', branchId: id})} key={id}>{branchById(id)?.name}<ArrowRight size={11}/></a> : null)}</div>}
        {section.relatedPhilosopherIds && section.relatedPhilosopherIds.length > 0 && <div><b><Users size={12}/> Related thinkers</b>{section.relatedPhilosopherIds.map((id) => philosopherById(id) ? <a href={href({kind: 'philosopher', philosopherId: id})} key={id}>{philosopherById(id)?.name}<ArrowRight size={11}/></a> : null)}</div>}
        {section.relatedWorkTitles && section.relatedWorkTitles.length > 0 && <div><b><BookOpen size={12}/> Works in this section</b><p>{section.relatedWorkTitles.join(' · ')}</p></div>}
      </aside> : null}
    </section>)}
  </div>;
}

export function ArticleToc({label, route, href}: {label: string; route: ArticleRoute; href: RouteHref}) {
  const entries = getArticleRouteEntries(route);
  const [open, setOpen] = useState(false);
  const tocId = useId();
  const activeLabel = entries.find((entry) => route.section === entry.id)?.label ?? 'Overview';
  useEffect(() => setOpen(false), [route.kind, route.kind === 'branch' ? route.branchId : route.philosopherId, route.section]);
  const onEntryClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string, targetId: string) => {
    if (
      route.section === sectionId
      && event.button === 0
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      window.requestAnimationFrame(() => scrollToArticleTarget(targetId));
    }
  };
  return <div className="article-toc-shell" onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}>
    <button className="article-toc-toggle" type="button" aria-expanded={open} aria-controls={tocId} onClick={() => setOpen((value) => !value)}>
      <span><small>Contents</small><b>{activeLabel}</b></span><span aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <nav className="article-toc" id={tocId} data-expanded={open ? 'true' : 'false'} aria-label={`${label} table of contents`}>
      <div><span>Contents</span><b>{label}</b></div>
      {entries.map((entry) => <a
      href={href({...route, section: entry.id})}
      key={entry.id}
      aria-current={route.section === entry.id ? 'location' : undefined}
      onClick={(event) => onEntryClick(event, entry.id, entry.targetId)}
      ><small>{entry.marker}</small>{entry.label}</a>)}
    </nav>
  </div>;
}
