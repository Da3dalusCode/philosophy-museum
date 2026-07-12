import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowRight,BookOpen,ChevronLeft,ChevronRight,Filter,GitBranch,HelpCircle,Landmark,Minus,MoveHorizontal,Network,Plus,RotateCcw,Search,UserRound,X,XCircle} from 'lucide-react';
import {branches,branchById} from '../../data/branches';
import {philosopherById} from '../../data/philosophers';
import {timelineEvents} from '../../data/timelineEvents';
import {wallInfluences,wallPeriods,wallSchools,wallWorks} from '../../data/wallChart';
import type {TimelineEvent} from '../../types/philosophy';
import type {WallInfluenceKind,WallSchool,WallWork} from '../../data/wallChart';
import type {RouteHref} from '../../routing/routes';
import {PhilosopherPortrait} from '../PhilosopherPortrait/PhilosopherPortrait';

export const WALL_WIDTH=6200;
const YEAR_MIN=-700;
const YEAR_MAX=2026;
const AXIS_HEIGHT=92;
const MAX_ROW=13;
const ticks=[-700,-600,-500,-400,-300,-200,-100,0,200,400,600,800,1000,1200,1400,1500,1600,1700,1800,1850,1900,1925,1950,1975,2000,2025];
const relationLabels:Record<WallInfluenceKind,string>={'influenced':'influenced','develops-into':'develops into','reacts-against':'reacts against','overlaps-with':'overlaps with','revives-transforms':'revives / transforms'};
const relationColors:Record<WallInfluenceKind,string>={'influenced':'#b89add','develops-into':'#69b99c','reacts-against':'#d57862','overlaps-with':'#729edb','revives-transforms':'#d3a65c'};
type WallMode='overview'|'schools'|'philosophers'|'influence'|'works';
type Density='comfortable'|'compact';
type ItemType='all'|'school'|'philosopher'|'work'|'event';
type Selected={type:'school'|'philosopher'|'work'|'event';id:string}|null;
const ZOOM_MIN=.2;
const ZOOM_MAX=1.5;
const ZOOM_STEP=.05;

export const formatWallYear=(year:number,approximate=false)=>`${approximate?'c. ':''}${year<0?`${Math.abs(year)} BCE`:year}`;
export const wallYearX=(year:number)=>80+((year-YEAR_MIN)/(YEAR_MAX-YEAR_MIN))*(WALL_WIDTH-160);

const modeOptions:{id:WallMode;label:string;description:string}[]=[
  {id:'overview',label:'Overview',description:'Balanced wall chart'},
  {id:'schools',label:'Schools',description:'Active traditions first'},
  {id:'philosophers',label:'Philosophers',description:'Thinkers and lifespans first'},
  {id:'influence',label:'Influence',description:'Development routes first'},
  {id:'works',label:'Works',description:'Landmark texts first'}
];

const normalize=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,' ');
const periodFor=(year:number)=>wallPeriods.find(period=>year>=period.start&&year<period.end);
const schoolForPhilosopher=(id:string)=>wallSchools.filter(school=>school.philosopherIds.includes(id));

