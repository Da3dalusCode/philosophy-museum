import {
  MEDITERRANEAN_EXHIBIT_CURATION,
  MEDITERRANEAN_GALLERY_ID,
  type MediterraneanExhibitCuration,
  type MediterraneanExhibitId,
} from '../../data/museum/mediterraneanGalleryCuration';
import {
  RENAISSANCE_EXHIBIT_CURATION,
  RENAISSANCE_GALLERY_ID,
  type RenaissancePrimaryExhibitId,
} from '../../data/museum/renaissanceGalleryCuration';
import {MUSEUM_TEXTURE_SPECS, museumTextureDimensionsForPlane} from '../../data/museum/museumTexturePolicy';
import type {MuseumExhibitLayout, MuseumHallDefinition} from '../../data/museum/museumWorldTypes';
import {getMuseumHallCatalog} from '../../data/museumCatalog';
import type {PlaqueTextureOptions} from './plaqueTextures';

export type PrimaryPlaqueConfiguration = PlaqueTextureOptions & {
  contentKind: 'primary';
  kicker: '';
  subtitle: string;
  hallId: string;
  hallTitle: string;
  roomId: string;
  roomTitle: string;
  exhibitId: string;
  entityKind: 'philosopher' | 'branch';
  entityId: string;
  roomIndex: number;
  physicalWidth: number;
  physicalHeight: number;
  mediterraneanGroupLabel?: string;
  renaissance: boolean;
};

