import {readFile} from 'node:fs/promises';
import ts from 'typescript';

const sourcePath=new URL('../src/data/articleDepth.ts',import.meta.url);
const source=await readFile(sourcePath,'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const moduleUrl=`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const {branchArticles,philosopherArticles}=await import(moduleUrl);

const requested=process.argv.slice(2);
const targets=requested.length?requested:['plato','platonism'];
const countWords=sections=>sections.flatMap(section=>section.paragraphs).join(' ').match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu)?.length??0;
const minimum=1800;

for(const id of targets){
  const sections=philosopherArticles[id]??branchArticles[id];
  if(!sections){
    console.error(`${id}: no articleSections found`);
    process.exitCode=1;
    continue;
  }
  const words=countWords(sections);
  const status=words>=minimum?'PASS':'FAIL';
  console.log(`${id}: ${words} article prose words across ${sections.length} sections — ${status} (minimum ${minimum})`);
  if(words<minimum)process.exitCode=1;
}
