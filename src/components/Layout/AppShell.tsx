import type {ReactNode} from 'react';
import type {RouteHref} from '../../routing/routes';
import type {ViewId} from '../../types/philosophy';
import {GlobalSearch} from '../Search/GlobalSearch';
import {Navigation} from './Navigation';

export function AppShell({view, href, onRouteIntent, children}: {
  view?: ViewId;
  href: RouteHref;
  onRouteIntent?: (view: ViewId) => void;
  children: ReactNode;
}) {
  const museumRoute = view === 'museum';
  return <div className={museumRoute ? 'shell shell-museum' : 'shell'}>
    <header className="app-header"><Navigation view={view} href={href} onRouteIntent={onRouteIntent}/><GlobalSearch href={href}/></header>
    <main>{children}</main>
    {!museumRoute && <footer><span>Philosophy Atlas · A local-first museum of questions</span><span>Explore arguments, not slogans.</span></footer>}
  </div>;
}
