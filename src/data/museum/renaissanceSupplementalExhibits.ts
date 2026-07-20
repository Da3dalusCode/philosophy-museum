import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {RENAISSANCE_PALETTE} from './renaissanceGalleryCuration';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';
import type {MuseumZoneId} from '../museumCatalog';

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
  const y = 2.18;
  return {
    id: `${id}-hero-media`,
    assetId,
    kind: 'wall-frame',
    position: [0, y, -.39],
    rotation: [0, 0, 0],
    width,
    height,
    frameDepth: .11,
    supportHeight: 0,
    anchorId: `${id}-backing`,
    bounds: volume(`${id}-media-bounds`, {x: 0, y, z: -.39}, {width: width + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-media-support`, {x: 0, y, z: -.55}, {width: width * .74, height: height * .74, depth: .18}),
  };
};

const cameraFor = (position: MuseumPoint, rotationY: number, distance = 2.9): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance,
  z: position.z + Math.cos(rotationY) * distance,
});

const layout = ({
  id,
  parentExhibitId,
  zoneId,
  position,
  rotationY,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
  width = 4.5,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: 'machiavelli' | 'bacon' | 'hobbes';
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
  width?: number;
}): MuseumSupplementalExhibitLayout => ({
  id,
  parentExhibitId,
  zoneId,
  spatialCellId: zoneId,
  position,
  rotationY,
  interactionRadius: 3.7,
  collider: {
    id: `supplemental:${id}`,
    center: position,
    size: {width, depth: 1.05},
    rotation: rotationY,
  },
  viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.06},
  assetId,
  mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
  label: {position: [0, 4.06, -.3], width: width - .38, height: .7},
  footprint: {width, height: 4.46, depth: 1.05},
  installationKind,
  accent,
});

const presentation = (
  panelKicker: string,
  proximityKicker: string,
  factRows: readonly {label: string; value: string}[],
  articleActionLabel: string,
  entityKind: 'philosopher' | 'branch' = 'philosopher',
) => ({panelKicker, proximityKicker, factRows, articleActionLabel, entityKind}) as const;

export const RENAISSANCE_SUPPLEMENTAL_EXHIBITS = [
  {
    id: 'renaissance-school-of-athens',
    displayName: 'The School of Athens',
    shortTitle: 'The School of Athens',
    workLabel: 'RAPHAEL · 1509–1511',
    dateLabel: 'Vatican Palace · 1509–1511',
    question: 'Why did a Renaissance papal room imagine ancient philosophy as a living assembly?',
    frontSubtitle: 'Ancient philosophy re-staged for a Renaissance present',
    lead: 'Raphael’s fresco makes the recovery of Greek philosophy immediately visible. Plato and Aristotle walk at the center while mathematicians, natural philosophers, and disputants occupy a monumental imagined architecture. The scene is not a documentary gathering of ancient thinkers. It is a Renaissance claim that inherited texts could be reorganized into a confident intellectual world.',
    keyIdeas: [
      'Humanist recovery joined manuscripts, translation, commentary, art, education, and patronage.',
      'Plato and Aristotle appear as organizing poles rather than isolated authorities.',
      'Perspective turns philosophical plurality into a staged and intelligible civic space.',
      'The fresco’s papal setting ties learned recovery to institutional power.',
    ],
    cautions: [
      'The depicted meeting never occurred; many identifications remain conventional or disputed.',
      'Renaissance “recovery” depended on Byzantine, Arabic, Jewish, and Latin chains of transmission that the fresco does not show.',
      'The image celebrates elite learned culture and should not stand for the whole Renaissance.',
    ],
    sections: [
      {heading: 'Recognition: an assembly of philosophers', paragraphs: ['The central pair is conventionally identified as Plato, pointing upward while carrying the Timaeus, and Aristotle, gesturing across the world while carrying the Ethics. Their contrasting gestures give visitors an immediate way into disputes over form, nature, ethics, and knowledge.']},
      {heading: 'Orientation: recovery as an active project', paragraphs: ['Renaissance humanists did more than uncover dormant books. They collated manuscripts, learned Greek, produced translations, argued over vocabulary, taught students, and placed ancient works inside new religious, political, and artistic programs. Raphael turns that labor into a memorable public image.']},
      {heading: 'Depth: whose inheritance?', paragraphs: ['The fresco’s harmonious genealogy leaves much outside the frame. Greek texts survived through multiple communities and languages, and Renaissance intellectual life also contained conflict, censorship, unequal access, and rival uses of antiquity. The installation therefore opens the gallery with both recognition and a question about how inheritances are constructed.']},
    ],
    sources: [
      {label: 'Vatican Museums: The School of Athens', url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/stanze-di-raffaello/stanza-della-segnatura/scuola-di-atene.html', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy: Renaissance Philosophy', url: 'https://plato.stanford.edu/entries/renaissance/', kind: 'academic-reference'},
    ],
    assetId: 'plato-school-of-athens',
    panelAssetId: 'plato-school-of-athens',
    articleRoute: {kind: 'philosopher', philosopherId: 'plato'},
    presentation: presentation('Gallery 02 context exhibit', 'Renaissance recovery', [
      {label: 'Artist', value: 'Raphael'},
      {label: 'Setting', value: 'Room of the Segnatura, Vatican Palace'},
      {label: 'Why here', value: 'An image of ancient philosophy made newly present'},
      {label: 'Atlas route', value: 'Plato and his long reception'},
    ], 'Open Plato’s Atlas profile'),
  },
  {
    id: 'machiavelli-prince',
    displayName: 'The Prince',
    shortTitle: 'The Prince',
    workLabel: 'MACHIAVELLI · WRITTEN 1513',
    dateLabel: 'Written 1513 · first printed 1532',
    question: 'What must a ruler understand when political survival and ordinary morality pull apart?',
    frontSubtitle: 'Virtù, fortune, force, and political necessity',
    lead: 'The Prince studies how rulers acquire, hold, and lose states in a world shaped by unstable alliances, military danger, popular judgment, and fortune. Machiavelli’s direct attention to effective action can sound like praise of ruthlessness, yet the work is also an analysis of political vulnerability and the limits of inherited moral formulas.',
    keyIdeas: [
      'Virtù names adaptable political capacity, not simply moral virtue or brute strength.',
      'Fortune represents contingency: circumstances can defeat even capable actors.',
      'Appearances, reputation, arms, law, and popular support all affect political endurance.',
      'The book repeatedly tests what necessity permits and what cruelty destroys.',
    ],
    cautions: [
      'The Prince is not Machiavelli’s only political work; the Discourses gives republican institutions and civic conflict much more space.',
      'Calling Machiavelli a teacher of evil captures one influential reading but not the full interpretive debate.',
      'The displayed title page comes from the posthumous 1532 edition, not Machiavelli’s manuscript.',
    ],
    sections: [
      {heading: 'Recognition: advice to a new prince', paragraphs: ['Short chapters confront conquest, mercenary armies, generosity, cruelty, fear, promises, reputation, and advisers. The brisk form resembles a handbook, but its examples relentlessly expose how rapidly power can become insecure.']},
      {heading: 'Orientation: Italy under pressure', paragraphs: ['Machiavelli wrote amid Florentine regime change and foreign invasions of the Italian peninsula. His political vocabulary grows out of diplomatic and administrative experience, classical history, and the collapse of familiar institutions—not from abstract approval of deception.']},
      {heading: 'Depth: realism or provocation?', paragraphs: ['Readers disagree over whether the book teaches autonomous political technique, serves republican ends indirectly, satirizes princely pretension, or dramatizes tragic conflict between political responsibility and ordinary ethics. Its enduring power comes partly from refusing to make those tensions comfortable.']},
    ],
    sources: [
      {label: 'Machiavelli, The Prince (Project Gutenberg)', url: 'https://www.gutenberg.org/ebooks/1232', kind: 'primary-text'},
      {label: 'Stanford Encyclopedia of Philosophy: Niccolò Machiavelli', url: 'https://plato.stanford.edu/entries/machiavelli/', kind: 'academic-reference'},
    ],
    assetId: 'machiavelli-prince-1532',
    panelAssetId: 'machiavelli-prince-1532',
    articleRoute: {kind: 'philosopher', philosopherId: 'machiavelli'},
    presentation: presentation('Gallery 02 work exhibit', 'Political work', [
      {label: 'Author', value: 'Niccolò Machiavelli'},
      {label: 'Work', value: 'Il Principe'},
      {label: 'Written', value: '1513; printed posthumously in 1532'},
      {label: 'Atlas route', value: 'Machiavelli’s full profile'},
    ], 'Open Machiavelli’s full Atlas article'),
  },
  {
    id: 'ficino-enneads',
    displayName: 'Ficino’s Annotated Enneads',
    shortTitle: 'Ficino’s Annotated Enneads',
    workLabel: 'PLOTINUS · FICINO · c. 1460',
    dateLabel: 'Greek manuscript copied and annotated c. 1460',
    question: 'How does an ancient philosophy return through the work of a reader, translator, and interpreter?',
    frontSubtitle: 'A manuscript at the center of Platonic revival',
    lead: 'This Greek manuscript of Plotinus’s Enneads was densely annotated by Marsilio Ficino, the Florentine scholar who later translated Plotinus into Latin. Its pages make intellectual recovery tangible: reading, comparison, marginal notes, translation, patronage, and reinterpretation all stand between an ancient work and its Renaissance afterlife.',
    keyIdeas: [
      'Manuscript recovery is material and collaborative, not a simple rediscovery event.',
      'Ficino’s translations helped reshape Latin access to Plato and later Platonists.',
      'Renaissance Platonism intertwined metaphysics, theology, medicine, music, and accounts of the soul.',
      'Annotations preserve a thinker at work rather than only a finished doctrine.',
    ],
    cautions: [
      '“Neoplatonism” is a later scholarly label; Ficino treated Plotinus as part of a Platonic tradition.',
      'The manuscript is not Plotinus’s autograph and was copied roughly twelve centuries after his lifetime.',
      'The familiar story of a purely European classical revival obscures wider transmission histories.',
    ],
    sections: [
      {heading: 'Recognition: a worked-over page', paragraphs: ['The visual attraction is not a portrait but evidence of intellectual labor. Dense Greek text shares the page with Ficino’s notes, showing how inherited writing becomes usable through attention, correction, and interpretation.']},
      {heading: 'Orientation: the Florentine Platonic revival', paragraphs: ['With Medici support, Ficino translated Plato and Plotinus and developed a Christian Platonism centered on the soul’s place in an ordered cosmos. The phrase “Platonic Academy” can suggest a formal institution; in practice the circle and its organization were looser and remain debated.']},
      {heading: 'Depth: recovery transforms what it receives', paragraphs: ['Translation never simply carries fixed meaning across time. Ficino selected terms, reconciled authorities, and made Plotinus answer Renaissance theological and philosophical questions. The manuscript belongs here because it reveals inheritance as transformation.']},
    ],
    sources: [
      {label: 'Wikimedia Commons: Plotinus, Enneads, BnF Grec 1816', url: 'https://commons.wikimedia.org/wiki/File:Plotinus,_Enneads,_Paris,_B.N.,_Gr._1816.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy: Marsilio Ficino', url: 'https://plato.stanford.edu/entries/ficino/', kind: 'academic-reference'},
    ],
    assetId: 'neoplatonism-ficino-enneads',
    panelAssetId: 'neoplatonism-ficino-enneads',
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'},
    presentation: presentation('Gallery 02 manuscript exhibit', 'Humanist manuscript', [
      {label: 'Text', value: 'Plotinus, Enneads'},
      {label: 'Reader', value: 'Marsilio Ficino'},
      {label: 'Object', value: 'BnF Grec 1816'},
      {label: 'Atlas route', value: 'Neoplatonism and its afterlives'},
    ], 'Explore Neoplatonism in the Atlas', 'branch'),
  },
  {
    id: 'bacon-great-instauration',
    displayName: 'The Great Instauration',
    shortTitle: 'The Great Instauration',
    workLabel: 'FRANCIS BACON · 1620',
    dateLabel: 'Instauratio magna · 1620',
    question: 'How could inquiry move beyond inherited limits without pretending to begin from nothing?',
    frontSubtitle: 'A voyage beyond the old boundaries of knowledge',
    lead: 'The frontispiece to Bacon’s Great Instauration shows a ship passing the Pillars of Hercules, the conventional edge of the ancient Mediterranean world. It announces a program to enlarge knowledge through disciplined observation, experiment, collaborative collection, and the correction of persistent habits of error.',
    keyIdeas: [
      'Bacon treats knowledge as a public, cumulative, organized undertaking.',
      'His “idols” diagnose recurring sources of distortion in minds, language, and systems.',
      'Inquiry should build from carefully ordered instances rather than leap to sweeping first principles.',
      'The new method promises practical power as well as understanding.',
    ],
    cautions: [
      'The ship image belongs to Bacon’s Great Instauration, not merely a decorative title page for modern laboratory science.',
      'Bacon did not invent experiment, induction, or empirical inquiry; his importance lies partly in the scale and organization of his reform program.',
      'The language of conquest, extraction, and dominion in Bacon’s project warrants critical attention.',
    ],
    sections: [
      {heading: 'Recognition: beyond the pillars', paragraphs: ['The classical boundary marker makes Bacon’s ambition legible before a visitor reads a line. Knowledge should not remain confined by reverence for inherited systems; investigators should venture outward, return with observations, and revise general claims.']},
      {heading: 'Orientation: reforming the practice of inquiry', paragraphs: ['Bacon’s project distributes work across natural histories, experiments, tables of instances, and gradual interpretation. It imagines institutions capable of preserving results and coordinating many investigators rather than relying on one brilliant observer.']},
      {heading: 'Depth: promise and power', paragraphs: ['The reform links truth to the relief of human needs, but also links knowledge to command over nature. Its visual voyage can therefore be read both as intellectual courage and as part of an early modern culture of expansion. The method’s philosophical significance includes that unresolved political dimension.']},
    ],
    sources: [
      {label: 'Wikisource: Novum Organum', url: 'https://en.wikisource.org/wiki/Novum_Organum', kind: 'primary-text'},
      {label: 'Stanford Encyclopedia of Philosophy: Francis Bacon', url: 'https://plato.stanford.edu/entries/francis-bacon/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons: Great Instauration frontispiece', url: 'https://commons.wikimedia.org/wiki/File:Bacon_Great_Instauration_frontispiece.jpg', kind: 'collection-record'},
    ],
    assetId: 'bacon-great-instauration-1620',
    panelAssetId: 'bacon-great-instauration-1620',
    articleRoute: {kind: 'philosopher', philosopherId: 'bacon'},
    presentation: presentation('Gallery 02 work exhibit', 'Method and reform', [
      {label: 'Author', value: 'Francis Bacon'},
      {label: 'Program', value: 'Instauratio magna'},
      {label: 'Published', value: 'London, 1620'},
      {label: 'Atlas route', value: 'Francis Bacon’s full profile'},
    ], 'Open Francis Bacon’s full Atlas article'),
  },
  {
    id: 'galileo-moon',
    displayName: 'Galileo’s Moon',
    shortTitle: 'Galileo’s Moon',
    workLabel: 'SIDEREUS NUNCIUS · 1610',
    dateLabel: 'Telescopic observations published March 1610',
    question: 'What changes when an instrument reveals a Moon unlike the perfect heavenly sphere?',
    frontSubtitle: 'Observation, drawing, and an irregular lunar surface',
    lead: 'Galileo’s sketches translate telescopic patches of light and shadow into an argument about the Moon’s surface. An uneven boundary between night and day suggested mountains and valleys rather than a perfectly smooth celestial body. Seeing was not automatic: instrument, drawing, geometry, and interpretation had to work together.',
    keyIdeas: [
      'New evidence arrived through a device whose reliability itself required argument.',
      'Shadows became measurements and clues about three-dimensional lunar relief.',
      'Print let observations travel beyond the moment and place of viewing.',
      'A changed image of the heavens unsettled inherited distinctions between celestial perfection and terrestrial change.',
    ],
    cautions: [
      'The sketches are skilled representations, not photographic captures.',
      'Galileo did not make the first telescopic observations, and the telescope did not settle every cosmological dispute at once.',
      'Observation is mediated without becoming arbitrary: public techniques can still make claims testable.',
    ],
    sections: [
      {heading: 'Recognition: a rough Moon', paragraphs: ['The dark shapes and irregular terminator offered a vivid challenge to a familiar philosophical picture of flawless heavenly bodies. Galileo compared changing patches of light to sunrise on terrestrial mountain peaks.']},
      {heading: 'Orientation: from sight to evidence', paragraphs: ['A viewer had to align lenses, control glare, interpret a narrow field, revisit the object, and compare drawings. Sidereus Nuncius then converted private looking into a published claim that others could inspect, dispute, and attempt to reproduce.']},
      {heading: 'Depth: instruments reorganize trust', paragraphs: ['The episode matters for philosophy of science because evidence is never only “what the eye sees.” It depends on material devices, trained practices, background theories, communities, and standards for checking error. The telescope created new access while also creating new reasons for caution.']},
    ],
    sources: [
      {label: 'Smithsonian Libraries: Sidereus Nuncius', url: 'https://library.si.edu/digital-library/book/sidereusnuncius00gali', kind: 'primary-text'},
      {label: 'Stanford Encyclopedia of Philosophy: Galileo Galilei', url: 'https://plato.stanford.edu/entries/galileo/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons: Galileo’s lunar sketches', url: 'https://commons.wikimedia.org/wiki/File:Galileo%27s_sketches_of_the_moon.png', kind: 'collection-record'},
    ],
    assetId: 'galileo-moon-sketches-1610',
    panelAssetId: 'galileo-moon-sketches-1610',
    articleRoute: {kind: 'branch', branchId: 'philosophy-of-science'},
    presentation: presentation('Gallery 02 discovery exhibit', 'Observation and drawing', [
      {label: 'Observer', value: 'Galileo Galilei'},
      {label: 'Publication', value: 'Sidereus Nuncius'},
      {label: 'Date', value: 'March 1610'},
      {label: 'Atlas route', value: 'Philosophy of Science'},
    ], 'Explore Philosophy of Science', 'branch'),
  },
  {
    id: 'galileo-telescopes',
    displayName: 'Galileo’s Telescopes',
    shortTitle: 'Galileo’s Telescopes',
    workLabel: 'MUSEO GALILEO · 1609–c. 1610',
    dateLabel: 'Surviving instruments from 1609 and c. 1610',
    question: 'When can a new instrument become a trustworthy extension of human perception?',
    frontSubtitle: 'Wood, lenses, narrow fields, and disciplined seeing',
    lead: 'Two surviving telescopes make the material conditions of Galileo’s observations concrete. Their wooden and leather-covered tubes, small apertures, limited fields of view, and handmade lenses offered extraordinary access by modern standards of the time—but demanded patient skill and generated immediate disputes about illusion and reliability.',
    keyIdeas: [
      'Scientific change can begin with craft knowledge as much as with a new theory.',
      'An instrument amplifies perception while introducing its own distortions and limits.',
      'Reliability grows through calibration, repeated use, comparison, demonstration, and community uptake.',
      'Courtly patronage and learned networks helped observations circulate.',
    ],
    cautions: [
      'The instruments are not replicas; the photograph shows surviving Museo Galileo objects associated with Galileo.',
      'A powerful instrument does not interpret its own output.',
      'The familiar heroic-inventor story can hide the prior development of telescopes and the work of lens makers.',
    ],
    sections: [
      {heading: 'Recognition: the instrument itself', paragraphs: ['The telescope was neither a transparent window nor a modern observatory device. The surviving tubes make its constraints visible: a viewer worked through a tiny field and had to keep a moving object aligned while judging unstable images.']},
      {heading: 'Orientation: making observation public', paragraphs: ['Galileo demonstrated the telescope to patrons and correspondents, described what it revealed, and connected observations to geometrical arguments. Naming, publication, and institutional alliances helped turn a crafted object into a recognized scientific instrument.']},
      {heading: 'Depth: mediated evidence', paragraphs: ['Instrumental evidence is stronger, not weaker, when its mediation is understood. Knowing how lenses distort, how devices are constructed, and which comparisons reveal error allows communities to treat observation as disciplined and revisable rather than as private vision.']},
    ],
    sources: [
      {label: 'Museo Galileo: Galileo’s telescopes', url: 'https://catalogue.museogalileo.it/object/GalileosTelescope_n01.html', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy: Galileo Galilei', url: 'https://plato.stanford.edu/entries/galileo/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons photograph and license record', url: 'https://commons.wikimedia.org/wiki/File:Galilei_telescopes%2C_Museo_Galileo%2C_Florence%2C_Inv._242%2C_2428%2C_224088.jpg', kind: 'collection-record'},
    ],
    assetId: 'galileo-telescopes-museo',
    panelAssetId: 'galileo-telescopes-museo',
    articleRoute: {kind: 'branch', branchId: 'philosophy-of-science'},
    presentation: presentation('Gallery 02 instrument exhibit', 'Scientific instrument', [
      {label: 'Maker', value: 'Galileo Galilei'},
      {label: 'Materials', value: 'Wood, paper, copper, leather, and glass'},
      {label: 'Collection', value: 'Museo Galileo, Florence'},
      {label: 'Atlas route', value: 'Philosophy of Science'},
    ], 'Explore Philosophy of Science', 'branch'),
  },
  {
    id: 'hobbes-leviathan',
    displayName: 'Leviathan',
    shortTitle: 'Leviathan',
    workLabel: 'THOMAS HOBBES · 1651',
    dateLabel: 'First published 1651',
    question: 'How can many vulnerable people authorize one public power without literally becoming one body?',
    frontSubtitle: 'A commonwealth made from a multitude',
    lead: 'The famous frontispiece gives Hobbes’s political argument a body: a colossal sovereign rises above the landscape, composed of many small people whose faces turn toward the head. The image stages authorization and unity, but also forces the problem into view—what happens to plural persons when public power speaks as one?',
    keyIdeas: [
      'The commonwealth is an “artificial person” authorized to act in the name of many.',
      'Covenant creates public authority because insecure private judgment cannot guarantee peace.',
      'Sovereignty must be effective and undivided if it is to end the conflict of rival powers.',
      'The state’s legitimacy remains tied to protection even within Hobbes’s demanding theory of obedience.',
    ],
    cautions: [
      'Hobbes’s state of nature is a philosophical construction, not a simple historical report about early humanity.',
      'Authorization does not make Hobbes a modern liberal democrat; subjects retain very limited institutional control.',
      'The frontispiece is a designed argument-image, not a literal portrait of a political community.',
    ],
    sections: [
      {heading: 'Recognition: the giant made of people', paragraphs: ['The image makes collective agency immediately graspable. The sovereign’s body exists only because many individuals compose it, yet those individuals appear small and oriented toward a single head. Unity and subordination arrive together.']},
      {heading: 'Orientation: peace through authorization', paragraphs: ['Hobbes begins from equality of vulnerability, competition, uncertainty, and the absence of a common judge. Individuals covenant with one another to authorize a sovereign whose decisions can settle disputes and coordinate defense. The sovereign is not a party to that covenant in Hobbes’s construction.']},
      {heading: 'Depth: security and its costs', paragraphs: ['The theory asks how much authority peace requires and what subjects may still refuse. Hobbes preserves a right of self-preservation while rejecting divided sovereignty and most claims to resist public judgment. That trade between security and political control remains the installation’s live question.']},
    ],
    sources: [
      {label: 'Hobbes, Leviathan (Project Gutenberg)', url: 'https://www.gutenberg.org/ebooks/3207', kind: 'primary-text'},
      {label: 'Stanford Encyclopedia of Philosophy: Hobbes’s Moral and Political Philosophy', url: 'https://plato.stanford.edu/entries/hobbes-moral/', kind: 'academic-reference'},
    ],
    assetId: 'hobbes-leviathan-1651',
    panelAssetId: 'hobbes-leviathan-1651',
    articleRoute: {kind: 'philosopher', philosopherId: 'hobbes'},
    presentation: presentation('Gallery 02 work exhibit', 'Political work', [
      {label: 'Author', value: 'Thomas Hobbes'},
      {label: 'Work', value: 'Leviathan'},
      {label: 'Published', value: 'London, 1651'},
      {label: 'Atlas route', value: 'Hobbes’s full profile'},
    ], 'Open Hobbes’s full Atlas article'),
  },
  {
    id: 'hobbes-de-cive',
    displayName: 'De Cive',
    shortTitle: 'De Cive',
    workLabel: 'THOMAS HOBBES · 1642',
    dateLabel: 'Paris edition · 1642',
    question: 'Can civil obligation be built from fear, equality, covenant, and the need for a common judge?',
    frontSubtitle: 'Liberty, dominion, and religion before Leviathan',
    lead: 'De Cive presents Hobbes’s civil philosophy nearly a decade before Leviathan. Its engraved frontispiece separates liberty, political dominion, and religion into a compressed visual order. The work begins from conflict and vulnerability, then argues that peace requires covenant and a power capable of making judgment public.',
    keyIdeas: [
      'Natural equality includes roughly equal vulnerability and therefore mutual fear.',
      'Peace requires common rules and an authority able to decide their application.',
      'Civil liberty is redefined within, not outside, an effective commonwealth.',
      'Religious authority becomes inseparable from the problem of divided political power.',
    ],
    cautions: [
      'De Cive’s “natural condition” is an argumentative model rather than a neutral anthropology.',
      'The engraved figures use European stereotypes and political allegory; they are not documentary peoples.',
      'Hobbes revised the work, and Leviathan changes the vocabulary and presentation of several arguments.',
    ],
    sections: [
      {heading: 'Recognition: three domains in one image', paragraphs: ['The frontispiece offers a visual threshold into Hobbes’s system. Liberty appears outside civil order, dominion appears with political institutions, and religion occupies the upper register. The arrangement asks whether these powers can coexist without a final judge.']},
      {heading: 'Orientation: an argument formed in crisis', paragraphs: ['Published as political conflict intensified in England, De Cive addresses readers already confronting competing claims of crown, parliament, church, conscience, and law. Hobbes’s answer is severe because he treats divided judgment as a route back to war.']},
      {heading: 'Depth: from person to office', paragraphs: ['Hobbes does not rely on the ruler’s personal excellence. What matters is an authorized office whose public decisions can count as the acts of the commonwealth. That move from virtue to artificial personhood changes the terms of political philosophy.']},
    ],
    sources: [
      {label: 'Hobbes, De Cive (Wikisource)', url: 'https://en.wikisource.org/wiki/De_Cive', kind: 'primary-text'},
      {label: 'Stanford Encyclopedia of Philosophy: Hobbes’s Moral and Political Philosophy', url: 'https://plato.stanford.edu/entries/hobbes-moral/', kind: 'academic-reference'},
      {label: 'Houghton Library: De Cive, 1642', url: 'https://id.lib.harvard.edu/alma/990067818970203941/catalog', kind: 'collection-record'},
    ],
    assetId: 'hobbes-de-cive-1642',
    panelAssetId: 'hobbes-de-cive-1642',
    articleRoute: {kind: 'philosopher', philosopherId: 'hobbes'},
    presentation: presentation('Gallery 02 work exhibit', 'Political work', [
      {label: 'Author', value: 'Thomas Hobbes'},
      {label: 'Engraver', value: 'Jean Matheus'},
      {label: 'Published', value: 'Paris, 1642'},
      {label: 'Atlas route', value: 'Hobbes’s full profile'},
    ], 'Open Hobbes’s full Atlas article'),
  },
  {
    id: 'english-civil-war',
    displayName: 'The Crisis of Civil War',
    shortTitle: 'The Crisis of Civil War',
    workLabel: 'PARLIAMENTARY PAMPHLET · 1642',
    dateLabel: '22 August 1642',
    question: 'What does political obligation mean when rival authorities each claim the right to command?',
    frontSubtitle: 'Print, propaganda, and the breakdown of common judgment',
    lead: 'This parliamentary pamphlet depicts Charles I raising the royal standard at Nottingham, an event conventionally associated with the opening of the English Civil War. It is partisan print, not neutral reportage. Placed beside Hobbes, it supplies the historical pressure behind his fear of divided sovereignty: words, images, offices, armies, and loyalties no longer converged on one public authority.',
    keyIdeas: [
      'Civil war is also a crisis over who may define law, loyalty, religion, and public truth.',
      'Cheap print helped competing accounts of events travel rapidly.',
      'Hobbes’s demand for a final judge responds to the experience of rival institutional claims.',
      'Historical context explains a problem without automatically justifying Hobbes’s solution.',
    ],
    cautions: [
      'The pamphlet advances a parliamentary perspective and should be read as propaganda as well as evidence.',
      'The causes of the wars cannot be reduced to one disagreement or to Hobbes’s later theoretical framing.',
      'Hobbes’s relationship to the conflict changed over time; context should not turn his philosophy into a simple reaction.',
    ],
    sections: [
      {heading: 'Recognition: authority made visible', paragraphs: ['The woodcut stages a public claim through ceremony, standards, armed attendance, and print. A reader did not merely receive news; the pamphlet invited a judgment about which institutions and actions counted as legitimate.']},
      {heading: 'Orientation: the loss of a common judge', paragraphs: ['Crown and parliament contested taxation, command, religion, militia, and constitutional authority. Local commitments and conflicts across the three kingdoms further complicated the struggle. Hobbes’s language of sovereignty tries to prevent precisely this multiplication of final claims.']},
      {heading: 'Depth: explanation is not endorsement', paragraphs: ['The violence of civil war helps explain why security dominates Hobbes’s political philosophy. It does not settle whether indivisible sovereign power is necessary, whether mixed institutions can contain conflict, or when resistance becomes justified. The installation leaves those questions open.']},
    ],
    sources: [
      {label: 'Wikimedia Commons: parliamentary pamphlet, 1642', url: 'https://commons.wikimedia.org/wiki/File:English_Civil_War_parliamentary_pamphlet,_1642.jpg', kind: 'collection-record'},
      {label: 'UK Parliament: Civil War', url: 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/civilwar/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy: Thomas Hobbes', url: 'https://plato.stanford.edu/entries/hobbes/', kind: 'academic-reference'},
    ],
    assetId: 'english-civil-war-pamphlet-1642',
    panelAssetId: 'english-civil-war-pamphlet-1642',
    articleRoute: {kind: 'philosopher', philosopherId: 'hobbes'},
    presentation: presentation('Gallery 02 context exhibit', 'Political crisis', [
      {label: 'Object', value: 'Parliamentary pamphlet'},
      {label: 'Event', value: 'Charles I raises the royal standard'},
      {label: 'Date', value: '22 August 1642'},
      {label: 'Atlas route', value: 'Hobbes’s political philosophy'},
    ], 'Open Hobbes’s full Atlas article'),
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

export const RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'renaissance-school-of-athens', parentExhibitId: 'machiavelli', zoneId: 'early-statecraft-republic', position: {x: 10.85, z: -23.35}, rotationY: -Math.PI / 2, assetId: 'plato-school-of-athens', mediaWidth: 3.72, mediaHeight: 2.43, installationKind: 'renaissance-context', accent: RENAISSANCE_PALETTE.terracotta, width: 4.9}),
  layout({id: 'machiavelli-prince', parentExhibitId: 'machiavelli', zoneId: 'early-statecraft-republic', position: {x: -10.85, z: -16.8}, rotationY: Math.PI / 2, assetId: 'machiavelli-prince-1532', mediaWidth: 2.25, mediaHeight: 3.18, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.oxblood}),
  layout({id: 'ficino-enneads', parentExhibitId: 'machiavelli', zoneId: 'early-statecraft-republic', position: {x: 10.85, z: -15.35}, rotationY: -Math.PI / 2, assetId: 'neoplatonism-ficino-enneads', mediaWidth: 2.38, mediaHeight: 3.16, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.agedBrass}),
  layout({id: 'bacon-great-instauration', parentExhibitId: 'bacon', zoneId: 'early-experiment-method', position: {x: -10.85, z: -5.35}, rotationY: Math.PI / 2, assetId: 'bacon-great-instauration-1620', mediaWidth: 2.22, mediaHeight: 3.36, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.inkBlue}),
  layout({id: 'galileo-moon', parentExhibitId: 'bacon', zoneId: 'early-experiment-method', position: {x: 10.85, z: -5.35}, rotationY: -Math.PI / 2, assetId: 'galileo-moon-sketches-1610', mediaWidth: 2.38, mediaHeight: 3.3, installationKind: 'renaissance-observation', accent: RENAISSANCE_PALETTE.agedBrass}),
  layout({id: 'galileo-telescopes', parentExhibitId: 'bacon', zoneId: 'early-experiment-method', position: {x: 10.85, z: 5}, rotationY: -Math.PI / 2, assetId: 'galileo-telescopes-museo', mediaWidth: 3.78, mediaHeight: 2.52, installationKind: 'renaissance-observation', accent: RENAISSANCE_PALETTE.inkBlue, width: 4.9}),
  layout({id: 'hobbes-leviathan', parentExhibitId: 'hobbes', zoneId: 'early-sovereignty-materialism', position: {x: -10.85, z: 14.2}, rotationY: Math.PI / 2, assetId: 'hobbes-leviathan-1651', mediaWidth: 2.3, mediaHeight: 3.2, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.agedBrass}),
  layout({id: 'hobbes-de-cive', parentExhibitId: 'hobbes', zoneId: 'early-sovereignty-materialism', position: {x: 10.85, z: 18.7}, rotationY: -Math.PI / 2, assetId: 'hobbes-de-cive-1642', mediaWidth: 2.55, mediaHeight: 3.18, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.oxblood}),
  layout({id: 'english-civil-war', parentExhibitId: 'hobbes', zoneId: 'early-sovereignty-materialism', position: {x: -10.85, z: 22.45}, rotationY: Math.PI / 2, assetId: 'english-civil-war-pamphlet-1642', mediaWidth: 2.22, mediaHeight: 3.34, installationKind: 'renaissance-context', accent: RENAISSANCE_PALETTE.terracotta}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

const supplementalById = new Map<MuseumSupplementalExhibitId, MuseumSupplementalExhibit>(
  RENAISSANCE_SUPPLEMENTAL_EXHIBITS.map((record) => [record.id, record]),
);

export const findRenaissanceSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit | undefined => supplementalById.get(id);

export const getRenaissanceSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = findRenaissanceSupplementalExhibit(id);
  if (!record) throw new Error(`Gallery 02 supplemental exhibit ${id} is missing.`);
  return record;
};
