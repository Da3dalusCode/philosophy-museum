import {useEffect, useRef} from 'react';
import {ArrowLeft, ArrowRight, CheckCircle2, Route} from 'lucide-react';
import {branchById} from '../../data/branches';
import {learningPaths} from '../../data/learningPaths';
import {philosopherById} from '../../data/philosophers';
import type {LearningPathRoute, RouteHref} from '../../routing/routes';
import {PageHead} from '../BigHistory/BigHistoryView';
import {PhilosopherPortrait} from '../PhilosopherPortrait/PhilosopherPortrait';

export function LearningPaths({route, href}: {route: LearningPathRoute; href: RouteHref}) {
  const path = learningPaths.find(({id}) => id === route.pathId)!;
  const step = path.steps[route.step - 1];
  const listRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const list = listRef.current;
    const active = activeRef.current;
    if (!list || !active) return;
    list.scrollTo({left: Math.max(0, active.offsetLeft - (list.clientWidth - active.clientWidth) / 2), behavior: 'auto'});
  }, [route.pathId]);
  return <div className="page compact-content-page paths-page">
    <PageHead eyebrow="Guided routes for beginners" title="Learning Paths" text="Short sequences turn a large atlas into a focused argument you can follow one distinction at a time."/>
    <div className="paths-layout">
      <aside className="path-list" ref={listRef} aria-label="Choose a learning path">{learningPaths.map((item) => <a
        className={`selectable-card ${item.id === route.pathId ? 'active is-selected' : ''}`}
        ref={item.id === route.pathId ? activeRef : undefined}
        href={href({kind: 'learning-path', pathId: item.id, step: 1})}
        aria-current={item.id === route.pathId ? 'page' : undefined}
        key={item.id}
      ><Route size={17}/><span><b>{item.title}</b><small>{item.steps.length} steps · {item.beginnerDescription}</small></span><ArrowRight size={13}/></a>)}</aside>
      <article className="path-detail">
        <div className="eyebrow">{path.title}</div>
        <div className="progress"><i style={{width: `${(route.step / path.steps.length) * 100}%`}}/></div>
        <small>Step {route.step} of {path.steps.length}</small>
        <h1>{step.title}</h1>
        <p className="path-explanation">{step.explanation}</p>
        <div className="checkpoint static-info-card"><CheckCircle2/><div><span>Checkpoint question</span><h3>{step.checkpointQuestion}</h3><p>{step.nextHint}</p></div></div>
        <div className="connected">
          <div><small>Connected branches</small>{step.branchIds.map((id) => <a className="tag-clickable" href={href({kind: 'branch', branchId: id})} key={id}>{branchById(id)?.name}<ArrowRight size={12}/></a>)}</div>
          <div><small>Think alongside</small>{step.philosopherIds.map((id) => {const thinker = philosopherById(id); return thinker ? <a className="connection-button btn btn-secondary" href={href({kind: 'philosopher', philosopherId: id})} key={id}><PhilosopherPortrait philosopher={thinker}/>{thinker.name}<ArrowRight size={12}/></a> : null;})}</div>
        </div>
        <div className="step-actions">
          {route.step > 1 ? <a className="btn btn-secondary" href={href({...route, step: route.step - 1})}><ArrowLeft/> Previous</a> : <button className="btn btn-secondary" disabled><ArrowLeft/> Previous</button>}
          {route.step < path.steps.length ? <a className="btn btn-primary" href={href({...route, step: route.step + 1})}>Next step <ArrowRight/></a> : <button className="btn btn-primary" disabled>Next step <ArrowRight/></button>}
        </div>
      </article>
    </div>
  </div>;
}
