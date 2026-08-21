import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout as authorSharedSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';
import {reviewJewishSupplementalExhibit} from './jewishSupplementalReview';

export const JEWISH_GALLERY_ID = 'jewish-philosophy' as const;

const authorSupplementalLayout = (
  input: Parameters<typeof authorSharedSupplementalLayout>[0],
) => authorSharedSupplementalLayout({
  ...input,
  interactionRadius: 5.1,
  authoredViewpointTarget: true,
});

export const JEWISH_PALETTE = Object.freeze({
  ink: '#211f24',
  blue: '#425f83',
  pomegranate: '#944d5c',
  olive: '#697554',
  gold: '#b18b45',
  parchment: '#e7dcc3',
});

export const JEWISH_ROOM_SIGN_COPY = {
  'jewish-reason-revelation': {
    kicker: 'Room 01 · Judeo-Arabic intellectual worlds',
    title: 'Jewish kalām, poetry, law, reason, and revelation',
    subtitle: 'Arabic language, Jewish communities, argument, covenant, law, poetry, and Mediterranean life.',
  },
  'jewish-maimonidean-crossroads': {
    kicker: 'Room 02 · A system and its afterlives',
    title: 'Maimonides: law, negative theology, and Aristotelian argument',
    subtitle: 'Codification, demonstration, disciplined interpretation, translation, debate, and later rupture.',
  },
} as const;

const image = (label: string, url: string) => ({label, url, kind: 'collection-record' as const});
const academic = (label: string, url: string) => ({label, url, kind: 'academic-reference' as const});
const saadia = academic(
  'Stanford Encyclopedia of Philosophy — Saadya',
  'https://plato.stanford.edu/entries/saadya/',
);
const halevi = academic(
  'Stanford Encyclopedia of Philosophy — Judah Halevi',
  'https://plato.stanford.edu/entries/halevi/',
);
const maimonides = academic(
  'Stanford Encyclopedia of Philosophy — Maimonides',
  'https://plato.stanford.edu/entries/maimonides/',
);
const maimonidesIslamic = academic(
  'Stanford Encyclopedia of Philosophy — The Influence of Islamic Thought on Maimonides',
  'https://plato.stanford.edu/entries/maimonides-islamic/',
);

const record = (input: Omit<SupplementalExhibitAuthoring, 'panelKicker'>): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({...input, panelKicker: 'Gallery 12 work and context exhibit'});