export function PhilosophyWall({initialMode='overview',genealogy=false,href}:{initialMode?:WallMode;genealogy?:boolean;href:RouteHref}){
  const[mode,setMode]=useState<WallMode>(initialMode);const[density,setDensity]=useState<Density>('compact');const[zoom,setZoom]=useState<number>(1);const[query,setQuery]=useState('');const[period,setPeriod]=useState('all');const[schoolId,setSchoolId]=useState('all');const[itemType,setItemType]=useState<ItemType>('all');const[selected,setSelected]=useState<Selected>(null);const[engaged,setEngaged]=useState(false);const[containerWidth,setContainerWidth]=useState(0);
  const scrollRef=useRef<HTMLDivElement>(null);
  const zoomFrameRef=useRef<number|undefined>(undefined);
  const resizeFrameRef=useRef<number|undefined>(undefined);
  const userZoomedRef=useRef(false);
  const pointerRef=useRef<{id:number;x:number;y:number;left:number;dragged:boolean}|null>(null);
  const suppressClickRef=useRef(false);
  const rowHeight=density==='compact'?44:78;const eventRailTop=AXIS_HEIGHT+(MAX_ROW+1)*rowHeight;const canvasHeight=eventRailTop+88;
  const needle=normalize(query.trim());
  const inPeriod=(start:number,end=start)=>period==='all'||Boolean(wallPeriods.find(item=>item.name===period&&end>=item.start&&start<=item.end));
  const searchMatch=(...values:(string|undefined)[])=>!needle||normalize(values.filter(Boolean).join(' ')).includes(needle);
  const schoolMatches=(school:WallSchool)=>schoolId==='all'||school.id===schoolId;
  const visibleSchools=useMemo(()=>wallSchools.filter(school=>(itemType==='all'||itemType==='school')&&schoolMatches(school)&&inPeriod(school.startYear,school.endYear)&&searchMatch(school.name,school.summary,...school.philosopherIds.map(id=>philosopherById(id)?.name))),[itemType,schoolId,period,needle]);
  const visiblePhilosophers=useMemo(()=>wallSchools.flatMap(school=>school.philosopherIds.map(id=>({school,philosopher:philosopherById(id)}))).filter((item,index,all)=>item.philosopher&&all.findIndex(other=>other.philosopher?.id===item.philosopher?.id&&other.school.id===item.school.id)===index&&(itemType==='all'||itemType==='philosopher')&&schoolMatches(item.school)&&inPeriod(item.philosopher.birthYear,item.philosopher.deathYear??YEAR_MAX)&&searchMatch(item.philosopher.name,item.philosopher.tradition,item.philosopher.contributionSummary,...item.philosopher.keyWorks)),[itemType,schoolId,period,needle]);
  const visibleWorks=useMemo(()=>wallWorks.filter(work=>(itemType==='all'||itemType==='work')&&(schoolId==='all'||work.schoolId===schoolId)&&inPeriod(work.year)&&searchMatch(work.title,work.summary,philosopherById(work.authorId??'')?.name,...work.branchIds.map(id=>branchById(id)?.name))),[itemType,schoolId,period,needle]);
  const visibleEvents=useMemo(()=>timelineEvents.filter(event=>(itemType==='all'||itemType==='event')&&(schoolId==='all'||eventTouchesSchool(event,schoolId))&&inPeriod(event.year)&&searchMatch(event.title,event.description,...event.relatedWorkIds??[],...event.philosopherIds.map(id=>philosopherById(id)?.name),...event.branchIds.map(id=>branchById(id)?.name))),[itemType,schoolId,period,needle]);
  const visibleKeys=new Set([...visibleSchools.map(item=>`school:${item.id}`),...visiblePhilosophers.map(item=>`philosopher:${item.philosopher!.id}`),...visibleWorks.map(item=>`work:${item.id}`),...visibleEvents.map(item=>`event:${item.id}`)]);
  useEffect(()=>{if(selected&&!visibleKeys.has(`${selected.type}:${selected.id}`))setSelected(null)},[query,period,schoolId,itemType,selected]);
  useEffect(()=>{
    const scroller=scrollRef.current;if(!scroller)return;
    let previousWidth=scroller.clientWidth;
    setContainerWidth(previousWidth);
    const observer=new ResizeObserver(([entry])=>{
      const nextWidth=entry.contentRect.width;if(!nextWidth)return;
      const logicalCenter=scroller.scrollLeft+previousWidth/2;
      setContainerWidth(nextWidth);
      if(nextWidth>900)setEngaged(false);
      if(resizeFrameRef.current!==undefined)cancelAnimationFrame(resizeFrameRef.current);
      resizeFrameRef.current=requestAnimationFrame(()=>{scroller.scrollLeft=Math.max(0,logicalCenter-nextWidth/2);previousWidth=nextWidth});
    });
    observer.observe(scroller);
    return()=>{observer.disconnect();if(resizeFrameRef.current!==undefined)cancelAnimationFrame(resizeFrameRef.current)};
  },[]);
  useEffect(()=>{if(!containerWidth||userZoomedRef.current)return;setZoom(containerWidth<500?.25:containerWidth<900?.5:1)},[containerWidth]);
  useEffect(()=>{
    if(!engaged)return;
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape')setEngaged(false)};
    document.addEventListener('keydown',onKeyDown);
    return()=>document.removeEventListener('keydown',onKeyDown);
  },[engaged]);
  useEffect(()=>()=>{if(zoomFrameRef.current!==undefined)cancelAnimationFrame(zoomFrameRef.current)},[]);
  const selectedSchoolIds=selected?selectionSchools(selected):[];
  const relatedSchoolIds=new Set(selectedSchoolIds.flatMap(id=>[id,...wallInfluences.filter(line=>line.sourceId===id||line.targetId===id).flatMap(line=>[line.sourceId,line.targetId])]));
  const displayedInfluences=wallInfluences.filter(line=>(mode==='influence'||genealogy||line.curated)&&(schoolId==='all'||line.sourceId===schoolId||line.targetId===schoolId));
  const reset=()=>{setQuery('');setPeriod('all');setSchoolId('all');setItemType('all');setSelected(null)};
  const goToPeriod=(start:number)=>scrollRef.current?.scrollTo({left:Math.max(0,wallYearX(start)*zoom-100),behavior:'smooth'});
  const pan=(direction:-1|1)=>scrollRef.current?.scrollBy({left:direction*(scrollRef.current.clientWidth*.78),behavior:'smooth'});
  const setChartZoom=(next:number)=>{userZoomedRef.current=true;const clamped=Math.min(ZOOM_MAX,Math.max(ZOOM_MIN,Math.round(next*20)/20));const scroller=scrollRef.current;const center=scroller?(scroller.scrollLeft+scroller.clientWidth/2)/zoom:0;setZoom(clamped);if(zoomFrameRef.current!==undefined)cancelAnimationFrame(zoomFrameRef.current);zoomFrameRef.current=requestAnimationFrame(()=>{if(scroller)scroller.scrollLeft=Math.max(0,center*clamped-scroller.clientWidth/2)})};
  const changeZoom=(direction:-1|1)=>setChartZoom(zoom+direction*ZOOM_STEP);
  const zoomPercent=Math.round(zoom*100);
  const fitZoom=Math.max(ZOOM_MIN,Math.min(1,Math.floor(((containerWidth||WALL_WIDTH)-16)/WALL_WIDTH*20)/20));
  const toggleEngagement=()=>{if(!engaged&&zoom<1)setChartZoom(1);setEngaged(value=>!value)};
  const onPointerDown=(event:React.PointerEvent<HTMLDivElement>)=>{if(!engaged)return;pointerRef.current={id:event.pointerId,x:event.clientX,y:event.clientY,left:event.currentTarget.scrollLeft,dragged:false};suppressClickRef.current=false};
  const onPointerMove=(event:React.PointerEvent<HTMLDivElement>)=>{const pointer=pointerRef.current;if(!engaged||!pointer||pointer.id!==event.pointerId)return;const dx=event.clientX-pointer.x;const dy=event.clientY-pointer.y;if(Math.hypot(dx,dy)>7)pointer.dragged=true;if(pointer.dragged&&Math.abs(dx)>Math.abs(dy)){if(!event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.setPointerCapture(event.pointerId);event.preventDefault();event.currentTarget.scrollLeft=pointer.left-dx}};
  const endPointer=(event:React.PointerEvent<HTMLDivElement>)=>{const pointer=pointerRef.current;if(!pointer||pointer.id!==event.pointerId)return;if(pointer.dragged){suppressClickRef.current=true;window.setTimeout(()=>{suppressClickRef.current=false},0)}if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);pointerRef.current=null};
  const onChartClickCapture=(event:React.MouseEvent<HTMLDivElement>)=>{if(!suppressClickRef.current)return;event.preventDefault();event.stopPropagation();suppressClickRef.current=false};
  const empty=visibleSchools.length+visiblePhilosophers.length+visibleWorks.length+visibleEvents.length===0;
  return <section className={`philosophy-wall mode-${mode} density-${density} ${selected?'has-selection':''} ${engaged?'is-engaged':'is-passive'} ${zoom<=.3?'zoom-overview':''}`}>
    <div className="wall-intro-line static-info-card"><Landmark size={15}/><span>{genealogy?'Follow school bands and influence routes through historical time.':'Schools, thinkers, works, and influence routes share one historical wall.'}</span><details className="wall-help"><summary><HelpCircle size={14}/> How to read</summary><p>{genealogy?'Follow the colored school bands through time. Influence routes show inheritance, reaction, overlap, and revival; select a band to isolate its neighborhood.':'Time moves left to right. Colored bands show active schools, labeled spans show philosopher lifetimes, diamonds mark major works, and fine routes show curated influence.'}</p></details></div>
    <div className="wall-period-nav" aria-label="Jump to historical period">{wallPeriods.map(item=><button key={item.name} onClick={()=>goToPeriod(item.start)}><b>{item.name}</b><small>{formatWallYear(item.start)}–{formatWallYear(item.end)}</small></button>)}</div>
    <div className="wall-controls">
      <div className="wall-modes" role="group" aria-label="Wall emphasis mode">{modeOptions.map(item=><button key={item.id} aria-pressed={mode===item.id} className={mode===item.id?'active':''} onClick={()=>setMode(item.id)}><b>{item.label}</b><small>{item.description}</small></button>)}</div>
      <div className="density-control" role="group" aria-label="Timeline density"><span>Density</span><button aria-pressed={density==='comfortable'} className={density==='comfortable'?'active':''} onClick={()=>setDensity('comfortable')}>Comfortable</button><button aria-pressed={density==='compact'} className={density==='compact'?'active':''} onClick={()=>setDensity('compact')}>Compact</button></div>
    </div>
    <div className="filterbar wall-filterbar" aria-label="Wall filters"><Filter size={16}/><label className="filter-search"><Search size={15}/><input aria-label="Search wall chart" placeholder="Search philosophers, schools, works, or events..." value={query} onChange={event=>setQuery(event.target.value)}/></label><select aria-label="Filter by period" value={period} onChange={event=>setPeriod(event.target.value)}><option value="all">All periods</option>{wallPeriods.map(item=><option key={item.name}>{item.name}</option>)}</select><select aria-label="Filter by school" value={schoolId} onChange={event=>setSchoolId(event.target.value)}><option value="all">All schools</option>{wallSchools.map(item=><option value={item.id} key={item.id}>{item.name}</option>)}</select><select aria-label="Filter by item type" value={itemType} onChange={event=>setItemType(event.target.value as ItemType)}><option value="all">All item types</option><option value="school">School / branch</option><option value="philosopher">Philosopher</option><option value="work">Major work</option><option value="event">Event / debate</option></select><button className="btn btn-ghost" onClick={reset}><RotateCcw size={15}/> Reset</button></div>
    <div className="wall-legend static-info-card"><span className="legend-band">School active period</span><span className="legend-person">Philosopher lifespan</span><span className="legend-work">◆ Major work</span>{Object.entries(relationLabels).map(([kind,label])=><span className="wall-relation-key" key={kind}><i style={{background:relationColors[kind as WallInfluenceKind]}}/>{label}</span>)}</div>
    {empty?<div className="empty-state static-info-card"><XCircle/><h2>No wall-chart items match</h2><p>Broaden the search or reset the period, school, and type filters.</p><button className="btn btn-secondary" onClick={reset}><RotateCcw size={15}/> Reset filters</button></div>:<>
      <div className="wall-viewport-tools" aria-label="Chart viewport controls"><div className="wall-pan-controls"><button className="btn btn-ghost" onClick={()=>pan(-1)} aria-label="Scroll chart left"><ChevronLeft size={15}/> Earlier</button><span>Drag the scrollbar or pan through time</span><button className="btn btn-ghost" onClick={()=>pan(1)} aria-label="Scroll chart right">Later <ChevronRight size={15}/></button></div><div className="wall-zoom-controls"><span className="zoom-value">Zoom: <b>{zoomPercent}%</b></span><button className="btn btn-ghost" disabled={zoom<=ZOOM_MIN} onClick={()=>changeZoom(-1)} aria-label="Zoom chart out"><Minus size={14}/></button><input aria-label="Chart zoom percentage" type="range" min={ZOOM_MIN*100} max={ZOOM_MAX*100} step={ZOOM_STEP*100} value={zoomPercent} onChange={event=>setChartZoom(Number(event.target.value)/100)}/><button className="btn btn-ghost" disabled={zoom>=ZOOM_MAX} onClick={()=>changeZoom(1)} aria-label="Zoom chart in"><Plus size={14}/></button><div className="zoom-presets" role="group" aria-label="Zoom presets"><button aria-pressed={zoom===fitZoom} onClick={()=>setChartZoom(fitZoom)}>Fit</button><button aria-pressed={zoom===.5} onClick={()=>setChartZoom(.5)}>50%</button><button aria-pressed={zoom===1} onClick={()=>setChartZoom(1)}>100%</button><button aria-pressed={zoom===1.5} onClick={()=>setChartZoom(1.5)}>150%</button></div><button className="btn btn-ghost" disabled={zoom===fitZoom} onClick={()=>setChartZoom(fitZoom)}><RotateCcw size={13}/> Fit chart</button><small>Low zoom shows structure; zoom in to read.</small></div></div>
      <div className="wall-touch-gate" role="group" aria-label="Mobile chart interaction"><div><MoveHorizontal size={18}/><span><b>{engaged?'Timeline exploration is on':'Explore the timeline intentionally'}</b><small>{engaged?'Drag sideways to move through time. Vertical swipes still move the page.':'Page scrolling stays available until you engage the chart.'}</small></span></div><button className="btn btn-primary" type="button" aria-pressed={engaged} onClick={toggleEngagement}>{engaged?<><X size={16}/> Exit exploration</>:<><MoveHorizontal size={16}/> Explore timeline</>}</button></div>
      <p className="sr-only" id="wall-chart-description">A horizontally arranged timeline of philosophical schools, thinkers, works, and historical events. Use the chart controls to fit, zoom, or move earlier and later. On a phone, engage timeline exploration before dragging sideways.</p>
      <div className="wall-chart-shell">
      <div className="wall-side-labels" aria-hidden="true"><div className="wall-side-axis" style={{height:AXIS_HEIGHT*zoom}}><b>Timeline of schools & thinkers</b><small>{density==='compact'?'Compact atlas plate':'Comfortable exhibit view'}</small></div>{Array.from({length:MAX_ROW+1},(_,row)=><div key={row} style={{height:rowHeight*zoom}}><small>{rowLabel(row)}</small></div>)}<div className="wall-event-label" style={{height:88*zoom}}><b>Historical turns</b><small>Debates, transitions, and context</small></div></div>
      <div className="wall-scroll" ref={scrollRef} tabIndex={0} aria-label="Scrollable Philosophy Wall chart" aria-describedby="wall-chart-description" aria-roledescription="interactive timeline" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endPointer} onPointerCancel={endPointer} onClickCapture={onChartClickCapture}><div className="wall-zoom-stage" style={{width:WALL_WIDTH*zoom,height:canvasHeight*zoom}}><div className="wall-canvas" style={{width:WALL_WIDTH,height:canvasHeight,transform:`scale(${zoom})`}}>
        <div className="wall-axis">{wallPeriods.map(periodItem=><div className="wall-period" key={periodItem.name} style={{left:wallYearX(periodItem.start),width:wallYearX(periodItem.end)-wallYearX(periodItem.start)}}><b>{periodItem.name}</b></div>)}{ticks.map(year=><div className="wall-tick" key={year} style={{left:wallYearX(year)}}><span>{formatWallYear(year)}</span></div>)}</div>
        {Array.from({length:MAX_ROW+1},(_,row)=><div className="wall-row" key={row} style={{top:AXIS_HEIGHT+row*rowHeight,height:rowHeight}}>{ticks.map(year=><i key={year} style={{left:wallYearX(year)}}/>)}</div>)}
        <svg className="wall-influences" width={WALL_WIDTH} height={canvasHeight} aria-hidden="true"><defs>{Object.entries(relationColors).map(([kind,color])=><marker id={`wall-arrow-${kind}`} key={kind} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill={color}/></marker>)}</defs>{displayedInfluences.map(line=><InfluenceLine key={line.id} line={line} rowHeight={rowHeight} selectedSchoolIds={selectedSchoolIds}/>)}</svg>
        {visibleSchools.map(school=><SchoolBand key={school.id} school={school} rowHeight={rowHeight} selected={selected?.type==='school'&&selected.id===school.id} dimmed={Boolean(selected)&&!relatedSchoolIds.has(school.id)} onClick={()=>setSelected({type:'school',id:school.id})}/>)}
        {visiblePhilosophers.map(({school,philosopher})=><PhilosopherMarker key={`${school.id}-${philosopher!.id}`} school={school} philosopher={philosopher!} rowHeight={rowHeight} selected={selected?.type==='philosopher'&&selected.id===philosopher!.id} dimmed={Boolean(selected)&&!relatedSchoolIds.has(school.id)} onClick={()=>setSelected({type:'philosopher',id:philosopher!.id})}/>)}
        {visibleWorks.map(work=><WorkMarker key={work.id} work={work} rowHeight={rowHeight} selected={selected?.type==='work'&&selected.id===work.id} dimmed={Boolean(selected)&&!relatedSchoolIds.has(work.schoolId)} onClick={()=>setSelected({type:'work',id:work.id})}/>)}
        <div className="wall-event-rail" style={{top:eventRailTop}}>{visibleEvents.map((event,index)=><button key={event.id} className={`wall-event-pin ${selected?.type==='event'&&selected.id===event.id?'is-selected':''}`} style={{left:wallYearX(event.year),top:8+(index%2)*29,'--event-color':branchById(event.branchIds[0])?.color??'#8d98a8'} as React.CSSProperties} onClick={()=>setSelected({type:'event',id:event.id})}><i/><span><small>{formatWallYear(event.year,event.approximate)}</small><b>{event.title}</b></span></button>)}</div>
      </div></div></div>
    </div></>}
    {selected&&<WallDrawer selected={selected} onClose={()=>setSelected(null)} href={href} onSelect={setSelected}/>}
  </section>
}

