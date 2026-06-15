import {ArrowRight,BookOpen,GitBranch,Users} from 'lucide-react';
import {branchById} from '../../data/branches';
import {philosopherById} from '../../data/philosophers';
import type {ArticleSection} from '../../types/philosophy';

export function ArticleBody({sections,onBranch,onPhilosopher}:{sections:ArticleSection[];onBranch:(id:string)=>void;onPhilosopher:(id:string)=>void}){
  return <div className="reference-article">
    {sections.map((section,index)=><section className="article-section" id={`article-${section.id}`} key={section.id}>
      <header><span>{String(index+1).padStart(2,'0')}</span><h2>{section.title}</h2></header>
      <div className="article-prose">{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
      {(section.relatedBranchIds?.length||section.relatedPhilosopherIds?.length||section.relatedWorkTitles?.length)?<aside className="article-connections" aria-label={`Connections for ${section.title}`}>
        {section.relatedBranchIds&&section.relatedBranchIds.length>0&&<div><b><GitBranch size={12}/> Related branches</b>{section.relatedBranchIds.map(id=>branchById(id)?<button onClick={()=>onBranch(id)} key={id}>{branchById(id)?.name}<ArrowRight size={11}/></button>:null)}</div>}
        {section.relatedPhilosopherIds&&section.relatedPhilosopherIds.length>0&&<div><b><Users size={12}/> Related thinkers</b>{section.relatedPhilosopherIds.map(id=>philosopherById(id)?<button onClick={()=>onPhilosopher(id)} key={id}>{philosopherById(id)?.name}<ArrowRight size={11}/></button>:null)}</div>}
        {section.relatedWorkTitles&&section.relatedWorkTitles.length>0&&<div><b><BookOpen size={12}/> Works in this section</b><p>{section.relatedWorkTitles.join(' · ')}</p></div>}
      </aside>:null}
    </section>)}
  </div>;
}

export function ArticleToc({label,sections,extras=[]}:{label:string;sections:ArticleSection[];extras?:{id:string;label:string}[]}){
  return <nav className="article-toc" aria-label={`${label} table of contents`}><div><span>Contents</span><b>{label}</b></div>{sections.map((section,index)=><a href={`#article-${section.id}`} key={section.id}><small>{String(index+1).padStart(2,'0')}</small>{section.title}</a>)}{extras.map(item=><a href={`#${item.id}`} key={item.id}><small>+</small>{item.label}</a>)}</nav>;
}