/** Wall-only copy overrides used only when the complete catalog invitation cannot fit legibly. */
export const PRIMARY_PLAQUE_INVITATION_OVERRIDES = {
  thales: 'Meet Thales through later reports, not a surviving book. Ask how water became an explanatory source, why “first philosopher” is a later honor, and what Renaissance portraits reveal about reception, not life.',
  anaximander: 'Explore Anaximander through one mediated fragment and a lost map. Ask how the apeiron frames cosmic change, and why a modern diagram can clarify ancient testimony without becoming the original object itself.',
  anaximenes: 'Meet Anaximenes through later reports of air, rarefaction, and condensation. Ask how one source can explain diverse things, and why an imagined portrait gives no access to his appearance or lost prose.',
  pythagoras: 'Meet Pythagoras where soul, number, discipline, and community meet. Ask what early evidence supports, what later traditions added, and why Raphael’s ratio tablet cannot document the historical teacher or an ancient lesson.',
  philolaus: 'Read Philolaus through fragments about limiters, unlimiteds, harmony, and number. Ask how relations make a cosmos knowable, and why a Renaissance musical scene cannot stand as evidence for his life or experiments.',
  parmenides: 'Enter Parmenides’s fragmentary poem, where a goddess tests routes of inquiry. Ask what thought can say about what-is, and why Raphael’s disputed figure cannot settle either his appearance or his arguments today.',
  'zeno-elea': 'Follow Zeno’s paradoxes of motion and plurality through later witnesses. Ask what division, time, and magnitude require, and why neither modern mathematics nor an imagined portrait can simply close his ancient challenges.',
  leucippus: 'Meet Leucippus, the earliest named atomist in the main tradition. Ask how atoms and void answer change, and why shared sources, scarce biography, and a later painting cannot separate his work from Democritus.',
  democritus: 'Read Democritus through a lost corpus. Ask how atoms and void explain change, how senses and ethics fit, and why ancient atomism is neither modern science nor one securely recovered system today.',
  heraclitus: 'Read Heraclitus through fragments, not slogans. Ask how logos, fire, strife, and measure make change intelligible, and why no tale of flux can replace close study of his hard-won words and witnesses.',
  empedocles: 'Meet Empedocles through roots, Love, Strife, verse, and rites. Ask how mixtures make bodies, why cosmic cycles remain disputed, and how the Etna legend can distort both his life and thought today.',
  anaxagoras: 'Explore Anaxagoras through mixture and Nous. Ask how parts form visible things, how Mind starts cosmic motion, and why fragments, later reports, and Plato’s critique leave the scope of order in dispute.',
  protagoras: 'Meet Protagoras through human measure, civic teaching, and skilled debate. Ask how judgments improve, and why Plato’s staged speeches cannot turn his few surviving words into a simple creed of relativism today.',
  prodicus: 'Follow Prodicus through fine word choices and Heracles’ choice. Ask what Plato’s jokes and Xenophon’s outline preserve, and why later reports cannot yield his exact speech or complete theory of language today.',
  gorgias: 'Listen to Gorgias on speech, proof, belief, and duty. Ask how Helen and Palamedes test persuasion, and why later summaries and Plato’s drama cannot make rhetoric mere deceit or nihilism for visitors.',
  vasubandhu: 'Meet Vasubandhu through a later statue. Ask how Abhidharma and Yogācāra explain persons, causes, and cognition without a lasting self, while disputed dates and texts limit certainty about development in current scholarship.',
  'buddhist-epistemology': 'See a Tibetan debate. Ask how Buddhist pramāṇa sorts perception, inference, and words; what makes knowledge sound; and why one public scene cannot show all Buddhist views or old Indian settings alone.',
  dignaga: 'Read Dignāga by a modern relief. Ask how sense, inference, exclusion, and good reasons guide sound thought, while this memorial cannot show his life, teaching, or lost and broken texts in full.',
  dharmakirti: 'Meet Dharmakīrti through a later portrait. Ask how perception, inference, causal efficacy, and action make cognition reliable, while the image cannot settle his wider Buddhist aims or define truth through usefulness alone.',
  'wang-yangming': 'Meet Wang Yangming in a Ming portrait. Ask how innate knowing and joined knowledge and action shape moral growth, while later praise cannot replace his texts, public work, or disputed legacy today.',
  'saadia-gaon': 'Enter Saadia’s world through a Cairo synagogue. Ask how reason, revelation, law, words, and shared duty meet, while this restored site cannot show his own age, institutions, life, or setting in full.',
  'judah-halevi': 'Read Judah Halevi in his letter to ransom a captive. Ask how verse, thought, revelation, practice, and aid meet, while one note cannot prove his whole work, final trip, or views alone.',
  maimonides: 'Study a page in Maimonides’s hand. Ask how law, proof, limits on divine speech, prophecy, and human growth guide readers, while one legal note cannot explain the Guide or his learned world.',
  porphyry: 'Meet Porphyry as editor, teacher, critic, and writer. Ask how he reshaped Greek thought across fields, while broken texts bar a simple view of him as Plotinus’s aide or Christianity’s foe alone.',
  iamblichus: 'Meet Iamblichus through a copied book. Ask why souls need rites and thought, how divine aid guides return, and what a named voice and broken texts leave unclear for readers even today.',
  proclus: 'Meet Proclus as thinker, teacher, writer, poet, and ritual guide. Ask how proof, study, prayer, and rite joined his account of rest, flow, and return into a complete philosophical way of life.',
  origen: 'Meet Origen through a later portrait. Ask how text and reason address God, freedom, bodies, and return, while lost Greek, Latin copies, scraps, and attacks keep his changing work hard to fix.',
  augustine: 'Meet Augustine through an early posthumous portrait. Ask how memory, desire, time, creation, evil, grace, and choice reshape Platonist ascent, while later praise cannot make his vast changing work one fixed system.',
  'gregory-nyssa': 'Meet Gregory of Nyssa through a later mosaic. Ask how divine infinity joins freedom, virtue, body, and endless growth, and why scholars still debate whether his final hope eventually restores all beings.',
  'pseudo-dionysius': 'Read Raphael’s Paul as a clue to a borrowed name, not the author’s face. Ask how divine names, ranks, return, and unknowing shaped Greek and Latin thought across centuries of later reading.',
  'martha-nussbaum': 'Meet Nussbaum in a 2010 portrait. Ask how real opportunities, dignity, emotion, care, and choice shape justice, while one image cannot show capability thresholds or settle disputes about culture and paternalism alone.',
  ontology: 'Use a changing vessel to ask what exists, persists, or depends. Compare substance, process, kinds, parts, and relations without treating one new illustration as an agreed map of being across every tradition.',
  whitehead: 'Meet Whitehead in a 1923 portrait. Ask how events, relations, creativity, and feeling recast reality, while one face cannot display process or make his changing mathematical and metaphysical projects a single doctrine.',
  'philosophy-of-mind': 'Use an inner and outer scene to ask how experience, body, brain, action, and world connect, without letting one new image choose dualism, physicalism, idealism, or any final theory of mind alone.',
  'thomas-nagel': 'Meet Nagel in a marked 1978 print. Ask how subjective life enters objective thought, and why one portrait cannot reveal bat experience, resolve moral luck, or prove his later claims about nature.',
  'philosophy-of-science': 'Enter Wright’s air-pump scene to ask how instruments, models, witnesses, values, and risks shape evidence, while one staged painting cannot depict all science or turn spectacle into a neutral experiment for us.',
  carnap: 'Meet Carnap as a child in 1895. Ask how frameworks, logical form, confirmation, and tolerance clarify inquiry, while this early portrait cannot represent his mature work or make every dispute merely verbal.',
  popper: 'Meet Popper late in life. Ask how bold conjectures, severe tests, fallibility, and open criticism guide inquiry, while his portrait cannot make falsifiability a simple rule or settle his political arguments alone.',
  kuhn: 'Meet Kuhn at a blackboard in 1977. Ask how paradigms, normal science, crisis, and revolution shape research, while this teaching image cannot make communities irrational or every major change an automatic revolution.',
  'philosophy-of-religion': 'Use a plural forum to ask how belief, practice, experience, reason, doubt, and power invite inquiry, without treating religions as interchangeable or making one new illustration resolve their varied claims for everyone.',
  antisthenes: 'Meet a bust called Antisthenes. Ask how virtue, endurance, words, and Socratic practice fit his broken record, while this Roman copy cannot prove his face or uncontested lineage from Socrates to Cynicism.',
  arcesilaus: 'Read imagined profiles of Arcesilaus and Carneades. Ask how dialectic, suspension, and action challenged Stoic certainty, while an 1810 title page cannot portray them or prove one unchanged Academic doctrine across centuries.',
  carneades: 'Study a Roman head with a false Carneades label. Ask how persuasive impressions and opposed arguments guide inquiry, while this Demosthenes type cannot reveal his face or settle which claims he endorsed.',
  'anne-conway': 'Enter Van Hoogstraten’s interior, not Conway’s portrait. Ask how her living substance unites body and spirit, while this unknown reader cannot show Conway’s face, household, suffering, or philosophical authorship on its own.',
  schelling: 'Meet Schelling in Stieler’s 1835 portrait. Ask how nature, art, identity, freedom, and evil reshape his long career, while one later likeness cannot freeze changing projects into a single settled system alone.',
  hegel: 'Meet Hegel in an 1831 portrait. Ask how thought, conflict, law, work, and the state shape freedom, while this late image cannot show his method or prove his views of history by itself.',
  bentham: 'Face Bentham’s Auto-Icon. Ask how joy, pain, law, and reform guide the common good, while this public display cannot tell whose good counts or make moral sums decide each hard case alone.',
  mill: 'Meet Mill in Watts’s late portrait. Ask how liberty, utility, character, equality, and public debate meet, while one statesmanlike likeness cannot resolve tensions among individuality, social power, and the common good today.',
  marx: 'Meet Marx in an 1861 photograph. Ask how labor, class, capital, crisis, and collective action shape history, while this posed likeness cannot turn contested analysis into prophecy or one fixed political program.',
  schopenhauer: 'Meet Schopenhauer in a late photograph. Ask how representation, striving, suffering, art, compassion, and denial connect, while the seated likeness cannot display the will or erase tensions in his pessimism and ethics.',
  kierkegaard: 'Meet Kierkegaard through a posthumous portrait at a writing desk. Ask how choice, anxiety, faith, despair, and authorship work, while this invented likeness cannot identify him with any single pseudonymous voice today.',
  peirce: 'Meet the young Peirce in an 1859 portrait. Ask how inquiry, signs, doubt, habit, and fallible community connect, while this graduation image cannot display his later logic or reduce pragmatism to usefulness.',
  'william-james': 'Meet William James in Whitman’s 1903 portrait. Ask how experience, attention, habit, truth, and choice guide inquiry, while the held book cannot make pragmatism mere convenience or settle every religious claim today.',
  dewey: 'Meet the young Dewey in a studio portrait. Ask how experience, inquiry, education, democracy, and growth connect, while this early likeness cannot show his mature philosophy or make whatever works automatically true.',
  'iris-murdoch': 'Enter Murdoch’s Oxford home through a garden photograph. Ask how attention, love, goodness, imagination, and moral vision connect, while a commemorative plaque cannot reveal private life or reduce philosophy to biography alone.',
  'philippa-foot': 'See a 1939 college group that includes Foot. Ask how virtue, need, choice, and good reasons shape a life, while this group photo cannot pick out her face or settle what humans need.',
  'judith-thomson': 'Study the trolley diagram linked to Thomson’s thought experiments. Ask how rights, intentions, tradeoffs, and bodily claims test judgment, while one schematic cannot decide every case or replace morally relevant detail alone.',
  'derek-parfit': 'Look toward All Souls College, where Parfit worked. Ask how identity, reasons, future people, and impartial concern reshape ethics, while this institutional facade cannot portray him or resolve the conclusions his arguments challenge.',
  'feminist-philosophy': 'Enter feminist thought through a 1913 march. Ask how gender, race, work, care, power, and freedom meet, while this U.S. scene cannot sum up each feminist path, debate, or shared fight on its own.',
  'judith-butler': 'Meet Butler in a 2011 lecture photograph. Ask how norms, performativity, bodies, recognition, and assembly shape lives, while this public portrait cannot make gender a voluntary performance or settle later political disputes.',
  'angela-davis': 'Meet Angela Davis speaking in 2006. Ask how prisons, race, gender, labor, and organized struggle shape freedom—and why abolition must build democratic ways to face harm, not merely dismantle prisons and policing.',
  'bell-hooks': 'Meet bell hooks speaking in 2009. Ask how feminism, education, culture, love, and beloved community can resist linked race, class, gender, and patriarchal power without becoming slogans, brands, or private remedies alone.',
  'islamic-philosophy': 'Trace how translators, thinkers, doctors, jurists, and readers remade old texts. Ask how proof, faith, nature, law, and words shaped new forms of knowledge across the many lands and eras of Islam.',
  'al-kindi': 'Follow al-Kindi through texts, logic, number, drugs, music, and ciphers. Ask how shared work made new claims from old sources without making him a lone founder or mere keeper of Greek thought.',
  'al-farabi': 'Follow al-Farabi across logic, science, music, being, and politics. Ask how proof, speech, law, and study might guide a city toward good life without turning his ideal city into a fixed plan.',
  avicenna: 'Enter Avicenna’s linked work on proof, nature, soul, medicine, and being. Ask why essence, existence, what may be, and what must be remain hard problems, not slogans or one short proof about God.',
  'al-ghazali': 'Read al-Ghazali on logic, faith, law, ethics, and spiritual practice. Ask how he tested key claims and why his work was neither a ban on thought nor a simple rejection of philosophy.',
  averroes: 'Follow Ibn Rushd’s work as jurist, physician, and commentator to ask how demonstrative inquiry, interpretation, and revealed Law might relate—and why later portraits of “Averroism” cannot stand in for his own arguments.',
  suhrawardi: 'Enter Suhrawardi’s Illumination. Ask how light, presence, proof, and trained sight reshape knowledge without calling his path mere feeling or using a late portrait as proof of what he thought and did.',
  'mulla-sadra': 'Explore Mulla Sadra on being, change, knowledge, and return. Ask how he remade Avicenna, illumination, theology, and mysticism without forcing tensions into one fixed system or into a simple blend of views.',
  'zhu-xi': 'Read Zhu Xi on study, inquiry, ritual, and attention. Ask how pattern and force shape moral life, and when a shared course of learning aids thought or hardens into a strict rule.',
  berkeley: 'Read Berkeley on matter, sight, science, and God. Ask how things stay real if minds meet ideas, why God sustains their order, and whether his view can fit common sense and life.',
  montesquieu: 'Read Montesquieu on law, liberty, custom, trade, climate, and power. Ask how we compare rules, show why they work, expose harm, or excuse force when the limits of our view stay unseen.',
  rousseau: 'Explore Rousseau on inequality, freedom, learning, and selfhood. Ask how social ties corrupt, why civic unity can coerce, and whom his plans bar by gender, class, and claims about nature and virtue.',
  'adam-smith': 'Read Adam Smith across moral judgment and political economy: sympathy, justice, labor, exchange, education, public institutions, monopoly, and empire show commercial society as a contested human arrangement rather than an automatic market machine.',
  wollstonecraft: 'Trace her work on school, home, rights, labor, and empire. Ask how law trains women to serve, and why freedom must face class, race, barred study, blocked work, and lost public voice.',
  kant: 'Enter Kant’s critical philosophy where experience, knowledge, freedom, obligation, judgment, and public reason meet: critique limits speculative claims while asking whether universal principles can honestly face their own exclusions in practice today.',
  socrates: 'Meet this Roman face and test the practice it recalls: when a sure answer fails under questions, is uncertainty a defect, or the start of care for one’s soul and life today?',
  machiavelli: 'Meet Machiavelli through a later Florentine portrait. Ask how virtù meets fortune, when necessity excuses harm, who judges the crisis, and which laws can curb power while guarding liberty for others today.',
  ficino: 'Study Ficino’s medal and ask what translation does to authority: can readers receive Plato and Plotinus while remaking them through Christian accounts of soul, love, medicine, magic, and ancient wisdom for a new age?',
  bacon: 'Look past Bacon’s court portrait and ask how inquiry works: can records, experiments, criticism, and shared institutions correct error without making useful knowledge an unchecked source of power or harm in public life?',
  galileo: 'Read Galileo’s late portrait beside its lens: how do skilled seeing, mathematics, repeated tests, writing, and public criticism turn strange sights into evidence without placing any instrument or authority alone beyond question?',
  hobbes: 'Meet Hobbes through a late lifetime portrait. Ask what makes rule legitimate: can people authorize a sovereign for protection while retaining liberty to resist danger and challenge failed public power in practice?',
  'political-philosophy': 'Use this civic scene to ask who may rule. Test power, justice, freedom, public voice, and resistance, then ask whose needs and harms shape the terms of shared political life for all.',
  'merleau-ponty': 'Feel how habit, motion, and sight open a shared world before thought. Ask how the lived body guides action, and why flesh names relation without becoming tissue, fate, or a finished creed.',
  levinas: 'Meet the other before choice or gain. Ask how face, speech, duty, and the third party lead from one call to public justice without turning ethics into looks, sympathy, or private feeling.',
  gadamer: 'Read with Gadamer: past views and words shape each question. Ask how dialogue can test bias, change horizons, and serve truth without making old customs right or broad accord the goal today.',
  russell: 'Follow Russell through names, logic, and public life. Ask how shared work, paradox, and changing views made analysis fruitful without making it one final system for each later reader to inherit today.',
  frege: 'Enter Frege’s new logic of signs, sense, and reference. Ask how one failed proof still changed logic and number, and why Russell’s paradox ended a system without ending its tools for later readers.',
  'g-e-moore': 'Meet Moore where common sense and goodness need analysis: ordinary hands, open questions, organic unities, and skeptical pressure show why neither value nor knowledge yields to a slogan or quick proof alone.',
  quine: 'Enter Quine’s web of belief. Ask how meaning, proof, objects, and translation meet experience, why some claims resist change, and whether naturalized inquiry can still tell us what we should believe today.',
  anscombe: 'Ask what someone does, and why. Follow Anscombe through intent, reasons, and practical knowledge, then test why one act has many names, seen results differ from aims, and agents can be wrong.',
  nagarjuna: 'Nāgārjuna asks: if all things arise with other things, what has a fixed core? His reply links arising and emptiness, tests each claim, and guides later Madhyamaka thought, text, and debate today.',
  boethius: 'Boethius joins Greek logic to Latin study and asks how we may face luck, pain, choice, and divine care. His lost plan, prison book, final years, and use shape two linked legacies.',
  'sextus-empiricus': 'Sextus tests each claim, sets one case against another, says not yet, and asks us to go on. His work on truth, signs, cause, mind, and life keeps skeptical doubt in play.',
  marxism: 'Marxism asks how labor, class, profit, and power shape social life, why capitalism changes through conflict, and how shared action might change it. Its theories, movements, aims, and political forms remain contested.',
  eriugena: 'Eriugena put Greek Christian ideas into Latin and asked how all things can come from God yet not be God. Read his bold book on words, the world, and the unknown divine.',
  'medieval-scholasticism': 'Scholastic readers set old books by new doubts and asked what each word meant. See how close study, new texts, and debate made one shared book spark fresh questions and more debate.',
  anselm: 'Anselm joins prayerful inquiry to exact argument, asking what faith seeks to understand about God, freedom, truth, and responsibility. Read the Proslogion beside its early critic and the wider monastic work that frames it.',
  abelard: 'Abelard set rival texts side by side and asked readers to test words and reasons. Follow his work on common terms and moral choice, and keep Héloïse’s own sharp claims in view.',
  aquinas: 'Aquinas tests objections, then answers questions on God, virtue, law, and human ends. Read his unfinished Summa, watch it join many sources, and ask why later fame is no proof by itself.',
  'duns-scotus': 'Scotus asks how one idea of being can join God and creatures yet keep them unlike, and what makes each person this one. Follow his sharp terms through layered texts with care.',
  ockham: 'Ockham asks how signs and thought work without adding things we do not need. Test his famed razor, then see how logic links to fights over wealth, law, power, and just rule.',
  'meister-eckhart': 'Eckhart asks in school works and German sermons how a free heart, clear thought, and words about God may change a life. Read by genre, copies, and later church rulings with care.',
  'marsilius-padua': 'Marsilius asks who may make law, use force, rule, and claim church power. Read his book on civic peace, and see why its chosen citizens do not make it a modern democracy.',
  jainism: 'Enter a Jain cosmos where nonviolence, karma, and care join ideas to daily life. Test how limited views can speak truly, and ask what freedom from harm demands of each of us.',
  mahavira: 'Meet Mahāvīra, the Jain teacher recalled as a ford-maker. See how vows, care, and nonviolence face karmic bonds, while stories of his life remain distinct from firm historical evidence for us today.',
  kanada: 'Follow a layered Vaiśeṣika text as it asks which categories, relations, and imperceptible atoms can explain a changing world without mistaking its realist metaphysics or later commentary for modern physical science itself.',
  patanjali: 'Explore Yoga through a layered text on ethics, breath, focus, and meditation. See why posture is one limb, then ask how a trained mind may find freedom amid change in daily life.',
  vedanta: 'Compare Vedānta schools as they read shared texts on Brahman, self, world, devotion, action, and grace. See why their deep disputes resist one fixed answer for all readers today in every age.',
  shankara: 'Enter Śaṅkara’s Advaita through ideas of self, error, words, and freedom. See why nonduality need not erase daily life, while later sacred stories remain apart from firm historical proof about his life.',
  ramanuja: 'Meet Rāmānuja’s Vedānta, where God, souls, and world form one real whole. Ask how dependence can keep difference, and why freedom may preserve loving bonds rather than erase them in the end.',
  madhva: 'Test Madhva’s claim that God alone is independent while souls and matter remain real and different, then confront what liberation, divine grace, agency, and an unequal hierarchy of souls can mean together.',
  confucius: 'Enter Confucius’s world of learning, ritual, and humane judgment. Trace how a layered collection asks relationships and public roles to earn trust, then decide when inherited forms educate—and when humane criticism must revise them.',
  mencius: 'Meet Mencius’s argument that moral concern begins fragile and grows through practice, livelihood, and criticism of rule. Follow the four beginnings beyond sympathy, and ask what institutions allow people’s capacities to flourish.',
  xunzi: 'Explore Xunzi’s demanding account of education, ritual, and public standards. See why desire requires shaping rather than denial, then ask who can justify inherited rules—and whether constructed order can still welcome correction.',
  laozi: 'Enter the Daodejing through Laozi’s uncertain textual persona. Compare its shifting language of way, potency, and noncoercive action with later legend, and ask how a compact verse resists force without becoming a slogan.',
  zhuangzi: 'Follow Zhuangzi’s tales of skill, change, and shifting views. Let this layered book unsettle fixed ideas of use and self, then ask if freedom can stay alert to harm in daily life.',
  mozi: 'Meet Mozi’s challenge to count harms beyond family and state. Test inclusive concern, public standards, and resistance to aggressive war against the movement’s own hierarchy, discipline, and difficult demands for enforceable judgment.',
  'han-feizi': 'Examine Han Feizi’s hard-edged account of standards, office, and power. Trace how it confronts favoritism and unreliable reports, then ask who can check a ruler when institutional control itself silences public correction.',
} as const satisfies Readonly<Record<string, string>>;

