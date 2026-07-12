import {Search, X} from 'lucide-react';
import {useEffect, useId, useRef, useState} from 'react';
import {branches} from '../../data/branches';
import {philosophers} from '../../data/philosophers';
import {subscribeToHashRoute} from '../../routing/hashHistory';
import type {RouteHref} from '../../routing/routes';

export function GlobalSearch({href}: {href: RouteHref}) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsId = useId();
  const results = q.length > 1 ? [
    ...branches.filter((item) => item.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5).map((item) => ({...item, type: 'Branch' as const})),
    ...philosophers.filter((item) => item.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5).map((item) => ({...item, type: 'Philosopher' as const})),
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
    <input ref={inputRef} value={q} onFocus={() => results.length > 0 && setOpen(true)} onChange={(event) => {setQ(event.target.value);setOpen(true)}} placeholder="Search ideas and thinkers…" aria-label="Global search" aria-expanded={open && results.length > 0} aria-controls={resultsId}/>
    {q && <button type="button" aria-label="Clear search" onClick={() => clear(true)}><X size={15}/></button>}
    {open && results.length > 0 && <div className="search-results" id={resultsId} aria-label="Search results">{results.map((result) => <a
      key={`${result.type}-${result.id}`}
      href={href(result.type === 'Branch'
        ? {kind: 'branch', branchId: result.id}
        : {kind: 'philosopher', philosopherId: result.id})}
      onClick={() => clear(false)}
    ><span>{result.name}</span><small>{result.type}</small></a>)}</div>}
  </div>;
}
