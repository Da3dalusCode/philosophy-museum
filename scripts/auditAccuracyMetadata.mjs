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
check(philosophers.includes("confucius:{dateDisplay:'traditional 551-479 BCE'")&&philosophers.includes("branchId:'confucianism',status:'founder'")&&philosophers.includes("branchId:'chinese-philosophy',status:'canonical'"),'Confucius must show traditional-date metadata, Confucian founder status, and Chinese Philosophy canonical status.');
check(philosophers.includes("zhuangzi:{dateDisplay:'c. 369-286 BCE'")&&philosophers.includes("Canonical Daoist philosopher"),'Zhuangzi must show approximate chronology and canonical Daoist status.');
check(philosophers.includes("laozi:{lifespan:'legendary")&&philosophers.includes("branchId:'daoism',status:'canonical'")&&philosophers.includes("not a secure biographical founder"),'Laozi must be a legendary/attributed Daoist source, not a secure founder claim.');
check(philosophers.includes("mozi:{dateDisplay:'c. 470-391 BCE'")&&philosophers.includes("branchId:'mohism',status:'founder'"),'Mozi must be represented as Mohism founder, not only as a broad Chinese Philosophy member.');
check(philosophers.includes("'han-feizi':{dateDisplay:'c. 280-233 BCE'")&&philosophers.includes("branchId:'legalism',status:'school-systematizer'"),'Han Feizi must be represented as Legalism systematizer, not only as broad Chinese Philosophy.');
check(philosophers.includes("mahavira:{dateDisplay:'traditional 599-527 BCE; chronology disputed'")&&philosophers.includes("branchId:'jainism',status:'canonical'")&&philosophers.includes("not a clean modern founder claim"),'Mahavira must show disputed traditional chronology and Jain canonical status without a clean founder claim.');
check(philosophers.includes("shankara:{dateDisplay:'traditionally 788-820 CE; chronology debated'")&&philosophers.includes("branchId:'vedanta',status:'commentator'"),'Shankara must show debated chronology and Vedanta commentator/systematizer status.');
check(philosophers.includes("ramanuja:{dateDisplay:'c. 1017-1137 CE'")&&philosophers.includes("branchId:'vedanta',status:'commentator'"),'Ramanuja must show approximate chronology and Vedanta commentator/systematizer status.');
check(philosophers.includes("madhva:{dateDisplay:'c. 1238-1317 CE'")&&philosophers.includes("branchId:'vedanta',status:'commentator'"),'Madhva must be represented as a Vedanta commentator/systematizer.');
check(philosophers.includes("dignaga:{dateDisplay:'c. 480-540 CE'")&&philosophers.includes("branchId:'buddhist-epistemology',status:'founder'"),'Dignaga must show approximate chronology and Buddhist Epistemology founder/systematizer status.');
check(philosophers.includes("dharmakirti:{dateDisplay:'c. 600-660 CE; chronology debated'")&&philosophers.includes("branchId:'buddhist-epistemology',status:'school-systematizer'"),'Dharmakirti must show approximate/debated chronology and post-Dignaga Buddhist Epistemology status.');
check(tupleLine(branches,'chinese-philosophy').includes("['confucius','laozi','zhuangzi','mencius','xunzi','mozi','han-feizi','zhu-xi','wang-yangming']"),'Chinese Philosophy branch must include represented Confucian, Daoist, Mohist, Legalist, and Neo-Confucian figures.');
check(tupleLine(branches,'indian-philosophy').includes("['buddha','mahavira','kanada','patanjali','shankara','ramanuja','madhva']"),'Indian Philosophy branch must not center only later Vedanta figures.');
check(tupleLine(branches,'buddhist-philosophy').includes("['buddha','nagarjuna','vasubandhu','dignaga','dharmakirti']"),'Buddhist Philosophy branch must include Dignaga and Dharmakirti where the wall already represents them.');
check(tupleLine(branches,'chinese-philosophy').includes("'Umbrella tradition'")&&tupleLine(branches,'chinese-philosophy').includes('rather than a single school with one founder'),'Chinese Philosophy must remain an umbrella tradition, not a single school.');
check(tupleLine(branches,'indian-philosophy').includes("'Umbrella tradition'")&&tupleLine(branches,'indian-philosophy').includes('Umbrella for Hindu, Jain, Buddhist'),'Indian Philosophy must remain an umbrella tradition, not a single school.');
check(tupleLine(branches,'confucianism').includes("['confucius','mencius','xunzi','zhu-xi','wang-yangming']"),'Confucianism branch must exist with canonical and later Neo-Confucian figures.');
check(tupleLine(branches,'daoism').includes("['laozi','zhuangzi']"),'Daoism branch must exist with Laozi and Zhuangzi.');
check(tupleLine(branches,'mohism').includes("['mozi']"),'Mohism branch must exist with Mozi.');
check(tupleLine(branches,'legalism').includes("['han-feizi']"),'Legalism branch must exist with Han Feizi rather than treating Xunzi as a direct Legalist.');
check(tupleLine(branches,'jainism').includes("['mahavira']"),'Jainism branch must exist with Mahavira.');
check(tupleLine(branches,'vedanta').includes("['shankara','ramanuja','madhva']")&&tupleLine(branches,'vedanta').includes('commentators such as Shankara, Ramanuja, and Madhva'),'Vedanta branch must exist and frame major figures as later commentators/systematizers.');
check(tupleLine(branches,'buddhist-epistemology').includes("['dignaga','dharmakirti']"),'Buddhist Epistemology branch must exist with Dignaga and Dharmakirti.');
check(lineWith(timeline,"event('confucian-buddhist'").includes("['confucius','laozi','buddha','mahavira','kanada']"),'Early cross-cultural timeline event must link represented Chinese, Buddhist, Jain, and early Indian figures.');
check(lineWith(timeline,"event('confucian-buddhist'").includes('conventional, disputed, or legendary'),'Early cross-cultural timeline event must warn about ancient chronology uncertainty.');
check(lineWith(timeline,"event('warring-states-schools'").includes("['chinese-philosophy','confucianism','daoism','mohism','legalism']"),'Timeline must show Warring States Chinese branches as multiple rival traditions.');
check(lineWith(timeline,"event('buddhist-epistemology'").includes("['buddhist-philosophy','buddhist-epistemology','epistemology']"),'Timeline must include Buddhist Epistemology as a distinct school/method layer.');
check(lineWith(timeline,"event('vedanta-commentaries'").includes("['vedanta','indian-philosophy','metaphysics','philosophy-of-religion']"),'Timeline must show Vedanta commentators without making them founders of Indian Philosophy.');
check(lineWith(wall,"id:'confucianism'").includes("branchId:'confucianism'")&&lineWith(wall,"id:'daoism'").includes("branchId:'daoism'")&&lineWith(wall,"id:'buddhist'").includes('Approximate early Buddhist anchors'),'Wall bands must open the narrower Confucianism/Daoism branches and carry Buddhist chronology caveats.');
check(relationships.includes("rel('confucianism','chinese-philosophy','sub-branch-of')")&&relationships.includes("rel('daoism','chinese-philosophy','sub-branch-of')")&&relationships.includes("rel('mohism','chinese-philosophy','sub-branch-of')")&&relationships.includes("rel('legalism','chinese-philosophy','sub-branch-of')"),'Chinese branch split must be represented in relationships.');
check(relationships.includes("rel('jainism','indian-philosophy','sub-branch-of')")&&relationships.includes("rel('vedanta','indian-philosophy','sub-branch-of')")&&relationships.includes("rel('buddhist-philosophy','indian-philosophy','overlaps-with')"),'Indian/Jain/Vedanta/Buddhist branch split must be represented in relationships.');
check(relationships.includes("rel('buddhist-epistemology','buddhist-philosophy','sub-branch-of')")&&relationships.includes("rel('buddhist-epistemology','epistemology','overlaps-with')"),'Buddhist Epistemology must be related to both Buddhist Philosophy and Epistemology.');
check(profile.includes('x.dateDisplay??x.lifespan')&&profile.includes('p.dateNote&&')&&profile.includes("'school-systematizer':'School systematizer'"),'Philosopher Profiles must display date uncertainty and the expanded membership labels when present.');

for(const {condition,message} of checks){
  if(condition){
    console.log(`PASS: ${message}`);
  }else{
    console.error(`FAIL: ${message}`);
    process.exitCode=1;
  }
}
