import {Search, X} from 'lucide-react';
import {useState} from 'react';
import {branches} from '../../data/branches';
import {philosophers} from '../../data/philosophers';
import type {RouteHref} from '../../routing/routes';

export function GlobalSearch({href}: {href: RouteHref}) {
  const [q, setQ] = useState('');
  const results = q.length > 1 ? [
    ...branches.filter((item) => item.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5).map((item) => ({...item, type: 'Branch' as const})),
    ...philosophers.filter((item) => item.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5).map((item) => ({...item, type: 'Philosopher' as const})),
  ] : [];
  return <div className="search-wrap">
    <Search size={16}/>
    <input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search ideas and thinkers…" aria-label="Global search"/>
    {q && <button aria-label="Clear search" onClick={() => setQ('')}><X size={15}/></button>}
    {results.length > 0 && <div className="search-results">{results.map((result) => <a
      key={`${result.type}-${result.id}`}
      href={href(result.type === 'Branch'
        ? {kind: 'branch', branchId: result.id}
        : {kind: 'philosopher', philosopherId: result.id})}
      onClick={() => setQ('')}
    ><span>{result.name}</span><small>{result.type}</small></a>)}</div>}
  </div>;
}
