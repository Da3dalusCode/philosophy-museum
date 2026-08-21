import type {MuseumAssetId} from './museumAssetTypes';
import {
  CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_SIGN_COPY,
  getCritiquePowerDeconstructionInstallationSlot,
} from './critiquePowerDeconstructionGalleryCuration';
import type {CritiquePowerDeconstructionGalleryAssetId} from './critiquePowerDeconstructionGalleryAssets';
import {reviewCritiquePowerDeconstructionSupplementalExhibit} from './gallery22And23SupplementalReview';
import {authorSupplementalExhibit} from './museumSupplementalAuthoring';
import type {
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {
  CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_SIGN_COPY,
};

export const CRITIQUE_POWER_DECONSTRUCTION_PALETTE = Object.freeze({
  charcoal: '#292b34',
  archiveBlue: '#44677a',
  signalRed: '#8a4b4e',
  violet: '#675878',
  brass: '#9b7744',
  civicGreen: '#4f7067',
  paper: '#e4dccb',
});

export type CritiquePowerDeconstructionSupplementalExhibitId =
  | 'continental-saussure-sign-system'
  | 'continental-freud-interpretive-depth'
  | 'continental-college-institutions'
  | 'continental-berlin-history-rupture'
  | 'continental-freiburg-phenomenological-line'
  | 'foucault-panopticon-visibility'
  | 'foucault-clinical-gaze'
  | 'foucault-bertillon-examination'
  | 'foucault-mettray-disciplinary-labor'
  | 'foucault-archive-practice'
  | 'derrida-colonial-language-algeria'
  | 'derrida-rosetta-translation'
  | 'derrida-babel-difference'
  | 'derrida-ens-institution'
  | 'derrida-writing-material-trace'
  | 'critical-theory-institute'
  | 'habermas-coffeehouse-public-sphere'
  | 'habermas-parliament-deliberation'
  | 'critical-theory-radio-culture-industry'
  | 'critical-theory-adorno-memorial';

type Parent =
  | 'continental-philosophy'
  | 'foucault'
  | 'derrida'
  | 'habermas';

type CuratedInput = {
  id: CritiquePowerDeconstructionSupplementalExhibitId;
  assetId: CritiquePowerDeconstructionGalleryAssetId;
  parent: Parent;
  displayName: string;
  shortTitle: string;
  focus: string;
  dateLabel: string;
  question: string;
  lead: string;
  ideas: readonly [string, string, string];
  cautions: readonly [string, string];
  imageSource: string;
  academicSource?: MuseumSupplementalInterpretationSource;
};

const image = (url: string): MuseumSupplementalInterpretationSource => ({
  label: 'Wikimedia Commons — displayed object or image record',
  url,
  kind: 'collection-record',
});

const academicByParent: Readonly<
  Record<Parent, MuseumSupplementalInterpretationSource>
> = {
  'continental-philosophy': {
    label: 'Internet Encyclopedia of Philosophy — Continental Philosophy index',
    url: 'https://iep.utm.edu/category/traditions/continental/',
    kind: 'academic-reference',
  },
  foucault: {
    label: 'Stanford Encyclopedia of Philosophy — Michel Foucault',
    url: 'https://plato.stanford.edu/entries/foucault/',
    kind: 'academic-reference',
  },
  derrida: {
    label: 'Stanford Encyclopedia of Philosophy — Jacques Derrida',
    url: 'https://plato.stanford.edu/entries/derrida/',
    kind: 'academic-reference',
  },
  habermas: {
    label: 'Stanford Encyclopedia of Philosophy — Jürgen Habermas',
    url: 'https://plato.stanford.edu/entries/habermas/',
    kind: 'academic-reference',
  },
};

const academic = (
  label: string,
  url: string,
): MuseumSupplementalInterpretationSource => ({
  label,
  url,
  kind: 'academic-reference',
});

const curated = (input: CuratedInput): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({
    id: input.id as MuseumSupplementalExhibitId,
    assetId: input.assetId as MuseumAssetId,
    displayName: input.displayName,
    shortTitle: input.shortTitle,
    workLabel: input.focus,
    dateLabel: input.dateLabel,
    question: input.question,
    frontSubtitle: input.question,
    lead: input.lead,
    keyIdeas: input.ideas,
    cautions: input.cautions,
    sections: [
      {heading: 'Read the evidence', paragraph: input.ideas[0]},
      {heading: 'Reconstruct the argument', paragraph: input.ideas[1]},
      {heading: 'Keep the tension open', paragraph: input.ideas[2]},
    ],
    sources: [
      image(input.imageSource),
      input.academicSource ?? academicByParent[input.parent],
    ],
    articleRoute: input.parent === 'continental-philosophy'
      ? {kind: 'branch' as const, branchId: 'continental-philosophy'}
      : {kind: 'philosopher' as const, philosopherId: input.parent},
    entityKind: input.parent === 'continental-philosophy'
      ? 'branch'
      : 'philosopher',
    panelKicker: 'Gallery 23 work and context exhibit',
  });

export const CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBITS = ([
  curated({
    id: 'continental-saussure-sign-system',
    assetId: 'critique-saussure-jullien-portrait',
    parent: 'continental-philosophy',
    displayName: 'Saussure: Meaning Through Difference',
    shortTitle: 'The Sign as a Relation',
    focus: 'STRUCTURAL LINGUISTICS · SIGNIFIER, SIGNIFIED, DIFFERENCE, AND SYSTEM',
    dateLabel: 'Portrait before 1913 · Course in General Linguistics published 1916',
    question: 'What changes when meaning is approached through relations inside a sign-system rather than as a label attached to a thing?',
    lead: 'Saussure’s lectures became a major resource for twentieth-century structuralism, but the familiar Course in General Linguistics was assembled after his death by Charles Bally and Albert Sechehaye from student notes and related materials. It distinguishes the signifier from the signified, treats their bond as conventional rather than naturally necessary, and emphasizes that linguistic values arise through differences within a system. Later anthropologists, psychoanalysts, and theorists transformed these proposals far beyond linguistics.',
    ideas: [
      'The lifetime portrait and posthumous book belong to different evidentiary histories. The image securely records Saussure’s appearance; it cannot certify the wording of a text edited after his death. Likewise, “arbitrary” does not mean that an individual speaker can assign any meaning at will. A language works because shared differences and conventions constrain what a sign can do.',
      'Structural attention shifts from isolated terms toward a network of contrasts: a sound, written mark, or concept has value partly because it differs from alternatives. This does not prove that language encloses every reality or that history is irrelevant. It offers a method for asking what system of relations makes a meaningful unit intelligible at a given moment.',
      'French structuralism was not the automatic unfolding of one linguist’s doctrine. Lévi-Strauss, Lacan, Barthes, and others adapted selected Saussurean distinctions to kinship, the unconscious, myth, and cultural signs, while Foucault and Derrida later criticized assumptions associated with structural analysis. Intellectual inheritance here is transformation and dispute, not a straight influence arrow.',
    ],
    cautions: [
      'Do not treat the 1916 Course as a verbatim book written and published by Saussure.',
      'The arbitrariness of the sign is social and relational, not permission for private meaning without constraint.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Ferdinand_de_Saussure_by_Jullien.png',
    academicSource: academic(
      'Internet Encyclopedia of Philosophy — Literary Theory, structuralism section',
      'https://iep.utm.edu/literary/',
    ),
  }),
  curated({
    id: 'continental-freud-interpretive-depth',
    assetId: 'critique-freud-couch-london-2019',
    parent: 'continental-philosophy',
    displayName: 'Freud: A Subject Not Transparent to Itself',
    shortTitle: 'Interpretation on the Couch',
    focus: 'PSYCHOANALYSIS · UNCONSCIOUS, SYMPTOM, DESIRE, AND INTERPRETATION',
    dateLabel: 'Freud’s psychoanalytic practice developed from the 1890s · couch photographed 2019',
    question: 'How does critique change when speech and action may carry meanings the conscious speaker neither intends nor fully knows?',
    lead: 'The couch belongs to a practice in which memory, fantasy, bodily symptom, free association, resistance, and transference become materials for interpretation. Freud’s unconscious is not simply a hidden container waiting to be opened; it names dynamic processes inferred through formations such as dreams, slips, symptoms, and repetitions. Twentieth-century philosophers drew on this divided subject while sharply disagreeing about clinical evidence, sexuality, authority, and the scientific status of psychoanalysis.',
    ideas: [
      'The consulting-room object places interpretation in a relationship. One person speaks under a distinctive arrangement while another listens, intervenes, and occupies an asymmetrical professional role. That material scene matters because psychoanalytic knowledge is produced through a practice, not extracted from a silent object by a neutral observer.',
      'A symptom can be approached as a compromise formation rather than meaningless noise: incompatible wishes, prohibitions, defenses, and histories may converge in one act or bodily pattern. The claim contests a self-transparent rational subject, but it does not make every interpretation equally persuasive. Interpretive authority still requires evidence, revision, and attention to suggestion.',
      'Later thinkers did not inherit one Freud. Critical Theory investigated repression and social authority; Lacanian psychoanalysis reorganized the unconscious through language; Derrida read Freud on writing and trace; Foucault challenged psychoanalysis within histories of confession and sexuality. The productive family resemblance is a contested problem of subjectivity, not membership in a unified school.',
    ],
    cautions: [
      'The couch does not authenticate every Freudian explanation or the efficacy of psychoanalytic treatment.',
      'Do not turn “the unconscious” into an all-purpose excuse that makes a claim immune to counterevidence.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Sigmund_Freud%27s_couch.jpg',
    academicSource: academic(
      'Internet Encyclopedia of Philosophy — Sigmund Freud',
      'https://iep.utm.edu/freud/',
    ),
  }),
  curated({
    id: 'continental-college-institutions',
    assetId: 'critique-college-de-france-courtyard',
    parent: 'continental-philosophy',
    displayName: 'Institutions Make Traditions Visible',
    shortTitle: 'Chairs, Lectures, and Archives',
    focus: 'INSTITUTION · APPOINTMENT, CURRICULUM, LECTURE, ARCHIVE, AND PUBLIC',
    dateLabel: 'Collège de France founded 1530 · courtyard photographed 2006',
    question: 'How much of a philosophical “tradition” is produced by institutions that appoint, teach, publish, archive, and translate?',
    lead: 'The Collège de France foregrounds philosophy’s institutional infrastructure. Named chairs establish topics, public lectures gather audiences, archives preserve some materials, and publishers and universities determine which work circulates across languages. Foucault’s chair in the History of Systems of Thought is one important episode, but the building also warns against reducing a heterogeneous field to Paris or to a roster of famous men.',
    ideas: [
      'Architecture makes durable what intellectual labels can hide: rooms, salaries, appointment procedures, calendars, and audiences. These conditions do not mechanically determine an argument, yet they shape who can sustain research, whose voice reaches a public, and what counts as a recognized philosophical problem.',
      '“Continental philosophy” became especially powerful as a retrospective category in anglophone departments, anthologies, and curricula. The label can help orient readers across phenomenology, existentialism, hermeneutics, Critical Theory, structuralism, and deconstruction. It becomes misleading when it suggests those movements share one method or occupy one uncontested European lineage.',
      'Institutional history also reveals absences. Colonial education, gendered appointments, class barriers, translation markets, exile, and disciplinary boundaries affect the canon. A responsible gallery therefore treats its four primaries as doors into disputes, not as a complete inventory of twentieth-century critique.',
    ],
    cautions: [
      'The Collège de France does not represent all French, European, or “continental” philosophy.',
      'Institutional context can explain conditions of visibility without reducing ideas to careers or buildings.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:College_de_France.jpg',
  }),
  curated({
    id: 'continental-berlin-history-rupture',
    assetId: 'critique-berlin-wall-brandenburg-1989',
    parent: 'continental-philosophy',
    displayName: 'History After the Wall',
    shortTitle: 'Rupture and Retrospect',
    focus: 'HISTORY · EVENT, STRUCTURE, IDEOLOGY, MEMORY, AND NARRATIVE',
    dateLabel: 'Berlin Wall opened 9 November 1989 · photograph from that night',
    question: 'How should philosophy interpret an event that changes what earlier historical narratives appear able to explain?',
    lead: 'People on the Berlin Wall confront theory with an event experienced as opening, danger, celebration, and uncertainty. The collapse of East German border controls unsettled Cold War political arrangements and encouraged sweeping claims about liberal triumph, Marxism’s failure, and the end of history. Critical inquiry asks how an event is made legible through longer structures without dissolving the agency and contingency visible in the crowd.',
    ideas: [
      'A photograph freezes one charged interval while hiding causes and consequences outside its frame. Protest movements, policy decisions, Soviet changes, economic pressures, media circulation, and accidents of announcement all belong to the event’s history. Reading rupture therefore requires both close attention to contingency and accounts of institutions that made the moment possible.',
      'Twentieth-century European philosophies offered competing models of history: dialectical development, genealogy, discontinuity, memory, ideology critique, and communicative learning. No single model owns 1989. The event tests whether a theory can acknowledge novelty and plurality rather than using history as a stage on which its conclusion was guaranteed in advance.',
      'Retrospect reorganizes meaning. The same wall can signify dictatorship, geopolitical division, family separation, antifascist state narrative, protest, reunification, and later memorial culture. Philosophical history must explain why interpretations conflict and whose losses disappear when celebration becomes the only authorized account.',
    ],
    cautions: [
      'One event does not prove or refute an entire philosophical family.',
      'Do not collapse the histories of East Germany, Soviet Marxism, Marx’s texts, and Critical Theory into one object.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:BerlinWall-BrandenburgGate.jpg',
    academicSource: academic(
      'Stanford Encyclopedia of Philosophy — Philosophy of History',
      'https://plato.stanford.edu/entries/history/',
    ),
  }),
  curated({
    id: 'continental-freiburg-phenomenological-line',
    assetId: 'critique-freiburg-university-building',
    parent: 'continental-philosophy',
    displayName: 'Freiburg: Inheritance Without Innocence',
    shortTitle: 'Phenomenology and Hermeneutics',
    focus: 'LINEAGE · HUSSERL, HEIDEGGER, EXPERIENCE, INTERPRETATION, AND POLITICS',
    dateLabel: 'Husserl at Freiburg from 1916 · Heidegger succeeded him in 1928 · building photographed 2005',
    question: 'How can a later thinker transform a teacher’s project while political history makes any simple story of succession untenable?',
    lead: 'Freiburg is a consequential site in the transformation of phenomenology. Husserl investigated intentional consciousness and the structures through which objects appear; Heidegger redirected phenomenology toward being-in-the-world, temporality, and hermeneutic understanding. Their institutional succession did not amount to philosophical agreement, and Heidegger’s Nazism makes a celebratory genealogy morally and historically impossible.',
    ideas: [
      'The building places abstract method inside a university where teaching, appointments, dedications, dismissals, and political authority mattered. Husserl’s Jewish background and exclusion under National Socialism belong to this institutional history. They cannot be treated as an incidental footnote to a clean line from teacher to successor.',
      'Heidegger’s hermeneutic phenomenology argues that understanding is not a detached technique added after experience. Human existence already encounters a meaningful world through practical involvement, mood, language, and inherited possibilities. This transformation influenced Gadamer, existentialism, and deconstruction while remaining contested by other phenomenologists.',
      'The philosophical and political questions cannot be settled by either total separation or total identity. Heidegger’s concepts require textual analysis; his commitments and institutional conduct require direct historical judgment. Responsible reception asks where political hierarchies enter the thinking without pretending that one architectural site delivers an automatic verdict.',
    ],
    cautions: [
      'Do not narrate Husserl-to-Heidegger as harmonious succession or erase Husserl’s later critique.',
      'Acknowledging Heidegger’s influence must include, not conceal, his Nazism and university role.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Universit%C3%A4t_Freiburg_Kollegiengeb%C3%A4ude_I_(Altbau).jpg',
    academicSource: academic(
      'Stanford Encyclopedia of Philosophy — Hermeneutics',
      'https://plato.stanford.edu/entries/hermeneutics/',
    ),
  }),

  curated({
    id: 'foucault-panopticon-visibility',
    assetId: 'critique-panopticon-outram-proposal-1880s',
    parent: 'foucault',
    displayName: 'The Panoptic Diagram Travels',
    shortTitle: 'Asymmetric Visibility',
    focus: 'DISCIPLINE · COLONIAL TRANSFER, VISIBILITY, UNCERTAINTY, AND SELF-REGULATION',
    dateLabel: 'Unbuilt Outram proposal, 1880s · Discipline and Punish published 1975',
    question: 'What changes when a plan for asymmetric visibility travels into a colonial prison proposal?',
    lead: 'McNair’s unbuilt proposal for Outram prison in colonial Singapore arranges radiating wings around a central hub. It is not Bentham’s original Panopticon, and Foucault did not build his argument from this drawing. The proposal instead makes historical transfer visible: inspection principles could be adapted, recombined, and projected into institutions far from the metropolitan debates in which the panoptic diagram was formulated.',
    ideas: [
      'The drawing’s radial geometry concentrates circulation and sightlines around a central point. Foucault’s analysis helps ask how such arrangements distribute knowledge unequally: the inspected can be made visible without knowing when observation occurs, so possible scrutiny can shape conduct before direct intervention is needed.',
      'Its colonial setting matters. Institutional forms did not simply diffuse unchanged from Europe; administrators and designers translated them within imperial projects of confinement, labor, classification, and rule. The artifact therefore prompts a question Foucault’s diagram alone cannot settle: whose authority moved the design, and what local histories did it encounter?',
      'Discipline is productive as well as restrictive. Timetables, exercises, ranks, files, examinations, and comparisons train capacities while making individuals measurable. Modern cameras and data systems may invite analogy, but their distributed, predictive, commercial, and automated operations require fresh historical analysis rather than a one-word “Panopticon” label.',
    ],
    cautions: [
      'This is an unbuilt 1880s proposal for colonial Singapore, not Bentham’s original plan and not a prison Foucault studied in Discipline and Punish.',
      'Panopticism names a diagram of a mechanism, not a claim that every modern institution has one architectural center.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:J_F_A_McNair,_architectural_drawing_of_a_proposed_prison_at_Outram,_Singapore_(1880s).jpg',
  }),
  curated({
    id: 'foucault-clinical-gaze',
    assetId: 'critique-salpetriere-clinical-lesson',
    parent: 'foucault',
    displayName: 'The Clinic Makes a Case Visible',
    shortTitle: 'Observation and the Clinical Gaze',
    focus: 'MEDICINE · GAZE, CASE, BODY, SPEECH, AND INSTITUTION',
    dateLabel: 'Brouillet painting 1887 · The Birth of the Clinic published 1963',
    question: 'What institutional arrangements make a body appear as an intelligible medical case?',
    lead: 'Brouillet stages Charcot’s lesson as a theater of expertise: one patient’s body is displayed, assistants support her, and an audience learns how to see. Foucault’s history of the clinic asks how modern medicine reorganized relations among signs, lesions, bodies, spaces, and professional speech. The “medical gaze” is not simply an individual doctor staring coldly; it is a historically structured way of making disease visible and sayable.',
    ideas: [
      'The composition distributes roles. The patient is both suffering person and demonstrative object; Charcot occupies interpretive authority; the amphitheater converts a case into reproducible professional knowledge. Because the painting was designed and staged, it also shows how medicine represented its own legitimacy.',
      'Clinical perception joins observation to language, classification, hospital organization, and post-mortem anatomy. A fact becomes medically salient inside this network. Foucault’s point is not that disease is invented by words, but that what can count as an object of medical knowledge has a history.',
      'Critique must hold insight and danger together. Medical practices can relieve suffering and build reliable knowledge while depersonalizing patients or excluding their testimony. Historical analysis does not require rejecting medicine; it asks how authority is organized and how other forms of knowledge are silenced.',
    ],
    cautions: [
      'The 1887 painting is a staged representation, not transparent documentary evidence.',
      'The clinical gaze is an institutional relation, not a diagnosis of every individual clinician’s motives.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Une_le%C3%A7on_clinique_%C3%A0_la_Salp%C3%AAtri%C3%A8re.jpg',
  }),
  curated({
    id: 'foucault-bertillon-examination',
    assetId: 'critique-bertillon-evidence-display',
    parent: 'foucault',
    displayName: 'Bertillon: Making the Individual a File',
    shortTitle: 'Examination and Identification',
    focus: 'EXAMINATION · MEASUREMENT, PHOTOGRAPHY, FILE, NORM, AND CASE',
    dateLabel: 'Police display prepared for the 1889 Paris exposition · museum photograph 2010',
    question: 'How do measurement, images, and files transform a singular person into a comparable administrative case?',
    lead: 'The Bertillon display gathers standardized portraits, anthropometric instruments, and crime-scene photography into one apparatus. Identification becomes a repeatable procedure rather than a witness’s memory or a ruler’s mark. For Foucault, the examination combines hierarchical observation with normalizing judgment and documentation, producing an individual who is both subject to power and object of knowledge.',
    ideas: [
      'Standardization makes comparison possible. Pose, scale, measurement points, vocabulary, and filing order must be stabilized before records can be searched across cases. The apparatus therefore does not merely capture a preexisting identity; it selects the features through which official identity will be recognized.',
      'The case file individualizes in a distinctive way. Traditional power often made rulers highly visible and subjects anonymous; disciplinary documentation accumulates detail about pupils, patients, workers, soldiers, and prisoners. Biography becomes an administrative technology tied to norms, deviations, risks, and interventions.',
      'Such practices can support accountability as well as coercion, so critique cannot stop at declaring documentation oppressive. It must ask who sets categories, how error can be contested, which populations receive intensified scrutiny, and how records move between institutions. Those questions remain urgent without pretending today’s systems are unchanged Bertillonage.',
    ],
    cautions: [
      'The displayed photograph shows a later museum presentation of an 1889 police exhibit.',
      'There is no evidence that this exact case caused Foucault’s account of examination.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Alphonse_Bertillon,_Scene_of_Crime_Evidence_Photography,_Mus%C3%A9e_de_la_Pr%C3%A9fecture_de_Police,_Paris.jpg',
  }),
  curated({
    id: 'foucault-mettray-disciplinary-labor',
    assetId: 'critique-mettray-shoemakers-c1910',
    parent: 'foucault',
    displayName: 'Mettray: Training, Labor, and Correction',
    shortTitle: 'The Carceral Continuum',
    focus: 'INSTITUTION · WORKSHOP, FAMILY MODEL, TRAINING, PUNISHMENT, AND REFORM',
    dateLabel: 'Mettray opened 1840 · postcard c. 1910 · Discipline and Punish published 1975',
    question: 'What happens when punishment is organized as education, family discipline, productive labor, and moral reform at once?',
    lead: 'Mettray’s agricultural penal colony combined workshops, quasi-family groups, religious instruction, surveillance, and correction for boys and young men. Foucault closes Discipline and Punish by giving its 1840 opening symbolic importance in the formation of a “carceral” network. The postcard of shoemakers is valuable precisely because it is not neutral: posed labor helped the institution present discipline as productive reform.',
    ideas: [
      'Tools, arranged bodies, supervisors, and finished wooden shoes make work both activity and display. Labor may teach a skill, produce value, structure time, and enforce obedience simultaneously. The same practice cannot be classified as either benevolent education or naked punishment without examining lived conditions and authority.',
      'The carceral continuum names connections among penal institutions and ostensibly non-penal sites through shared techniques of supervision, normalization, examination, and correction. It does not mean that a school and a prison are morally identical. It asks how techniques travel while their legal force and intensity differ.',
      'Institutional self-images require source criticism. Postcards, annual reports, reform rhetoric, disciplinary records, and testimony preserve unequal perspectives. A history centered only on administrative intention can mistake order in the image for consent among those compelled to stand within it.',
    ],
    cautions: [
      'The c. 1910 postcard cannot represent every period or inmate experience at Mettray.',
      'Shared disciplinary techniques do not make all institutions equivalent to prisons.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Colonie_de_Mettray_CP_les_sabotiers.jpg',
  }),
  curated({
    id: 'foucault-archive-practice',
    assetId: 'critique-bnf-labrouste-reading-room',
    parent: 'foucault',
    displayName: 'The Archive Is More Than Stored Paper',
    shortTitle: 'Rules of the Sayable',
    focus: 'ARCHAEOLOGY · STATEMENT, DISCOURSE, CLASSIFICATION, ARCHIVE, AND METHOD',
    dateLabel: 'The Archaeology of Knowledge published 1969 · Salle Labrouste photographed 2022',
    question: 'What makes some statements available as knowledge while others remain unthinkable, inaudible, or unpreserved?',
    lead: 'The reading room offers the archive in its ordinary material sense: documents are selected, described, shelved, preserved, requested, and read. Foucault also uses “archive” for the historical system governing the appearance and transformation of statements. Archaeology maps regularities across discourse without treating every text as the expression of one authorial consciousness or one timeless idea.',
    ideas: [
      'Material archives are active institutions. Catalogues, acquisition policies, classification systems, closures, digitization, and reading permissions shape what researchers can find. Absence may result from destruction, exclusion, noncollection, or a practice that left no durable record—not from historical insignificance.',
      'A statement is more than a grammatical sentence. Its identity depends on a field of use, authorized positions, objects, concepts, and possible repetition. Archaeological description asks how such relations form an “archive” of what could count as meaningful or true in a period.',
      'Foucault’s later genealogies place greater emphasis on practices, struggle, bodies, and power, but archaeology is not simply discarded. The methods overlap and shift across projects. Reading them as one fixed formula misses the experimental character of his histories.',
    ],
    cautions: [
      'Foucault’s archive is not identical with a library building or a collection of old documents.',
      'Archaeology and genealogy overlap and change; they should not be forced into one rigid two-step method.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Biblioth%C3%A8que_nationale_de_France_Salle_Labrouste.jpg',
  }),

  curated({
    id: 'derrida-colonial-language-algeria',
    assetId: 'critique-french-algeria-1934-map',
    parent: 'derrida',
    displayName: 'Algeria: Language Without Innocent Ownership',
    shortTitle: 'Colonial Language and Citizenship',
    focus: 'COLONIALITY · FRENCH LANGUAGE, CITIZENSHIP, JEWISHNESS, EXCLUSION, AND MEMORY',
    dateLabel: 'Derrida born in El Biar in 1930 · Vichy citizenship exclusion from 1940',
    question: 'How does colonial history unsettle the fantasy that a speaker simply owns a pure mother tongue?',
    lead: 'Derrida was born into a Jewish family in French-ruled Algeria and educated in French colonial institutions. Vichy measures stripped Algerian Jews of French citizenship and antisemitic quotas expelled him from school. His later reflections on “monolingualism” examine the paradox of inhabiting a language that is intimately one’s own yet arrives through institutions, prohibitions, accents, education, and colonial power.',
    ideas: [
      'The map makes administration look settled through lines, departments, names, and territorial color. Those visual decisions belong to colonial rule: they organize land and population from the perspective of a state. Reading the map critically means asking which languages, communities, displacements, and forms of belonging its categories suppress.',
      'To say that one speaks only one language does not establish sovereign possession of it. Vocabulary, grammar, names, and standards precede an individual, and authorities regulate which forms count as educated or legitimate. Derrida turns this nonownership into a general philosophical problem without allowing its colonial and Jewish history to disappear.',
      'Biography can orient interpretation but should not become a master key. Colonial exclusion matters to Derrida’s writing on language, identity, hospitality, and citizenship, yet no concept follows mechanically from one childhood event. Textual arguments and historical conditions must be held together without reducing either to the other.',
    ],
    cautions: [
      'The contemporary map is a visualization of colonial administration, not a neutral image of Algeria.',
      'Do not derive deconstruction as a whole from biography or treat one life as representative of all colonized Algerians.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:French_Algeria_1934-1955_administrative_map-fr.svg',
  }),
  curated({
    id: 'derrida-rosetta-translation',
    assetId: 'critique-rosetta-stone-babelstone',
    parent: 'derrida',
    displayName: 'The Rosetta Stone: Translation Has a History',
    shortTitle: 'Scripts, Decree, and Decipherment',
    focus: 'TRANSLATION · SCRIPT, DIFFERENCE, AUTHORITY, SURVIVAL, AND COLLECTION',
    dateLabel: 'Decree 196 BCE · found 1799 · British Museum since 1802',
    question: 'Does the presence of related texts in several scripts make translation transparent, or expose the labor and power required to establish equivalence?',
    lead: 'The Rosetta Stone preserves versions of a Ptolemaic decree in hieroglyphic, Demotic, and Greek scripts. Its survival helped scholars decipher Egyptian writing, but the achievement depended on comparison, prior knowledge, hypotheses, rival scholars, and institutional access. The stone therefore makes translation materially possible while refusing the fantasy that meanings simply duplicate themselves without remainder.',
    ideas: [
      'One object contains neither three identical visual texts nor three unrelated works. Scripts organize sound, word, title, and sacred or administrative authority differently. Translation requires a claim of correspondence built through difference, not the discovery of a perfectly shared surface.',
      'Derrida’s work asks why a mark must be repeatable beyond the original speaker and context in order to function at all. That repeatability makes communication possible and also permits drift, citation, reinterpretation, and error. The stone’s long afterlife offers a material prompt for the problem; it is not evidence from which Derrida derived the concept.',
      'Decipherment is inseparable from empire and collection. French soldiers found the stone during invasion; British forces took it under the Capitulation of Alexandria; the British Museum preserves and displays it. Translation can expand knowledge while acquisition and ownership remain ethically contested.',
    ],
    cautions: [
      'The Rosetta Stone has no documented connection to Derrida and does not “prove” deconstruction.',
      'Its Ptolemaic, colonial, and museum histories must not be reduced to a generic symbol of language.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Rosetta_Stone_at_the_British_Museum.jpg',
  }),
  curated({
    id: 'derrida-babel-difference',
    assetId: 'critique-bruegel-tower-babel',
    parent: 'derrida',
    displayName: 'Babel: The Demand and Failure of Total Translation',
    shortTitle: 'Translation at Babel',
    focus: 'BABEL · PROPER NAME, MULTIPLICITY, TRANSLATABILITY, AND INCOMPLETION',
    dateLabel: 'Bruegel painting 1563 · Derrida’s “Des Tours de Babel” published 1985 in English',
    question: 'Why can translation be both necessary and structurally unable to deliver a final, complete equivalence?',
    lead: 'Bruegel’s immense unfinished tower stages building, command, labor, and linguistic dispersion in one crowded scene. Derrida reads the Babel narrative as a double bind: the multiplication of languages demands translation while making total transparent translation impossible. “Babel” itself behaves as a name and a translatable term, unsettling any clean border between proper name and common meaning.',
    ideas: [
      'The tower’s construction depends on coordination across levels that no viewer can survey at once. Its apparent unity contains broken arches, divergent tasks, and an unfinished summit. The painting therefore supports close looking at a received Babel image without becoming a diagram of Derrida’s argument.',
      'A translation must be answerable to a prior text while becoming an event in another language. Perfect substitution would make the translation unnecessary; complete independence would stop being translation. Fidelity operates inside this tension rather than eliminating it.',
      'Untranslatability is not a reason to abandon translation or romanticize sealed languages. It names the responsibility to work without a final guarantee, attend to idiom and history, and acknowledge what a version changes. Multiple translations can reveal a text’s possibilities without converging on one last, context-free form.',
    ],
    cautions: [
      'Deconstruction does not claim that communication or translation is impossible.',
      'Bruegel’s Christian painting predates Derrida and should not be presented as his illustration.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg',
  }),
  curated({
    id: 'derrida-ens-institution',
    assetId: 'critique-ens-rue-ulm-c1900',
    parent: 'derrida',
    displayName: 'Deconstruction Inside the Institution',
    shortTitle: 'The École and the Canon',
    focus: 'FORMATION · EXAMINATION, CANON, TEACHING, MARGIN, AND INSTITUTION',
    dateLabel: 'Postcard c. 1900 · Derrida entered the École normale supérieure in 1952',
    question: 'How can critique work inside institutions whose distinctions, examinations, and canons it also puts into question?',
    lead: 'The École normale supérieure formed generations of French teachers, philosophers, and public intellectuals through competitive selection and an intense canon. Derrida studied and later taught within this institutional world while contesting philosophy’s exclusions and disciplinary borders. Deconstruction is therefore not an external hammer applied to a building; it is a reading practice that inhabits inherited structures and exposes tensions they require but cannot master.',
    ideas: [
      'An entrance gate marks selection materially. Examinations, credentials, curricula, and professional networks can cultivate rigorous scholarship while reproducing class, colonial, gender, and disciplinary exclusions. An institution’s universal language may conceal the particular routes by which one gains authority to speak it.',
      'Deconstructive reading works from distinctions a text or institution needs—speech/writing, inside/outside, original/supplement, philosophy/literature—and asks where the subordinated term already supports the privileged one. The result is not simple reversal. A reversal would preserve the same hierarchy with positions exchanged.',
      'Institutions can host their own criticism without automatically being transformed by it. Teaching, publishing, collective organizing, and curricular revision make critique practical, but they also risk turning a disruptive method into a branded specialty. The tension between inheritance and alteration remains open.',
    ],
    cautions: [
      'Deconstruction is not demolition, arbitrary suspicion, or the claim that distinctions never matter.',
      'The c. 1900 postcard predates Derrida and cannot document his student experience.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:%C3%89cole_normale_sup%C3%A9rieure,_rue_d%27Ulm,_Paris,_vers_1900.jpg',
  }),
  curated({
    id: 'derrida-writing-material-trace',
    assetId: 'critique-writing-tablet-stylus-london',
    parent: 'derrida',
    displayName: 'A Mark Survives Its Writer',
    shortTitle: 'Trace and Iterability',
    focus: 'WRITING · MARK, SUPPORT, ABSENCE, REPEATABILITY, AND CONTEXT',
    dateLabel: 'Roman tablet dated 8 January 57 CE · photographed 2020',
    question: 'What must be true of a mark for it to function when its writer, reader, and original situation are absent?',
    lead: 'A waxed wooden tablet carried a commercial transaction across time through marks that could be read beyond the moment of inscription. Derrida generalizes a related problem: any sign must be iterable—repeatable in another context—to function as a sign. That capacity enables communication and preservation while also making quotation, alteration, misunderstanding, and unforeseen reuse possible.',
    ideas: [
      'Writing depends on support, spacing, tools, conventions, and the possibility of erasure. These are not secondary accidents added to an already complete meaning. They help make a mark identifiable as the same kind of mark across materially different occasions.',
      'The “trace” does not mean a faint physical residue hiding an original presence. It names how difference and retention structure what appears: a term bears relations to what it is not and to prior or possible iterations. Meaning is possible through those differences rather than rescued from them by a perfectly present intention.',
      'Authorial intention remains relevant but cannot exhaust every future use. A contract, joke, promise, or philosophical sentence must work through conventions others can repeat, including after the author’s death. Responsible interpretation therefore weighs intention, text, genre, history, and consequences without granting any one element automatic sovereignty.',
    ],
    cautions: [
      'Derrida’s écriture is broader than handwriting or alphabetic inscription.',
      'This Roman commercial tablet is a comparative material prompt, not a historical source for Derrida.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Writing_tablet_and_stylus_-_oldest_record_of_a_commercial_transaction_in_the_City_of_London.jpg',
  }),

  curated({
    id: 'critical-theory-institute',
    assetId: 'critique-frankfurt-institute-building',
    parent: 'habermas',
    displayName: 'Critical Theory Is an Argument Across Generations',
    shortTitle: 'The Institute and Its Disputes',
    focus: 'CRITICAL THEORY · INTERDISCIPLINARITY, EXILE, RETURN, GENERATION, AND EMANCIPATION',
    dateLabel: 'Institute founded 1923 · exiled after 1933 · reestablished in Frankfurt 1951',
    question: 'What holds a critical tradition together when its generations disagree about reason, modernity, method, and political possibility?',
    lead: 'The Institute for Social Research joined philosophy with sociology, economics, psychology, cultural analysis, and political diagnosis. Nazi persecution forced it into exile, and its postwar return did not restore an unchanged project. Horkheimer, Adorno, Marcuse, Habermas, and later theorists share an emancipatory orientation while contesting how domination works and whether modern reason contains resources for its own repair.',
    ideas: [
      'A research institute makes collective conditions visible: funding, surveys, seminars, archives, editorial programs, exile networks, and division of labor. “Frankfurt School” can obscure this changing institutional history by making a field of collaboration and conflict sound like one classroom with one doctrine.',
      'First-generation analyses often emphasize capitalism, fascism, antisemitism, instrumental reason, and mass culture. Habermas argues that a critique of reason can become self-defeating if every claim to rational validity is reduced to domination. He reconstructs reason through communicative practices in which speakers give and assess reasons.',
      'The generational narrative remains selective. Feminist, antiracist, postcolonial, disability, and ecological critical theories have exposed exclusions in earlier accounts of labor, publicness, family, and universality. A living tradition is measured by its ability to revise its own blind spots, not by fidelity to one founding vocabulary.',
    ],
    cautions: [
      'The Frankfurt School is not one doctrine, and “critical theory” also has broader meanings.',
      'Habermas revises and disputes first-generation Critical Theory; he is not simply its appointed successor.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Ffm-institut-fuer-sozialforschung001.jpg',
    academicSource: academic(
      'Stanford Encyclopedia of Philosophy — Critical Theory (Frankfurt School)',
      'https://plato.stanford.edu/entries/critical-theory/',
    ),
  }),
  curated({
    id: 'habermas-coffeehouse-public-sphere',
    assetId: 'critique-coffee-house-bunbury-dickinson-1781',
    parent: 'habermas',
    displayName: 'The Coffee House and Its Doors',
    shortTitle: 'A Bourgeois Public Sphere',
    focus: 'PUBLIC SPHERE · PRINT, SOCIABILITY, ARGUMENT, ACCESS, AND EXCLUSION',
    dateLabel: 'Bunbury/Dickinson print published 1781 · Structural Transformation published 1962',
    question: 'When can private people form a public that subjects political authority to criticism, and who is excluded from that promise?',
    lead: 'The Bunbury/Dickinson coffee-house satire joins conversation, drinking, commerce, political personality, fashion, and social display. Habermas’s early history reconstructs a bourgeois public sphere in which private persons used print and association to debate matters of common concern and challenge state secrecy. The model is normative as well as historical, and later scholarship has shown how gender, property, labor, empire, and race structured its doors.',
    ideas: [
      'Public argument needs material channels. Periodicals, postal networks, reading rooms, salons, taverns, publishers, and meeting places let claims circulate beyond a household or court. The image’s crowd makes publicity a practice of bodies and media, not an abstract space that appears whenever opinions exist.',
      'The ideal is authority answerable to reasons rather than rank. Yet access to literacy, leisure, property, safety, and recognized speech was unequal. Counterpublics and excluded publics reveal that the bourgeois sphere could present particular participants as the universal public.',
      'Habermas later develops a more differentiated account of civil society, mass democracy, and communication. The early coffee-house narrative should therefore be used as a critical reconstruction, not nostalgia for an inclusive golden age. Its value lies partly in making actual exclusions visible against its own promise.',
    ],
    cautions: [
      'Historical coffee houses were not universally open or free of commercial and status power.',
      'The public sphere is a contested normative model, not one room or a single unified audience.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:The_Coffee-House_(BM_1893,0731.61).jpg',
  }),
  curated({
    id: 'habermas-parliament-deliberation',
    assetId: 'critique-bundestag-plenary-dome-view',
    parent: 'habermas',
    displayName: 'Legitimacy Requires More Than a Vote',
    shortTitle: 'Deliberation and Democratic Law',
    focus: 'DEMOCRACY · PUBLIC REASON, LAW, REPRESENTATION, LEGITIMACY, AND POWER',
    dateLabel: 'Reichstag reconstruction completed 1999 · photograph 2009 · Between Facts and Norms 1992',
    question: 'How can law bind citizens coercively while remaining connected to their status as free and equal coauthors?',
    lead: 'The Bundestag chamber viewed through a public dome stages representation and observation, but transparent architecture cannot guarantee democratic legitimacy. Habermas argues that legitimate law depends on circulation between informal public spheres and formal institutions where reasons are tested, decisions made, and coercive rules authorized. Voting remains indispensable, yet its meaning depends on rights, participation, information, opposition, and continuing public contestation.',
    ideas: [
      'Communicative action is oriented toward reaching understanding through claims that others may accept or challenge; strategic action aims at success by influencing outcomes. Real politics mixes both. The distinction is diagnostic, not a claim that parliaments ever become spaces of pure discussion without interests or power.',
      'Rights and popular sovereignty are internally related in Habermas’s account. Citizens need private liberties to participate publicly, while the content and protection of rights require democratic lawmaking. Neither liberal rights nor collective self-rule should be treated as complete before the other enters.',
      'Critics ask whether consensus ideals understate structural inequality, affect, rhetoric, conflict, colonial histories, and voices whose speech is not recognized as rational. These objections do not merely reject deliberation; they test what institutional and social conditions would make reason-giving less exclusionary.',
    ],
    cautions: [
      'The “ideal speech situation” is not a description of an actual parliament or a demand for unanimous policy.',
      'Glass, visibility, and elections alone do not eliminate unequal power from public communication.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:View_of_the_Plenary_Chamber_of_the_Bundestag_from_the_Dome_of_the_Reichstag._(4209149129).jpg',
  }),
  curated({
    id: 'critical-theory-radio-culture-industry',
    assetId: 'critique-frankfurt-radio-1930s',
    parent: 'habermas',
    displayName: 'Radio and the Culture-Industry Diagnosis',
    shortTitle: 'One-to-Many Culture',
    focus: 'MEDIA · COMMODITY, STANDARDIZATION, AUDIENCE, BROADCAST, AND CRITIQUE',
    dateLabel: 'Receiver from the 1930s · Dialectic of Enlightenment composed in the 1940s',
    question: 'How can technologies that address mass publics widen access while standardizing culture and concentrating the power to speak?',
    lead: 'The radio receiver concentrates one-to-many communication in a domestic object. Horkheimer and Adorno’s culture-industry critique examines how capitalist production can standardize cultural goods, organize leisure, and reproduce conformity while presenting choice as individuality. The argument identifies real concentrations of power but has been criticized for underestimating audiences, popular creativity, and differences among media.',
    ideas: [
      'Broadcast separates the capacity to receive from the capacity to answer through the same channel. Schedules, networks, advertisers, states, and technical standards shape what reaches the set. A mass audience can share news and culture across distance while remaining structurally unequal to producers and regulators.',
      '“Industry” concerns organization and commodity form more than the mere use of machines. Formula, genre, promotion, repetition, and market segmentation can make novelty predictable. Yet listeners interpret, ignore, parody, discuss, and repurpose media; reception cannot be read directly from a program schedule.',
      'Habermas’s public-sphere work retains concern about commercialization while seeking communicative resources not exhausted by instrumental reason. Digital platforms change the structure again: users produce and circulate content, but algorithms and ownership introduce new asymmetries. The radio prompts comparison only when those differences remain explicit.',
    ],
    cautions: [
      'The culture-industry thesis does not prove that every audience member is passive or every popular work identical.',
      'A 1930s receiver is not a simple model of networked digital platforms.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Rundfunkempf%C3%A4nger_1930er-Jahre.jpg',
    academicSource: academic(
      'Stanford Encyclopedia of Philosophy — Critical Theory (Frankfurt School)',
      'https://plato.stanford.edu/entries/critical-theory/',
    ),
  }),
  curated({
    id: 'critical-theory-adorno-memorial',
    assetId: 'critique-adorno-memorial-desk',
    parent: 'habermas',
    displayName: 'Adorno After Adorno',
    shortTitle: 'Memory, Inheritance, and Disagreement',
    focus: 'RECEPTION · ADORNO, INSTRUMENTAL REASON, MEMORIAL, CANON, AND SUCCESSION',
    dateLabel: 'Adorno died 1969 · Zakharov memorial installed 2003',
    question: 'How should a later critical theorist inherit a devastating critique of modern reason without making critique itself impossible?',
    lead: 'Vadim Zakharov’s glass cube assembles a desk, lamp, papers, metronome, and chair as a public artwork about Adorno’s intellectual afterlife. Habermas inherits first-generation concern with domination and instrumental reason but argues that a totalized critique of reason risks losing the standards by which domination can be criticized. His turn to communicative rationality is therefore an internal reconstruction, not a dismissal of Critical Theory’s historical catastrophes.',
    ideas: [
      'The transparent enclosure offers visibility without access. It transforms “the philosopher at work” into a carefully staged civic memory and invites viewers to ask how cities canonize once-difficult critics. The desk is symbolic; it is not preserved biographical evidence from Adorno’s office.',
      'Instrumental rationality treats means efficiently in relation to given ends while leaving those ends unexamined. Habermas distinguishes this from communicative reason enacted when participants raise truth, rightness, and sincerity claims that others can contest. The distinction aims to identify a noncoercive potential within ordinary language, not outside society.',
      'Critics question whether discourse can be separated from power as cleanly as reconstruction sometimes suggests. Habermas replies by treating ideals as fallible presuppositions and standards for criticizing distorted communication. The argument remains productive precisely because Adorno and Habermas cannot be arranged as obsolete diagnosis followed by final solution.',
    ],
    cautions: [
      'The installation is an artwork, not Adorno’s literal desk or office.',
      'Habermas’s relation to Adorno is inheritance through disagreement, not automatic generational succession.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:FFM_Adorno-Denkmal_Schreibtisch_1.jpg',
    academicSource: academic(
      'Stanford Encyclopedia of Philosophy — Critical Theory (Frankfurt School)',
      'https://plato.stanford.edu/entries/critical-theory/',
    ),
  }),
] as const satisfies readonly MuseumSupplementalExhibit[]).map(reviewCritiquePowerDeconstructionSupplementalExhibit);

const volume = (
  id: string,
  center: MuseumSceneVolume['center'],
  size: MuseumSceneVolume['size'],
): MuseumSceneVolume => ({id, role: 'media', center, size});

const mediaMount = (
  id: MuseumSupplementalExhibitId,
  assetId: MuseumAssetId,
  width: number,
  height: number,
): MuseumMediaMountDefinition => {
  const y = 1.9;
  return {
    id: `${id}-hero-media`,
    assetId,
    kind: 'wall-frame',
    position: [0, y, -.39],
    rotation: [0, 0, 0],
    width,
    height,
    frameDepth: .1,
    supportHeight: 0,
    anchorId: `${id}-backing`,
    bounds: volume(
      `${id}-media-bounds`,
      {x: 0, y, z: -.39},
      {width: width + .18, height: height + .18, depth: .2},
    ),
    supportBounds: volume(
      `${id}-media-support`,
      {x: 0, y, z: -.55},
      {width: width * .74, height: height * .74, depth: .18},
    ),
  };
};

const cameraFor = (
  position: MuseumPoint,
  rotationY: number,
  distance: number,
): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance,
  z: position.z + Math.cos(rotationY) * distance,
});

type InstallationKind =
  | 'critique-work'
  | 'critique-context'
  | 'critique-concept';

const layout = ({
  id,
  parentExhibitId,
  slotId,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
  viewpointDistance,
}: {
  id: CritiquePowerDeconstructionSupplementalExhibitId;
  parentExhibitId: Parent;
  slotId: string;
  assetId: CritiquePowerDeconstructionGalleryAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: InstallationKind;
  accent: string;
  viewpointDistance?: number;
}): MuseumSupplementalExhibitLayout => {
  const authoredSlot =
    getCritiquePowerDeconstructionInstallationSlot(slotId);
  const idValue = id as MuseumSupplementalExhibitId;
  const assetIdValue = assetId as MuseumAssetId;
  const position = {x: authoredSlot.x, z: authoredSlot.z};
  const width = 3.58;
  const height = 3.71;
  return {
    id: idValue,
    parentExhibitId:
      parentExhibitId as MuseumSupplementalExhibitLayout['parentExhibitId'],
    guidedAfterExhibitId:
      parentExhibitId as MuseumSupplementalExhibitLayout['parentExhibitId'],
    zoneId:
      authoredSlot.spatialCellId as MuseumSupplementalExhibitLayout['zoneId'],
    spatialCellId: authoredSlot.spatialCellId,
    position,
    rotationY: authoredSlot.rotationY,
    interactionRadius: 3.3,
    collider: {
      id: `supplemental:${id}`,
      center: position,
      size: {width, depth: .94},
      rotation: authoredSlot.rotationY,
    },
    viewpoint: {
      ...cameraFor(
        position,
        authoredSlot.rotationY,
        viewpointDistance ?? authoredSlot.supplementalViewpointDistance,
      ),
      yaw: authoredSlot.rotationY,
      pitch: -.055,
    },
    assetId: assetIdValue,
    mediaMount: mediaMount(idValue, assetIdValue, mediaWidth, mediaHeight),
    label: {
      position: [0, 3.34, -.3],
      width: width - .28,
      height: .63,
    },
    footprint: {width, height, depth: .94},
    installationKind:
      installationKind as MuseumSupplementalInstallationKind,
    accent,
  };
};

const P = CRITIQUE_POWER_DECONSTRUCTION_PALETTE;

export const CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({
    id: 'continental-saussure-sign-system',
    parentExhibitId: 'continental-philosophy',
    slotId: 'continental-orientation:west-outer',
    assetId: 'critique-saussure-jullien-portrait',
    mediaWidth: 2.7 * 424 / 640,
    mediaHeight: 2.7,
    installationKind: 'critique-concept',
    accent: P.archiveBlue,
  }),
  layout({
    id: 'continental-freud-interpretive-depth',
    parentExhibitId: 'continental-philosophy',
    slotId: 'continental-orientation:east-room-face',
    assetId: 'critique-freud-couch-london-2019',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 528 / 640,
    installationKind: 'critique-concept',
    accent: P.violet,
    viewpointDistance: 2.2,
  }),
  layout({
    id: 'continental-college-institutions',
    parentExhibitId: 'continental-philosophy',
    slotId: 'continental-orientation:east-cross-face',
    assetId: 'critique-college-de-france-courtyard',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 284 / 640,
    installationKind: 'critique-context',
    accent: P.brass,
  }),
  layout({
    id: 'continental-berlin-history-rupture',
    parentExhibitId: 'continental-philosophy',
    slotId: 'continental-orientation:south-room-face',
    assetId: 'critique-berlin-wall-brandenburg-1989',
    mediaWidth: 2.7 * 431 / 640,
    mediaHeight: 2.7,
    installationKind: 'critique-context',
    accent: P.signalRed,
    viewpointDistance: 2.2,
  }),
  layout({
    id: 'continental-freiburg-phenomenological-line',
    parentExhibitId: 'continental-philosophy',
    slotId: 'continental-orientation:south-cross-face',
    assetId: 'critique-freiburg-university-building',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 480 / 640,
    installationKind: 'critique-context',
    accent: P.civicGreen,
  }),

  layout({
    id: 'foucault-panopticon-visibility',
    parentExhibitId: 'foucault',
    slotId: 'critique-genealogy-power:east-outer',
    assetId: 'critique-panopticon-outram-proposal-1880s',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 480 / 640,
    installationKind: 'critique-concept',
    accent: P.brass,
  }),
  layout({
    id: 'foucault-clinical-gaze',
    parentExhibitId: 'foucault',
    slotId: 'critique-genealogy-power:west-room-face',
    assetId: 'critique-salpetriere-clinical-lesson',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 404 / 640,
    installationKind: 'critique-work',
    accent: P.signalRed,
    viewpointDistance: 2.2,
  }),
  layout({
    id: 'foucault-bertillon-examination',
    parentExhibitId: 'foucault',
    slotId: 'critique-genealogy-power:west-cross-face',
    assetId: 'critique-bertillon-evidence-display',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 373 / 640,
    installationKind: 'critique-context',
    accent: P.archiveBlue,
  }),
  layout({
    id: 'foucault-mettray-disciplinary-labor',
    parentExhibitId: 'foucault',
    slotId: 'critique-genealogy-power:south-room-face',
    assetId: 'critique-mettray-shoemakers-c1910',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 414 / 640,
    installationKind: 'critique-context',
    accent: P.charcoal,
    viewpointDistance: 2.2,
  }),
  layout({
    id: 'foucault-archive-practice',
    parentExhibitId: 'foucault',
    slotId: 'critique-genealogy-power:south-cross-face',
    assetId: 'critique-bnf-labrouste-reading-room',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 426 / 640,
    installationKind: 'critique-concept',
    accent: P.civicGreen,
  }),

  layout({
    id: 'derrida-colonial-language-algeria',
    parentExhibitId: 'derrida',
    slotId: 'critique-deconstruction:east-outer',
    assetId: 'critique-french-algeria-1934-map',
    mediaWidth: 2.7,
    mediaHeight: 2.7 * 636 / 640,
    installationKind: 'critique-context',
    accent: P.signalRed,
  }),
  layout({
    id: 'derrida-rosetta-translation',
    parentExhibitId: 'derrida',
    slotId: 'critique-deconstruction:west-room-face',
    assetId: 'critique-rosetta-stone-babelstone',
    mediaWidth: 2.7 * 382 / 640,
    mediaHeight: 2.7,
    installationKind: 'critique-concept',
    accent: P.brass,
    viewpointDistance: 2.2,
  }),
  layout({
    id: 'derrida-babel-difference',
    parentExhibitId: 'derrida',
    slotId: 'critique-deconstruction:west-cross-face',
    assetId: 'critique-bruegel-tower-babel',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 468 / 640,
    installationKind: 'critique-work',
    accent: P.violet,
  }),
  layout({
    id: 'derrida-ens-institution',
    parentExhibitId: 'derrida',
    slotId: 'critique-deconstruction:north-room-face',
    assetId: 'critique-ens-rue-ulm-c1900',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 408 / 640,
    installationKind: 'critique-context',
    accent: P.archiveBlue,
    viewpointDistance: 2.2,
  }),
  layout({
    id: 'derrida-writing-material-trace',
    parentExhibitId: 'derrida',
    slotId: 'critique-deconstruction:north-cross-face',
    assetId: 'critique-writing-tablet-stylus-london',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 390 / 640,
    installationKind: 'critique-concept',
    accent: P.civicGreen,
  }),

  layout({
    id: 'critical-theory-institute',
    parentExhibitId: 'habermas',
    slotId: 'critique-critical-theory:west-outer',
    assetId: 'critique-frankfurt-institute-building',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 492 / 640,
    installationKind: 'critique-context',
    accent: P.archiveBlue,
  }),
  layout({
    id: 'habermas-coffeehouse-public-sphere',
    parentExhibitId: 'habermas',
    slotId: 'critique-critical-theory:east-room-face',
    assetId: 'critique-coffee-house-bunbury-dickinson-1781',
    mediaWidth: 2.7 * 640 / 571,
    mediaHeight: 2.7,
    installationKind: 'critique-work',
    accent: P.brass,
    viewpointDistance: 2.2,
  }),
  layout({
    id: 'habermas-parliament-deliberation',
    parentExhibitId: 'habermas',
    slotId: 'critique-critical-theory:east-cross-face',
    assetId: 'critique-bundestag-plenary-dome-view',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 426 / 640,
    installationKind: 'critique-concept',
    accent: P.civicGreen,
  }),
  layout({
    id: 'critical-theory-radio-culture-industry',
    parentExhibitId: 'habermas',
    slotId: 'critique-critical-theory:north-room-face',
    assetId: 'critique-frankfurt-radio-1930s',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 398 / 640,
    installationKind: 'critique-work',
    accent: P.signalRed,
    viewpointDistance: 2.2,
  }),
  layout({
    id: 'critical-theory-adorno-memorial',
    parentExhibitId: 'habermas',
    slotId: 'critique-critical-theory:north-cross-face',
    assetId: 'critique-adorno-memorial-desk',
    mediaWidth: 3.18,
    mediaHeight: 3.18 * 480 / 640,
    installationKind: 'critique-context',
    accent: P.charcoal,
  }),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getCritiquePowerDeconstructionSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record =
    CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBITS.find(
      (item) => item.id === id,
    );
  if (!record) {
    throw new Error(`Gallery 22 supplemental exhibit ${id} is missing.`);
  }
  return record;
};
