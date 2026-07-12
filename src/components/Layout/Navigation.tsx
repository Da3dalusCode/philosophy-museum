import {BookOpen, Compass, GitCompareArrows, History, Map, Route, Users} from 'lucide-react';
import {DEFAULT_ROUTES, type NavigableAppRoute, type RouteHref} from '../../routing/routes';
import type {ViewId} from '../../types/philosophy';

const items: [ViewId, string, typeof History, NavigableAppRoute][] = [
  ['history', 'Big History', History, DEFAULT_ROUTES.history],
  ['branches', 'Branch Explorer', Compass, DEFAULT_ROUTES.branch],
  ['map', 'Philosophy Map', Map, DEFAULT_ROUTES.map],
  ['philosophers', 'Philosophers', Users, DEFAULT_ROUTES.philosopher],
  ['compare', 'Compare', GitCompareArrows, DEFAULT_ROUTES.compare],
  ['paths', 'Learning Paths', Route, DEFAULT_ROUTES.learningPath],
];

export function Navigation({view, href}: {view?: ViewId; href: RouteHref}) {
  return <nav aria-label="Primary navigation">
    <a className="brand" href={href(DEFAULT_ROUTES.history)}><BookOpen size={20}/><span>Philosophy <b>Atlas</b></span></a>
    <div className="nav-scroll">
      {items.map(([id, label, Icon, route]) => <a
        key={id}
        className={view === id ? 'active' : ''}
        href={href(route)}
        aria-current={view === id ? 'page' : undefined}
      ><Icon size={16}/><span>{label}</span></a>)}
    </div>
  </nav>;
}
