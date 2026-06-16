import {useState} from 'react';
import type {Philosopher} from '../../types/philosophy';

export function PhilosopherPortrait({philosopher,size='small'}:{philosopher:Philosopher;size?:'small'|'large'}){
  const[failed,setFailed]=useState(false);
  const initials=philosopher.name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('');
  const imageUrl=philosopher.image?.url??philosopher.imageUrl;
  const imageAlt=philosopher.image?.alt??philosopher.imageAlt??`Portrait of ${philosopher.name}`;
  return <span className={`portrait portrait-${size}`} style={{'--portrait-accent':philosopher.color} as React.CSSProperties}>
    {imageUrl&&!failed?<img src={imageUrl} alt={imageAlt} onError={()=>setFailed(true)}/>:<span aria-label={`${philosopher.name} portrait unavailable`} role="img">{initials}</span>}
  </span>;
}