function SchoolBand({school,rowHeight,selected,dimmed,onClick}:{school:WallSchool;rowHeight:number;selected:boolean;dimmed:boolean;onClick:()=>void}){
  return <button className={`wall-school-band ${selected?'is-selected':''} ${dimmed?'is-dimmed':''}`} style={{left:wallYearX(school.startYear),top:AXIS_HEIGHT+school.row*rowHeight+(rowHeight<50?4:7),width:Math.max(54,wallYearX(school.endYear)-wallYearX(school.startYear)),'--school-color':school.color} as React.CSSProperties} onClick={onClick}><span>{school.name}</span><small>{formatWallYear(school.startYear)}–{formatWallYear(school.endYear)}</small></button>;
}

function PhilosopherMarker({school,philosopher,rowHeight,selected,dimmed,onClick}:{school:WallSchool;philosopher:NonNullable<ReturnType<typeof philosopherById>>;rowHeight:number;selected:boolean;dimmed:boolean;onClick:()=>void}){
  const start=wallYearX(philosopher.birthYear);const width=Math.max(18,wallYearX(philosopher.deathYear??YEAR_MAX)-start);
  return <button className={`wall-philosopher ${selected?'is-selected':''} ${dimmed?'is-dimmed':''}`} style={{left:start,top:AXIS_HEIGHT+school.row*rowHeight+(rowHeight<50?24:32),width,'--school-color':school.color} as React.CSSProperties} onClick={onClick}><i/><span>{philosopher.name}</span></button>;
}

