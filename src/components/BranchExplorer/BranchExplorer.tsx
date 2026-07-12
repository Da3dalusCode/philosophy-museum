import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowRight,BookOpen,Clock3,Compass,Lightbulb,Link2,Network,Quote,Scale,Search,Sparkles,Users} from 'lucide-react';
import {branches,branchById} from '../../data/branches';
import {philosopherById} from '../../data/philosophers';
import {PhilosopherPortrait} from '../PhilosopherPortrait/PhilosopherPortrait';
import {ArticleBody,ArticleToc} from '../Article/ArticleBody';
import type {ReadingEntry} from '../../types/philosophy';
import type {BranchRoute,RouteHref} from '../../routing/routes';
import {useArticleSection} from '../../routing/useArticleSection';

export function BranchExplorer({route,href}:{route:BranchRoute;href:RouteHref}){
  const[q,setQ]=useState('');
  const listRef=useRef<HTMLDivElement>(null);
  const activeRef=useRef<HTMLAnchorElement>(null);
  const branchList=useMemo(()=>{const needle=q.toLowerCase();return branches.filter(branch=>`${branch.name} ${branch.category} ${branch.shortDefinition}`.toLowerCase().includes(needle))},[q]);
  const b=branchById(route.branchId)??branches[0];
  useEffect(()=>setQ(''),[route.branchId]);
  useEffect(()=>{
    const list=listRef.current;const active=activeRef.current;if(!list||!active)return;
    const listRect=list.getBoundingClientRect();const activeRect=active.getBoundingClientRect();
    const centerDelta=(activeRect.top+activeRect.height/2)-(listRect.top+listRect.height/2);
    list.scrollTo({top:list.scrollTop+centerDelta,behavior:'auto'});
  },[route.branchId,q]);
  useArticleSection(route);
  return <div className="explorer"><aside className="branch-sidebar"><div className="branch-index-intro"><div className="eyebrow">The branch index</div><h2>Choose a lens</h2><p>Branches are conversations organized around durable questions.</p><label><Search size={14}/><input aria-label="Search branches" value={q} onChange={event=>setQ(event.target.value)} placeholder="Find a branch or question…"/></label></div><div className="branch-list" ref={listRef}>{branchList.map(x=><a ref={x.id===b.id?activeRef:undefined} key={x.id} className={`selectable-card ${x.id===b.id?'active is-selected':''}`} href={href({kind:'branch',branchId:x.id})} aria-current={x.id===b.id?'page':undefined}><i style={{background:x.color}}/>{x.name}<small>{x.category}</small></a>)}</div></aside>
    <article className={`branch-page deep-branch-page ${b.articleSections?'article-page':''}`} style={{'--accent':b.color} as React.CSSProperties}>
      <section className="branch-hero"><div><div className="eyebrow"><Compass size={15}/>{b.category} · atlas anchor {b.roughStartYear<0?`c. ${Math.abs(b.roughStartYear)} BCE`:b.roughStartYear}</div><h1>{b.name}</h1><p className="purpose">{b.oneSentencePurpose}</p><div className="hero-actions"><a className="btn btn-primary" href={href({...route,section:b.articleSections?.[0]?.id})}>Begin with the questions <ArrowRight size={16}/></a>{b.contrastingBranchIds[0]&&<a className="btn btn-ghost" href={href({kind:'compare-branches',leftId:b.id,rightId:b.contrastingBranchIds[0]})}><Scale size={16}/> Compare a rival</a>}</div></div><div className="orb"><Sparkles size={34}/><span>{b.category}</span></div></section>
      <section className="lead-card static-info-card"><Quote/><div><span>Origin story</span><h2>{b.coreQuestions[0]}</h2><p>{b.originStory??b.beginnerExplanation}</p></div></section>
      {b.articleSections?<>
        <ArticleToc label={b.name} route={route} href={href}/>
        <ArticleBody sections={b.articleSections} href={href}/>
        <section id="branch-quick-reference" className="article-reference"><SectionTitle icon={<Network/>} kicker="Quick reference" title="Concepts and people"/><div className="deep-idea-grid">{b.keyConceptsDetailed?.map(concept=><article className="static-info-card" key={concept.name}><h3>{concept.name}</h3><p>{concept.explanation}</p><small>{concept.whyItMatters}</small></article>)}</div><div className="people-row">{b.majorFigures?.map(id=>philosopherById(id)).filter(Boolean).map(p=><a className="selectable-card" key={p!.id} href={href({kind:'philosopher',philosopherId:p!.id})}><PhilosopherPortrait philosopher={p!}/><span><b>{p!.name}</b><small>{p!.contributionSummary}</small></span><ArrowRight size={16}/></a>)}</div></section>
        <section id="branch-reading" className="article-reference"><SectionTitle icon={<BookOpen/>} kicker="Reading path" title="Where to begin and continue"/><div className="depth-columns"><ReadingRoute title="Begin here" items={b.beginnerReadingPath}/><ReadingRoute title="Continue deeper" items={b.advancedReadingPath}/></div></section>
        {b.sourceLinks&&b.sourceLinks.length>0&&<section id="branch-sources" className="article-reference"><SectionTitle icon={<Link2/>} kicker="References" title="Sources and further reference"/>{b.sourceLinks.map(link=><a className="source-link" href={link.url} key={link.url} target="_blank" rel="noreferrer"><span><b>{link.label}</b><small>{link.type}</small></span><ArrowRight size={13}/></a>)}</section>}
      </>:<>
      <section id="questions"><SectionTitle icon={<Lightbulb/>} kicker="Start here" title="Questions that organize the branch"/><div className="question-grid">{b.coreQuestions.map((question,index)=><div className="number-card static-info-card" key={question}><span>{String(index+1).padStart(2,'0')}</span><h3>{question}</h3></div>)}</div></section>
      <section id="branch-development"><SectionTitle icon={<Clock3/>} kicker="Development" title="How the conversation changed"/><div className="development">{b.historicalDevelopmentDetailed?.map((item,index)=><div key={item}><b>{index+1}</b><p>{item}</p></div>)}</div></section>
      <section id="branch-concepts"><SectionTitle icon={<Network/>} kicker="Vocabulary" title="Concepts that unlock the argument"/><div className="deep-idea-grid">{b.keyConceptsDetailed?.map(concept=><article className="static-info-card" key={concept.name}><h3>{concept.name}</h3><p>{concept.explanation}</p><small>{concept.whyItMatters}</small></article>)}</div></section>
      <section id="branch-figures"><SectionTitle icon={<Users/>} kicker="People in the atlas" title="Thinkers who moved it forward"/><div className="people-row">{b.majorFigures?.map(id=>philosopherById(id)).filter(Boolean).map(p=><a className="selectable-card" key={p!.id} href={href({kind:'philosopher',philosopherId:p!.id})}><PhilosopherPortrait philosopher={p!}/><span><b>{p!.name}</b><small>{p!.contributionSummary}</small></span><ArrowRight size={16}/></a>)}</div></section>
      <BranchDepth id="branch-works" title="Major works" icon={<BookOpen/>} open><div className="deep-work-grid">{b.majorWorks?.map(work=><article className="static-info-card" key={work.title}><h3>{work.title}</h3><p>{work.summary}</p><small>{work.whyItMatters}</small></article>)}</div></BranchDepth>
      <BranchDepth title="Internal debates and rival positions" icon={<Scale/>}><div className="depth-columns"><div><h3>Internal debates</h3>{b.internalDebates?.map(item=><p className="interpretive-note" key={item}><Scale size={14}/>{item}</p>)}</div><div><h3>Rivals and neighboring positions</h3>{b.rivalPositions?.map(id=>branchById(id)?<a className="tag-clickable" key={id} href={href({kind:'branch',branchId:id})}>{branchById(id)?.name??id}<ArrowRight size={12}/></a>:null)}</div></div></BranchDepth>
      <BranchDepth id="branch-reading" title="Recommended reading routes" icon={<BookOpen/>} open><div className="depth-columns"><ReadingRoute title="Begin here" items={b.beginnerReadingPath}/><ReadingRoute title="Continue deeper" items={b.advancedReadingPath}/></div></BranchDepth>
      <section className="two-col"><div><SectionTitle icon={<Sparkles/>} kicker="In ordinary life" title="Modern relevance"/><ul className="clean-list">{b.modernRelevanceDetailed?.map(item=><li key={item}>{item}</li>)}</ul></div><div><SectionTitle icon={<Lightbulb/>} kicker="Clear the fog" title="Common misunderstandings"/><div className="misunderstandings">{b.misconceptionsDetailed?.map(item=><p key={item}>{item}</p>)}</div></div></section>
      {b.sourceLinks&&b.sourceLinks.length>0&&<BranchDepth title="Sources and further reference" icon={<Link2/>}>{b.sourceLinks.map(link=><a className="source-link" href={link.url} key={link.url} target="_blank" rel="noreferrer"><span><b>{link.label}</b><small>{link.type}</small></span><ArrowRight size={13}/></a>)}</BranchDepth>}
      </>}
    </article>
  </div>;
}

function SectionTitle({icon,kicker,title}:{icon:React.ReactNode;kicker:string;title:string}){return <div className="section-title"><span>{icon}</span><div><small>{kicker}</small><h2>{title}</h2></div></div>}
function BranchDepth({id,title,icon,open=false,children}:{id?:string;title:string;icon:React.ReactNode;open?:boolean;children:React.ReactNode}){return <details id={id} className="depth-section branch-depth-section" open={open}><summary><span>{icon}<b>{title}</b></span><small>Expand exhibit</small></summary><div className="depth-section-body">{children}</div></details>}
function ReadingRoute({title,items=[]}:{title:string;items?:ReadingEntry[]}){return <div><h3>{title}</h3>{items.length?<ol className="structured-reading-list">{items.map(item=><li key={`${item.author}-${item.title}`}>{item.sourceUrl||item.publicDomainUrl?<a href={item.sourceUrl??item.publicDomainUrl} target="_blank" rel="noreferrer"><b>{item.title}</b></a>:<b>{item.title}</b>}<span>{item.author} · {item.difficulty} · {item.type}</span><p>{item.whyRead}</p></li>)}</ol>:<p className="muted-note">No additional route has been curated yet.</p>}</div>}
