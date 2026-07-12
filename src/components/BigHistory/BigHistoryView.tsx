import {PhilosophyWall} from '../PhilosophyWall/PhilosophyWall';
import type {RouteHref} from '../../routing/routes';

export function BigHistoryView({href}:{href:RouteHref}){
  return <div className="page wall-page"><PageHead eyebrow="The central atlas plate" title="Philosophy Wall" text="Schools persist, thinkers enter the conversation, landmark works redirect debate, and later traditions inherit or resist what came before."/><PhilosophyWall href={href}/></div>;
}

export function PageHead({eyebrow,title,text}:{eyebrow:string;title:string;text:string}){return <div className="page-head"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p></div>}
