import {readFile} from 'node:fs/promises';
import ts from 'typescript';

const sourcePath=new URL('../src/data/articleDepth.ts',import.meta.url);
const source=await readFile(sourcePath,'utf8');
const compilerOptions={module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022};
const escapeRegExp=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const localImportPaths=sourceText=>[...new Set([...sourceText.matchAll(/from ['"]\.\/([^'"]+)['"]/g)].map(match=>match[1]))];
const moduleUrlFor=async path=>{
  const moduleSource=await readFile(new URL(`../src/data/${path}.ts`,import.meta.url),'utf8');
  const moduleCompiled=ts.transpileModule(moduleSource,{compilerOptions}).outputText;
  return`data:text/javascript;base64,${Buffer.from(moduleCompiled).toString('base64')}`;
};
let compiled=ts.transpileModule(source,{compilerOptions}).outputText;
for(const path of localImportPaths(source)){
  compiled=compiled.replace(new RegExp(`from ['"]\\./${escapeRegExp(path)}['"]`,'g'),`from '${await moduleUrlFor(path)}'`);
}
const moduleUrl=`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
const {branchArticles,philosopherArticles}=await import(moduleUrl);

const requested=process.argv.slice(2);
const targets=requested.length?requested:['plato','platonism','socrates','aristotle','ancient-greek','epicurus','epictetus','stoicism','epicureanism','zeno','seneca','marcus-aurelius','skepticism','pyrrho','sextus-empiricus','lucretius','cynicism','diogenes','cleanthes','chrysippus','plotinus','aristotelianism','neoplatonism','arcesilaus','carneades','porphyry','iamblichus','proclus','pseudo-dionysius','augustine','boethius','anselm','aquinas','avicenna','maimonides','duns-scotus','ockham','descartes','spinoza','leibniz','locke','hume','confucius','laozi','zhuangzi','buddha','nagarjuna','shankara','hegel','schopenhauer','kierkegaard','marx','mill','al-kindi','al-farabi','al-ghazali','averroes','frege','russell','g-e-moore','carnap','quine','anscombe','machiavelli','bacon','hobbes','berkeley','rousseau','bentham','mencius','xunzi','mozi','han-feizi','zhu-xi','wang-yangming','thales','anaximander','anaximenes','pythagoras','philolaus','parmenides','zeno-elea','heraclitus','empedocles','anaxagoras','leucippus','democritus','protagoras','gorgias','antisthenes','peirce','william-james','dewey','whitehead','popper','kuhn','mahavira','kanada','patanjali','vasubandhu','dignaga','dharmakirti','ramanuja','madhva','origen','gregory-nyssa','eriugena','abelard','meister-eckhart','marsilius-padua','mary-astell','anne-conway','montesquieu','adam-smith','wollstonecraft','martha-nussbaum','judith-butler','angela-davis','bell-hooks','merleau-ponty','levinas','gadamer','iris-murdoch','philippa-foot','judith-thomson','thomas-nagel','derek-parfit'];
const completionPhilosopherTargets=new Set(['fichte','schelling','husserl','heidegger','sartre','beauvoir','camus']);
if(!requested.length)targets.push(...completionPhilosopherTargets);
const sprintBranchTargets=['philosophy-of-religion','medieval-scholasticism','islamic-philosophy','rationalism','empiricism','german-idealism','existentialism','phenomenology','political-philosophy','philosophy-of-science','metaphysics','ontology','virtue-ethics','deontology','utilitarianism','logic','philosophy-of-language','philosophy-of-mind','aesthetics','pragmatism','continental-philosophy','feminist-philosophy','chinese-philosophy','confucianism','daoism','mohism','legalism','indian-philosophy','jainism','vedanta','buddhist-philosophy','buddhist-epistemology'];
if(!requested.length)targets.push(...sprintBranchTargets);
const idsFromSpecs=text=>[...text.matchAll(/^\['([^']+)'/gm)].map(match=>match[1]);
const [branchSource,philosopherSource]=await Promise.all([
  readFile(new URL('../src/data/branches.ts',import.meta.url),'utf8'),
  readFile(new URL('../src/data/philosophers.ts',import.meta.url),'utf8')
]);
const validBranchIds=new Set(['stoicism',...idsFromSpecs(branchSource)]);
const validPhilosopherIds=new Set(idsFromSpecs(philosopherSource));
const {earlyModernKnowledgeBranchDetails}=await import(await moduleUrlFor('earlyModernKnowledgeBranchDepth'));
const {modernCoreBranchDetails}=await import(await moduleUrlFor('modernCoreBranchDepth'));
const {deontologyBranchDetails}=await import(await moduleUrlFor('deontologyBranchDepth'));
const {logicBranchDetails}=await import(await moduleUrlFor('logicBranchDepth'));
const {metaphysicsBranchDetails}=await import(await moduleUrlFor('metaphysicsBranchDepth'));
const {ontologyBranchDetails}=await import(await moduleUrlFor('ontologyBranchDepth'));
const {philosophyLanguageBranchDetails}=await import(await moduleUrlFor('philosophyLanguageBranchDepth'));
const {philosophyMindBranchDetails}=await import(await moduleUrlFor('philosophyMindBranchDepth'));
const {aestheticsBranchDetails}=await import(await moduleUrlFor('aestheticsBranchDepth'));
const {pragmatismBranchDetails}=await import(await moduleUrlFor('pragmatismBranchDepth'));
const {continentalPhilosophyBranchDetails}=await import(await moduleUrlFor('continentalPhilosophyBranchDepth'));
const {feministPhilosophyBranchDetails}=await import(await moduleUrlFor('feministPhilosophyBranchDepth'));
const {chineseConfucianBranchDetails}=await import(await moduleUrlFor('chineseConfucianBranchDepth'));
const {daoMohistLegalistBranchDetails}=await import(await moduleUrlFor('daoMohistLegalistBranchDepth'));
const {buddhistPhilosophyBranchDetails}=await import(await moduleUrlFor('buddhistPhilosophyBranchDepth'));
const {buddhistEpistemologyBranchDetails}=await import(await moduleUrlFor('buddhistEpistemologyBranchDepth'));
const {indianJainVedantaBranchDetails}=await import(await moduleUrlFor('indianJainVedantaBranchDepth'));
const {utilitarianismBranchDetails}=await import(await moduleUrlFor('utilitarianismBranchDepth'));
const {virtueEthicsBranchDetails}=await import(await moduleUrlFor('virtueEthicsBranchDepth'));
const sprintBranchDetails={...modernCoreBranchDetails,...earlyModernKnowledgeBranchDetails,...metaphysicsBranchDetails,...ontologyBranchDetails,...virtueEthicsBranchDetails,...deontologyBranchDetails,...utilitarianismBranchDetails,...logicBranchDetails,...philosophyLanguageBranchDetails,...philosophyMindBranchDetails,...aestheticsBranchDetails,...pragmatismBranchDetails,...continentalPhilosophyBranchDetails,...feministPhilosophyBranchDetails,...chineseConfucianBranchDetails,...daoMohistLegalistBranchDetails,...buddhistPhilosophyBranchDetails,...buddhistEpistemologyBranchDetails,...indianJainVedantaBranchDetails};
const validSourceTypes=new Set(['SEP','IEP','Wikipedia','Wikidata','Wikimedia','primary-text','public-domain-text','other']);
const fail=message=>{console.error(message);process.exitCode=1;};
for(const id of Object.keys(branchArticles))if(!validBranchIds.has(id))fail(`branchArticles contains unknown branch key ${id}`);
for(const id of Object.keys(sprintBranchDetails))if(!validBranchIds.has(id))fail(`branch detail overlay targets unknown branch key ${id}`);

const countWords=sections=>sections.flatMap(section=>section.paragraphs).join(' ').match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu)?.length??0;
const minimum=1800;
const strictMinimum=2000;
const strictTargets=new Set(['augustine','boethius','anselm','aquinas','avicenna','maimonides','duns-scotus','ockham','descartes','spinoza','leibniz','locke','hume','al-kindi','al-farabi','al-ghazali','averroes']);
for(const id of ['heidegger'])strictTargets.add(id);

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
  if(sprintBranchTargets.includes(id)||completionPhilosopherTargets.has(id)){
    const seenSectionIds=new Set();
    for(const section of sections){
      if(!section.id||seenSectionIds.has(section.id))fail(`${id}: section IDs must be nonempty and unique (${section.id||'missing'})`);
      seenSectionIds.add(section.id);
      if(!section.title||!section.paragraphs?.length||section.paragraphs.some(paragraph=>!paragraph.trim()))fail(`${id}/${section.id}: title and paragraphs must be nonempty`);
      for(const branchId of section.relatedBranchIds??[])if(!validBranchIds.has(branchId))fail(`${id}/${section.id}: unknown relatedBranchId ${branchId}`);
      for(const philosopherId of section.relatedPhilosopherIds??[])if(!validPhilosopherIds.has(philosopherId))fail(`${id}/${section.id}: unknown relatedPhilosopherId ${philosopherId}`);
    }
    const details=sprintBranchDetails[id];
    if(details){
      for(const branchId of details.rivalPositions??[])if(!validBranchIds.has(branchId))fail(`${id}: unknown rivalPositions branch ${branchId}`);
      for(const philosopherId of details.majorFigures??[])if(!validPhilosopherIds.has(philosopherId))fail(`${id}: unknown majorFigures philosopher ${philosopherId}`);
      for(const link of details.sourceLinks??[]){
        if(!link.label?.trim()||!link.url?.trim()||!validSourceTypes.has(link.type))fail(`${id}: sourceLinks require label, URL, and valid type`);
        try{const url=new URL(link.url);if(!['http:','https:'].includes(url.protocol))throw new Error('unsupported protocol');}
        catch{fail(`${id}: invalid source URL ${link.url}`);}
      }
    }
  }
}
