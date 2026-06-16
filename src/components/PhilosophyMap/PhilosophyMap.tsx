import {PageHead} from '../BigHistory/BigHistoryView';
import {PhilosophyWall} from '../PhilosophyWall/PhilosophyWall';

export function PhilosophyMap({onBranch,onPhilosopher}:{onBranch:(id:string)=>void;onPhilosopher:(id:string)=>void}){
  return <div className="page wall-page genealogy-wall-page"><PageHead eyebrow="Branch genealogy mode" title="How schools inherit and transform" text="The same historical wall, focused on schools and their routes of influence, reaction, overlap, and revival."/><PhilosophyWall initialMode="influence" genealogy onBranch={onBranch} onPhilosopher={onPhilosopher}/></div>;
}
