import {Search, X} from 'lucide-react';
import {useEffect, useId, useRef, useState} from 'react';
import {branches} from '../../data/branches';
import {philosophers} from '../../data/philosophers';
import {MUSEUM_SUPPLEMENTAL_EXHIBITS} from '../../data/museum/museumSupplementalExhibits';
import {MUSEUM_HALLS} from '../../data/museumCatalog';
import {subscribeToHashRoute} from '../../routing/hashHistory';
import type {NavigableAppRoute, RouteHref} from '../../routing/routes';

type SearchResult = {
  id: string;
  label: string;
  type: 'Branch' | 'Philosopher' | 'Museum hall' | 'Museum exhibit';
  route: NavigableAppRoute;
};

export function GlobalSearch({href}: {href: RouteHref}) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsId = useId();
  const query = q.trim().toLocaleLowerCase();
  const matches = (parts: readonly (string | readonly string[])[]): boolean => parts.flat().join(' ').toLocaleLowerCase().includes(query);
  const matchingLensEntityIds = new Set<string>(MUSEUM_HALLS.flatMap((hall) => hall.zones.flatMap((zone) =>
    zone.comparativeLenses
      .filter((lens) => matches([lens.displayName, lens.culturalSetting, lens.rationale, hall.title, zone.title]))
      .map(({entityId}) => entityId),
  )));
  const museumExhibitCandidates = [
    ...MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map((exhibit) => ({
      id: `${hall.id}:${exhibit.id}`,
      label: exhibit.displayName,
      searchParts: [
        exhibit.displayName,
        exhibit.question,
        hall.title,
        hall.zones.find(({id}) => id === exhibit.zoneId)?.title ?? '',
      ],
      route: {kind: 'museum' as const, hallId: hall.id, exhibitId: exhibit.id},
    }))),
    ...MUSEUM_SUPPLEMENTAL_EXHIBITS.map(({hallId, exhibit, layout}) => {
      const hall = MUSEUM_HALLS.find(({id}) => id === hallId)!;
      return {
        id: `${hallId}:${exhibit.id}`,
        label: exhibit.displayName,
        searchParts: [
          exhibit.displayName,
          exhibit.workLabel,
          exhibit.question,
          exhibit.frontSubtitle,
          exhibit.keyIdeas,
          hall.title,
          hall.zones.find(({id}) => id === layout.zoneId)?.title ?? '',
        ],
        route: {kind: 'museum' as const, hallId, exhibitId: exhibit.id},
      };
    }),
  ];
  const results: readonly SearchResult[] = query.length > 1 ? [
    ...branches.filter((item) => matches([item.name, item.shortDefinition, item.coreQuestions, item.keyConcepts.map(({name}) => name)])).slice(0, 4).map((item) => ({
      id: item.id,
      label: item.name,
      type: 'Branch' as const,
      route: {kind: 'branch' as const, branchId: item.id},
    })),
    ...philosophers.filter((item) => matchingLensEntityIds.has(item.id) || matches([item.name, item.mainIdeas, item.keyWorks, item.tradition])).slice(0, 4).map((item) => ({
      id: item.id,
      label: item.name,
      type: 'Philosopher' as const,
      route: {kind: 'philosopher' as const, philosopherId: item.id},
    })),
    ...MUSEUM_HALLS.filter((hall) => matches([hall.title, hall.period, hall.description, hall.sweep])).slice(0, 3).map((hall) => ({
      id: hall.id,
      label: hall.title,
      type: 'Museum hall' as const,
      route: {kind: 'museum' as const, hallId: hall.id},
    })),
    ...museumExhibitCandidates
      .filter(({searchParts}) => matches(searchParts))
      .slice(0, 5)
      .map(({id, label, route}) => ({
        id,
        label,
        type: 'Museum exhibit' as const,
        route,
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
    if (event.key === 'Escape' && open && results.length > 0) {
      event.stopPropagation();
      setOpen(false);
    }
  }}>
    <Search size={16}/>
    <input ref={inputRef} value={q} onFocus={() => results.length > 0 && setOpen(true)} onChange={(event) => {setQ(event.target.value);setOpen(true)}} placeholder="Search ideas, thinkers, and Museum…" aria-label="Global search" aria-expanded={open && results.length > 0} aria-controls={resultsId}/>
    {q && <button type="button" aria-label="Clear search" onClick={() => clear(true)}><X size={15}/></button>}
    {open && results.length > 0 && <div className="search-results" id={resultsId} aria-label="Search results">{results.map((result) => <a
      key={`${result.type}-${result.id}`}
      href={href(result.route)}
      onClick={() => clear(false)}
    ><span>{result.label}</span><small>{result.type}</small></a>)}</div>}
  </div>;
}
