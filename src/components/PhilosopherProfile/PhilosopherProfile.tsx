import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowRight,BookOpen,Clock3,GitCompareArrows,GitBranch,HelpCircle,Landmark,Link2,Network,Search,Scale,UserRound} from 'lucide-react';
import {philosophers,philosopherById} from '../../data/philosophers';
import {branchById} from '../../data/branches';
import {PageHead} from '../BigHistory/BigHistoryView';
import {PhilosopherPortrait} from '../PhilosopherPortrait/PhilosopherPortrait';
import {ArticleBody,ArticleToc} from '../Article/ArticleBody';
import type {BranchMembershipStatus,Philosopher,ReadingEntry} from '../../types/philosophy';
import {DEFAULT_PHILOSOPHER_COMPARISON,type PhilosopherRoute,type RouteHref} from '../../routing/routes';
import {useArticleSection} from '../../routing/useArticleSection';

export function PhilosopherProfile({route,href}:{route:PhilosopherRoute;href:RouteHref}){
  const[q,setQ]=useState('');
  const listRef=useRef<HTMLDivElement>(null);
  const activeRef=useRef<HTMLAnchorElement>(null);
  const list=useMemo(()=>{const needle=q.toLowerCase();return philosophers.filter(p=>`${p.name} ${p.tradition} ${p.mainIdeas.join(' ')}`.toLowerCase().includes(needle))},[q]);
  const p=philosopherById(route.philosopherId)??philosophers[0];
  const displayDate=p.dateDisplay??p.lifespan;
  const comparePartner=p.id===DEFAULT_PHILOSOPHER_COMPARISON.leftId?DEFAULT_PHILOSOPHER_COMPARISON.rightId:DEFAULT_PHILOSOPHER_COMPARISON.leftId;
  useEffect(()=>setQ(''),[route.philosopherId]);
  useEffect(()=>{
    const listElement=listRef.current;const active=activeRef.current;if(!listElement||!active)return;
    const listRect=listElement.getBoundingClientRect();const activeRect=active.getBoundingClientRect();
    const centerDelta=(activeRect.top+activeRect.height/2)-(listRect.top+listRect.height/2);
    listElement.scrollTo({top:listElement.scrollTop+centerDelta,behavior:'auto'});
  },[route.philosopherId,q]);
  useArticleSection(route);
  const image=p.image;
  return <div className="page philosopher-atlas-page compact-content-page"><PageHead eyebrow="Thinkers in context" title="Philosopher Profiles" text="Biographies, questions, works, and influence routes show how a thinker changed the conversation."/>
    <div className="profiles-layout"><aside className="profile-list"><label><Search size={15}/><input aria-label="Search philosophers" value={q} onChange={e=>setQ(e.target.value)} placeholder="Find a thinker, tradition, or idea…"/></label><div className="profile-list-scroll" ref={listRef}>{list.map(x=><a ref={p.id===x.id?activeRef:undefined} className={`selectable-card ${p.id===x.id?'active is-selected':''}`} key={x.id} href={href({kind:'philosopher',philosopherId:x.id})} aria-current={p.id===x.id?'page':undefined}><PhilosopherPortrait philosopher={x}/><span><b>{x.name}</b><small>{x.dateDisplay??x.lifespan} · {x.tradition}</small></span><ArrowRight size={13}/></a>)}</div></aside>
      <article className={`profile-detail deep-profile ${p.articleSections?'article-page':''}`} style={{'--accent':p.color} as React.CSSProperties}>
        <div className="profile-hero"><PhilosopherPortrait philosopher={p} size="large"/><div><div className="eyebrow">{p.region} · {p.tradition}</div><h1>{p.name}</h1><p>{displayDate}</p>{p.dateConfidence&&<small className="image-credit">Date confidence: {p.dateConfidence}</small>}{image?.url&&<small className="image-credit">{image.credit}{image.license?` · ${image.license}`:''}</small>}</div></div>
        <div className="profile-actions"><a className="btn btn-secondary" href={href({kind:'compare-philosophers',leftId:p.id,rightId:comparePartner})}><GitCompareArrows size={16}/> Add to compare</a>{p.primaryBranchIds[0]&&<a className="btn btn-primary" href={href({kind:'branch',branchId:p.primaryBranchIds[0]})}>Show where they fit <ArrowRight size={16}/></a>}</div>
        <section className="lead-card static-info-card"><Landmark/><div><span>Short biography</span><h2>{p.contributionSummary}</h2><p>{p.shortBio??p.beginnerExplanation}</p></div></section>
        <div className="profile-grid profile-context-grid"><section className="static-info-card"><h3><Clock3 size={14}/> Historical context</h3><p>{p.historicalContext}</p></section><section className="static-info-card"><h3><HelpCircle size={14}/> Central problem</h3><p>{p.centralQuestions?.[0]??p.beginnerExplanation}</p></section>{p.dateNote&&<section className="static-info-card"><h3><Clock3 size={14}/> Dating note</h3><p>{p.dateNote}</p></section>}</div>
        {p.articleSections?<>
          <ArticleToc label={p.name} route={route} href={href}/>
          <ArticleBody sections={p.articleSections} href={href}/>
          <ArticleReference id="profile-reading" title="How to start reading"><div className="depth-columns"><ReadingRoute title="Begin here" items={p.beginnerReadingPath}/><ReadingRoute title="Continue deeper" items={p.advancedReadingPath}/></div></ArticleReference>
          <ArticleReference id="profile-branches" title="Atlas connections"><BranchConnectionList philosopher={p} href={href}/></ArticleReference>
          {p.sourceLinks&&p.sourceLinks.length>0&&<ArticleReference id="profile-sources" title="Sources and further reference">{p.sourceLinks.map(link=><a className="source-link" href={link.url} key={link.url} target="_blank" rel="noreferrer"><span><b>{link.label}</b><small>{link.type}{link.notes?` · ${link.notes}`:''}</small></span><ArrowRight size={13}/></a>)}</ArticleReference>}
        </>:<>
        <DepthSection id="profile-life" title="Biography and intellectual development" icon={<UserRound/>} open><div className="prose-stack">{(p.extendedBio??[p.lifeStory]).map(text=><p key={text}>{text}</p>)}</div>{p.lifeEvents&&<div className="mini-timeline">{p.lifeEvents.map(event=><div key={`${event.label}-${event.year??event.approximateYear}`}><b>{event.year??event.approximateYear??'Approx.'}</b><span><strong>{event.label}</strong>{event.description}</span></div>)}</div>}{p.intellectualDevelopment&&<ol className="reading-list">{p.intellectualDevelopment.map(item=><li key={item}>{item}</li>)}</ol>}</DepthSection>
        <DepthSection id="profile-ideas" title="Central questions and major ideas" icon={<Network/>} open><div className="question-grid">{p.centralQuestions?.map((question,index)=><div className="number-card static-info-card" key={question}><span>{String(index+1).padStart(2,'0')}</span><h3>{question}</h3></div>)}</div><div className="deep-idea-grid">{p.majorIdeasDetailed?.map(idea=><article className="static-info-card" key={idea.name}><h3>{idea.name}</h3><p>{idea.explanation}</p><small>{idea.whyItMatters}</small></article>)}</div></DepthSection>
        <DepthSection id="profile-influence" title="Influence and interpretive tensions" icon={<Network/>}><div className="depth-columns"><div><h3>Influences received</h3><ul className="clean-list">{p.influencesReceived?.map(item=><li key={item}>{item}</li>)}</ul></div><div><h3>Influence on later thought</h3><ul className="clean-list">{p.influenceOnLaterThought?.map(item=><li key={item}>{item}</li>)}</ul></div></div>{p.controversiesOrInterpretiveTensions?.map(item=><p className="interpretive-note" key={item}><Scale size={14}/>{item}</p>)}{p.commonMisunderstandings&&<div className="misunderstanding-panel"><h3>Common beginner misunderstandings</h3>{p.commonMisunderstandings.map(item=><p key={item}>{item}</p>)}</div>}</DepthSection>
        <DepthSection id="profile-works" title="Works and reading paths" icon={<BookOpen/>} open><div className="deep-work-grid">{p.keyWorksDetailed?.map(work=><article className="static-info-card" key={work.title}><div className="eyebrow">{work.year??work.approximateYear??'Major work'}</div><h3>{work.title}</h3><p>{work.summary}</p><small>{work.whyItMatters}</small></article>)}</div><div className="depth-columns"><ReadingRoute title="Begin here" items={p.beginnerReadingPath}/><ReadingRoute title="Continue deeper" items={p.advancedReadingPath}/></div></DepthSection>
        <DepthSection id="profile-branches" title="Branches in the atlas" icon={<GitBranch/>}><BranchConnectionList philosopher={p} href={href}/></DepthSection>
        {p.sourceLinks&&p.sourceLinks.length>0&&<DepthSection id="profile-sources" title="Sources and further reference" icon={<Link2/>}>{p.sourceLinks.map(link=><a className="source-link" href={link.url} key={link.url} target="_blank" rel="noreferrer"><span><b>{link.label}</b><small>{link.type}{link.notes?` · ${link.notes}`:''}</small></span><ArrowRight size={13}/></a>)}</DepthSection>}
        </>}
      </article>
    </div>
  </div>;
}

