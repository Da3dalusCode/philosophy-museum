import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  History,
  Languages,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import {branches, branchById} from '../../data/branches';
import {
  comparisonCasefiles,
  getComparisonCasefile,
  resolveComparisonEvidence,
  type ComparisonCasefile,
  type ComparisonEvidenceRef,
  type ComparisonStatement,
} from '../../data/comparisons';
import {philosophers, philosopherById} from '../../data/philosophers';
import {
  DEFAULT_ROUTES,
  type ComparisonRoute,
  type RouteHref,
} from '../../routing/routes';
import {PageHead} from '../Layout/PageHead';
import {PhilosopherPortrait} from '../PhilosopherPortrait/PhilosopherPortrait';

const entityName = (kind: 'branch' | 'philosopher', id: string): string =>
  (kind === 'branch' ? branchById(id) : philosopherById(id))?.name ?? id;

const casefileRoute = (casefile: ComparisonCasefile): ComparisonRoute => casefile.kind === 'branch'
  ? {kind: 'compare-branches', leftId: casefile.participantIds[0], rightId: casefile.participantIds[1]}
  : {kind: 'compare-philosophers', leftId: casefile.participantIds[0], rightId: casefile.participantIds[1]};

const presets = comparisonCasefiles.map((casefile) => ({
  label: `${entityName(casefile.kind, casefile.participantIds[0])} vs ${entityName(casefile.kind, casefile.participantIds[1])}`,
  route: casefileRoute(casefile),
}));

export function CompareMode({route, href, onRouteChange}: {
  route: ComparisonRoute;
  href: RouteHref;
  onRouteChange: (route: ComparisonRoute) => void;
}) {
  const kind = route.kind === 'compare-branches' ? 'branch' : 'philosopher';
  const options = kind === 'branch' ? branches : philosophers;
  const left = kind === 'branch' ? branchById(route.leftId) : philosopherById(route.leftId);
  const right = kind === 'branch' ? branchById(route.rightId) : philosopherById(route.rightId);
  const casefile = getComparisonCasefile(kind, route.leftId, route.rightId);
  const reversed: ComparisonRoute = route.kind === 'compare-branches'
    ? {kind: 'compare-branches', leftId: route.rightId, rightId: route.leftId}
    : {kind: 'compare-philosophers', leftId: route.rightId, rightId: route.leftId};

  const changeParticipant = (side: 'left' | 'right', id: string) => {
    const next = {...route, [side === 'left' ? 'leftId' : 'rightId']: id} as ComparisonRoute;
    onRouteChange(next);
  };

  return <div className="page compare-page compact-content-page">
    <PageHead eyebrow="Difference reveals structure" title="Compare ideas without caricature" text="Use authored casefiles to study exact disagreements, shared premises, vocabulary, arguments, texts, history, and the limits of each comparison."/>
    <div className="preset-rail" aria-label="Authored comparison casefiles"><span>Authored casefiles</span><div className="preset-row">{presets.map(({label, route: preset}) => <a href={href(preset)} key={label}>{label}</a>)}</div></div>
    <div className="compare-controls">
      <div className="compare-kind" aria-label="Comparison type">
        <a className={kind === 'branch' ? 'active' : ''} href={href(DEFAULT_ROUTES.compare)} aria-current={kind === 'branch' ? 'page' : undefined}>Philosophies</a>
        <a className={kind === 'philosopher' ? 'active' : ''} href={href(DEFAULT_ROUTES.comparePhilosophers)} aria-current={kind === 'philosopher' ? 'page' : undefined}>Philosophers</a>
      </div>
      <label className="compare-participant-picker"><span>First participant</span><select aria-label="First comparison participant" value={route.leftId} onChange={(event) => changeParticipant('left', event.target.value)}>
          {options.map((item) => <option value={item.id} key={item.id} disabled={item.id === route.rightId}>{item.name}</option>)}
        </select></label>
      <a className="compare-swap" href={href(reversed)} aria-label="Swap comparison participants"><ArrowLeftRight/></a>
      <label className="compare-participant-picker"><span>Second participant</span><select aria-label="Second comparison participant" value={route.rightId} onChange={(event) => changeParticipant('right', event.target.value)}>
          {options.map((item) => <option value={item.id} key={item.id} disabled={item.id === route.leftId}>{item.name}</option>)}
        </select></label>
    </div>
    {left && right && (casefile
      ? <ComparisonDossier casefile={casefile} leftId={route.leftId} rightId={route.rightId} href={href}/>
      : <ResponsibleFallback left={left} right={right} href={href}/>)}
  </div>;
}

type Entity = NonNullable<ReturnType<typeof branchById> | ReturnType<typeof philosopherById>>;