export const museumHallUsesPrimaryEmphasis = (
  definition: MuseumHallDefinition,
): boolean => {
  const supplementalLayouts = definition.layout.supplementalExhibits ?? [];
  const largestSupplementalWidth = Math.max(
    0,
    ...supplementalLayouts.map(({footprint}) => footprint.width),
  );
  const largestSupplementalHeight = Math.max(
    0,
    ...supplementalLayouts.map(({footprint}) => footprint.height),
  );
  return definition.id !== MEDITERRANEAN_GALLERY_ID
    && definition.id !== RENAISSANCE_GALLERY_ID
    && supplementalLayouts.length > 0
    && definition.layout.exhibits.every(({scene}) =>
      scene.footprint.width >= largestSupplementalWidth - .001
      && scene.footprint.height >= largestSupplementalHeight - .001);
};

/**
 * Resolves the exact production inputs for one canonical wall plaque. The
 * renderer and the canonical-plaque browser audit both consume this path.
 */
export const resolvePrimaryPlaqueConfiguration = (
  definition: MuseumHallDefinition,
  layout: MuseumExhibitLayout,
): PrimaryPlaqueConfiguration => {
  const hall = getMuseumHallCatalog(definition.id);
  const catalog = hall?.exhibits.find(({id}) => id === layout.id);
  const roomIndex = hall?.zones.findIndex(({id}) => id === layout.zoneId) ?? -1;
  const room = hall?.zones[roomIndex];
  const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'));
  if (!hall || !catalog || !room || !backing) {
    throw new Error(`Cannot resolve the canonical primary plaque for ${definition.id}/${layout.zoneId}/${layout.id}.`);
  }

  const mediterranean: MediterraneanExhibitCuration | undefined = definition.id === MEDITERRANEAN_GALLERY_ID
    ? MEDITERRANEAN_EXHIBIT_CURATION[layout.id as MediterraneanExhibitId]
    : undefined;
  const renaissance = definition.id === RENAISSANCE_GALLERY_ID
    ? RENAISSANCE_EXHIBIT_CURATION[layout.id as RenaissancePrimaryExhibitId]
    : undefined;
  const hasMedia = layout.scene.mediaMounts.length > 0;
  const primaryEmphasis = museumHallUsesPrimaryEmphasis(definition);
  const physicalWidth = backing.size.width - .16;
  const physicalHeight = mediterranean
    ? .7
    : hasMedia
      ? primaryEmphasis ? .72 : .42
      : primaryEmphasis
        ? backing.size.height - .16
        : Math.min(1.55, backing.size.height - .48);
  const textureSize = museumTextureDimensionsForPlane(
    physicalWidth,
    physicalHeight,
    mediterranean
      ? MUSEUM_TEXTURE_SPECS.mediterraneanNameStrip
      : primaryEmphasis && hasMedia
        ? MUSEUM_TEXTURE_SPECS.platoSupplementalLabel
        : MUSEUM_TEXTURE_SPECS.contemporaryNameStrip,
  );

  return {
    contentKind: 'primary',
    title: catalog.displayName,
    kicker: '',
    subtitle: mediterranean?.frontTitle
      ?? PRIMARY_PLAQUE_INVITATION_OVERRIDES[layout.id as keyof typeof PRIMARY_PLAQUE_INVITATION_OVERRIDES]
      ?? catalog.question,
    width: textureSize.width,
    height: textureSize.height,
    theme: mediterranean ? 'mediterranean' : 'dark',
    hallId: definition.id,
    hallTitle: hall.title,
    roomId: String(layout.zoneId),
    roomTitle: room.title,
    exhibitId: layout.id,
    entityKind: catalog.entityKind,
    entityId: catalog.entityId,
    roomIndex,
    physicalWidth,
    physicalHeight,
    mediterraneanGroupLabel: mediterranean?.groupLabel,
    renaissance: Boolean(renaissance),
  };
};