function WorkMarker({work,rowHeight,selected,dimmed,onClick}:{work:WallWork;rowHeight:number;selected:boolean;dimmed:boolean;onClick:()=>void}){
  const school=wallSchools.find(item=>item.id===work.schoolId)!;
  return <button className={`wall-work ${selected?'is-selected':''} ${dimmed?'is-dimmed':''}`} aria-label={`Open work details for ${work.title}`} style={{left:wallYearX(work.year),top:AXIS_HEIGHT+school.row*rowHeight+(rowHeight<50?37:50),'--school-color':school.color} as React.CSSProperties} onClick={onClick}><i/><span>{work.title}</span></button>;
}

function InfluenceLine({line,rowHeight,selectedSchoolIds}:{line:typeof wallInfluences[number];rowHeight:number;selectedSchoolIds:string[]}){
  const source=wallSchools.find(item=>item.id===line.sourceId);const target=wallSchools.find(item=>item.id===line.targetId);if(!source||!target)return null;
  const x1=wallYearX(source.endYear);const x2=wallYearX(target.startYear);const y1=AXIS_HEIGHT+source.row*rowHeight+20;const y2=AXIS_HEIGHT+target.row*rowHeight+20;const bend=Math.max(35,Math.abs(x2-x1)*.25);const active=!selectedSchoolIds.length||selectedSchoolIds.includes(source.id)||selectedSchoolIds.includes(target.id);
  return <g className={`wall-influence ${active?'is-active':'is-dimmed'}`}><path d={`M ${x1} ${y1} C ${x1+bend} ${y1}, ${x2-bend} ${y2}, ${x2} ${y2}`} style={{stroke:relationColors[line.kind]}} markerEnd={`url(#wall-arrow-${line.kind})`}/>{selectedSchoolIds.length>0&&active&&<text x={(x1+x2)/2} y={(y1+y2)/2-6}>{relationLabels[line.kind]}</text>}</g>;
}

