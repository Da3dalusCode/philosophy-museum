import {readFile} from 'node:fs/promises';

const read=path=>readFile(new URL(`../${path}`,import.meta.url),'utf8');
const [philosophers,branches,timeline,wall,profile]=await Promise.all([
  read('src/data/philosophers.ts'),
  read('src/data/branches.ts'),
  read('src/data/timelineEvents.ts'),
  read('src/data/wallChart.ts'),
  read('src/components/PhilosopherProfile/PhilosopherProfile.tsx')
]);

const lineWith=(source,needle)=>source.split(/\r?\n/).find(line=>line.includes(needle))??'';
const tupleLine=(source,id)=>source.split(/\r?\n/).find(line=>line.startsWith(`['${id}',`))??'';
const checks=[];
const check=(condition,message)=>checks.push({condition,message});

check(philosophers.includes("camus:{branchMemberships:[{branchId:'existentialism',status:'self-rejected-label'"),'Camus existentialism membership must show self-rejected-label status.');
check(philosophers.includes("branchId:'german-idealism',status:'precursor'"),'Kant German Idealism membership must be marked as precursor/source, not flat membership.');
check(tupleLine(branches,'utilitarianism').includes("['bentham','mill']"),'Utilitarianism branch must include Bentham and Mill.');
check(lineWith(wall,"id:'utilitarianism'").includes("['bentham','mill']"),'Utilitarianism wall band must include Bentham and Mill.');
check(lineWith(timeline,"event('mill-liberal-utility'").includes("['bentham','mill']"),'Utilitarianism timeline event must link Bentham and Mill.');
check(tupleLine(branches,'pragmatism').includes("['peirce','william-james','dewey']"),'Pragmatism branch must include Peirce, James, and Dewey.');
check(lineWith(timeline,"event('pragmatism-america'").includes("['peirce','william-james','dewey']"),'Pragmatism timeline event must link Peirce, James, and Dewey.');
check(tupleLine(branches,'analytic-philosophy').includes("['frege','russell','g-e-moore','wittgenstein'"),'Analytic Philosophy branch must include Frege, Russell, Moore, and Wittgenstein.');
check(lineWith(timeline,"event('analytic-origin'").includes("['frege','russell','g-e-moore','wittgenstein']"),'Analytic origin event must link Frege, Russell, Moore, and Wittgenstein.');
check(tupleLine(branches,'cynicism').includes("['antisthenes','diogenes']"),'Cynicism branch must include Antisthenes and Diogenes.');
check(philosophers.includes("antisthenes:{branchMemberships:[{branchId:'cynicism',status:'precursor'"),'Antisthenes must be marked as Cynic precursor/possible early founder.');
check(philosophers.includes("diogenes:{branchMemberships:[{branchId:'cynicism',status:'central'"),'Diogenes must be marked as central/paradigmatic Cynic.');
check(philosophers.includes("patanjali:{lifespan:'fl. uncertain")&&philosophers.includes("not as a literal 400-year lifespan"),'Patanjali must not display as a literal 400-year lifespan.');
check(philosophers.includes("laozi:{lifespan:'legendary")&&philosophers.includes("dateConfidence:'legendary'"),'Laozi must carry legendary/uncertain date metadata.');
check(philosophers.includes("'pseudo-dionysius':{lifespan:'pseudonymous")&&philosophers.includes("dateConfidence:'pseudonymous'"),'Pseudo-Dionysius must carry pseudonymous date metadata.');
check(profile.includes('x.dateDisplay??x.lifespan')&&profile.includes('p.dateNote&&'),'Philosopher Profiles must display date uncertainty metadata when present.');

for(const {condition,message} of checks){
  if(condition){
    console.log(`PASS: ${message}`);
  }else{
    console.error(`FAIL: ${message}`);
    process.exitCode=1;
  }
}
