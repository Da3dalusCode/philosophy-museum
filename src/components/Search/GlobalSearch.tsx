import {Search, X} from 'lucide-react';
import {useEffect, useId, useRef, useState} from 'react';
import {loadAtlasSearchIndex, type AtlasSearchIndex} from '../../data/searchIndex';
import {subscribeToHashRoute} from '../../routing/hashHistory';
import type {MuseumRouteExhibitId, NavigableAppRoute, RouteHref} from '../../routing/routes';

type SearchResult = {
  id: string;
  label: string;
  type: 'Branch' | 'Philosopher' | 'Museum hall' | 'Museum exhibit';
  route: NavigableAppRoute;
};

export function GlobalSearch({href}: {href: RouteHref}) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState<AtlasSearchIndex>();
  const [searchIndexFailed, setSearchIndexFailed] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsId = useId();
  const query = q.trim().toLocaleLowerCase();
  useEffect(() => {
    if (query.length <= 1 || searchIndex || searchIndexFailed) return;
    let current = true;
    void loadAtlasSearchIndex().then((index) => {
      if (current) setSearchIndex(index);
    }).catch(() => {
      if (current) setSearchIndexFailed(true);
    });
    return () => {
      current = false;
    };
  }, [query, searchIndex, searchIndexFailed]);
  const results: readonly SearchResult[] = query.length > 1 && searchIndex ? [
    ...searchIndex.branches.filter((item) => item.searchText.includes(query)).slice(0, 4).map((item) => ({
      id: item.id,
      label: item.label,
      type: 'Branch' as const,
      route: {kind: 'branch' as const, branchId: item.id},
    })),
    ...searchIndex.philosophers.filter((item) => item.searchText.includes(query)).slice(0, 4).map((item) => ({
      id: item.id,
      label: item.label,
      type: 'Philosopher' as const,
      route: {kind: 'philosopher' as const, philosopherId: item.id},
    })),
    ...searchIndex.museumHalls.filter((hall) => hall.searchText.includes(query)).slice(0, 3).map((hall) => ({
      id: hall.id,
      label: hall.label,
      type: 'Museum hall' as const,
      route: {kind: 'museum' as const, hallId: hall.id},
    })),
    ...searchIndex.museumExhibits
      .filter((item) => item.searchText.includes(query))
      .slice(0, 5)
      .map((item) => ({
        id: `${item.hallId}:${item.id}`,
        label: item.label,
        type: 'Museum exhibit' as const,
        route: {
          kind: 'museum' as const,
          hallId: item.hallId,
          exhibitId: item.id as MuseumRouteExhibitId,
        },
      })),
  ] : [];
  useEffect(() => subscribeToHashRoute(() => {
    setQ('');
    setOpen(false);
  }), []);
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);
  const clear = (restoreFocus = false) => {
    setQ('');
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => inputRef.current?.focus());
  };
  return <div className="search-wrap" ref={wrapRef} onKeyDown={(event) => {
    if (event.key === 'Escape' && open) {
      event.stopPropagation();
      setOpen(false);
    }
  }}>
    <Search size={16}/>
    <input ref={inputRef} value={q} onFocus={() => results.length > 0 && setOpen(true)} onChange={(event) => {setQ(event.target.value);setOpen(true);setSearchIndexFailed(false)}} placeholder="Search ideas, thinkers, and Museum…" aria-label="Global search" aria-expanded={open && results.length > 0} aria-controls={resultsId}/>
    {q && <button type="button" aria-label="Clear search" onClick={() => clear(true)}><X size={15}/></button>}
    {open && results.length > 0 && <div className="search-results" id={resultsId} aria-label="Search results">{results.map((result) => <a
      key={`${result.type}-${result.id}`}
      href={href(result.route)}
      onClick={() => clear(false)}
    ><span>{result.label}</span><small>{result.type}</small></a>)}</div>}
  </div>;
}
