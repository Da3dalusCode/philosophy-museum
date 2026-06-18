import {readFile} from 'node:fs/promises';

const read=path=>readFile(new URL(`../${path}`,import.meta.url),'utf8');
const [philosophers,branches,timeline,wall,relationships,profile]=await Promise.all([
  read('src/data/philosophers.ts'),
  read('src/data/branches.ts'),
  read('src/data/timelineEvents.ts'),
  read('src/data/wallChart.ts'),
  read('src/data/relationships.ts'),
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
check(philosophers.includes("confucius:{dateDisplay:'traditional 551-479 BCE'")&&philosophers.includes("branchId:'chinese-philosophy',status:'canonical'"),'Confucius must show traditional-date metadata and canonical Confucian status.');
check(philosophers.includes("zhuangzi:{dateDisplay:'c. 369-286 BCE'")&&philosophers.includes("Canonical Daoist philosopher"),'Zhuangzi must show approximate chronology and canonical Daoist status.');
check(philosophers.includes("laozi:{lifespan:'legendary")&&philosophers.includes("not a secure biographical founder"),'Laozi must be a legendary/attributed Daoist source, not a secure founder claim.');
check(philosophers.includes("mahavira:{dateDisplay:'traditional 599-527 BCE; chronology disputed'")&&philosophers.includes("Canonical Jain figure"),'Mahavira must show disputed traditional chronology and Jain canonical status.');
check(philosophers.includes("shankara:{dateDisplay:'traditionally 788-820 CE; chronology debated'")&&philosophers.includes("status:'commentator'"),'Shankara must show debated chronology and commentator/systematizer status.');
check(philosophers.includes("ramanuja:{dateDisplay:'c. 1017-1137 CE'")&&philosophers.includes("Vishishtadvaita Vedanta commentator"),'Ramanuja must show approximate chronology and commentator/systematizer status.');
check(philosophers.includes("dignaga:{dateDisplay:'c. 480-540 CE'")&&philosophers.includes("Dignaga")&&philosophers.includes("status:'school-systematizer'"),'Dignaga must show approximate chronology and Buddhist epistemology systematizer status.');
check(philosophers.includes("dharmakirti:{dateDisplay:'c. 600-660 CE; chronology debated'")&&philosophers.includes("Major developer of the Buddhist epistemological tradition after Dignaga"),'Dharmakirti must show approximate/debated chronology and post-Dignaga status.');
check(tupleLine(branches,'chinese-philosophy').includes("['confucius','laozi','zhuangzi','mencius','xunzi','mozi','han-feizi','zhu-xi','wang-yangming']"),'Chinese Philosophy branch must include represented Confucian, Daoist, Mohist, Legalist, and Neo-Confucian figures.');
check(tupleLine(branches,'indian-philosophy').includes("['buddha','mahavira','kanada','patanjali','shankara','ramanuja','madhva']"),'Indian Philosophy branch must not center only later Vedanta figures.');
check(tupleLine(branches,'buddhist-philosophy').includes("['buddha','nagarjuna','vasubandhu','dignaga','dharmakirti']"),'Buddhist Philosophy branch must include Dignaga and Dharmakirti where the wall already represents them.');
check(lineWith(timeline,"event('confucian-buddhist'").includes("['confucius','laozi','buddha','mahavira','kanada']"),'Early cross-cultural timeline event must link represented Chinese, Buddhist, Jain, and early Indian figures.');
check(lineWith(timeline,"event('confucian-buddhist'").includes('conventional, disputed, or legendary'),'Early cross-cultural timeline event must warn about ancient chronology uncertainty.');
check(lineWith(wall,"id:'daoism'").includes('Traditionally linked to Laozi')&&lineWith(wall,"id:'buddhist'").includes('Approximate early Buddhist anchors'),'Wall bands must carry chronology caveats for Daoist and Buddhist traditions.');
check(relationships.includes("rel('indian-philosophy','buddhist-philosophy','overlaps-with')"),'Indian and Buddhist philosophy relationship must be overlap, not a simple historical predecessor chain.');
check(profile.includes('x.dateDisplay??x.lifespan')&&profile.includes('p.dateNote&&')&&profile.includes("'school-systematizer':'School systematizer'"),'Philosopher Profiles must display date uncertainty and the expanded membership labels when present.');

for(const {condition,message} of checks){
  if(condition){
    console.log(`PASS: ${message}`);
  }else{
    console.error(`FAIL: ${message}`);
    process.exitCode=1;
  }
}
