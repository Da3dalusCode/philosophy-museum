import {PhilosophyWall} from '../PhilosophyWall/PhilosophyWall';
import type {RouteHref} from '../../routing/routes';
import {PageHead} from '../Layout/PageHead';

export function BigHistoryView({href}:{href:RouteHref}){
  return <div className="page wall-page"><PageHead eyebrow="The central atlas plate" title="Philosophy Wall" text="Schools persist, thinkers enter the conversation, landmark works redirect debate, and later traditions inherit or resist what came before."/><PhilosophyWall href={href}/></div>;
}
