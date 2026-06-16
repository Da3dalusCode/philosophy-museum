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
for(const path of ['academicSkepticArticles','ancientGreekArticles','earlyStoicSystemArticles','hellenisticFoundationArticles','hellenisticArticles','lateAntiqueBridgeArticles','lateAntiqueInheritanceArticles','medievalBridgeArticles','romanHellenisticArticles']){
  compiled=compiled.replace(new RegExp(`from ['"]\\./${path}['"]`),`from '${await moduleUrlFor(path)}'`);
}
const moduleUrl=`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const {branchArticles,philosopherArticles}=await import(moduleUrl);

const requested=process.argv.slice(2);
const targets=requested.length?requested:['plato','platonism','socrates','aristotle','ancient-greek','epicurus','epictetus','stoicism','epicureanism','zeno','seneca','marcus-aurelius','skepticism','pyrrho','sextus-empiricus','lucretius','cynicism','diogenes','cleanthes','chrysippus','plotinus','aristotelianism','neoplatonism','arcesilaus','carneades','porphyry','iamblichus','proclus','pseudo-dionysius','augustine','boethius','anselm','aquinas','avicenna','maimonides'];
const countWords=sections=>sections.flatMap(section=>section.paragraphs).join(' ').match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu)?.length??0;
const minimum=1800;
const strictMinimum=2000;
const strictTargets=new Set(['augustine','boethius','anselm','aquinas','avicenna','maimonides']);

for(const id of targets){
  const sections=philosopherArticles[id]??branchArticles[id];
  if(!sections){
    console.error(`${id}: no articleSections found`);
    process.exitCode=1;
    continue;
  }
  const words=countWords(sections);
  const required=strictTargets.has(id)?strictMinimum:minimum;
  const status=words>=required?'PASS':'FAIL';
  console.log(`${id}: ${words} article prose words across ${sections.length} sections — ${status} (minimum ${required})`);
  if(words<required)process.exitCode=1;
}
