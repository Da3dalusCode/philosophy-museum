import {readFile} from 'node:fs/promises';
import ts from 'typescript';

const sourcePath=new URL('../src/data/articleDepth.ts',import.meta.url);
const source=await readFile(sourcePath,'utf8');
const compilerOptions={module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022};
const moduleUrlFor=async path=>{
  const moduleSource=await readFile(new URL(`../src/data/${path}.ts`,import.meta.url),'utf8');
  const moduleCompiled=ts.transpileModule(moduleSource,{compilerOptions}).outputText;
  return`data:text/javascript;base64,${Buffer.from(moduleCompiled).toString('base64')}`;
};
let compiled=ts.transpileModule(source,{compilerOptions}).outputText;
for(const path of ['ancientGreekArticles','hellenisticArticles']){
  compiled=compiled.replace(new RegExp(`from ['"]\\./${path}['"]`),`from '${await moduleUrlFor(path)}'`);
}
const moduleUrl=`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const {branchArticles,philosopherArticles}=await import(moduleUrl);

const requested=process.argv.slice(2);
const targets=requested.length?requested:['plato','platonism','socrates','aristotle','ancient-greek','epicurus','epictetus','stoicism','epicureanism'];
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
