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
  parentExhibitId: 'machiavelli' | 'ficino' | 'bacon' | 'galileo' | 'hobbes';
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
    id: 'renaissance-texts-in-transit',
    displayName: 'Texts in Transit',
    shortTitle: 'Texts in Transit',
    workLabel: 'GREEK TEXT → LATIN TRANSLATION → PRINT · 1482',
    dateLabel: 'Ulm Ptolemy · 1482',
    question: 'What has to happen before an old text can become a new intellectual resource?',
    frontSubtitle: 'Manuscripts, languages, ports, workshops, and moving readers',
    lead: 'This world map comes from the 1482 Ulm edition of Ptolemy’s Geography. Its production condenses a long chain: a second-century Greek text, late medieval recovery of Greek manuscripts, Jacobus Angelus’s Latin translation, Nicolaus Germanus’s revisions, Johannes Schnitzer’s woodcut, and a printed book able to travel. It replaces a heroic image of “rediscovery” with the material movement of texts, people, skills, and interpretations.',
    keyIdeas: [
      'Recovery depends on copies, catalogues, teachers, translators, patrons, and routes of exchange.',
      'Translation makes texts available while also choosing how their concepts will be understood.',
      'Print increases reach but does not remove correction, interpretation, or unequal access.',
      'Greek, Byzantine, Arabic, Jewish, and Latin intellectual worlds all belong to the longer transit story.',
    ],
    cautions: [
      'The map is an object produced by transmission, not a literal map of manuscript routes.',
      '“Recovery” can wrongly imply that ancient learning simply vanished until Western Europe found it.',
      'Movement did not preserve texts unchanged; every copy, translation, commentary, and edition could transform them.',
    ],
    sections: [
      {heading: 'Recognition: a text becomes a printed world', paragraphs: ['The winds, projection, place names, and woodcut lines make Ptolemy’s ancient geographical scheme visible in a fifteenth-century printed form. The object is immediately legible as a map, yet no single moment in its history can explain how it reached this page.']},
      {heading: 'Orientation: people carry knowledge', paragraphs: ['Scholars learned languages, crossed political boundaries, compared manuscripts, taught pupils, negotiated patronage, and worked with scribes, block cutters, and printers. Ficino’s Florentine practice belongs inside this larger ecology of movement rather than outside it as solitary genius.']},
      {heading: 'Depth: transmission is transformation', paragraphs: ['Jacobus Angelus’s Latin, Germanus’s emendations, Schnitzer’s image, and the Ulm press did not merely reproduce an untouched original. They made decisions about terms, geography, layout, authority, and audience. A received text survives by becoming usable in a new setting.']},
    ],
    sources: [
      {label: 'Wikimedia Commons: world map from the 1482 Ulm Ptolemy', url: 'https://commons.wikimedia.org/wiki/File:World_of_Ptolemy_as_shown_by_Johannes_de_Armsshein_-_Ulm_1482.png', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy: Renaissance Philosophy', url: 'https://plato.stanford.edu/entries/renaissance/', kind: 'academic-reference'},
    ],
    assetId: 'renaissance-texts-in-transit-ptolemy-1482',
    panelAssetId: 'renaissance-texts-in-transit-ptolemy-1482',
    articleRoute: {kind: 'philosopher', philosopherId: 'ficino'},
    presentation: presentation('Gallery 02 gateway exhibit', 'Transmission and recovery', [
      {label: 'Object', value: 'World map in Ptolemy’s Geography'},
      {label: 'Chain', value: 'Greek manuscript → Latin translation → woodcut print'},
      {label: 'Edition', value: 'Ulm, 1482'},
      {label: 'Atlas route', value: 'Marsilio Ficino and Renaissance Platonism'},
    ], 'Open Marsilio Ficino’s Atlas article'),
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
    id: 'machiavelli-discourses',
    displayName: 'Discourses on Livy',
    shortTitle: 'Discourses on Livy',
    workLabel: 'MACHIAVELLI · WRITTEN c. 1513–1519',
    dateLabel: 'Written c. 1513–1519 · 1540 edition displayed',
    question: 'How can an ambitious and divided people build institutions that protect republican liberty?',
    frontSubtitle: 'Conflict, citizen power, law, and institutional renewal',
    lead: 'The Discourses on Livy turns from the vulnerable prince to the durable republic. Reading Rome through Livy, Machiavelli argues that liberty can depend on institutions that channel conflict between elites and people, citizen participation in defense, public accusation, and periodic renewal. The work does not erase The Prince; it changes the scale of the political problem from a ruler’s judgment to a republic’s capacity to survive corruption.',
    keyIdeas: [
      'Conflict can defend liberty when laws and offices give it a public form.',
      'Citizens who do not wish to be dominated may guard freedom better than ambitious elites.',
      'Military dependence undermines a republic’s practical independence.',
      'Institutions need ways to recover founding energy without normalizing permanent emergency.',
    ],
    cautions: [
      'Machiavelli’s Rome is an argumentative resource, not a neutral reconstruction of Roman history.',
      'His republican liberty is not identical to modern universal democracy and coexists with expansionist assumptions.',
      'The displayed 1540 title page comes from a posthumous edition, thirteen years after Machiavelli’s death.',
    ],
    sections: [
      {heading: 'Recognition: the other Machiavelli', paragraphs: ['The title page opens the larger republican work that popular summaries often omit. Putting it across the room from The Prince makes a basic interpretive correction physical: Machiavelli writes about founding and princely danger, but also about citizens, offices, law, conflict, armies, and renewal.']},
      {heading: 'Orientation: reading Rome for Florence', paragraphs: ['Livy’s history supplies examples through which Machiavelli examines Florence and the wider Italian crisis. He asks which arrangements let a republic use ordinary ambition productively and which allow private factions to capture public power. Ancient history becomes a workshop for diagnosing contemporary institutions.']},
      {heading: 'Depth: conflict without collapse', paragraphs: ['The Discourses challenges the idea that political harmony is always healthy. Elite and popular desires differ, and suppressing that difference can hide domination. The difficult task is to create procedures that make conflict answerable to law while preserving enough civic capacity to resist corruption and conquest.']},
    ],
    sources: [
      {label: 'Project Gutenberg: Discourses on the First Decade of Titus Livius', url: 'https://www.gutenberg.org/ebooks/10827', kind: 'primary-text'},
      {label: 'Stanford Encyclopedia of Philosophy: Niccolò Machiavelli', url: 'https://plato.stanford.edu/entries/machiavelli/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons: 1540 Discorsi title page', url: 'https://commons.wikimedia.org/wiki/File:Discorsi_di_Nicolo_Machiavelli,_firentino,_sopra_la_prima_deca_di_Tito_Livio.jpg', kind: 'collection-record'},
    ],
    assetId: 'machiavelli-discourses-1540',
    panelAssetId: 'machiavelli-discourses-1540',
    articleRoute: {kind: 'philosopher', philosopherId: 'machiavelli'},
    presentation: presentation('Gallery 02 work exhibit', 'Republican work', [
      {label: 'Author', value: 'Niccolò Machiavelli'},
      {label: 'Work', value: 'Discorsi sopra la prima deca di Tito Livio'},
      {label: 'Displayed edition', value: '1540 Aldine edition'},
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
    articleRoute: {kind: 'philosopher', philosopherId: 'ficino'},
    presentation: presentation('Gallery 02 manuscript exhibit', 'Humanist manuscript', [
      {label: 'Text', value: 'Plotinus, Enneads'},
      {label: 'Reader', value: 'Marsilio Ficino'},
      {label: 'Object', value: 'BnF Grec 1816'},
      {label: 'Atlas route', value: 'Marsilio Ficino’s full profile'},
    ], 'Open Marsilio Ficino’s full Atlas article'),
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
    id: 'bacon-novum-organum',
    displayName: 'Novum Organum',
    shortTitle: 'Novum Organum',
    workLabel: 'FRANCIS BACON · 1620',
    dateLabel: 'First published 1620 · 1645 edition displayed',
    question: 'How can investigators discipline the mind before asking nature to answer?',
    frontSubtitle: 'Idols, ordered instances, elimination, and cautious ascent',
    lead: 'Novum Organum is the methodological second part of Bacon’s unfinished Great Instauration. Where the larger program announces a reformation of knowledge, this work diagnoses the mind’s recurring “idols” and proposes a slow movement from organized instances toward provisional axioms. Bacon’s induction is not a command to collect facts without ideas; it is an attempt to prevent familiar words, favored systems, and dramatic examples from deciding the result too early.',
    keyIdeas: [
      'The idols of tribe, cave, marketplace, and theater name different routes by which inquiry goes wrong.',
      'Negative and contrasting instances can test a proposed explanation more strongly than easy confirmations.',
      'Axioms should rise by measured stages and remain answerable to further work.',
      'Method is institutional because one lifetime cannot gather and order the required histories of nature.',
    ],
    cautions: [
      'Baconian induction is more structured than “observe many cases and generalize.”',
      'Modern science does not follow one universal Baconian recipe; theory and mathematics often guide observation.',
      'The displayed title page is from a 1645 Leiden edition published after Bacon’s death.',
    ],
    sections: [
      {heading: 'Recognition: naming the new instrument', paragraphs: ['The title announces a new organon—a new instrument of reasoning—against the inherited authority of Aristotle’s logical works. The claim is programmatic rather than a rejection of every ancient insight: the issue is whether existing intellectual habits can generate cumulative discovery.']},
      {heading: 'Orientation: correcting the investigator', paragraphs: ['Bacon begins method with the knower’s vulnerabilities. Shared human tendencies, private formation, unstable language, and inherited systems can all bend evidence toward expectation. The idols are not mistakes eliminated once; they are recurring pressures that organized practice must keep checking.']},
      {heading: 'Depth: induction by exclusion', paragraphs: ['Tables of presence, absence, and degree arrange comparisons so candidate explanations can be rejected or refined. The method’s strongest philosophical lesson is procedural humility: evidence must be prepared, counterinstances must matter, and general claims should not outrun the work that made them possible.']},
    ],
    sources: [
      {label: 'Wikisource: Novum Organum', url: 'https://en.wikisource.org/wiki/Novum_Organum', kind: 'primary-text'},
      {label: 'Stanford Encyclopedia of Philosophy: Francis Bacon', url: 'https://plato.stanford.edu/entries/francis-bacon/', kind: 'academic-reference'},
      {label: 'Houghton Library: Novum Organum Scientiarum, 1645', url: 'https://id.lib.harvard.edu/aleph/004174768/catalog', kind: 'collection-record'},
    ],
    assetId: 'bacon-novum-organum-1645',
    panelAssetId: 'bacon-novum-organum-1645',
    articleRoute: {kind: 'philosopher', philosopherId: 'bacon'},
    presentation: presentation('Gallery 02 work exhibit', 'Methodological work', [
      {label: 'Author', value: 'Francis Bacon'},
      {label: 'Work', value: 'Novum Organum'},
      {label: 'Displayed edition', value: 'Leiden, 1645'},
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
    articleRoute: {kind: 'philosopher', philosopherId: 'galileo'},
    presentation: presentation('Gallery 02 discovery exhibit', 'Observation and drawing', [
      {label: 'Observer', value: 'Galileo Galilei'},
      {label: 'Publication', value: 'Sidereus Nuncius'},
      {label: 'Date', value: 'March 1610'},
      {label: 'Atlas route', value: 'Galileo Galilei’s full profile'},
    ], 'Open Galileo Galilei’s full Atlas article'),
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
    articleRoute: {kind: 'philosopher', philosopherId: 'galileo'},
    presentation: presentation('Gallery 02 instrument exhibit', 'Scientific instrument', [
      {label: 'Maker', value: 'Galileo Galilei'},
      {label: 'Materials', value: 'Wood, paper, copper, leather, and glass'},
      {label: 'Collection', value: 'Museo Galileo, Florence'},
      {label: 'Atlas route', value: 'Galileo Galilei’s full profile'},
    ], 'Open Galileo Galilei’s full Atlas article'),
  },
  {
    id: 'putney-debates',
    displayName: 'The Putney Debates',
    shortTitle: 'The Putney Debates',
    workLabel: 'NEW MODEL ARMY · OCTOBER–NOVEMBER 1647',
    dateLabel: 'Putney, 28 October–11 November 1647',
    question: 'Who counts as part of the people, and what political settlement may they authorize?',
    frontSubtitle: 'Consent, property, suffrage, and a constitution argued aloud',
    lead: 'At Putney, officers and elected representatives of the New Model Army argued over proposals associated with the Agreement of the People. Leveller-aligned speakers pressed a broad language of consent and political equality; Henry Ireton and others defended a settlement tied more closely to property and the existing social order. The surviving record captures neither a modern democratic convention nor one unified Leveller position, but a rare extended argument over who the people are.',
    keyIdeas: [
      'Consent becomes unstable if only a propertied minority may count as politically represented.',
      'Property, independence, military service, and residence were competing grounds for political voice.',
      'Written constitutional proposals attempted to place some fundamentals beyond ordinary government.',
      'The debates expose alternatives to Hobbes’s move from authorization toward undivided sovereignty.',
    ],
    cautions: [
      'The surviving account was recorded and later edited; it is not a complete neutral transcript.',
      'The 1648 Agreement displayed here is closely related political evidence, not a picture of the Putney meeting.',
      'Even the broader suffrage proposals excluded significant groups and should not be equated with universal democracy.',
    ],
    sections: [
      {heading: 'Recognition: a constitutional title page', paragraphs: ['The printed Agreement turns army argument into a proposal addressed to the nation. Its presence gives the spoken debates a material afterlife while the date warns visitors not to collapse the 1648 edition into the 1647 meetings themselves.']},
      {heading: 'Orientation: authority after war', paragraphs: ['Parliament had fought the king, the Army had become an independent political force, and soldiers wanted arrears, protection, and a defensible settlement. With familiar authority broken, participants had to argue from first principles about representation, property, conscience, and the source of law.']},
      {heading: 'Depth: a live alternative beside Hobbes', paragraphs: ['Hobbes answers divided judgment by constructing an authorized sovereign whose public decisions end the contest. Putney keeps another possibility visible: political order might be stabilized through a written agreement and a wider account of who may authorize it. The room invites comparison without pretending the Levellers solved every exclusion.']},
    ],
    sources: [
      {label: 'Wikisource: The Putney Debates', url: 'https://en.wikisource.org/wiki/The_Putney_Debates', kind: 'primary-text'},
      {label: 'The National Archives: The Putney Debates', url: 'https://www.nationalarchives.gov.uk/explore-the-collection/on-the-record-podcast/on-the-record-the-putney-debates/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons: Agreement of the People, 1648 edition', url: 'https://commons.wikimedia.org/wiki/File:Agreement_of_the_people_(1648_edition)_(IA_agreement1648).djvu', kind: 'collection-record'},
    ],
    assetId: 'putney-agreement-people-1648',
    panelAssetId: 'putney-agreement-people-1648',
    articleRoute: {kind: 'philosopher', philosopherId: 'hobbes'},
    presentation: presentation('Gallery 02 debate exhibit', 'Constitutional debate', [
      {label: 'Meeting', value: 'General Council of the New Model Army'},
      {label: 'Place and date', value: 'Putney, October–November 1647'},
      {label: 'Displayed object', value: 'Agreement of the People, 1648 edition'},
      {label: 'Atlas route', value: 'Thomas Hobbes and the problem of authorization'},
    ], 'Open Thomas Hobbes’s full Atlas article'),
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
  {
    id: 'hobbes-materialism-motion',
    displayName: 'Materialism, Motion, and the Human Body',
    shortTitle: 'Materialism, Motion, and the Human Body',
    workLabel: 'HOBBES · MOTION · BODY · SEVENTEENTH CENTURY',
    dateLabel: 'Research notes on Galilean motion · seventeenth century',
    question: 'What becomes of sensation, desire, and political action if every event belongs to a world of bodies in motion?',
    frontSubtitle: 'Mechanics carried into perception, appetite, and commonwealth',
    lead: 'Hobbes’s political philosophy rests on a broader materialism. Bodies move; motions reach the sense organs; internal motions continue as imagination, appetite, and aversion; and human beings seek power and security under conditions of vulnerability. These displayed notes connect Hobbes’s intellectual world to Galilean problems of motion. They are not proof of a simple one-way influence or a verified autograph, but a material threshold between mechanics and a philosophy of embodied action.',
    keyIdeas: [
      'Hobbes rejects incorporeal substances within his philosophical explanation of nature and mind.',
      'Sensation is an effect of external motion continued within a perceiving body.',
      'Appetite and aversion make deliberation a changing sequence of bodily inclinations.',
      'Political order begins with embodied agents who can be threatened, injured, moved, and protected.',
    ],
    cautions: [
      'Mechanism does not by itself derive Hobbes’s political conclusions; authorization remains an argument about persons and obligation.',
      'The Commons description associates these displayed notes with Hobbes, but authorship of every mark should not be overstated.',
      'Calling the body a machine can clarify causal explanation while obscuring lived, social, and affective dimensions of embodiment.',
    ],
    sections: [
      {heading: 'Recognition: motion on paper', paragraphs: ['Diagrams and calculations make a less familiar Hobbes visible: a thinker engaged with geometry, optics, mechanics, and the scientific problems shared across seventeenth-century networks. The installation keeps that research world adjacent to, but distinct from, the famous political frontispieces.']},
      {heading: 'Orientation: from impact to imagination', paragraphs: ['For Hobbes, an external body produces motion in the sense organs and nervous system. What appears as color, sound, or image is not a copy existing in the object but the perceiver’s bodily effect. Imagination is decaying sense, and desire continues the same material story into action.']},
      {heading: 'Depth: why materialism matters politically', paragraphs: ['Fear of violent death has force because agents are vulnerable bodies, not abstract choosers outside nature. Yet covenant and representation add normative structure that mechanics alone cannot supply. The exhibit’s point is therefore not “physics proves Leviathan,” but that Hobbes builds civil philosophy for embodied beings within one causal world.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy: Thomas Hobbes', url: 'https://plato.stanford.edu/entries/hobbes/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy: Hobbes’s Philosophy of Science', url: 'https://plato.stanford.edu/entries/hobbes-science/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons: notes on Galileo’s theory of motion displayed at Chatsworth', url: 'https://commons.wikimedia.org/wiki/File:Notes_on_Galileo%27s_theory_of_motion,_by_Thomas_Hobbes,_1600s_-_Oak_Room,_Chatsworth_House_-_Derbyshire,_England_-_DSC03056.jpg', kind: 'collection-record'},
    ],
    assetId: 'hobbes-notes-motion-chatsworth',
    panelAssetId: 'hobbes-notes-motion-chatsworth',
    articleRoute: {kind: 'philosopher', philosopherId: 'hobbes'},
    presentation: presentation('Gallery 02 concept exhibit', 'Materialist system', [
      {label: 'Theme', value: 'Body, motion, sensation, appetite'},
      {label: 'Displayed object', value: 'Seventeenth-century notes associated with Hobbes’s research world'},
      {label: 'Collection', value: 'Chatsworth House'},
      {label: 'Atlas route', value: 'Thomas Hobbes’s full profile'},
    ], 'Open Thomas Hobbes’s full Atlas article'),
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

export const RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'renaissance-texts-in-transit', parentExhibitId: 'ficino', zoneId: 'early-statecraft-republic', position: {x: 10.85, z: -23.25}, rotationY: -Math.PI / 2, assetId: 'renaissance-texts-in-transit-ptolemy-1482', mediaWidth: 3.38, mediaHeight: 2.46, installationKind: 'renaissance-context', accent: RENAISSANCE_PALETTE.terracotta, width: 4.35}),
  layout({id: 'machiavelli-discourses', parentExhibitId: 'machiavelli', zoneId: 'early-statecraft-republic', position: {x: -10.85, z: -22.45}, rotationY: Math.PI / 2, assetId: 'machiavelli-discourses-1540', mediaWidth: 2.05, mediaHeight: 3.34, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.agedBrass}),
  layout({id: 'machiavelli-prince', parentExhibitId: 'machiavelli', zoneId: 'early-statecraft-republic', position: {x: -10.85, z: -16}, rotationY: Math.PI / 2, assetId: 'machiavelli-prince-1532', mediaWidth: 2.25, mediaHeight: 3.18, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.oxblood}),
  layout({id: 'ficino-enneads', parentExhibitId: 'ficino', zoneId: 'early-statecraft-republic', position: {x: 10.85, z: -16.25}, rotationY: -Math.PI / 2, assetId: 'neoplatonism-ficino-enneads', mediaWidth: 2.38, mediaHeight: 3.16, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.agedBrass}),
  layout({id: 'bacon-great-instauration', parentExhibitId: 'bacon', zoneId: 'early-experiment-method', position: {x: -10.85, z: -5.7}, rotationY: Math.PI / 2, assetId: 'bacon-great-instauration-1620', mediaWidth: 2.22, mediaHeight: 3.36, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.inkBlue}),
  layout({id: 'galileo-moon', parentExhibitId: 'galileo', zoneId: 'early-experiment-method', position: {x: 10.85, z: -5.1}, rotationY: -Math.PI / 2, assetId: 'galileo-moon-sketches-1610', mediaWidth: 2.38, mediaHeight: 3.3, installationKind: 'renaissance-observation', accent: RENAISSANCE_PALETTE.agedBrass}),
  layout({id: 'bacon-novum-organum', parentExhibitId: 'bacon', zoneId: 'early-experiment-method', position: {x: -10.85, z: 4.55}, rotationY: Math.PI / 2, assetId: 'bacon-novum-organum-1645', mediaWidth: 2.03, mediaHeight: 3.38, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.oxblood}),
  layout({id: 'galileo-telescopes', parentExhibitId: 'galileo', zoneId: 'early-experiment-method', position: {x: 10.85, z: 4.55}, rotationY: -Math.PI / 2, assetId: 'galileo-telescopes-museo', mediaWidth: 3.78, mediaHeight: 2.52, installationKind: 'renaissance-observation', accent: RENAISSANCE_PALETTE.inkBlue, width: 4.4}),
  layout({id: 'hobbes-leviathan', parentExhibitId: 'hobbes', zoneId: 'early-sovereignty-materialism', position: {x: -10.85, z: 13.7}, rotationY: Math.PI / 2, assetId: 'hobbes-leviathan-1651', mediaWidth: 2.3, mediaHeight: 3.2, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.agedBrass}),
  layout({id: 'putney-debates', parentExhibitId: 'hobbes', zoneId: 'early-sovereignty-materialism', position: {x: 10.85, z: 13.25}, rotationY: -Math.PI / 2, assetId: 'putney-agreement-people-1648', mediaWidth: 2.46, mediaHeight: 3.28, installationKind: 'renaissance-context', accent: RENAISSANCE_PALETTE.terracotta}),
  layout({id: 'english-civil-war', parentExhibitId: 'hobbes', zoneId: 'early-sovereignty-materialism', position: {x: -10.85, z: 20.05}, rotationY: Math.PI / 2, assetId: 'english-civil-war-pamphlet-1642', mediaWidth: 2.22, mediaHeight: 3.34, installationKind: 'renaissance-context', accent: RENAISSANCE_PALETTE.terracotta}),
  layout({id: 'hobbes-de-cive', parentExhibitId: 'hobbes', zoneId: 'early-sovereignty-materialism', position: {x: 10.85, z: 19.55}, rotationY: -Math.PI / 2, assetId: 'hobbes-de-cive-1642', mediaWidth: 2.55, mediaHeight: 3.18, installationKind: 'renaissance-work', accent: RENAISSANCE_PALETTE.oxblood}),
  layout({id: 'hobbes-materialism-motion', parentExhibitId: 'hobbes', zoneId: 'early-sovereignty-materialism', position: {x: 10.85, z: 25.35}, rotationY: -Math.PI / 2, assetId: 'hobbes-notes-motion-chatsworth', mediaWidth: 3.74, mediaHeight: 1.88, installationKind: 'renaissance-observation', accent: RENAISSANCE_PALETTE.inkBlue, width: 4.85}),
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