function WallDrawer({selected,onClose,href,onSelect}:{selected:NonNullable<Selected>;onClose:()=>void;href:RouteHref;onSelect:(selected:Selected)=>void}){
  const school=selected.type==='school'?wallSchools.find(item=>item.id===selected.id):undefined;const philosopher=selected.type==='philosopher'?philosopherById(selected.id):undefined;const work=selected.type==='work'?wallWorks.find(item=>item.id===selected.id):undefined;const event=selected.type==='event'?timelineEvents.find(item=>item.id===selected.id):undefined;
  const accent=school?.color??schoolForPhilosopher(philosopher?.id??'')[0]?.color??wallSchools.find(item=>item.id===work?.schoolId)?.color??branchById(event?.branchIds[0]??'')?.color??'#d2ad6f';
  const drawerRef=useRef<HTMLElement>(null);const closeRef=useRef<HTMLButtonElement>(null);const onCloseRef=useRef(onClose);onCloseRef.current=onClose;const label=`${school?.name??philosopher?.name??work?.title??event?.title??'Wall item'} details`;
  useEffect(()=>{
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;const originalOverflow=document.body.style.overflow;document.body.style.overflow='hidden';closeRef.current?.focus();
    const onKeyDown=(keyboardEvent:KeyboardEvent)=>{if(keyboardEvent.key==='Escape'){keyboardEvent.preventDefault();onCloseRef.current();return}if(keyboardEvent.key!=='Tab'||!drawerRef.current)return;const focusable=[...drawerRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')];if(!focusable.length)return;const first=focusable[0];const last=focusable[focusable.length-1];if(!drawerRef.current.contains(document.activeElement)){keyboardEvent.preventDefault();(keyboardEvent.shiftKey?last:first).focus()}else if(keyboardEvent.shiftKey&&document.activeElement===first){keyboardEvent.preventDefault();last.focus()}else if(!keyboardEvent.shiftKey&&document.activeElement===last){keyboardEvent.preventDefault();first.focus()}};
    document.addEventListener('keydown',onKeyDown);
    return()=>{document.removeEventListener('keydown',onKeyDown);document.body.style.overflow=originalOverflow;previous?.focus()};
  },[]);
  useEffect(()=>{if(!drawerRef.current?.contains(document.activeElement))closeRef.current?.focus()},[selected.type,selected.id]);
  return <><div className="drawer-backdrop" aria-hidden="true" onPointerDown={onClose}/><aside ref={drawerRef} className="detail-drawer wall-drawer" role="dialog" aria-modal="true" aria-label={label} style={{'--accent':accent} as React.CSSProperties}><button ref={closeRef} className="drawer-close btn btn-ghost" onClick={onClose}><X size={18}/> Close</button>
    {school&&<SchoolDrawer school={school} href={href} onSelect={onSelect}/>}
    {philosopher&&<PhilosopherDrawer philosopher={philosopher} href={href} onSelect={onSelect}/>}
    {work&&<WorkDrawer work={work} href={href}/>}
    {event&&<EventDrawer event={event} href={href}/>}
  </aside></>;
}

function SchoolDrawer({school,href,onSelect}:{school:WallSchool;href:RouteHref;onSelect:(selected:Selected)=>void}){
  const routes=wallInfluences.filter(line=>line.sourceId===school.id||line.targetId===school.id);const works=wallWorks.filter(work=>work.schoolId===school.id);
  return <><div className="placard-number">School active period · {periodFor(school.startYear)?.name}</div><div className="eyebrow">{formatWallYear(school.startYear)}–{formatWallYear(school.endYear)}</div><h2>{school.name}</h2><p className="placard-lead">{school.summary}</p>{school.branchId&&<a className="btn btn-primary drawer-primary" href={href({kind:'branch',branchId:school.branchId})}>Open in Branch Explorer <ArrowRight size={15}/></a>}<section><h3><UserRound size={15}/> Thinkers on this band</h3>{school.philosopherIds.map(id=>{const person=philosopherById(id);return person?<a className="btn btn-secondary connection-button" key={id} href={href({kind:'philosopher',philosopherId:id})}><PhilosopherPortrait philosopher={person}/><span>{person.name}<small>{person.lifespan}</small></span><ArrowRight size={13}/></a>:null})}</section><section><h3><Network size={15}/> Direct routes</h3>{routes.map(route=>{const id=route.sourceId===school.id?route.targetId:route.sourceId;return <button className="btn btn-secondary connection-button" key={route.id} onClick={()=>onSelect({type:'school',id})}><span className="branch-dot" style={{background:relationColors[route.kind]}}/><span>{wallSchools.find(item=>item.id===id)?.name}<small>{relationLabels[route.kind]}</small></span><ArrowRight size={13}/></button>})}</section>{works.length>0&&<section><h3><BookOpen size={15}/> Landmark works</h3>{works.map(item=><button className="btn btn-secondary connection-button" key={item.id} onClick={()=>onSelect({type:'work',id:item.id})}><span>{item.title}<small>{formatWallYear(item.year)}</small></span><ArrowRight size={13}/></button>)}</section>}</>;
}

function PhilosopherDrawer({philosopher,href,onSelect}:{philosopher:NonNullable<ReturnType<typeof philosopherById>>;href:RouteHref;onSelect:(selected:Selected)=>void}){
  const schools=schoolForPhilosopher(philosopher.id);const works=wallWorks.filter(work=>work.authorId===philosopher.id);const neighboring=wallInfluences.filter(line=>schools.some(school=>line.sourceId===school.id||line.targetId===school.id)).slice(0,5);
  return <><div className="placard-number">Philosopher on the wall</div><div className="eyebrow">{philosopher.lifespan} · {philosopher.tradition}</div><h2>{philosopher.name}</h2><p className="placard-lead">{philosopher.contributionSummary}</p><section className="why-matters static-info-card"><span>Main contribution</span><b>{philosopher.mainIdeas.join(' · ')}</b><p>{philosopher.beginnerExplanation}</p></section><a className="btn btn-primary drawer-primary" href={href({kind:'philosopher',philosopherId:philosopher.id})}>Open full profile <ArrowRight size={15}/></a><section><h3><GitBranch size={15}/> Schools & branches</h3>{schools.map(school=><button className="btn btn-secondary connection-button" key={school.id} onClick={()=>onSelect({type:'school',id:school.id})}><span className="branch-dot" style={{background:school.color}}/><span>{school.name}</span><ArrowRight size={13}/></button>)}{philosopher.primaryBranchIds.map(id=>branchById(id)?<a className="btn btn-secondary connection-button" key={id} href={href({kind:'branch',branchId:id})}><span className="branch-dot" style={{background:branchById(id)?.color}}/><span>{branchById(id)?.name}</span><ArrowRight size={13}/></a>:null)}</section><section><h3><BookOpen size={15}/> Key works</h3><div className="drawer-static-list">{philosopher.keyWorks.map(title=><span className="tag-static" key={title}>{title}</span>)}</div>{works.map(item=><button className="btn btn-secondary connection-button" key={item.id} onClick={()=>onSelect({type:'work',id:item.id})}><span>{item.title}<small>{formatWallYear(item.year)}</small></span><ArrowRight size={13}/></button>)}</section><section><h3><Network size={15}/> Influence neighborhood</h3>{neighboring.map(route=><div className="drawer-moment static-info-card" key={route.id}><small>{relationLabels[route.kind]}</small><b>{route.summary}</b></div>)}</section></>;
}

function WorkDrawer({work,href}:{work:WallWork;href:RouteHref}){
  const author=philosopherById(work.authorId??'');return <><div className="placard-number">Landmark work · {periodFor(work.year)?.name}</div><div className="eyebrow">{formatWallYear(work.year)}</div><h2>{work.title}</h2><p className="placard-lead">{work.summary}</p>{author&&<section><h3><UserRound size={15}/> Author</h3><a className="btn btn-secondary connection-button" href={href({kind:'philosopher',philosopherId:author.id})}><PhilosopherPortrait philosopher={author}/><span>{author.name}</span><ArrowRight size={13}/></a></section>}<section><h3><GitBranch size={15}/> Connected branches</h3>{work.branchIds.map(id=>branchById(id)?<a className="btn btn-secondary connection-button" key={id} href={href({kind:'branch',branchId:id})}><span className="branch-dot" style={{background:branchById(id)?.color}}/><span>{branchById(id)?.name}</span><ArrowRight size={13}/></a>:null)}</section></>;
}

function EventDrawer({event,href}:{event:TimelineEvent;href:RouteHref}){
  return <><div className="placard-number">Historical turn · {event.era}</div><div className="eyebrow">{formatWallYear(event.year,event.approximate)}</div><h2>{event.title}</h2><p className="placard-lead">{event.description}</p><section className="why-matters static-info-card"><span>Why this matters</span><b>{event.whyItMatters}</b></section>{event.relatedWorkIds&&<section><h3><BookOpen size={15}/> Related works</h3><div className="drawer-static-list">{event.relatedWorkIds.map(title=><span className="tag-static" key={title}>{title}</span>)}</div></section>}<section><h3><GitBranch size={15}/> Branches</h3>{event.branchIds.map(id=>branchById(id)?<a className="btn btn-secondary connection-button" key={id} href={href({kind:'branch',branchId:id})}><span className="branch-dot" style={{background:branchById(id)?.color}}/><span>{branchById(id)?.name}</span><ArrowRight size={13}/></a>:null)}</section><section><h3><UserRound size={15}/> Philosophers</h3>{event.philosopherIds.map(id=>{const person=philosopherById(id);return person?<a className="btn btn-secondary connection-button" key={id} href={href({kind:'philosopher',philosopherId:id})}><PhilosopherPortrait philosopher={person}/><span>{person.name}</span><ArrowRight size={13}/></a>:null})}</section></>;
}

function selectionSchools(selected:NonNullable<Selected>){
  if(selected.type==='school')return[selected.id];
  if(selected.type==='philosopher')return schoolForPhilosopher(selected.id).map(item=>item.id);
  if(selected.type==='work')return[wallWorks.find(item=>item.id===selected.id)?.schoolId??''];
  const event=timelineEvents.find(item=>item.id===selected.id);return wallSchools.filter(school=>school.branchId&&event?.branchIds.includes(school.branchId)).map(item=>item.id);
}
function eventTouchesSchool(event:TimelineEvent,schoolId:string){const school=wallSchools.find(item=>item.id===schoolId);return Boolean(school&&(school.philosopherIds.some(id=>event.philosopherIds.includes(id))||(school.branchId&&event.branchIds.includes(school.branchId))))}
function rowLabel(row:number){return['Origins & nature','Reason & knowledge','Metaphysics & theology','Experience & critique','Language & persuasion','Politics & order','Systems & analysis','Practice & institutions','Ethics & action','Ways of life','Inquiry & method','Cultivation & society','Tradition & identity','Liberation & suffering'][row]}
