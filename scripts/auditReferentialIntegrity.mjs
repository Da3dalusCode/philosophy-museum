import {readFile,readdir} from 'node:fs/promises';
import ts from 'typescript';

const root=new URL('..',import.meta.url);
const read=file=>readFile(new URL(file,root),'utf8');
const compilerOptions={module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022};
const escapeRegExp=value=>value.replace(/[.*+?^$()|[\]\\{}]/g,'\\$&');
const localImportPaths=sourceText=>[...new Set([...sourceText.matchAll(/from ['"]\.\/([^'"]+)['"]/g)].map(match=>match[1]))];
const moduleUrlFor=async path=>{
  const source=await read(`src/data/${path}.ts`);
  const compiled=ts.transpileModule(source,{compilerOptions}).outputText;
  return`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
};
const articleSource=await read('src/data/articleDepth.ts');
let compiled=ts.transpileModule(articleSource,{compilerOptions}).outputText;
for(const path of localImportPaths(articleSource)){
  compiled=compiled.replace(new RegExp(`from ['"]\\./${escapeRegExp(path)}['"]`,'g'),`from '${await moduleUrlFor(path)}'`);
}
const {branchArticles,philosopherArticles}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

const [branchSource,philosopherSource]=await Promise.all([read('src/data/branches.ts'),read('src/data/philosophers.ts')]);
const idsFromSpecs=text=>[...text.matchAll(/^\['([^']+)'/gm)].map(match=>match[1]);
const branchIds=new Set(['stoicism',...idsFromSpecs(branchSource)]);
const philosopherIds=new Set(idsFromSpecs(philosopherSource));
const errors=[];
const fail=message=>errors.push(message);

const validateSections=(kind,id,sections)=>{
  const seen=new Set();
  for(const section of sections){
    if(!section.id||seen.has(section.id))fail(`${kind} ${id}: duplicate or empty section ID ${section.id||'<empty>'}`);
    seen.add(section.id);
    for(const branchId of section.relatedBranchIds??[])if(!branchIds.has(branchId))fail(`${kind} ${id}/${section.id}: unknown branch ${branchId}`);
    for(const philosopherId of section.relatedPhilosopherIds??[])if(!philosopherIds.has(philosopherId))fail(`${kind} ${id}/${section.id}: unknown philosopher ${philosopherId}`);
  }
};
for(const [id,sections] of Object.entries(philosopherArticles)){
  if(!philosopherIds.has(id))fail(`philosopher article registry has unknown key ${id}`);
  validateSections('philosopher',id,sections);
}
for(const [id,sections] of Object.entries(branchArticles)){
  if(!branchIds.has(id))fail(`branch article registry has unknown key ${id}`);
  validateSections('branch',id,sections);
}

const sourceFile=ts.createSourceFile('philosophers.ts',philosopherSource,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
const nameOf=node=>ts.isIdentifier(node)?node.text:ts.isStringLiteral(node)?node.text:undefined;
const findVariable=name=>{
  for(const statement of sourceFile.statements){
    if(!ts.isVariableStatement(statement))continue;
    for(const declaration of statement.declarationList.declarations){
      if(ts.isIdentifier(declaration.name)&&declaration.name.text===name)return declaration.initializer;
    }
  }
};
const specs=findVariable('specs');
if(!specs||!ts.isArrayLiteralExpression(specs))fail('could not parse philosopher specs');
else{
  for(const element of specs.elements){
    if(!ts.isArrayLiteralExpression(element))continue;
    const id=ts.isStringLiteral(element.elements[0])?element.elements[0].text:'<unknown>';
    const primary=element.elements[6];
    if(ts.isArrayLiteralExpression(primary)){
      for(const branch of primary.elements)if(ts.isStringLiteral(branch)&&!branchIds.has(branch.text))fail(`${id}: unknown primary branch ${branch.text}`);
    }
  }
}
const relationshipDepth=findVariable('relationshipDepth');
if(relationshipDepth&&ts.isObjectLiteralExpression(relationshipDepth)){
  for(const profile of relationshipDepth.properties){
    if(!ts.isPropertyAssignment(profile)||!ts.isObjectLiteralExpression(profile.initializer))continue;
    const id=nameOf(profile.name)??'<unknown>';
    for(const relation of profile.initializer.properties){
      if(!ts.isPropertyAssignment(relation)||!ts.isArrayLiteralExpression(relation.initializer))continue;
      const relationName=nameOf(relation.name);
      if(!['influencedByIds','influencedIds','disagreementIds'].includes(relationName))continue;
      for(const target of relation.initializer.elements)if(ts.isStringLiteral(target)&&!philosopherIds.has(target.text))fail(`${id}/${relationName}: unknown philosopher ${target.text}`);
    }
  }
}
const visit=node=>{
  if(ts.isPropertyAssignment(node)&&nameOf(node.name)==='branchId'&&ts.isStringLiteral(node.initializer)&&!branchIds.has(node.initializer.text))fail(`structured membership uses unknown branch ${node.initializer.text}`);
  ts.forEachChild(node,visit);
};
visit(sourceFile);

const dataDir=new URL('src/data/',root);
const articleFiles=(await readdir(dataDir)).filter(name=>name.endsWith('.ts'));
const keyOwners=new Map();
for(const file of articleFiles){
  const text=await read(`src/data/${file}`);
  const parsed=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
  for(const statement of parsed.statements){
    if(!ts.isVariableStatement(statement))continue;
    for(const declaration of statement.declarationList.declarations){
      if(!ts.isIdentifier(declaration.name)||!/philosopherArticles$/i.test(declaration.name.text)||!ts.isObjectLiteralExpression(declaration.initializer))continue;
      for(const property of declaration.initializer.properties){
        if(!ts.isPropertyAssignment(property))continue;
        const key=nameOf(property.name);
        if(!key)continue;
        const owners=keyOwners.get(key)??[];
        owners.push(`${file}:${declaration.name.text}`);
        keyOwners.set(key,owners);
      }
    }
  }
}
for(const [id,owners] of keyOwners)if(owners.length>1)fail(`duplicate philosopher article key ${id}: ${owners.join(', ')}`);

if(errors.length){
  for(const error of errors)console.error(`FAIL: ${error}`);
  process.exitCode=1;
}else{
  console.log(`PASS: ${Object.keys(philosopherArticles).length} philosopher article registries and ${Object.keys(branchArticles).length} branch article registries have valid section references.`);
  console.log(`PASS: ${philosopherIds.size} philosopher base records use valid branch, membership, influence, and disagreement IDs.`);
  console.log('PASS: Philosopher article source keys are unique across registered modules.');
}