function ParticipantIdentity({entity, position, href}: {entity: Entity; position: string; href: RouteHref}) {
  const isBranch = 'coreQuestions' in entity;
  return <article className="compare-participant" style={{'--accent': entity.color} as React.CSSProperties}>
    <div className="compare-identity"><span>{position}</span><b>{entity.name}</b></div>
    {!isBranch && <PhilosopherPortrait philosopher={entity} size="large"/>}
    <span className="eyebrow">{isBranch ? entity.category : entity.tradition}</span>
    <h2>{entity.name}</h2>
    <p>{isBranch ? entity.shortDefinition : entity.contributionSummary}</p>
    <a className="compare-profile-link" href={href(isBranch
      ? {kind: 'branch', branchId: entity.id}
      : {kind: 'philosopher', philosopherId: entity.id})}>Open reviewed {isBranch ? 'article' : 'profile'} <ArrowRight size={14}/></a>
  </article>;
}

function EvidenceLinks({statement}: {statement: ComparisonStatement}) {
  const unique = [...new Map(statement.evidence.map((reference) => {
    const source = resolveComparisonEvidence(reference);
    return [`${reference.entityKind}:${reference.entityId}:${reference.sourceId}`, {reference, source}] as const;
  })).values()];
  return <span className="comparison-evidence" aria-label="Sources for this statement">{unique.map(({reference, source}) => source
    ? <a href={source.url} target="_blank" rel="noreferrer" title={`${source.authors.join(', ')} — ${source.title}`} key={`${reference.entityId}-${reference.sourceId}`}>{entityName(reference.entityKind, reference.entityId)} source<span className="sr-only">: {source.title} (opens external site)</span></a>
    : <span className="missing-evidence" key={`${reference.entityId}-${reference.sourceId}`}>Source unavailable</span>)}</span>;
}

function Claim({statement, as = 'p'}: {statement: ComparisonStatement; as?: 'p' | 'div'}) {
  const Tag = as;
  return <Tag>{statement.text}<EvidenceLinks statement={statement}/></Tag>;
}

