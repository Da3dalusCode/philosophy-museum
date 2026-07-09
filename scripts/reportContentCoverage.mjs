import {readFile} from 'node:fs/promises';
import ts from 'typescript';

const root=new URL('..',import.meta.url);
const read=async file=>readFile(new URL(file,root),'utf8');
const compilerOptions={module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022};
const escapeRegExp=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const idsFromSpecs=text=>[...text.matchAll(/^\['([^']+)'/gm)].map(match=>match[1]);
const localImportPaths=sourceText=>[...new Set([...sourceText.matchAll(/from ['"]\.\/([^'"]+)['"]/g)].map(match=>match[1]))];
const moduleUrlFor=async path=>{
  const moduleSource=await read(`src/data/${path}.ts`);
  const moduleCompiled=ts.transpileModule(moduleSource,{compilerOptions}).outputText;
  return`data:text/javascript;base64,${Buffer.from(moduleCompiled).toString('base64')}`;
};
const loadArticleRegistry=async()=>{
  const source=await read('src/data/articleDepth.ts');
  let compiled=ts.transpileModule(source,{compilerOptions}).outputText;
  for(const path of localImportPaths(source)){
    compiled=compiled.replace(new RegExp(`from ['"]\\./${escapeRegExp(path)}['"]`,'g'),`from '${await moduleUrlFor(path)}'`);
  }
  const moduleUrl=`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
  return import(moduleUrl);
};

const philosopherText=await read('src/data/philosophers.ts');
const branchText=await read('src/data/branches.ts');
const {branchArticles,philosopherArticles}=await loadArticleRegistry();
const articlePhilosopherIds=new Set(Object.keys(philosopherArticles));
const articleBranchIds=new Set(Object.keys(branchArticles));
const philosopherIds=idsFromSpecs(philosopherText);
const branchIds=['stoicism',...idsFromSpecs(branchText)];
const missingPhilosophers=philosopherIds.filter(id=>!articlePhilosopherIds.has(id));
const missingBranches=branchIds.filter(id=>!articleBranchIds.has(id));
const percent=(covered,total)=>`${Math.round((covered/total)*100)}%`;

const printGroup=(title,ids)=>{
  console.log(`\n${title} (${ids.length})`);
  if(ids.length===0){
    console.log('  none');
    return;
  }
  for(const id of ids)console.log(`  ${id}`);
};

console.log('Content article coverage');
console.log(`Article registry: ${articlePhilosopherIds.size} philosopher articles, ${articleBranchIds.size} branch articles`);
console.log(`Philosophers: ${philosopherIds.length-missingPhilosophers.length}/${philosopherIds.length} covered (${percent(philosopherIds.length-missingPhilosophers.length,philosopherIds.length)})`);
console.log(`Branches: ${branchIds.length-missingBranches.length}/${branchIds.length} covered (${percent(branchIds.length-missingBranches.length,branchIds.length)})`);
printGroup('Philosophers missing articleSections',missingPhilosophers);
printGroup('Branches missing articleSections',missingBranches);
