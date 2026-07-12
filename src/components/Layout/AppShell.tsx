import type {ReactNode} from 'react';
import type {RouteHref} from '../../routing/routes';
import type {ViewId} from '../../types/philosophy';
import {GlobalSearch} from '../Search/GlobalSearch';
import {Navigation} from './Navigation';

export function AppShell({view, href, children}: {
  view?: ViewId;
  href: RouteHref;
  children: ReactNode;
}) {
  return <div className="shell">
    <header><Navigation view={view} href={href}/><GlobalSearch href={href}/></header>
    <main>{children}</main>
    <footer><span>Philosophy Atlas · A local-first museum of questions</span><span>Explore arguments, not slogans.</span></footer>
  </div>;
}