function ComparisonDossier({casefile, leftId, rightId, href}: {
  casefile: ComparisonCasefile;
  leftId: string;
  rightId: string;
  href: RouteHref;
}) {
  const byId = casefile.kind === 'branch' ? branchById : philosopherById;
  const left = byId(leftId)! as Entity;
  const right = byId(rightId)! as Entity;
  const evidence = collectEvidence(casefile);

  return <section className="comparison-casefile" aria-label={`Authored comparison of ${left.name} and ${right.name}`}>
    <div className="comparison-casefile-hero">
      <ParticipantIdentity entity={left} position="First participant" href={href}/>
      <div className="comparison-shared-question"><Scale/><span>Shared question</span><h2>{casefile.sharedQuestion.text}</h2><EvidenceLinks statement={casefile.sharedQuestion}/></div>
      <ParticipantIdentity entity={right} position="Second participant" href={href}/>
    </div>

    <div className="comparison-orientation">
      <article><History/><div><span>Historical relationship</span><Claim statement={casefile.historicalRelationship}/></div></article>
      <article><ShieldCheck/><div><span>Shared assumptions</span>{casefile.sharedAssumptions.map((item) => <Claim statement={item} key={item.text}/>)}</div></article>
    </div>

    <section className="comparison-section comparison-axes">
      <header><span>Central disagreements</span><h2>Where the answers divide</h2><p>Each axis holds the same question steady while keeping the participants’ answers attached to the correct side.</p></header>
      <div>{casefile.axes.map((axis) => {
        const leftPosition = axis.positions.find(({entityId}) => entityId === leftId);
        const rightPosition = axis.positions.find(({entityId}) => entityId === rightId);
        return <article className="comparison-axis" key={axis.label}>
          <div className="comparison-axis-question"><span>{axis.label}</span><Claim statement={axis.question}/></div>
          <div className="comparison-position" style={{'--accent': left.color} as React.CSSProperties}><b>{left.name}</b>{leftPosition && <Claim statement={leftPosition.claim}/>}</div>
          <div className="comparison-position" style={{'--accent': right.color} as React.CSSProperties}><b>{right.name}</b>{rightPosition && <Claim statement={rightPosition.claim}/>}</div>
          <div className="comparison-contrast"><b>Exact contrast</b><Claim statement={axis.contrast}/></div>
        </article>;
      })}</div>
    </section>

    <section className="comparison-section comparison-terms">
      <header><Languages/><div><span>Terminology</span><h2>Similar words are not interchangeable</h2></div></header>
      <div>{casefile.terminology.map((item) => <article key={item.topic}><h3>{item.topic}</h3><div className="comparison-term-grid">{[leftId, rightId].map((id) => {
        const position = item.positions.find(({entityId}) => entityId === id);
        return position ? <div key={id}><span>{entityName(casefile.kind, id)}</span><b>{position.term}</b><Claim statement={position.explanation}/></div> : null;
      })}</div>{item.warning && <div className="comparison-warning"><AlertTriangle size={15}/><Claim statement={item.warning}/></div>}</article>)}</div>
    </section>

    <section className="comparison-section comparison-arguments">
      <header><span>Strongest arguments</span><h2>Read each position at full strength</h2></header>
      <div>{[leftId, rightId].map((id) => <div className="argument-column" key={id}><h3>{entityName(casefile.kind, id)}</h3>{casefile.arguments.filter(({entityId}) => entityId === id).map((argument) => <article key={argument.title}><b>{argument.title}</b><Claim statement={argument.summary}/>{argument.pressure && <div className="argument-pressure"><span>Pressure point</span><Claim statement={argument.pressure}/></div>}</article>)}</div>)}</div>
    </section>

    <section className="comparison-section comparison-reading">
      <header><BookOpen/><div><span>Important texts</span><h2>Continue with the arguments themselves</h2></div></header>
      <div>{casefile.readings.map((reading) => <article key={`${reading.entityId}-${reading.title}`}><span>{reading.kind} · {reading.stage}</span><h3>{reading.author}, <cite>{reading.title}</cite></h3><Claim statement={reading.whyHere}/></article>)}</div>
    </section>

    <section className="comparison-limits">
      <AlertTriangle/><div><span>Interpretive limits</span><h2>What this comparison cannot settle</h2>{casefile.interpretiveLimits.map((limit) => <Claim statement={limit} key={limit.text}/>)}</div>
    </section>

    {!!casefile.followOns.length && <section className="comparison-followons"><span>Useful next comparisons</span><div>{casefile.followOns.map((followOn) => <a href={href(followOn.kind === 'branch'
      ? {kind: 'compare-branches', leftId: followOn.participantIds[0], rightId: followOn.participantIds[1]}
      : {kind: 'compare-philosophers', leftId: followOn.participantIds[0], rightId: followOn.participantIds[1]})} key={followOn.label}><b>{followOn.label}</b><span>{followOn.reason.text}</span><ArrowRight size={15}/></a>)}</div></section>}

    <details className="comparison-source-register"><summary>Evidence register · {evidence.length} reviewed article sources</summary><ol>{evidence.map(({reference, source}) => <li key={`${reference.entityKind}-${reference.entityId}-${reference.sourceId}`}><span>{entityName(reference.entityKind, reference.entityId)}</span>{source ? <a href={source.url} target="_blank" rel="noreferrer"><b>{source.authors.join(', ')}</b> — <cite>{source.title}</cite><span className="sr-only"> (opens external site)</span></a> : <b>Missing registered source: {reference.sourceId}</b>}</li>)}</ol></details>
  </section>;
}

function collectEvidence(casefile: ComparisonCasefile) {
  const references = new Map<string, ComparisonEvidenceRef>();
  const visit = (value: unknown) => {
    if (!value || typeof value !== 'object') return;
    if ('entityKind' in value && 'entityId' in value && 'sourceId' in value) {
      const reference = value as ComparisonEvidenceRef;
      references.set(`${reference.entityKind}:${reference.entityId}:${reference.sourceId}`, reference);
      return;
    }
    for (const child of Array.isArray(value) ? value : Object.values(value)) visit(child);
  };
  visit(casefile);
  return [...references.values()].map((reference) => ({reference, source: resolveComparisonEvidence(reference)}));
}

function ResponsibleFallback({left, right, href}: {left: Entity; right: Entity; href: RouteHref}) {
  return <section className="comparison-fallback" aria-label="Comparison reading guide">
    <div className="comparison-fallback-note"><AlertTriangle/><div><span>No authored casefile for this pair yet</span><h2>Keep the comparison responsible</h2><p>The Atlas will not manufacture a shared position or historical relationship. Start with each reviewed article, identify one precise question in both, and distinguish a documented relationship from a retrospective conceptual comparison.</p></div></div>
    <div className="comparison-fallback-grid">
      <ParticipantIdentity entity={left} position="First participant" href={href}/>
      <ParticipantIdentity entity={right} position="Second participant" href={href}/>
    </div>
    <ol className="comparison-method"><li><b>Hold one question steady.</b><span>Do not compare whole traditions or careers as if each had one doctrine.</span></li><li><b>Translate cautiously.</b><span>Apparent equivalents may carry different textual, institutional, or practical roles.</span></li><li><b>Name the relationship.</b><span>Direct debate, reception, shared context, and conceptual comparison are different claims.</span></li><li><b>Preserve disagreement within each side.</b><span>Schools, corpora, and later receptions are rarely internally uniform.</span></li></ol>
  </section>;
}