export const JEWISH_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'saadia-beliefs-opinions',
    assetId: 'saadia-beliefs-landauer',
    displayName: 'Saadia Gaon’s Book of Beliefs and Opinions',
    shortTitle: 'Saadia: Beliefs and Opinions',
    workLabel: 'SAADIA GAON · KITĀB AL-AMĀNĀT WA-L-IʿTIQĀDĀT',
    dateLabel: 'Completed about 933 · displayed Arabic edition published in 1880',
    question: 'How can reason and reliable tradition lead toward the same truth?',
    frontSubtitle: 'Jewish kalām, sensory knowledge, rational principles, inference, tradition, creation, and ethics',
    lead: 'Saadia’s Book of Beliefs and Opinions coordinates sensory knowledge, self-evident rational principles, valid inference, and reliable tradition. Written in Judeo-Arabic, it adapts kalām argument within a Jewish legal, liturgical, and communal project.',
    keyIdeas: [
      'Reason can clarify revealed teaching rather than serving only as its rival.',
      'Different sources of knowledge require distinct tests and forms of justification.',
      'Judeo-Arabic authorship identifies language and intellectual setting, not Muslim identity.',
    ],
    cautions: [
      'The 1880 printed edition is a modern scholarly witness, not a medieval manuscript.',
      '“Jewish kalām” names active adaptation and debate, not the absorption of Jewish thought into Islam.',
    ],
    sections: [
      {heading: 'Knowledge has several warranted sources', paragraph: 'Saadia distinguishes immediate perception, basic rational knowledge, inferences built from them, and trustworthy report. Revelation enters an epistemic structure rather than replacing every other form of inquiry.'},
      {heading: 'Argument serves a communal project', paragraph: 'Creation, divine unity, commandment, freedom, reward, and redemption matter for Jewish law and life. The work’s rational architecture remains tied to the practices and responsibilities of a community. Rational defense also answers internal doubt and competing claims in Saadia’s intellectual environment.'},
      {heading: 'Arabic is a shared intellectual language', paragraph: 'Saadia writes Jewish philosophy in Arabic while using Hebrew script and Jewish sources. The language connects him to wider debates without changing his communal or religious identity.'},
    ],
    sources: [
      image('Internet Archive — Landauer edition of Kitāb al-Amānāt wa-l-Iʿtiqādāt', 'https://archive.org/details/kitbalamnt00saaduoft'),
      saadia,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'saadia-gaon'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'judeo-arabic-geniza-law',
    assetId: 'cairo-geniza-legal-document',
    displayName: 'Judeo-Arabic Law and Communal Reasoning in the Cairo Geniza',
    shortTitle: 'Law and Life in the Geniza',
    workLabel: 'CAIRO GENIZA · DOCUMENTARY CONTEXT',
    dateLabel: 'Legal document written by Ḥalfon b. Manasseh in 1135',
    question: 'What lived institutions surround a philosophical text?',
    frontSubtitle: 'Contracts, courts, commerce, family, correspondence, law, Arabic, Hebrew script, and community',
    lead: 'Geniza documents preserve contracts, court proceedings, letters, accounts, and family affairs from Jewish communities across the Mediterranean. This dated legal fragment anchors philosophy in the institutions, languages, and practical reasoning of everyday communal life.',
    keyIdeas: [
      'Legal reasoning is conducted through documents, witnesses, offices, and material procedures.',
      'Judeo-Arabic joins Arabic language to Hebrew script and Jewish communal use.',
      'Trade and correspondence connected communities across political and linguistic boundaries.',
    ],
    cautions: [
      'One fragment cannot represent all Geniza documents or every medieval Jewish community.',
      'The exhibit supplies historical context; it does not create a nonexistent Jewish Philosophy branch record.',
    ],
    sections: [
      {heading: 'A philosophy has a documentary world', paragraph: 'Ideas about law, authority, testimony, and obligation were lived through courts, agreements, disputes, and correspondence. Documentary evidence helps prevent intellectual history from becoming only a sequence of famous books.'},
      {heading: 'Language and script cross modern categories', paragraph: 'Many Jews wrote Arabic in Hebrew characters. That practice records participation in an Arabic-speaking world while preserving distinct communal institutions and textual conventions.'},
      {heading: 'The Geniza preserves contingency', paragraph: 'Fragments survive because worn texts and documents were deposited rather than discarded. Their partial character demands caution but gives unusually direct access to ordinary relationships and procedures. Dates, names, signatures, and corrections expose decisions that a later philosophical summary would otherwise smooth away.'},
    ],
    sources: [
      image('Wikimedia Commons — Cairo Geniza legal document', 'https://commons.wikimedia.org/wiki/File:Fragment_of_the_Cairo_Genizah_-_Legal_document.jpg'),
      academic('Cambridge University Library — Cairo Genizah Collection', 'https://www.lib.cam.ac.uk/collections/departments/taylor-schechter-genizah-research-unit'),
    ],
    entityKind: 'branch',
    articleActionLabel: 'No separate Atlas branch article',
  }),
  record({
    id: 'judah-halevi-kuzari',
    assetId: 'judah-halevi-kuzari-1796',
    displayName: 'Judah Halevi’s Kuzari: Philosophy Tested by History and Practice',
    shortTitle: 'Judah Halevi: The Kuzari',
    workLabel: 'JUDAH HALEVI · BOOK OF REFUTATION AND PROOF',
    dateLabel: 'Composed about 1140 · displayed Hebrew edition published in Vienna in 1796',
    question: 'What can inherited practice and collective history establish that demonstration cannot?',
    frontSubtitle: 'Literary dialogue, philosophy, revelation, transmitted history, embodiment, language, and covenant',
    lead: 'The Kuzari stages a literary dialogue in which philosophical demonstration, rival religious claims, transmitted history, practice, and embodied communal life are tested against one another. Halevi does not reject reasoning; he disputes its sufficiency for every form of truth and attachment.',
    keyIdeas: [
      'The dialogue form lets positions be explored through speakers rather than a flat list of doctrines.',
      'Historical testimony and communal practice carry forms of authority not reducible to abstract proof.',
      'Hebrew language, land, ritual, and covenant are philosophically significant within Halevi’s argument.',
    ],
    cautions: [
      'The dialogue is not a transcript of a historical Khazar disputation.',
      'The 1796 Hebrew edition belongs to a long translation and commentary history after the Judeo-Arabic original.',
    ],
    sections: [
      {heading: 'A philosopher enters a dialogue', paragraph: 'The opening philosophical position offers a disciplined account of perfection, but the king remains dissatisfied. The form allows Halevi to test what philosophical abstraction leaves out.'},
      {heading: 'Practice carries memory', paragraph: 'Commandments, language, calendar, and communal continuity are treated as embodied transmission. Their evidential role differs from a syllogism without becoming unintelligible or merely irrational.'},
      {heading: 'Reception changes the object', paragraph: 'Judah ibn Tibbon’s Hebrew translation and later editions made the work available in new settings. The printed page therefore represents the Kuzari’s afterlife, not its first material form. Commentary kept reopening the dialogue’s unresolved tests.'},
    ],
    sources: [
      image('Wikimedia Commons — Sefer ha-Kuzari, Vienna 1796', 'https://commons.wikimedia.org/wiki/File:Sefer_ha-Kuzari_(23855).pdf'),
      halevi,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'judah-halevi'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'judah-halevi-divan',
    assetId: 'judah-halevi-divan-geniza',
    displayName: 'Judah Halevi’s Divan: Poetry as Philosophical Form',
    shortTitle: 'Judah Halevi: Poetry as Thought',
    workLabel: 'JUDAH HALEVI · DIVAN AND LITURGICAL POETRY',
    dateLabel: 'Poems composed about 1100–1141 · displayed Geniza witness probably 12th–13th century',
    question: 'What can poetry think through that prose argument cannot?',
    frontSubtitle: 'Exile, longing, friendship, worship, sea travel, commitment, rhythm, and philosophical voice',
    lead: 'Halevi’s poetry gives intellectual form to exile, longing, friendship, liturgy, danger, and commitment. Poetry is not decorative evidence beside his philosophy: its voice, address, rhythm, and imagery investigate how a person becomes attached to people, practices, and place.',
    keyIdeas: [
      'A poem can disclose competing commitments without resolving them into one proposition.',
      'Liturgy joins first-person voice to communal repetition.',
      'Travel and longing make geography part of intellectual and religious life.',
    ],
    cautions: [
      'The manuscript witness is later than many of the poems and is not Halevi’s autograph.',
      'Do not turn uncertain accounts of Halevi’s death into a biographical certainty.',
    ],
    sections: [
      {heading: 'Form changes the work of thought', paragraph: 'Meter, repetition, address, and image shape attention and emotion. A poetic claim may be grasped through performance and memory as well as through explicit inference.'},
      {heading: 'The personal is also communal', paragraph: 'Halevi’s first-person speakers inhabit friendship, worship, displacement, and collective memory. Individual longing is formed through inherited words and practices. Hebrew poetic conventions and Andalusi Arabic forms meet in a literary culture that cannot be reduced to one linguistic community.'},
      {heading: 'Poetry complicates the philosopher', paragraph: 'Reading the Divan beside the Kuzari prevents Halevi from becoming only an opponent of rationalism. His intellectual project works across medicine, letters, argument, prayer, and verse.'},
    ],
    sources: [
      image('OPenn — Halper 314, part of the Divan of Judah Halevi', 'https://openn.library.upenn.edu/Data/0002/html/h314.html'),
      halevi,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'judah-halevi'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'maimonides-mishneh-torah',
    assetId: 'maimonides-mishneh-torah',
    displayName: 'Maimonides’s Mishneh Torah: Law as Ordered Formation',
    shortTitle: 'Maimonides: Mishneh Torah',
    workLabel: 'MAIMONIDES · SYSTEMATIC LEGAL CODIFICATION',
    dateLabel: 'Completed about 1180 · displayed manuscript copied c. 1300–1350 and illuminated c. 1400',
    question: 'What philosophical work can the ordering of law perform?',
    frontSubtitle: 'Codification, practice, knowledge, virtue, communal authority, dispute, and reception',
    lead: 'The Mishneh Torah organizes a vast body of Jewish law into a systematic Hebrew code. Its order connects knowledge, character, worship, social life, institutions, and messianic expectation, making legal codification a project of intellectual and communal formation.',
    keyIdeas: [
      'Classification makes a claim about how practices and domains of law belong together.',
      'The code seeks practical accessibility while generating controversy over sources and authority.',
      'Legal habits form agents and communities, not only resolve disputes.',
    ],
    cautions: [
      'The illuminated manuscript was made well after Maimonides and witnesses reception rather than his desk.',
      'Systematic order did not end rabbinic debate or make the code universally uncontested.',
    ],
    sections: [
      {heading: 'A code is an architecture', paragraph: 'Books and sections guide readers from foundational knowledge through practices, relationships, civil law, institutions, and future hope. Arrangement itself becomes an interpretation of Jewish life. The opening books place knowledge of God and cultivated character inside that legal architecture.'},
      {heading: 'Accessibility raises authority questions', paragraph: 'Maimonides aimed to make law usable without requiring every reader to reconstruct the full Talmudic discussion. Critics worried that a code without cited debates might conceal how conclusions were reached.'},
      {heading: 'A luxurious copy records afterlife', paragraph: 'Later copying and illumination show the work’s prestige in new Jewish settings. Material beauty marks reception while remaining historically separate from the twelfth-century composition.'},
    ],
    sources: [
      image('Library of Congress / Wikimedia Commons — Mishneh Torah manuscript', 'https://commons.wikimedia.org/wiki/File:Mishneh_Torah_WDL3962.pdf'),
      maimonides,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'maimonides'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'maimonides-guide-negative-theology',
    assetId: 'maimonides-guide-negative-theology',
    displayName: 'Maimonides’s Guide: Negative Theology and Aristotelian Argument',
    shortTitle: 'Maimonides: Negative Theology',
    workLabel: 'MAIMONIDES · GUIDE OF THE PERPLEXED',
    dateLabel: 'Completed about 1190 · displayed Catalan Hebrew manuscript dated 1348',
    question: 'How can one reason about God without turning divine unity into a human-sized object?',
    frontSubtitle: 'Negative attributes, demonstration, equivocal language, scripture, Aristotle, and disciplined limits',
    lead: 'The Guide argues that positive essential predicates risk dividing or humanizing God. Maimonides uses philosophical demonstration, distinctions in language, and careful scriptural interpretation to show why intellectual discipline includes knowing what cannot truthfully be said.',
    keyIdeas: [
      'Negative attributes deny limitations without describing a composite divine essence.',
      'Scriptural language must be interpreted when literal reading conflicts with demonstration.',
      'Maimonides appropriates and criticizes Aristotelian traditions rather than merely repeating Aristotle.',
    ],
    cautions: [
      'The seated figure in the illumination is only thought to represent Aristotle.',
      'Negative theology does not mean that religious language or practice becomes meaningless.',
    ],
    sections: [
      {heading: 'Predication threatens unity', paragraph: 'If divine wisdom or power names an added feature like a human quality, absolute unity is compromised. Maimonides therefore distinguishes how words function when applied to God.'},
      {heading: 'Demonstration disciplines interpretation', paragraph: 'The Guide asks what has genuinely been demonstrated and how figurative scriptural language should be read. Philosophical certainty and interpretive restraint limit one another.'},
      {heading: 'Perplexity is productive', paragraph: 'The intended reader is committed to law and trained in philosophy but troubled by apparent conflict. The book does not erase tension; it cultivates the judgment required to navigate it. Its deliberately indirect pedagogy also asks which truths a prepared reader can responsibly receive.'},
    ],
    sources: [
      image('Wikimedia Commons — 1348 Guide for the Perplexed', 'https://commons.wikimedia.org/wiki/File:14c_ed_of_the_Guide_for_the_Perplexed_by_Maimonides.jpg'),
      maimonides,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'maimonides'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'maimonides-guide-translation-reception',
    assetId: 'maimonides-guide-arabic',
    displayName: 'Maimonides’s Guide Across Arabic, Hebrew, and Latin',
    shortTitle: 'The Guide Across Languages',
    workLabel: 'TRANSLATION AND RECEPTION · JUDEO-ARABIC TO HEBREW AND LATIN',
    dateLabel: 'Arabic work c. 1190 · Samuel ibn Tibbon’s Hebrew translation completed 1204 · displayed Arabic copy c. 1200–1400',
    question: 'How does translation create new readers, disputes, and philosophical vocabularies?',
    frontSubtitle: 'Dalālat al-ḥāʾirīn, Moreh nevukhim, ibn Tibbon, terminology, controversy, and Latin reception',
    lead: 'Maimonides wrote the Guide in Judeo-Arabic. Samuel ibn Tibbon’s Hebrew translation and later Latin versions gave the book new vocabularies and audiences, generating disputes within Jewish philosophy and influencing Christian readers without dissolving those traditions into one history.',
    keyIdeas: [
      'A translator must decide how to render technical Arabic philosophical vocabulary in Hebrew.',
      'Hebrew reception produced new Jewish commentary, controversy, and philosophical prose.',
      'Latin reception is a later connection; it does not make the Guide a mere bridge to Christianity.',
    ],
    cautions: [
      'Aristotle, Avicenna, and Averroes appear here as intellectual context; their primary homes remain in existing galleries.',
      'The displayed Arabic manuscript is a later copy, not Maimonides’s autograph.',
    ],
    sections: [
      {heading: 'Judeo-Arabic is the first material world', paragraph: 'Arabic philosophical terms written in Hebrew script locate the Guide within Jewish communities participating in Arabic-speaking intellectual life. Language indicates exchange without determining religious identity.'},
      {heading: 'Ibn Tibbon builds Hebrew terminology', paragraph: 'Translation choices helped establish a technical Hebrew philosophical vocabulary. Glossaries, letters, and commentaries show that the task required explanation as well as substitution. The translated title itself became the name through which many later readers knew the work.'},
      {heading: 'Reception branches rather than flows one way', paragraph: 'Jewish readers debated the Guide across Provence, Iberia, Italy, and beyond, while Latin Christians encountered selected arguments through translation. Each setting reconstructed the work for different questions.'},
    ],
    sources: [
      image('Wikimedia Commons — Arabic Guide to the Perplexed, WDL 3963', 'https://commons.wikimedia.org/wiki/File:The_Guide_to_the_Perplexed_WDL3963.pdf'),
      maimonidesIslamic,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'maimonides'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'jewish-philosophy-after-maimonides',
    assetId: 'moses-mendelssohn-rijksmuseum',
    displayName: 'After Maimonides: Medieval Debate and Modern Jewish Philosophies',
    shortTitle: 'Jewish Philosophy Continues',
    workLabel: 'CONTEXTUAL CONTINUATION ANCHOR · 13TH–20TH CENTURIES',
    dateLabel: 'Gersonides and Crescas through Mendelssohn, Cohen, Rosenzweig, Buber, and Levinas',
    question: 'How many futures can emerge from agreement, critique, translation, and rupture?',
    frontSubtitle: 'Maimonidean controversy, Gersonides, Crescas, Abravanel, Mendelssohn, Cohen, Rosenzweig, Buber, and Levinas',
    lead: 'Jewish philosophy does not end with Maimonides. Gersonides, Hasdai Crescas, Abravanel and Leone Ebreo, Moses Mendelssohn, Hermann Cohen, Franz Rosenzweig, Martin Buber, Emmanuel Levinas, and many others pursued divergent medieval and modern projects.',
    keyIdeas: [
      'Later thinkers can inherit Maimonidean questions while rejecting major Maimonidean conclusions.',
      'Print, emancipation, Enlightenment, nationalism, catastrophe, migration, and new institutions transform the field.',
      'Continuity is plural: legal, rationalist, anti-rationalist, dialogical, ethical, political, and theological paths diverge.',
    ],
    cautions: [
      'Mendelssohn’s portrait is a threshold image, not a claim that one person represents every later Jewish philosophy.',
      'There is no stable Jewish Philosophy branch ID in the Atlas, so this contextual anchor has no fabricated route.',
    ],
    sections: [
      {heading: 'Medieval readers argue after the Guide', paragraph: 'Gersonides extends rigorous Aristotelian inquiry; Crescas attacks central Aristotelian commitments; Abravanel and Leone Ebreo work across exegesis, politics, love, Platonism, and displacement. “After” names debate, not decline.'},
      {heading: 'Mendelssohn enters an Enlightenment public', paragraph: 'Mendelssohn addressed metaphysics, aesthetics, religious authority, civil life, and Jewish emancipation in German and Hebrew settings. His project cannot be reduced to assimilation or to a simple continuation of Maimonides.'},
      {heading: 'Modernity multiplies the questions', paragraph: 'Cohen, Rosenzweig, Buber, and Levinas reconstruct reason, revelation, relation, ethics, and history under radically changed conditions. The threshold points forward without declaring a final destination. No one modern program can contain the field’s religious and secular disagreements.'},
    ],
    sources: [
      image('Rijksmuseum / Wikimedia Commons — portrait of Moses Mendelssohn', 'https://commons.wikimedia.org/wiki/File:Portret_van_Moses_Mendelssohn,_RP-P-1907-2896.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Moses Mendelssohn', 'https://plato.stanford.edu/entries/mendelssohn/'),
    ],
    entityKind: 'philosopher',
    articleActionLabel: 'No matching Atlas article',
  }),
  record({
    id: 'spinoza-formation-rupture-threshold',
    assetId: 'spinoza-tractatus-1670',
    displayName: 'Spinoza’s Theological-Political Treatise: Formation and Rupture',
    shortTitle: 'Spinoza: Formation and Rupture',
    workLabel: 'SECONDARY THRESHOLD · TRACTATUS THEOLOGICO-POLITICUS',
    dateLabel: 'Published anonymously in 1670 under a false Hamburg imprint',
    question: 'How can a thinker emerge from a community while breaking with its authorities and categories?',
    frontSubtitle: 'Portuguese Jewish Amsterdam, the 1656 herem, scripture, prophecy, law, freedom, and political community',
    lead: 'Spinoza’s Portuguese Jewish formation, the 1656 herem, and his radical interpretation of scripture, prophecy, law, and political authority form a threshold into early modern philosophy. He is secondary here and primary in Gallery 13, Rationalism: Mind, Nature, and System.',
    keyIdeas: [
      'Formation provides language, texts, institutions, and conflicts without fixing a thinker’s later conclusions.',
      'The Treatise joins biblical criticism to an argument for freedom of philosophizing and political stability.',
      'Rupture should not be romanticized or used to make Spinoza represent Jewish philosophy as a whole.',
    ],
    cautions: [
      'Spinoza is not a canonical primary in Gallery 09.',
      'The false imprint was part of the book’s strategy of anonymous and controversial publication.',
    ],
    sections: [
      {heading: 'Formation is neither possession nor destiny', paragraph: 'Amsterdam’s Portuguese Jewish community supplied education, language, commercial networks, and authority structures. Spinoza’s later break is intelligible against that setting without being reducible to it.'},
      {heading: 'Scriptural criticism becomes political', paragraph: 'The Treatise distinguishes philosophy from theology, analyzes prophecy and textual transmission, and argues that suppressing judgment can threaten rather than secure a commonwealth.'},
      {heading: 'The route continues in Gallery 13', paragraph: 'This installation marks an early-modern formation-and-rupture threshold. Gallery 13 now develops Spinoza’s metaphysics, philosophy of mind, account of freedom, and political thought at primary scale. Keeping him secondary here preserves both the Jewish setting of his formation and the scale of his later philosophical break.'},
    ],
    sources: [
      image('Wikimedia Commons — Spinoza, Tractatus Theologico-Politicus, 1670', 'https://commons.wikimedia.org/wiki/File:Benedictus_de_Spinoza_-_Tractatus_theologico-politicus_continens_dissertationes_aliquot,_Hamburg,_Henricus_K%C3%BCnrath,_1670.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Baruch Spinoza', 'https://plato.stanford.edu/entries/spinoza/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'spinoza'},
    entityKind: 'philosopher',
  }),
].map(reviewJewishSupplementalExhibit) as readonly MuseumSupplementalExhibit[];

/**
 * Two rooms × six wall faces = twelve physical installations. The three
 * canonical philosophers occupy their outer-wall primaries; these nine
 * layouts fill every remaining wall. The closed southern Latin-Christian
 * threshold is central and does not remove either return-wall installation.
 */
export const JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  // Room 01: Saadia and Halevi primaries plus four work/context installations.
  authorSupplementalLayout({id: 'saadia-beliefs-opinions', parentExhibitId: 'saadia-gaon', zoneId: 'jewish-reason-revelation', position: {x: -4.55, z: -10.88}, rotationY: 0, assetId: 'saadia-beliefs-landauer', mediaWidth: 2.676171875, mediaHeight: 3.25, installationKind: 'jewish-work', accent: JEWISH_PALETTE.gold}),
  authorSupplementalLayout({id: 'judah-halevi-kuzari', parentExhibitId: 'judah-halevi', zoneId: 'jewish-reason-revelation', position: {x: 4.55, z: -10.88}, rotationY: 0, assetId: 'judah-halevi-kuzari-1796', mediaWidth: 3.25, mediaHeight: 2.473046875, installationKind: 'jewish-work', accent: JEWISH_PALETTE.blue}),
  authorSupplementalLayout({id: 'judeo-arabic-geniza-law', parentExhibitId: 'saadia-gaon', zoneId: 'jewish-reason-revelation', position: {x: -4.55, z: -1.12}, rotationY: Math.PI, assetId: 'cairo-geniza-legal-document', mediaWidth: 3.25, mediaHeight: 2.869140625, installationKind: 'jewish-context', accent: JEWISH_PALETTE.olive}),
  authorSupplementalLayout({id: 'judah-halevi-divan', parentExhibitId: 'judah-halevi', zoneId: 'jewish-reason-revelation', position: {x: 4.55, z: -1.12}, rotationY: Math.PI, assetId: 'judah-halevi-divan-geniza', mediaWidth: 1.508203125, mediaHeight: 3.25, installationKind: 'jewish-work', accent: JEWISH_PALETTE.pomegranate}),

  // Room 02: Maimonides anchor, one full contextual continuation, and four returns.
  authorSupplementalLayout({id: 'maimonides-mishneh-torah', parentExhibitId: 'maimonides', zoneId: 'jewish-maimonidean-crossroads', position: {x: -4.55, z: 1.12}, rotationY: 0, assetId: 'maimonides-mishneh-torah', mediaWidth: 3.25, mediaHeight: 2.5390625, installationKind: 'jewish-work', accent: JEWISH_PALETTE.gold}),
  authorSupplementalLayout({id: 'maimonides-guide-translation-reception', parentExhibitId: 'maimonides', zoneId: 'jewish-maimonidean-crossroads', position: {x: 4.55, z: 1.12}, rotationY: 0, assetId: 'maimonides-guide-arabic', mediaWidth: 2.2275, mediaHeight: 3.3, installationKind: 'jewish-context', accent: JEWISH_PALETTE.blue}),
  authorSupplementalLayout({id: 'maimonides-guide-negative-theology', parentExhibitId: 'maimonides', zoneId: 'jewish-maimonidean-crossroads', position: {x: -4.55, z: 10.88}, rotationY: Math.PI, assetId: 'maimonides-guide-negative-theology', mediaWidth: 2.34609375, mediaHeight: 3.3, installationKind: 'jewish-concept', accent: JEWISH_PALETTE.pomegranate}),
  authorSupplementalLayout({id: 'spinoza-formation-rupture-threshold', parentExhibitId: 'maimonides', zoneId: 'jewish-maimonidean-crossroads', position: {x: 4.55, z: 10.88}, rotationY: Math.PI, assetId: 'spinoza-tractatus-1670', mediaWidth: 3.48, mediaHeight: 2.664375, installationKind: 'jewish-context', accent: JEWISH_PALETTE.olive}),
  authorSupplementalLayout({id: 'jewish-philosophy-after-maimonides', parentExhibitId: 'maimonides', zoneId: 'jewish-maimonidean-crossroads', position: {x: 8.85, z: 6}, rotationY: -Math.PI / 2, assetId: 'moses-mendelssohn-rijksmuseum', mediaWidth: 2.371875, mediaHeight: 3.3, installationKind: 'jewish-context', accent: JEWISH_PALETTE.gold}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getJewishSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = JEWISH_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 12 supplemental exhibit ${id} is missing.`);
  return record;
};
