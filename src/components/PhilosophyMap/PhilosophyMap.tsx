import {PageHead} from '../BigHistory/BigHistoryView';
import {PhilosophyWall} from '../PhilosophyWall/PhilosophyWall';
import type {RouteHref} from '../../routing/routes';

export function PhilosophyMap({href}:{href:RouteHref}){
  return <div className="page wall-page genealogy-wall-page"><PageHead eyebrow="Branch genealogy mode" title="How schools inherit and transform" text="The same historical wall, focused on schools and their routes of influence, reaction, overlap, and revival."/><PhilosophyWall initialMode="influence" genealogy href={href}/></div>;
}