function DepthSection({id,title,icon,open=false,children}:{id?:string;title:string;icon:React.ReactNode;open?:boolean;children:React.ReactNode}){return <details id={id} className="depth-section" open={open}><summary><span>{icon}<b>{title}</b></span><small>Expand exhibit</small></summary><div className="depth-section-body">{children}</div></details>}
function ArticleReference({id,title,children}:{id:string;title:string;children:React.ReactNode}){return <section id={id} className="article-reference"><h2>{title}</h2>{children}</section>}
const membershipLabels:Record<BranchMembershipStatus,string>={founder:'Founder',central:'Central figure',major:'Major figure',canonical:'Canonical figure',commentator:'Commentator','school-systematizer':'School systematizer',precursor:'Precursor',associated:'Associated',critic:'Critic',disputed:'Disputed label','self-rejected-label':'Self-rejected label',influence:'Influence','later-reception':'Later reception'};
function BranchConnectionList({philosopher,href}:{philosopher:Philosopher;href:RouteHref}){
  const items=philosopher.branchMemberships?.length?philosopher.branchMemberships.map(item=>({branchId:item.branchId,summary:item.note??philosopher.branchContributions?.find(contribution=>contribution.branchId===item.branchId)?.summary??philosopher.contributionSummary,status:item.status})):philosopher.branchContributions?.map(item=>({branchId:item.branchId,summary:item.summary,status:undefined}));
  return <div className="branch-contribution-list">{items?.map(item=><a className="selectable-card" key={item.branchId} href={href({kind:'branch',branchId:item.branchId})}><span className="branch-dot" style={{background:branchById(item.branchId)?.color}}/><span><b>{branchById(item.branchId)?.name}</b><small>{item.status?`${membershipLabels[item.status]} — ${item.summary}`:item.summary}</small></span><ArrowRight size={13}/></a>)}</div>;
}
function ReadingRoute({title,items=[]}:{title:string;items?:ReadingEntry[]}){return <div><h3>{title}</h3>{items.length?<ol className="structured-reading-list">{items.map(item=><li key={`${item.author}-${item.title}`}>{item.sourceUrl||item.publicDomainUrl?<a href={item.sourceUrl??item.publicDomainUrl} target="_blank" rel="noreferrer"><b>{item.title}</b></a>:<b>{item.title}</b>}<span>{item.author} · {item.difficulty} · {item.type}</span><p>{item.whyRead}</p></li>)}</ol>:<p className="muted-note">No additional route has been curated yet.</p>}</div>}
