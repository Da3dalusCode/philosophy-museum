import {ArrowLeftRight, ArrowRight} from 'lucide-react';
import {branches, branchById} from '../../data/branches';
import {philosophers, philosopherById} from '../../data/philosophers';
import {
  DEFAULT_ROUTES,
  type ComparisonRoute,
  type RouteHref,
} from '../../routing/routes';
import {PageHead} from '../BigHistory/BigHistoryView';
import {PhilosopherPortrait} from '../PhilosopherPortrait/PhilosopherPortrait';

const presets: {label: string; route: ComparisonRoute}[] = [
  {label: 'Stoicism vs Epicureanism', route: {kind: 'compare-branches', leftId: 'stoicism', rightId: 'epicureanism'}},
  {label: 'Plato vs Aristotle', route: {kind: 'compare-philosophers', leftId: 'plato', rightId: 'aristotle'}},
  {label: 'Rationalism vs Empiricism', route: {kind: 'compare-branches', leftId: 'rationalism', rightId: 'empiricism'}},
  {label: 'Kant vs Hume', route: {kind: 'compare-philosophers', leftId: 'kant', rightId: 'hume'}},
  {label: 'Utilitarianism vs Deontology', route: {kind: 'compare-branches', leftId: 'utilitarianism', rightId: 'deontology'}},
  {label: 'Existentialism vs Stoicism', route: {kind: 'compare-branches', leftId: 'existentialism', rightId: 'stoicism'}},
  {label: 'Analytic vs Continental', route: {kind: 'compare-branches', leftId: 'analytic-philosophy', rightId: 'continental-philosophy'}},
];

export function CompareMode({route, href, onRouteChange}: {
  route: ComparisonRoute;
  href: RouteHref;
  onRouteChange: (route: ComparisonRoute) => void;
}) {
  const kind = route.kind === 'compare-branches' ? 'branch' : 'philosopher';
  const options = kind === 'branch' ? branches : philosophers;
  const left = kind === 'branch' ? branchById(route.leftId) : philosopherById(route.leftId);
  const right = kind === 'branch' ? branchById(route.rightId) : philosopherById(route.rightId);
  const reversed: ComparisonRoute = route.kind === 'compare-branches'
    ? {kind: 'compare-branches', leftId: route.rightId, rightId: route.leftId}
    : {kind: 'compare-philosophers', leftId: route.rightId, rightId: route.leftId};

  const changeParticipant = (side: 'left' | 'right', id: string) => {
    const next = {...route, [side === 'left' ? 'leftId' : 'rightId']: id} as ComparisonRoute;
    onRouteChange(next);
  };

  return <div className="page compare-page compact-content-page">
    <PageHead eyebrow="Difference reveals structure" title="Compare ideas without caricature" text="Set two branches or thinkers beside one another to see shared questions, decisive disagreements, and historical responses."/>
    <div className="preset-row">{presets.map(({label, route: preset}) => <a href={href(preset)} key={label}>{label}</a>)}</div>
    <div className="compare-controls">
      <div>
        <a className={kind === 'branch' ? 'active' : ''} href={href(DEFAULT_ROUTES.compare)} aria-current={kind === 'branch' ? 'page' : undefined}>Branches</a>
        <a className={kind === 'philosopher' ? 'active' : ''} href={href(DEFAULT_ROUTES.comparePhilosophers)} aria-current={kind === 'philosopher' ? 'page' : undefined}>Philosophers</a>
      </div>
      <select aria-label="Left comparison participant" value={route.leftId} onChange={(event) => changeParticipant('left', event.target.value)}>
        {options.map((item) => <option value={item.id} key={item.id} disabled={item.id === route.rightId}>{item.name}</option>)}
      </select>
      <a className="compare-swap" href={href(reversed)} aria-label="Swap comparison participants"><ArrowLeftRight/></a>
      <select aria-label="Right comparison participant" value={route.rightId} onChange={(event) => changeParticipant('right', event.target.value)}>
        {options.map((item) => <option value={item.id} key={item.id} disabled={item.id === route.leftId}>{item.name}</option>)}
      </select>
    </div>
    {left && right && <div className="compare-result">
      <CompareColumn x={left} href={href}/>
      <div className="compare-spine"><span>Shared arena</span><p>{kind === 'branch' ? 'Both offer a vocabulary for an enduring philosophical question, but direct attention toward different evidence, values, or methods.' : 'Both changed the conversation by making a difficult problem clearer—and by provoking productive disagreement.'}</p><span>Main contrast</span><p>{kind === 'branch' && 'contrastingBranchIds' in left && left.contrastingBranchIds.includes(right.id) ? 'These branches directly contrast in the atlas.' : 'The deepest difference becomes visible in what each treats as the starting point.'}</p></div>
      <CompareColumn x={right} href={href}/>
    </div>}
  </div>;
}

function CompareColumn({x, href}: {
  x: NonNullable<ReturnType<typeof branchById> | ReturnType<typeof philosopherById>>;
  href: RouteHref;
}) {
  const isBranch = 'coreQuestions' in x;
  return <article className="compare-col static-info-card" style={{'--accent': x.color} as React.CSSProperties}>
    {!isBranch && <PhilosopherPortrait philosopher={x} size="large"/>}
    <div className="eyebrow">{isBranch ? x.category : x.tradition}</div>
    <h2>{x.name}</h2>
    <p>{isBranch ? x.shortDefinition : x.contributionSummary}</p>
    <h3>{isBranch ? 'Core questions' : 'Main ideas'}</h3>
    <ul>{(isBranch ? x.coreQuestions : x.mainIdeas).slice(0, 5).map((value) => <li key={value}>{value}</li>)}</ul>
    <h3>{isBranch ? 'View of a good approach' : 'Beginner takeaway'}</h3>
    <p>{x.beginnerExplanation}</p>
    <a className="btn btn-secondary compare-entity-link" href={href(isBranch
      ? {kind: 'branch', branchId: x.id}
      : {kind: 'philosopher', philosopherId: x.id})}>Open {isBranch ? 'branch' : 'profile'} <ArrowRight size={14}/></a>
  </article>;
}
