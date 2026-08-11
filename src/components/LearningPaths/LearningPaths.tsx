import {useEffect, useMemo, useRef, useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Landmark,
  Route,
  Signpost,
  Sparkles,
} from 'lucide-react';
import type {MuseumExhibitId, MuseumPublicHallId} from '../../data/museumCatalog';
import {branchById} from '../../data/branches';
import {learningPaths} from '../../data/learningPaths';
import {philosopherById} from '../../data/philosophers';
import type {LearningPathRoute, RouteHref} from '../../routing/routes';
import {PageHead} from '../Layout/PageHead';

type PathLevel = 'all' | 'foundation' | 'intermediate' | 'advanced';

const levelLabel = (level?: string) => level
  ? `${level.charAt(0).toUpperCase()}${level.slice(1)}`
  : 'Foundation';

export function LearningPaths({route, href}: {route: LearningPathRoute; href: RouteHref}) {
  const path = learningPaths.find(({id}) => id === route.pathId)!;
  const step = path.steps[route.step - 1];
  const [level, setLevel] = useState<PathLevel>('all');
  const listRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const visiblePaths = useMemo(
    () => level === 'all' ? learningPaths : learningPaths.filter((item) => (item.level ?? 'foundation') === level),
    [level],
  );

  useEffect(() => {
    const list = listRef.current;
    const active = activeRef.current;
    if (!list || !active) return;
    list.scrollTo({left: Math.max(0, active.offsetLeft - (list.clientWidth - active.clientWidth) / 2), behavior: 'auto'});
  }, [route.pathId]);

  return <div className="page compact-content-page paths-page">
    <PageHead eyebrow="Guided routes through the collection" title="Learning Paths" text="Choose a subject and experience level, then follow a sourced sequence of questions, articles, Museum stops, and readings."/>
    <div className="path-level-filter" aria-label="Filter learning paths by experience level">
      <span>Experience level</span>
      {(['all', 'foundation', 'intermediate', 'advanced'] as const).map((value) => <button
        className={level === value ? 'active' : ''}
        aria-pressed={level === value}
        onClick={() => setLevel(value)}
        type="button"
        key={value}
      >{value === 'all' ? 'All routes' : levelLabel(value)}</button>)}
    </div>
    <div className="paths-layout">
      <aside className="path-list" ref={listRef} aria-label="Choose a learning path">{visiblePaths.map((item) => <a
        className={`selectable-card ${item.id === route.pathId ? 'active is-selected' : ''}`}
        ref={item.id === route.pathId ? activeRef : undefined}
        href={href({kind: 'learning-path', pathId: item.id, step: 1})}
        aria-current={item.id === route.pathId ? 'page' : undefined}
        key={item.id}
      >
        <Route size={17}/>
        <span>
          <span className="path-card-meta"><i>{levelLabel(item.level)}</i>{item.estimatedMinutes && <i>{item.estimatedMinutes} min</i>}</span>
          <b>{item.title}</b>
          <small>{item.steps.length} steps · {item.beginnerDescription}</small>
          {!!item.subjectTags?.length && <em>{item.subjectTags.slice(0, 3).join(' · ')}</em>}
        </span>
        <ArrowRight size={13}/>
      </a>)}</aside>

      <article className="path-detail">
        <header className="path-route-head">
          <div>
            <div className="eyebrow">{path.title}</div>
            <div className="path-route-meta"><span>{levelLabel(path.level)}</span>{path.estimatedMinutes && <span>{path.estimatedMinutes} minutes</span>}<span>{path.steps.length} steps</span></div>
          </div>
          {!!path.subjectTags?.length && <div className="path-subjects" aria-label="Subjects">{path.subjectTags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
        </header>

        {route.step === 1 && (!!path.objectives?.length || !!path.outcomes?.length) && <section className="path-brief static-info-card" aria-label="Route orientation">
          <div><Sparkles size={17}/><h2>What this route builds</h2><ul>{path.objectives?.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
          {!!path.outcomes?.length && <div><Signpost size={17}/><h2>By the end</h2><ul>{path.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>}
        </section>}

        <div className="progress" aria-label={`Step ${route.step} of ${path.steps.length}`}><i style={{width: `${(route.step / path.steps.length) * 100}%`}}/></div>
        <small>Step {route.step} of {path.steps.length}</small>
        <h1>{step.title}</h1>
        {step.sequenceRationale && <p className="path-sequence"><Signpost size={15}/><span><b>Why this comes now</b>{step.sequenceRationale}</span></p>}
        <p className="path-explanation">{step.explanation}</p>
        <section className="path-step-goals" aria-label="Goals and vocabulary for this step">
          <div><h2>Learning objectives</h2><ul>{step.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
          <div><h2>Working vocabulary</h2><p>{step.conceptIds.map((concept) => <span key={concept}>{concept.replaceAll('-', ' ')}</span>)}</p></div>
        </section>

        <div className="checkpoint static-info-card"><CheckCircle2/><div><span>Checkpoint question</span><h3>{step.checkpointQuestion}</h3><p>{step.nextHint}</p></div></div>

        {!!step.reflectionQuestions?.length && <section className="path-reflections">
          <h2>Pause and test the distinction</h2>
          <ol>{step.reflectionQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
        </section>}

        {!!step.readings?.length && <section className="path-readings">
          <h2><BookOpen size={17}/> Read with a purpose</h2>
          <div>{step.readings.map((reading) => <article key={`${reading.author}-${reading.title}`}>
            <span className="reading-kind">{reading.kind}</span>
            <b>{reading.author}, <cite>{reading.title}</cite></b>
            <p>{reading.whyThisStep}</p>
            <a href={href(reading.sourceArticle.kind === 'branch'
              ? {kind: 'branch', branchId: reading.sourceArticle.id}
              : {kind: 'philosopher', philosopherId: reading.sourceArticle.id})}>Check the reviewed source article <ArrowRight size={13}/></a>
          </article>)}</div>
        </section>}

        {(!!step.articleLinks?.length || !!step.museumLinks?.length) && <section className="path-destinations">
          {!!step.articleLinks?.length && <div><h2>Continue in the Atlas</h2>{step.articleLinks.map((link) => <a className="path-destination" href={href(link.kind === 'branch'
            ? {kind: 'branch', branchId: link.id}
            : {kind: 'philosopher', philosopherId: link.id})} key={`${link.kind}-${link.id}`}>
            <span><b>{link.kind === 'branch' ? branchById(link.id)?.name : philosopherById(link.id)?.name}</b><small>{link.reason}</small></span><ArrowRight size={14}/>
          </a>)}</div>}
          {!!step.museumLinks?.length && <div><h2>Visit the Museum</h2>{step.museumLinks.map((link) => <a className="path-destination museum-destination" href={href({
            kind: 'museum',
            hallId: link.hallId as MuseumPublicHallId,
            exhibitId: link.exhibitId as MuseumExhibitId,
          })} key={`${link.hallId}-${link.exhibitId}`}>
            <Landmark size={16}/><span><b>{link.label}</b><small>{link.reason}</small></span><ArrowRight size={14}/>
          </a>)}</div>}
        </section>}

        {!step.articleLinks?.length && <div className="connected">
          <div><small>Connected branches</small>{step.branchIds.map((id) => <a className="tag-clickable" href={href({kind: 'branch', branchId: id})} key={id}>{branchById(id)?.name}<ArrowRight size={12}/></a>)}</div>
          <div><small>Think alongside</small>{step.philosopherIds.map((id) => {const thinker = philosopherById(id); return thinker ? <a className="connection-button btn btn-secondary" href={href({kind: 'philosopher', philosopherId: id})} key={id}>{thinker.name}<ArrowRight size={12}/></a> : null;})}</div>
        </div>}

        <nav className="step-actions" aria-label="Learning path steps">
          {route.step > 1 ? <a className="btn btn-secondary" href={href({...route, step: route.step - 1})}><ArrowLeft/> Previous</a> : <button className="btn btn-secondary" disabled><ArrowLeft/> Previous</button>}
          {route.step < path.steps.length ? <a className="btn btn-primary" href={href({...route, step: route.step + 1})}>Next step <ArrowRight/></a> : <button className="btn btn-primary" disabled>Next step <ArrowRight/></button>}
        </nav>
      </article>
    </div>
  </div>;
}
