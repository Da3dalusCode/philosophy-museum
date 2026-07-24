import type {MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export const PHENOMENOLOGY_GALLERY_ID = 'phenomenology-existence-embodiment' as const;

export const PHENOMENOLOGY_PALETTE = Object.freeze({
  midnight: '#243f49',
  horizon: '#b07a46',
  flesh: '#9a665c',
  ambiguity: '#6e607f',
  alterity: '#55756f',
  paper: '#e6dfd2',
});

export const PHENOMENOLOGY_ROOM_SIGN_COPY = {
  'phenomenology-method': {
    kicker: 'Room 01 · Attend',
    title: 'Intentionality, reduction, and lifeworld',
    subtitle: 'Begin with how anything appears—and what reflection changes.',
  },
  'phenomenology-being-embodiment': {
    kicker: 'Room 02 · Inhabit',
    title: 'Being-in-the-world, perception, and embodiment',
    subtitle: 'A world is handled, traversed, and felt before it becomes a theory.',
  },
  'existentialism-freedom': {
    kicker: 'Room 03 · Choose',
    title: 'Freedom, facticity, and bad faith',
    subtitle: 'Freedom is real, but never detached from a situation.',
  },
  'existentialism-situated-absurd': {
    kicker: 'Room 04 · Respond',
    title: 'Ambiguity, the absurd, and revolt',
    subtitle: 'No final guarantee removes the demand to act with others.',
  },
  'phenomenology-interpretation-alterity': {
    kicker: 'Room 05 · Answer',
    title: 'Tradition, alterity, and responsibility',
    subtitle: 'Understanding inherits a history; ethics encounters another person.',
  },
} as const;

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
  const y = 2.14;
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
    bounds: volume(`${id}-media-bounds`, {x: 0, y, z: -.39}, {width: width + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-media-support`, {x: 0, y, z: -.55}, {width: width * .74, height: height * .74, depth: .18}),
  };
};

const cameraFor = (position: MuseumPoint, rotationY: number, distance = 2.92): MuseumPoint => ({
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
  width = 4.35,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId:
    | 'phenomenology'
    | 'husserl'
    | 'heidegger'
    | 'merleau-ponty'
    | 'existentialism'
    | 'sartre'
    | 'camus'
    | 'levinas'
    | 'gadamer';
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
  interactionRadius: 3.65,
  collider: {
    id: `supplemental:${id}`,
    center: position,
    size: {width, depth: 1.05},
    rotation: rotationY,
  },
  viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.055},
  assetId,
  mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
  label: {position: [0, 4.04, -.3], width: width - .36, height: .72},
  footprint: {width, height: 4.44, depth: 1.05},
  installationKind,
  accent,
});

const presentation = (
  panelKicker: string,
  proximityKicker: string,
  factRows: readonly {label: string; value: string}[],
  articleActionLabel: string,
  entityKind: 'philosopher' | 'branch' = 'philosopher',
) => ({
  panelKicker,
  proximityKicker,
  factRows,
  articleActionLabel,
  entityKind,
  keyIdeasLabel: 'Interpretive map',
  cautionsLabel: 'Keep in view',
}) as const;

export const PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS = [
  {
    id: 'phenomenology-intentionality',
    displayName: 'Intentionality: Consciousness Is Directed',
    shortTitle: 'Intentionality',
    workLabel: 'PHENOMENOLOGY · CONCEPT LENS',
    dateLabel: 'Developed across Husserl’s early phenomenology',
    question: 'What changes when consciousness is understood as experience of a world rather than a sealed inner container?',
    frontSubtitle: 'Act, object, horizon, and mode of givenness',
    lead: 'Intentionality is phenomenology’s opening orientation: perceiving, remembering, imagining, judging, and hoping are directed toward something. The point is not that every experience contains a mental picture or a deliberate plan. A melody can remain the same melody across changing notes, and a cube can be experienced as one object although only some sides are visible. Husserl uses such cases to ask how an identity is intended through partial appearances. The displayed portrait identifies the founder whose analyses organize this room; it is not a manuscript page or an illustration of consciousness.',
    keyIdeas: [
      'Intentionality names directedness toward an object, state of affairs, value, possibility, or absence.',
      'The same object can be intended through perception, memory, imagination, doubt, or expectation.',
      'Horizons include unseen sides and anticipated possibilities that guide confirmation and surprise.',
      'Phenomenological description compares modes of givenness instead of treating all evidence as one kind.',
    ],
    cautions: [
      'Intentionality does not mean having an intention to perform an action.',
      'Directedness does not by itself prove either realism or idealism.',
      'The portrait is identity material, not a visual record of an intentional act.',
    ],
    sections: [
      {
        heading: 'Recognition: one thing, many appearances',
        paragraphs: ['Walk around a table and its profiles change while it is experienced as the same table. Phenomenology makes that ordinary achievement philosophically visible. Identity is neither exhausted by one view nor assembled by a homunculus watching images inside the head.'],
      },
      {
        heading: 'Orientation: fulfillment and correction',
        paragraphs: ['A word, sketch, or expectation can point beyond what is presently given. Later perception may fulfill that intention, complicate it, or show that it was mistaken. Evidence is therefore structured by the kind of object and by how an anticipation meets further experience.'],
      },
      {
        heading: 'Depth: the shared world problem',
        paragraphs: ['Objects are ordinarily experienced as available from perspectives other than one’s own. That claim presses phenomenology beyond private introspection toward embodiment, empathy, intersubjectivity, and the social world—the problems developed in the next rooms.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Phenomenology', url: 'https://plato.stanford.edu/entries/phenomenology/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Intentionality', url: 'https://plato.stanford.edu/entries/intentionality/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Edmund Husserl', url: 'https://iep.utm.edu/husserl/', kind: 'academic-reference'},
    ],
    assetId: 'husserl-portrait',
    panelAssetId: 'husserl-portrait',
    articleRoute: {kind: 'branch', branchId: 'phenomenology'},
    presentation: presentation('Gallery 03 concept exhibit', 'Concept lens', [
      {label: 'Problem', value: 'How experience is directed toward objects and a world'},
      {label: 'Method', value: 'Describe modes of appearance, fulfillment, and horizon'},
      {label: 'Visual', value: 'Husserl identity material; not a diagram of consciousness'},
      {label: 'Atlas route', value: 'Phenomenology branch article'},
    ], 'Open the Phenomenology Atlas article', 'branch'),
  },
  {
    id: 'husserl-crisis-lifeworld',
    displayName: 'The Crisis and the Lifeworld',
    shortTitle: 'The Crisis & Lifeworld',
    workLabel: 'HUSSERL · CRISIS OF EUROPEAN SCIENCES',
    dateLabel: 'Partially published 1936; further material published posthumously',
    question: 'What happens when scientific success loses contact with the lived world that gives inquiry its meaning?',
    frontSubtitle: 'Measurement, abstraction, history, and the world of experience',
    lead: 'Husserl’s late Crisis does not reject science or dispute its practical achievements. It asks how mathematical idealization can be mistaken for a complete account of reality and reason. Measurement, instruments, shared language, bodily orientation, and inherited practices already operate within the lifeworld: the taken-for-granted world in which questions arise and results become intelligible. The Göttingen plaque displayed here is later commemoration, not an object from the Crisis. It marks the institutional and historical afterlife of a thinker who increasingly made history and sedimented meaning part of phenomenological inquiry.',
    keyIdeas: [
      'The lifeworld is the embodied, shared world presupposed by scientific abstraction.',
      'Idealization can be powerful without becoming the only legitimate description of experience.',
      'Meanings are sedimented through language, habit, practice, and intellectual tradition.',
      'The crisis concerns the human meaning of reason, not a claim that scientific findings are false.',
    ],
    cautions: [
      'The lifeworld is not a romantic refuge untouched by science, technology, or power.',
      'Husserl’s language about Europe and rational vocation can be exclusionary and requires criticism.',
      'The displayed plaque was installed long after Husserl’s lifetime and is reception evidence.',
    ],
    sections: [
      {
        heading: 'Recognition: abstraction begins somewhere',
        paragraphs: ['A coordinate, measurement, or model is learned and used by embodied people in concrete settings. The Crisis asks philosophy to recover that background without denying the explanatory force gained through abstraction.'],
      },
      {
        heading: 'Orientation: a historical phenomenology',
        paragraphs: ['Husserl reconstructs how modern mathematical physics acquired its guiding ideals. Concepts that now seem self-evident have a history of invention, transmission, and habitual use. Phenomenology therefore examines not only immediate perception but also inherited forms of sense.'],
      },
      {
        heading: 'Depth: why the lifeworld remains contested',
        paragraphs: ['There is no socially innocent everyday world. Later phenomenologists and critical theorists ask whose habits define what is taken for granted, how institutions organize visibility, and how race, gender, disability, and technology structure experience. The lifeworld opens those questions without settling them.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Edmund Husserl', url: 'https://plato.stanford.edu/entries/husserl/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Edmund Husserl', url: 'https://iep.utm.edu/husserl/', kind: 'academic-reference'},
      {label: 'KU Leuven — Husserl Archives', url: 'https://hiw.kuleuven.be/hua', kind: 'collection-record'},
    ],
    assetId: 'husserl-goettingen-plaque',
    panelAssetId: 'husserl-goettingen-plaque',
    articleRoute: {kind: 'philosopher', philosopherId: 'husserl'},
    presentation: presentation('Gallery 03 work exhibit', 'Work and legacy', [
      {label: 'Author', value: 'Edmund Husserl'},
      {label: 'Work', value: 'The Crisis of European Sciences and Transcendental Phenomenology'},
      {label: 'Visual', value: 'Later Göttingen commemoration; not a lifetime object'},
      {label: 'Atlas route', value: 'Husserl’s full profile'},
    ], 'Open Husserl’s full Atlas article'),
  },
  {
    id: 'heidegger-being-time',
    displayName: 'Being and Time',
    shortTitle: 'Being and Time',
    workLabel: 'HEIDEGGER · SEIN UND ZEIT',
    dateLabel: 'Published 1927; the announced project remained unfinished',
    question: 'What becomes visible when human existence is approached as practical involvement rather than an isolated mind?',
    frontSubtitle: 'Being-in-the-world, care, time, and possibility',
    lead: 'Being and Time redirects phenomenology from a primary focus on constituting consciousness toward Dasein, the being for whom being matters. Dasein is always already being-in-the-world: using equipment, navigating places, responding to others, inheriting interpretations, and projecting possibilities. A hammer is first encountered through skilled use, not as a bundle of neutral properties. Breakdown can make that practical network conspicuous. The posthumous portrait displayed here is reception material, not a lifetime photograph. Heidegger’s later fame must also be read beside his Nazi Party membership, 1933 rectorship, and antisemitic notebook passages.',
    keyIdeas: [
      'Being-in-the-world names one integrated structure, not a subject placed inside a container.',
      'Equipment is intelligible through practical relations, purposes, and a shared world.',
      'Care gathers thrownness, projection, and involvement into a temporal structure.',
      'Anxiety, mortality, and resoluteness disclose possibility without supplying a moral code.',
    ],
    cautions: [
      'Dasein is not simply a synonym for an individual human organism or personality.',
      'Authenticity is not moral superiority, heroic individualism, or withdrawal from others.',
      'Heidegger’s political involvement and antisemitism are indispensable to responsible interpretation.',
    ],
    sections: [
      {
        heading: 'Recognition: the workshop before the theory',
        paragraphs: ['In absorbed activity, attention is directed through a tool toward a task. The tool belongs to a network of materials, skills, people, and purposes. Heidegger uses this structure to challenge the assumption that detached observation is our basic relation to a world.'],
      },
      {
        heading: 'Orientation: thrown projection',
        paragraphs: ['Existence begins from conditions no one authored—language, history, body, mortality, and social possibilities—yet it is also oriented toward what may be done. Heidegger joins this factical inheritance to projection rather than treating freedom as creation from nothing.'],
      },
      {
        heading: 'Depth: ontology and political judgment',
        paragraphs: ['Being and Time offers no adequate route from authenticity to democratic or ethical responsibility. Heidegger’s politics show why existential vocabulary cannot substitute for political judgment. The work’s insights and its author’s failures must be held together rather than used to erase one another.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Martin Heidegger', url: 'https://plato.stanford.edu/entries/heidegger/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Martin Heidegger', url: 'https://iep.utm.edu/heidegge/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons — Martin Heidegger portrait', url: 'https://commons.wikimedia.org/wiki/File:Martin_Heidegger_for_WP.jpg', kind: 'collection-record'},
    ],
    assetId: 'heidegger-wetterauer-portrait',
    panelAssetId: 'heidegger-wetterauer-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'heidegger'},
    presentation: presentation('Gallery 03 work exhibit', 'Ontological work', [
      {label: 'Author', value: 'Martin Heidegger'},
      {label: 'Work', value: 'Being and Time'},
      {label: 'Published', value: '1927; unfinished as announced'},
      {label: 'Atlas route', value: 'Heidegger’s full profile and political cautions'},
    ], 'Open Heidegger’s full Atlas article'),
  },
  {
    id: 'merleau-phenomenology-perception',
    displayName: 'Phenomenology of Perception',
    shortTitle: 'Phenomenology of Perception',
    workLabel: 'MERLEAU-PONTY · PHÉNOMÉNOLOGIE DE LA PERCEPTION',
    dateLabel: 'Published 1945',
    question: 'How does the lived body open a meaningful world before reflective calculation?',
    frontSubtitle: 'Body schema, habit, perception, and expressive movement',
    lead: 'Merleau-Ponty argues that the body is not merely an object observed from outside or a machine commanded by a separate mind. The lived body is a practical orientation: it reaches, walks, speaks, and inhabits space through capacities that usually operate before explicit calculation. Perception is neither a passive sum of sensations nor a construction imposed by pure intellect. Phenomenology of Perception brings Gestalt psychology, neurology, sexuality, language, and freedom into one account of embodied existence. The displayed lifetime portrait identifies the author; the philosophical evidence comes from the analyses, not from physiognomy.',
    keyIdeas: [
      'The body schema is an organized field of practical capacities, not a mental picture of body parts.',
      'Habit reorganizes what the body can immediately perceive and do.',
      'Perception is meaningful and structured before it is converted into explicit judgment.',
      'Freedom is embodied and situated, neither mechanical determination nor pure choice.',
    ],
    cautions: [
      'Embodiment should not be reduced to the slogan that the mind and body merely interact.',
      'Historical clinical cases must not turn injured or disabled people into anonymous examples.',
      'Later embodied cognition can be compared with Merleau-Ponty without claiming direct identity.',
    ],
    sections: [
      {
        heading: 'Recognition: the body knows how',
        paragraphs: ['A practiced typist or musician does not ordinarily calculate each movement from a detached internal map. Skill reorganizes the field of possible action. Merleau-Ponty treats this bodily know-how as philosophically basic rather than as a secondary output of thought.'],
      },
      {
        heading: 'Orientation: perception is not a snapshot',
        paragraphs: ['A perceived thing appears within a figure–ground organization, a bodily orientation, and a horizon of possible movement. Seeing is already an active openness to a world, even when it is not a deliberate inference or judgment.'],
      },
      {
        heading: 'Depth: from body to social situation',
        paragraphs: ['Bodies are lived through histories, norms, institutions, and relations with others. Merleau-Ponty opened a route later transformed by feminist, disability, race, medical, and critical phenomenologies. Those developments should be credited in their own right rather than folded back into one founder.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Maurice Merleau-Ponty', url: 'https://plato.stanford.edu/entries/merleau-ponty/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Maurice Merleau-Ponty', url: 'https://iep.utm.edu/merleau/', kind: 'academic-reference'},
      {label: 'Encyclopaedia Britannica — Maurice Merleau-Ponty', url: 'https://www.britannica.com/biography/Maurice-Merleau-Ponty', kind: 'academic-reference'},
    ],
    assetId: 'merleau-ponty-portrait',
    panelAssetId: 'merleau-ponty-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'merleau-ponty'},
    presentation: presentation('Gallery 03 work exhibit', 'Embodiment work', [
      {label: 'Author', value: 'Maurice Merleau-Ponty'},
      {label: 'Work', value: 'Phenomenology of Perception'},
      {label: 'Published', value: '1945'},
      {label: 'Atlas route', value: 'Merleau-Ponty’s full profile'},
    ], 'Open Merleau-Ponty’s full Atlas article'),
  },
  {
    id: 'existentialism-facticity-freedom',
    displayName: 'Freedom in a Situation',
    shortTitle: 'Freedom in a Situation',
    workLabel: 'EXISTENTIALISM · CONCEPT LENS',
    dateLabel: 'A central debate in twentieth-century existentialism',
    question: 'How can freedom matter when no one chooses their past, body, social world, or mortality?',
    frontSubtitle: 'Facticity, transcendence, responsibility, and constraint',
    lead: 'Existential freedom is often caricatured as the power to do anything whatsoever. The stronger claim is that human beings take up conditions they did not choose and give them practical meaning through projects, refusals, compromises, and commitments. Facticity names what is already given: a past, body, location, social classification, dependence on others, and eventual death. Transcendence names the movement toward possibilities. The displayed Sartre photograph locates one influential formulation, but this exhibit treats existentialism as a contested field whose accounts of situation were significantly revised by Beauvoir, Fanon, and later thinkers.',
    keyIdeas: [
      'Facticity names given conditions; it does not mean that those conditions carry one predetermined meaning.',
      'Transcendence is the projection of possibilities from within a situation.',
      'Responsibility concerns how a person takes up conditions, not authorship of every condition.',
      'Oppression can constrict practical possibilities and cannot be redescribed as a private attitude.',
    ],
    cautions: [
      'Situated freedom is not unlimited choice or motivational self-help.',
      'Responsibility for a response is not blame for suffering, oppression, or conditions one did not create.',
      'The existentialist tradition contains major disagreements about ethics, politics, gender, race, and violence.',
    ],
    sections: [
      {
        heading: 'Recognition: neither object nor pure will',
        paragraphs: ['A situation is not a neutral pile of facts. A closed border, inaccessible building, social stigma, bodily pain, or inherited language has meaning within projects and institutions. Yet meaning-making does not magically remove the material condition.'],
      },
      {
        heading: 'Orientation: why ambiguity matters',
        paragraphs: ['Human beings are both facts in the world and openings toward possibilities. Beauvoir calls this condition ambiguous and builds an ethics around reciprocal freedom. Her account resists treating another person as scenery for one’s private project.'],
      },
      {
        heading: 'Depth: social freedom',
        paragraphs: ['Later existential and critical work asks how colonization, racism, sexism, class, disability, and institutions organize the field of available action. Freedom becomes a political problem of transforming situations, not merely an inward declaration of independence.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Existentialism', url: 'https://plato.stanford.edu/entries/existentialism/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Existentialism', url: 'https://iep.utm.edu/existentialism/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Simone de Beauvoir', url: 'https://plato.stanford.edu/entries/beauvoir/', kind: 'academic-reference'},
    ],
    assetId: 'sartre-anefo-1965',
    panelAssetId: 'sartre-anefo-1965',
    articleRoute: {kind: 'branch', branchId: 'existentialism'},
    presentation: presentation('Gallery 03 concept exhibit', 'Concept lens', [
      {label: 'Problem', value: 'Freedom under inherited, embodied, and social conditions'},
      {label: 'Tension', value: 'Facticity and transcendence'},
      {label: 'Debate', value: 'Responsibility without denying structural constraint'},
      {label: 'Atlas route', value: 'Existentialism branch article'},
    ], 'Open the Existentialism Atlas article', 'branch'),
  },
  {
    id: 'sartre-bad-faith',
    displayName: 'Bad Faith and the Look',
    shortTitle: 'Bad Faith & the Look',
    workLabel: 'SARTRE · BEING AND NOTHINGNESS',
    dateLabel: 'Published 1943',
    question: 'How do people hide from their freedom by pretending to be only a fixed thing—or only pure possibility?',
    frontSubtitle: 'Self-deception, roles, others, and unstable identity',
    lead: 'In Being and Nothingness, Sartre describes consciousness as a negating openness that cannot be reduced to a fixed essence. Bad faith arises when a person tries to settle the tension between facticity and transcendence by identifying wholly with one side. A social role may be performed as if it exhausts the person, while inconvenient facts may be dismissed as if freedom had no history or consequence. The look of another person discloses that one is also an object in a shared world. The photograph of Sartre and Beauvoir records two independent authors; it must not turn Beauvoir into scenery for Sartre’s philosophy.',
    keyIdeas: [
      'Bad faith is motivated self-misdescription, not simply a factual mistake or a hidden unconscious lie.',
      'A person is neither exhausted by facts nor detached from them as pure possibility.',
      'Another’s look reveals an objective dimension of the self that cannot be fully controlled.',
      'Conflict is prominent in Sartre’s analysis, but later ethics asks how reciprocal recognition might be possible.',
    ],
    cautions: [
      'Bad faith should not be used as a casual accusation whenever someone’s motives are unclear.',
      'Sartre’s famous examples rely on contested assumptions about roles, sexuality, and social situation.',
      'Beauvoir developed an independent philosophy of ambiguity, oppression, and reciprocity.',
    ],
    sections: [
      {
        heading: 'Recognition: becoming the role',
        paragraphs: ['A role can coordinate action and carry real obligations. Bad faith begins when the role is treated as a complete essence that erases choice, or when freedom is invoked to deny the real commitments and consequences the role has created.'],
      },
      {
        heading: 'Orientation: self-deception without two selves',
        paragraphs: ['Sartre rejects a simple model in which one fully informed inner self tells a lie to another. Consciousness can sustain an unstable project of not asking too clearly, shifting attention, and living an ambiguity without resolving it into explicit knowledge.'],
      },
      {
        heading: 'Depth: the other is not just a threat',
        paragraphs: ['The look dramatizes vulnerability to another perspective, but a philosophy of shared freedom needs more than conflict. Beauvoir’s ethics and feminist analysis make material dependence, oppression, and reciprocity central, changing the terms of the existential debate.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Jean-Paul Sartre', url: 'https://plato.stanford.edu/entries/sartre/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Sartre', url: 'https://iep.utm.edu/sartre-ex/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons — Sartre and Beauvoir at the Balzac memorial', url: 'https://commons.wikimedia.org/wiki/File:Sartre_and_de_Beauvoir_at_Balzac_Memorial.jpg', kind: 'collection-record'},
    ],
    assetId: 'sartre-beauvoir-balzac',
    panelAssetId: 'sartre-beauvoir-balzac',
    articleRoute: {kind: 'philosopher', philosopherId: 'sartre'},
    presentation: presentation('Gallery 03 work exhibit', 'Existential work', [
      {label: 'Author', value: 'Jean-Paul Sartre'},
      {label: 'Work', value: 'Being and Nothingness'},
      {label: 'Published', value: '1943'},
      {label: 'Atlas route', value: 'Sartre’s full profile'},
    ], 'Open Sartre’s full Atlas article'),
  },
  {
    id: 'beauvoir-ethics-ambiguity',
    displayName: 'Beauvoir: The Ethics of Ambiguity',
    shortTitle: 'The Ethics of Ambiguity',
    workLabel: 'BEAUVOIR · SITUATED FREEDOM',
    dateLabel: 'Published 1947',
    question: 'Why does willing one’s own freedom require willing conditions in which others can become free?',
    frontSubtitle: 'An anchor-strength secondary route to ambiguity and reciprocity',
    lead: 'Simone de Beauvoir’s primary Museum home is Feminist Philosophies, where her independent reorganization of embodiment, oppression, becoming, and otherness receives its full setting. This anchor-strength secondary presents her indispensable intervention in existential ethics. In The Ethics of Ambiguity, human beings are both situated objects and projects that exceed what is given. Freedom therefore cannot be a private possession exercised over others. It depends on a world of reciprocal possibilities and can be blocked by oppression. The lifetime photograph identifies Beauvoir as an author and public intellectual, not as an appendix to Sartre.',
    keyIdeas: [
      'Ambiguity names the inseparability of facticity and transcendence in human existence.',
      'Freedom becomes ethically serious through projects that open rather than close possibilities for others.',
      'Oppression is a material restriction of agency, not merely a mistaken interpretation of one’s condition.',
      'Reciprocity requires institutions and relationships that do not reduce another person to an object.',
    ],
    cautions: [
      'Beauvoir’s philosophy is not an application or popularization of Sartre’s system.',
      'Situated freedom does not blame oppressed people for constraints imposed on them.',
      'Her early ethical work and later feminist, political, and autobiographical writings should be read in development.',
    ],
    sections: [
      {
        heading: 'Recognition: ambiguity is the condition',
        paragraphs: ['A person is vulnerable body, social position, past, and object for others, while also pursuing possibilities that no fixed description exhausts. Ethical life does not escape this tension; it begins by refusing fantasies of pure sovereignty or complete thinghood.'],
      },
      {
        heading: 'Orientation: freedom needs a world',
        paragraphs: ['Projects require languages, institutions, material resources, education, and other people. To will freedom coherently is therefore to care about the conditions under which other people can act, contest, create, and refuse.'],
      },
      {
        heading: 'Depth: route onward to Feminist Philosophies',
        paragraphs: ['The Second Sex analyzes how woman is historically produced as Other through myths, labor, embodiment, sexuality, law, and social expectation. That larger transformation of existential and phenomenological method is why the Museum preserves Beauvoir’s full primary identity elsewhere while keeping her structurally present here.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Simone de Beauvoir', url: 'https://plato.stanford.edu/entries/beauvoir/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Simone de Beauvoir', url: 'https://iep.utm.edu/simone-de-beauvoir/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons — 1967 Beauvoir photograph', url: 'https://commons.wikimedia.org/wiki/File:Simone_de_Beauvoir_1967_(cropped).jpg', kind: 'collection-record'},
    ],
    assetId: 'beauvoir-gpo-1967',
    panelAssetId: 'beauvoir-gpo-1967',
    articleRoute: {kind: 'philosopher', philosopherId: 'beauvoir'},
    presentation: presentation('Gallery 03 anchor secondary', 'Situated freedom', [
      {label: 'Philosopher', value: 'Simone de Beauvoir'},
      {label: 'Work', value: 'The Ethics of Ambiguity'},
      {label: 'Museum status', value: 'Anchor-strength secondary; Feminist Philosophies remains primary'},
      {label: 'Atlas route', value: 'Beauvoir’s full independent profile'},
    ], 'Open Beauvoir’s full Atlas article'),
  },
  {
    id: 'camus-absurd-revolt',
    displayName: 'From the Absurd to Revolt',
    shortTitle: 'The Absurd & Revolt',
    workLabel: 'CAMUS · SISYPHUS · REVOLT · SOLIDARITY',
    dateLabel: 'The Myth of Sisyphus, 1942 · The Rebel, 1951',
    question: 'How can life be affirmed without a final guarantee—and resistance remain answerable to limits?',
    frontSubtitle: 'Lucidity, refusal, solidarity, and the danger of justified violence',
    lead: 'Camus begins from the absurd: the confrontation between the human demand for meaning and a world that offers no final answer. The Myth of Sisyphus rejects both physical suicide and philosophical escape into a consoling certainty. The Rebel later asks how refusal can create solidarity without authorizing unlimited violence in the name of history. Camus resisted the existentialist label, even while sharing postwar debates with existentialists. The displayed Combat issue is a collective Resistance artifact, not a text to attribute entirely to Camus, but it gives material context to the passage from solitary lucidity toward public resistance.',
    keyIdeas: [
      'The absurd is a relation between human questioning and the world, not a property of the world alone.',
      'Lucidity refuses both despair and a leap to an unsupported final guarantee.',
      'Revolt says no to degradation while implying a shared limit worth defending.',
      'Solidarity and measure constrain political violence rather than making history an absolute tribunal.',
    ],
    cautions: [
      'Camus explicitly resisted being classified as an existentialist.',
      'Combat was a collective underground newspaper; individual issues are not all authored by Camus.',
      'Camus’s positions on Algeria remain deeply contested and require the colonial setting to stay visible.',
    ],
    sections: [
      {
        heading: 'Recognition: the demand and the silence',
        paragraphs: ['The absurd appears when the desire for unity, explanation, or justice meets contingency, suffering, and mortality. Camus does not solve the confrontation. He asks what way of living remains possible once it is held lucidly.'],
      },
      {
        heading: 'Orientation: revolt creates a we',
        paragraphs: ['To reject humiliation or murder is to appeal to a limit that concerns more than one isolated self. Revolt can therefore disclose solidarity. Yet the appeal becomes self-defeating when a movement treats future redemption as permission for present dehumanization.'],
      },
      {
        heading: 'Depth: history without innocence',
        paragraphs: ['Camus’s moral language of limits challenged revolutionary absolutism, but his relation to French Algeria exposes unresolved tensions in his universal claims. Fanon and anticolonial thought provide necessary counterroutes rather than optional footnotes.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Albert Camus', url: 'https://plato.stanford.edu/entries/camus/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Albert Camus', url: 'https://iep.utm.edu/albert-camus/', kind: 'academic-reference'},
      {label: 'Nobel Prize — Albert Camus biographical record', url: 'https://www.nobelprize.org/prizes/literature/1957/camus/biographical/', kind: 'collection-record'},
    ],
    assetId: 'camus-combat-1943',
    panelAssetId: 'camus-combat-1943',
    articleRoute: {kind: 'philosopher', philosopherId: 'camus'},
    presentation: presentation('Gallery 03 work and context exhibit', 'Absurd and revolt', [
      {label: 'Author', value: 'Albert Camus'},
      {label: 'Works', value: 'The Myth of Sisyphus and The Rebel'},
      {label: 'Context object', value: 'Collective Combat Resistance newspaper'},
      {label: 'Atlas route', value: 'Camus’s full profile and colonial cautions'},
    ], 'Open Camus’s full Atlas article'),
  },
  {
    id: 'levinas-ethics-before-ontology',
    displayName: 'Ethics Before Ontology',
    shortTitle: 'Ethics Before Ontology',
    workLabel: 'LEVINAS · ALTERITY · RESPONSIBILITY',
    dateLabel: 'Totality and Infinity, 1961',
    question: 'What if responsibility begins in an encounter that cannot be reduced to one more object of knowledge?',
    frontSubtitle: 'The face, alterity, asymmetry, and the third person',
    lead: 'Levinas transforms phenomenology by arguing that another person exceeds the categories through which the self tries to comprehend the world. The face is not primarily a visible arrangement of features. It names the other’s exposure and ethical demand, a resistance to being absorbed into the same. Responsibility is therefore not first chosen by an autonomous subject; it interrupts and obligates. The displayed Husserl memorial is lineage material rather than a Levinas portrait or object. It marks the phenomenological tradition Levinas studied, translated, and radically redirected toward ethics.',
    keyIdeas: [
      'Alterity means that another person cannot be exhausted by the meanings the self assigns.',
      'The face names ethical exposure and command, not a theory of reading facial appearance.',
      'Responsibility is asymmetrical before it becomes a reciprocal contract.',
      'The arrival of a third person introduces comparison, institutions, judgment, and justice.',
    ],
    cautions: [
      'The face is not restricted to literal visual perception and should not become a physiognomic concept.',
      'Ethical asymmetry does not remove the need for law, politics, institutions, or competing claims.',
      'The displayed memorial belongs to Husserl’s reception history, not Levinas’s likeness or archive.',
    ],
    sections: [
      {
        heading: 'Recognition: beyond possession by a concept',
        paragraphs: ['Knowledge identifies, compares, and organizes, often necessarily. Levinas asks what it misses when the other is approached only as a case within my system. Ethical encounter exposes a limit to the fantasy that understanding makes everything mine.'],
      },
      {
        heading: 'Orientation: obligation before contract',
        paragraphs: ['Responsibility is not derived from an exchange between equal, self-sufficient agents. The vulnerability of the other calls the self into question before a bargain is made. This priority is what Levinas means by ethics as first philosophy.'],
      },
      {
        heading: 'Depth: the third and justice',
        paragraphs: ['Responsibility cannot remain a private relation between two people. Other others are also present, and claims must be compared. The third person opens the difficult passage from infinite responsibility to institutions, judgment, equality, and political justice.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Emmanuel Levinas', url: 'https://plato.stanford.edu/entries/levinas/', kind: 'academic-reference'},
      {label: 'Routledge Encyclopedia of Philosophy — Emmanuel Levinas', url: 'https://www.rep.routledge.com/articles/biographical/levinas-emmanuel-1906-95/v-1', kind: 'academic-reference'},
      {label: 'BnF Data — Emmanuel Levinas authority record', url: 'https://data.bnf.fr/en/ark:/12148/cb119128222', kind: 'collection-record'},
    ],
    assetId: 'husserl-goettingen-plaque',
    panelAssetId: 'husserl-goettingen-plaque',
    articleRoute: {kind: 'philosopher', philosopherId: 'levinas'},
    presentation: presentation('Gallery 03 concept exhibit', 'Alterity and responsibility', [
      {label: 'Philosopher', value: 'Emmanuel Levinas'},
      {label: 'Work', value: 'Totality and Infinity'},
      {label: 'Visual', value: 'Husserl legacy material; no Levinas likeness claimed'},
      {label: 'Atlas route', value: 'Levinas’s full profile'},
    ], 'Open Levinas’s full Atlas article'),
  },
  {
    id: 'gadamer-truth-method',
    displayName: 'Truth and Method',
    shortTitle: 'Truth and Method',
    workLabel: 'GADAMER · HERMENEUTICS · TRADITION',
    dateLabel: 'Published 1960',
    question: 'How does understanding happen when every interpreter already belongs to a history and language?',
    frontSubtitle: 'Prejudice, application, dialogue, and a fusion of horizons',
    lead: 'Gadamer’s philosophical hermeneutics argues that understanding is not a technique applied by a neutral observer after all prejudgments have been removed. Interpreters belong to traditions, languages, practices, and histories that make questions possible. Prejudice here means a prior judgment, not only an irrational bias; inherited assumptions can be tested and revised through encounter with a text, artwork, event, or person. The displayed photograph shows Heidegger lecturing, not Gadamer. It is context for a line of inheritance that Gadamer transformed rather than an identity image or evidence that their philosophies coincide.',
    keyIdeas: [
      'Understanding begins from historically effected consciousness rather than a view from nowhere.',
      'A hermeneutic circle moves between parts and whole while revising the expectations brought to each.',
      'Application belongs inside understanding because meaning addresses a present situation.',
      'A fusion of horizons is a transformed relation between perspectives, not their effortless collapse into agreement.',
    ],
    cautions: [
      'Prejudice in Gadamer’s technical sense does not excuse racism, dogmatism, or unexamined bias.',
      'Dialogue can fail under coercion and unequal power; openness is not guaranteed by conversation alone.',
      'The displayed 1954 lecture photograph depicts Heidegger, not Gadamer.',
    ],
    sections: [
      {
        heading: 'Recognition: no interpretation starts empty',
        paragraphs: ['A question already selects what may count as relevant. Vocabulary carries inherited distinctions, and expectations organize the first reading. Gadamer makes this situated beginning explicit so it can enter the movement of interpretation rather than masquerade as neutrality.'],
      },
      {
        heading: 'Orientation: conversation with a claim',
        paragraphs: ['Understanding is modeled as a dialogue in which the subject matter can challenge the interpreter. A strong reading neither reproduces an author’s interior state nor simply projects present concerns. It risks revision by attending to what the work says.'],
      },
      {
        heading: 'Depth: tradition and critique',
        paragraphs: ['Critics ask whether Gadamer grants tradition too much authority and gives insufficient tools for ideology and distorted communication. The debate with critical theory shows that belonging and suspicion are not mutually exclusive; interpretation must acknowledge inheritance while testing how power shapes it.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Hans-Georg Gadamer', url: 'https://plato.stanford.edu/entries/gadamer/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Hans-Georg Gadamer', url: 'https://iep.utm.edu/gadamer/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Hermeneutics', url: 'https://plato.stanford.edu/entries/hermeneutics/', kind: 'academic-reference'},
    ],
    assetId: 'heidegger-pragher-lecture-1954',
    panelAssetId: 'heidegger-pragher-lecture-1954',
    articleRoute: {kind: 'philosopher', philosopherId: 'gadamer'},
    presentation: presentation('Gallery 03 work and context exhibit', 'Hermeneutics', [
      {label: 'Author', value: 'Hans-Georg Gadamer'},
      {label: 'Work', value: 'Truth and Method'},
      {label: 'Visual', value: 'Heidegger lecture context; no Gadamer likeness claimed'},
      {label: 'Atlas route', value: 'Gadamer’s full profile'},
    ], 'Open Gadamer’s full Atlas article'),
  },
  {
    id: 'husserl-epoche-reduction',
    displayName: 'Epoché and Reduction',
    shortTitle: 'Epoché & Reduction',
    workLabel: 'HUSSERL · IDEAS I · METHOD',
    dateLabel: 'Ideas Pertaining to a Pure Phenomenology, 1913',
    question: 'How can reflection examine experience without simply repeating the assumptions of everyday explanation?',
    frontSubtitle: 'Natural attitude, bracketing, reduction, and modes of givenness',
    lead: 'Husserl’s epoché asks the inquirer to suspend the ordinary use of claims about what exists so that attention can turn toward how things are experienced and meant. This is not a declaration that the world is unreal, nor a Cartesian attempt to replace every belief with doubt. The phenomenological reduction redirects inquiry from objects taken for granted toward the acts, horizons, bodily orientations, and evidential fulfillments through which a world becomes intelligible. The displayed Husserl portrait identifies the author of the method; it is not a diagram of the reduction or evidence that the method was completed in one formulation.',
    keyIdeas: [
      'The natural attitude is ordinary involvement in a world whose existence is normally taken for granted.',
      'Epoché suspends the use of that commitment for analysis rather than denying or destroying it.',
      'Reduction redirects attention toward the correlation between experience and what is experienced.',
      'Husserl revised the scope and vocabulary of reduction across different works and research periods.',
    ],
    cautions: [
      'Bracketing is not disbelief, world-denial, meditation, or withdrawal from practical life.',
      'The reduction does not make every interpretation equally valid; descriptions remain answerable to evidence and correction.',
      'The portrait is identity material, not a visual representation of a philosophical operation.',
    ],
    sections: [
      {
        heading: 'Recognition: changing the question',
        paragraphs: ['When seeing a tree, ordinary inquiry may ask what species it is or what caused its growth. Phenomenological reflection instead asks how the tree is given through profiles, expectations, memory, bodily position, and the possibility of further confirmation.'],
      },
      {
        heading: 'Orientation: suspension without erasure',
        paragraphs: ['The world remains the experienced world throughout the inquiry. What is suspended is the unexamined authority of familiar explanations, allowing perception, imagination, judgment, and recollection to be compared according to their different ways of presenting something.'],
      },
      {
        heading: 'Depth: a contested transcendental turn',
        paragraphs: ['Some phenomenologists accepted descriptive attention while resisting Husserl’s transcendental language. Heidegger, Merleau-Ponty, and later critics argued that history, embodiment, language, and practical involvement complicate any return to a constituting subject purified of its worldly situation.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Edmund Husserl', url: 'https://plato.stanford.edu/entries/husserl/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Edmund Husserl', url: 'https://iep.utm.edu/husserl/', kind: 'academic-reference'},
      {label: 'KU Leuven — Husserl Archives', url: 'https://hiw.kuleuven.be/hua', kind: 'collection-record'},
    ],
    assetId: 'husserl-portrait',
    panelAssetId: 'husserl-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'husserl'},
    presentation: presentation('Gallery 03 method exhibit', 'Phenomenological method', [
      {label: 'Philosopher', value: 'Edmund Husserl'},
      {label: 'Work', value: 'Ideas I'},
      {label: 'Visual', value: 'Husserl identity material; not a diagram of reduction'},
      {label: 'Atlas route', value: 'Husserl’s full profile'},
    ], 'Open Husserl’s full Atlas article'),
  },
  {
    id: 'husserl-time-consciousness',
    displayName: 'How a Melody Holds Together',
    shortTitle: 'Time-Consciousness',
    workLabel: 'HUSSERL · INTERNAL TIME-CONSCIOUSNESS',
    dateLabel: 'Analyses developed from 1905 lectures; edited publication 1928',
    question: 'How can a succession be experienced as one melody rather than as disconnected present instants?',
    frontSubtitle: 'Primal impression, retention, protention, and temporal objects',
    lead: 'Husserl’s analyses of internal time-consciousness begin from experiences such as hearing a melody. A note that has just sounded is no longer present in the same way, yet it is not merely recalled as a distant event. It is retained while the next note arrives, and the unfolding phrase carries anticipations of what may follow. Husserl calls these differentiated structures primal impression, retention, and protention. They describe how a present has temporal thickness without requiring a second observer inside consciousness. The Göttingen plaque is later commemorative material, not a manuscript page, musical score, or object from Husserl’s lectures.',
    keyIdeas: [
      'Retention is the immediate holding-on of what has just elapsed, not an ordinary act of recollection.',
      'Protention is an open anticipation of what is about to occur, not a detailed prediction.',
      'A temporal object is experienced through an ordered flow rather than in a sequence of isolated now-points.',
      'Time-consciousness also raises the difficult question of how the flow itself can become an object of reflection.',
    ],
    cautions: [
      'Retention and protention should not be reduced to storage and forecasting mechanisms without argument.',
      'The analysis describes temporal experience; it is not by itself a complete physics or neuroscience of time.',
      'The plaque records Husserl’s later commemoration and did not accompany the lectures.',
    ],
    sections: [
      {
        heading: 'Recognition: hearing a phrase',
        paragraphs: ['If each note vanished without retention, no phrase could be heard. If every earlier note remained present in exactly the same way, succession would disappear. A melody depends on changing modes of presence that preserve order while allowing passage.'],
      },
      {
        heading: 'Orientation: more than a punctual now',
        paragraphs: ['The experienced present includes the just-past and the about-to-arrive in unequal ways. Surprise is possible because anticipation guides attention without fixing the future, while correction is possible because what has elapsed remains available within the unfolding experience.'],
      },
      {
        heading: 'Depth: influence and dispute',
        paragraphs: ['Heidegger recast temporality around finite existence, while Merleau-Ponty joined temporal synthesis to embodiment and action. Later philosophers disputed whether Husserl’s language still privileges presence, making these lectures a major source for both phenomenology and deconstruction.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Edmund Husserl', url: 'https://plato.stanford.edu/entries/husserl/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Edmund Husserl', url: 'https://iep.utm.edu/husserl/', kind: 'academic-reference'},
      {label: 'KU Leuven — Husserl Archives', url: 'https://hiw.kuleuven.be/hua', kind: 'collection-record'},
    ],
    assetId: 'husserl-goettingen-plaque',
    panelAssetId: 'husserl-goettingen-plaque',
    articleRoute: {kind: 'philosopher', philosopherId: 'husserl'},
    presentation: presentation('Gallery 03 concept exhibit', 'Temporal experience', [
      {label: 'Philosopher', value: 'Edmund Husserl'},
      {label: 'Work', value: 'Lectures on the Phenomenology of Internal Time-Consciousness'},
      {label: 'Visual', value: 'Later Göttingen commemoration; not lecture material'},
      {label: 'Atlas route', value: 'Husserl’s full profile'},
    ], 'Open Husserl’s full Atlas article'),
  },
  {
    id: 'heidegger-being-with',
    displayName: 'Being-with and “The They”',
    shortTitle: 'Being-with & The They',
    workLabel: 'HEIDEGGER · MITSEIN · DAS MAN',
    dateLabel: 'Being and Time, 1927',
    question: 'What if social existence belongs to being-in-the-world before any explicit encounter between isolated individuals?',
    frontSubtitle: 'Being-with, public intelligibility, solicitude, and authenticity',
    lead: 'Heidegger argues that Dasein is being-with others even when no one else is physically present. Tools, language, customs, roles, and possibilities already bear the marks of a shared world. His term “the they” names the anonymous public patterns through which one knows what “one” normally does, values, or avoids. These patterns make everyday coordination possible, but they can also level differences and relieve a person of owning a choice. Authenticity does not mean escaping society or becoming an exceptional hero; it changes how inherited possibilities are taken up. The displayed 1954 lecture photograph supplies later teaching context, not an image of “the they” or evidence of political innocence.',
    keyIdeas: [
      'Being-with is an existential structure of a shared world, not an optional relation added to a solitary self.',
      'The they supplies ordinary norms and intelligibility while encouraging conformity and evasion of responsibility.',
      'Solicitude names ways of relating to others that can dominate, substitute, support, or free possibilities.',
      'Authenticity modifies one’s relation to inherited possibilities rather than abolishing dependence on others.',
    ],
    cautions: [
      '“The they” is not simply a contemptuous name for crowds, popular culture, or other people.',
      'Authenticity does not provide an ethical or democratic standard and cannot excuse Heidegger’s political choices.',
      'The photograph shows Heidegger lecturing decades later, not a scene described in Being and Time.',
    ],
    sections: [
      {
        heading: 'Recognition: the anonymous “one”',
        paragraphs: ['Expressions such as “that is just what one does” reveal norms that no single person authored. Public expectations can stabilize practices and language, yet they can also make a judgment feel settled before anyone has accepted responsibility for it.'],
      },
      {
        heading: 'Orientation: others are already there',
        paragraphs: ['A workshop refers to suppliers, users, teachers, and shared standards even when the room is empty. Heidegger therefore rejects the picture in which a private subject must first infer that other minds exist before inhabiting a common world.'],
      },
      {
        heading: 'Depth: the unresolved political problem',
        paragraphs: ['Being and Time analyzes conformity and resolute choice but does not establish institutions of equality, rights, or public accountability. Heidegger’s Nazism and antisemitism make that absence historically urgent rather than a merely technical gap in the system.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Martin Heidegger', url: 'https://plato.stanford.edu/entries/heidegger/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Martin Heidegger', url: 'https://iep.utm.edu/heidegge/', kind: 'academic-reference'},
      {label: 'State Archives Freiburg image on Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Freiburg,_Z%C3%A4hringen-_Jahnhalle,_Prof._Martin_Heidegger_w%C3%A4hrend_eines_Vortrags_-_LABW_-_Staatsarchiv_Freiburg_W_134_Nr._023740b.jpeg', kind: 'collection-record'},
    ],
    assetId: 'heidegger-pragher-lecture-1954',
    panelAssetId: 'heidegger-pragher-lecture-1954',
    articleRoute: {kind: 'philosopher', philosopherId: 'heidegger'},
    presentation: presentation('Gallery 03 concept exhibit', 'Social existence', [
      {label: 'Philosopher', value: 'Martin Heidegger'},
      {label: 'Work', value: 'Being and Time'},
      {label: 'Visual', value: 'Later lecture context; not an illustration of “the they”'},
      {label: 'Atlas route', value: 'Heidegger’s full profile and political cautions'},
    ], 'Open Heidegger’s full Atlas article'),
  },
  {
    id: 'merleau-flesh-reversibility',
    displayName: 'Flesh, Chiasm, and Reversibility',
    shortTitle: 'Flesh & Reversibility',
    workLabel: 'MERLEAU-PONTY · THE VISIBLE AND THE INVISIBLE',
    dateLabel: 'Unfinished at his death in 1961; published posthumously 1964',
    question: 'How can perceiver and perceived belong to one sensible world without collapsing into the same thing?',
    frontSubtitle: 'Flesh, intertwining, reversibility, visibility, and touch',
    lead: 'In his later work, Merleau-Ponty uses “flesh” to name a shared sensible field in which bodies both perceive and can be perceived. Flesh is not a new physical substance, cosmic material, or poetic substitute for anatomy. The touching hand can itself be touched, and the seeing body is also visible, although these roles never coincide perfectly. Chiasm and reversibility describe this intertwining without erasing difference. The Visible and the Invisible remained unfinished when Merleau-Ponty died, so its working notes require caution and cannot be treated as a completed system. The grave photograph is a site of material memory, not an illustration of flesh or reversibility.',
    keyIdeas: [
      'Flesh names a relation of belonging between sensing bodies and the sensible world, not a separate substance.',
      'Reversibility means that the perceiver can become perceived without the two roles becoming identical.',
      'Chiasm describes an intertwining across differences such as seeing and visible, touching and touched.',
      'The later ontology extends embodiment beyond the framework of a subject inspecting external objects.',
    ],
    cautions: [
      'Flesh is not biological tissue, mystical unity, or a claim that all differences disappear.',
      'The unfinished notes should not be organized into a final doctrine more systematic than the surviving text.',
      'The grave is reception material and does not visually demonstrate Merleau-Ponty’s ontology.',
    ],
    sections: [
      {
        heading: 'Recognition: one hand touches another',
        paragraphs: ['When one hand touches the other, the touched hand may become touching, but the reversal is never perfectly simultaneous. The example shows a body that participates in sensation from both sides without becoming two detached objects.'],
      },
      {
        heading: 'Orientation: depth instead of a flat spectacle',
        paragraphs: ['A visible thing exceeds the face currently shown and belongs to a field of possible movement, concealment, and contact. Perception is therefore an involvement within depth, not the reception of a complete picture by an invisible spectator.'],
      },
      {
        heading: 'Depth: an unfinished inheritance',
        paragraphs: ['Feminist philosophy, environmental thought, aesthetics, and theories of embodied cognition have developed the language of flesh in divergent ways. Those uses can illuminate Merleau-Ponty while also criticizing what his account leaves unsaid about social difference and power.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Maurice Merleau-Ponty', url: 'https://plato.stanford.edu/entries/merleau-ponty/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Maurice Merleau-Ponty', url: 'https://iep.utm.edu/merleau/', kind: 'academic-reference'},
      {label: 'Encyclopaedia Britannica — Maurice Merleau-Ponty', url: 'https://www.britannica.com/biography/Maurice-Merleau-Ponty', kind: 'academic-reference'},
    ],
    assetId: 'merleau-ponty-grave',
    panelAssetId: 'merleau-ponty-grave',
    articleRoute: {kind: 'philosopher', philosopherId: 'merleau-ponty'},
    presentation: presentation('Gallery 03 work exhibit', 'Later embodiment', [
      {label: 'Philosopher', value: 'Maurice Merleau-Ponty'},
      {label: 'Work', value: 'The Visible and the Invisible'},
      {label: 'Visual', value: 'Material site of memory; not an illustration of flesh'},
      {label: 'Atlas route', value: 'Merleau-Ponty’s full profile'},
    ], 'Open Merleau-Ponty’s full Atlas article'),
  },
  {
    id: 'beauvoir-second-sex',
    displayName: 'The Second Sex: Becoming and Otherness',
    shortTitle: 'The Second Sex',
    workLabel: 'BEAUVOIR · BECOMING · THE OTHER',
    dateLabel: 'Published in two volumes, 1949',
    question: 'How is “woman” historically produced as a social position rather than given as a timeless essence?',
    frontSubtitle: 'Myth, situation, embodiment, becoming, and reciprocity',
    lead: 'The Second Sex combines existentialism, phenomenology, history, literature, biology, psychoanalysis, and social criticism to investigate how woman is made into the subordinate Other of an allegedly neutral male subject. Beauvoir does not claim that bodies are unreal or that individuals can choose their social meaning at will. She distinguishes bodily facts from the institutions, myths, expectations, and material dependencies through which those facts are lived. “Becoming” names a historical process, not a motivational slogan. The 1924 suffrage poster predates the book and supplies French political context; it does not illustrate Beauvoir’s argument, and national voting rights for French women arrived only in 1944.',
    keyIdeas: [
      'Woman as Other describes an unequal social relation presented as natural and universal.',
      'Becoming joins embodiment to education, work, law, myth, sexuality, and material dependence.',
      'Immanence names confinement to repetitive or closed activity; transcendence names projects that open possibilities.',
      'Reciprocity requires social conditions in which no group monopolizes the position of sovereign subject.',
    ],
    cautions: [
      'The Second Sex is Beauvoir’s independent philosophical work, not an application of Sartre.',
      'Its accounts of race, class, sexuality, disability, motherhood, and non-European lives contain serious limits and dated assumptions.',
      'The suffrage poster is historical context from 1924, not a page, cover, or direct illustration of the 1949 book.',
    ],
    sections: [
      {
        heading: 'Recognition: a norm disguised as neutrality',
        paragraphs: ['A dominant position can present its own experience as simply human while marking another group as deviation. Beauvoir studies how language, institutions, stories, and everyday expectations make that asymmetry appear obvious rather than historically produced.'],
      },
      {
        heading: 'Orientation: bodies in situations',
        paragraphs: ['Embodiment matters because bodies are lived through work, medicine, clothing, risk, desire, law, and other people’s judgments. The same biological description can acquire very different meanings under different material and institutional arrangements.'],
      },
      {
        heading: 'Depth: extending and correcting the method',
        paragraphs: ['Later feminist thinkers expanded Beauvoir’s method through analyses of racialization, colonialism, disability, sexuality, and trans experience. Reading that development seriously means neither treating her text as timeless authority nor dismissing its account of socially produced embodiment.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Simone de Beauvoir', url: 'https://plato.stanford.edu/entries/beauvoir/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Simone de Beauvoir', url: 'https://iep.utm.edu/simone-de-beauvoir/', kind: 'academic-reference'},
      {label: 'Wikimedia Commons — French women’s suffrage poster', url: 'https://commons.wikimedia.org/wiki/File:Affiche_de_l%27Union_fran%C3%A7aise_pour_le_suffrage_des_femmes.jpg', kind: 'collection-record'},
    ],
    assetId: 'beauvoir-suffrage-poster-1924',
    panelAssetId: 'beauvoir-suffrage-poster-1924',
    articleRoute: {kind: 'philosopher', philosopherId: 'beauvoir'},
    presentation: presentation('Gallery 03 work and context exhibit', 'Becoming and otherness', [
      {label: 'Author', value: 'Simone de Beauvoir'},
      {label: 'Work', value: 'The Second Sex'},
      {label: 'Context object', value: '1924 French suffrage poster; not book material'},
      {label: 'Atlas route', value: 'Beauvoir’s full independent profile'},
    ], 'Open Beauvoir’s full Atlas article'),
  },
  {
    id: 'camus-plague-solidarity',
    displayName: 'The Plague: Ordinary Solidarity',
    shortTitle: 'The Plague',
    workLabel: 'CAMUS · LA PESTE · SOLIDARITY',
    dateLabel: 'Published 1947',
    question: 'What forms of responsibility remain when suffering has no final explanation and no one acts with clean hands?',
    frontSubtitle: 'Disease, resistance, attention, shared risk, and unfinished decency',
    lead: 'Camus’s novel The Plague follows inhabitants of Oran as epidemic disease isolates the city and reorganizes ordinary life. Doctor Rieux’s response does not depend on a theory that explains suffering or guarantees victory. He treats patients, records what happens, and joins collective work because preventable suffering demands attention. The novel carries memories of occupation and Resistance, but it should not be reduced to a one-to-one political allegory; literal illness, grief, separation, bureaucracy, and unequal vulnerability matter within the story. The displayed 1957 Nobel-year portrait identifies Camus a decade after publication. It is not an image of Oran, the fictional epidemic, or the novel’s characters.',
    keyIdeas: [
      'Solidarity appears through repeated practical cooperation rather than heroic purity or final certainty.',
      'Rieux’s decency is fallible and unfinished, grounded in attending to suffering that can be resisted.',
      'The plague can carry political meanings without ceasing to be disease, loss, and bodily vulnerability.',
      'Bearing witness opposes both denial and the temptation to turn other people’s suffering into a consoling story.',
    ],
    cautions: [
      'The novel is not only an allegory of fascism, and epidemic suffering should not become decorative symbolism.',
      'Camus’s representation of colonial Oran largely marginalizes Arab Algerian lives and requires explicit criticism.',
      'The portrait is later identity material, not a scene, edition, or artifact from The Plague.',
    ],
    sections: [
      {
        heading: 'Recognition: work without guarantees',
        paragraphs: ['The epidemic may return, cures may fail, and no action makes the world innocent. The novel nevertheless distinguishes resignation from the ordinary labor of care, sanitation, record keeping, friendship, and resistance to avoidable death.'],
      },
      {
        heading: 'Orientation: witness and limits',
        paragraphs: ['Rieux refuses both metaphysical explanation and self-congratulation. Testimony must describe suffering accurately enough to resist abstraction, while action remains limited by incomplete knowledge, exhaustion, institutional failure, and the needs of other people.'],
      },
      {
        heading: 'Depth: the absent colonial city',
        paragraphs: ['Published within French colonial rule, the novel’s Oran largely omits the colonized Arab majority. That silence complicates its universal language of solidarity and makes Fanon’s account of racialized, colonial experience a necessary neighboring route.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Albert Camus', url: 'https://plato.stanford.edu/entries/camus/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Albert Camus', url: 'https://iep.utm.edu/albert-camus/', kind: 'academic-reference'},
      {label: 'Nobel Prize — Albert Camus biographical record', url: 'https://www.nobelprize.org/prizes/literature/1957/camus/biographical/', kind: 'collection-record'},
    ],
    assetId: 'camus-loc-1957',
    panelAssetId: 'camus-loc-1957',
    articleRoute: {kind: 'philosopher', philosopherId: 'camus'},
    presentation: presentation('Gallery 03 work exhibit', 'Solidarity without guarantee', [
      {label: 'Author', value: 'Albert Camus'},
      {label: 'Work', value: 'The Plague'},
      {label: 'Visual', value: '1957 identity portrait; not a scene from the novel'},
      {label: 'Atlas route', value: 'Camus’s full profile and colonial cautions'},
    ], 'Open Camus’s full Atlas article'),
  },
  {
    id: 'fanon-colonial-experience',
    displayName: 'Colonialism in Lived Experience',
    shortTitle: 'Colonial Lived Experience',
    workLabel: 'FANON · BLACK SKIN, WHITE MASKS',
    dateLabel: 'Published 1952',
    question: 'How does a colonial and antiblack social world reorganize bodily experience, language, recognition, and possibility?',
    frontSubtitle: 'Racialization, sociogeny, embodiment, language, and liberation',
    lead: 'In Black Skin, White Masks, Frantz Fanon joins phenomenology, psychiatry, literature, political analysis, and lived testimony to describe racialization from within a colonial world. A racializing gaze can interrupt ordinary bodily orientation and impose a fixed public meaning on a person before they speak or act. Fanon’s account is sociogenic: it traces psychic and bodily suffering to historically organized relations rather than to biological race or an individual attitude alone. This counter-route also keeps Camus’s colonial Algeria from becoming an abstract landscape for universal dilemmas. The portrait was reproduced on a 1967 U.S. dust jacket after Fanon’s death; it is a lifetime likeness, but the capture date and photographer remain unknown.',
    keyIdeas: [
      'Racialization is socially imposed through institutions, language, perception, and power rather than grounded in biological essence.',
      'The “epidermal racial schema” names a bodily disruption produced by an antiblack world, not a theory of skin as destiny.',
      'Sociogeny connects personal suffering to historical and institutional conditions without denying psychological reality.',
      'Liberation must transform the world that produces alienation rather than demand private adjustment to domination.',
    ],
    cautions: [
      'Fanon’s Martinican, French, Algerian, clinical, and revolutionary settings should not be collapsed into one generic identity.',
      'His analysis of violence is not an unconditional celebration of violence and must remain tied to colonial structures and political reconstruction.',
      'The portrait’s 1967 date belongs to its dust-jacket reproduction, not the unknown original photographic sitting.',
    ],
    sections: [
      {
        heading: 'Recognition: the body made conspicuous',
        paragraphs: ['Ordinary movement can be interrupted when another person is forced to encounter their body through a hostile public image. Fanon shows how a social gaze can narrow action, intensify self-monitoring, and impose meanings that are neither chosen nor merely imagined.'],
      },
      {
        heading: 'Orientation: language and recognition',
        paragraphs: ['Colonial language can promise access to status while marking speakers through racial hierarchy. Fanon examines speech, desire, education, and recognition as fields in which domination becomes intimate without ceasing to be political and institutional.'],
      },
      {
        heading: 'Depth: beyond adjustment',
        paragraphs: ['A clinic can treat suffering but cannot by itself abolish the order that continually produces it. Fanon therefore moves from diagnosis toward decolonization, while warning that political independence can reproduce domination unless institutions and social relations are transformed.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Frantz Fanon', url: 'https://plato.stanford.edu/entries/frantz-fanon/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Frantz Fanon', url: 'https://iep.utm.edu/fanon/', kind: 'academic-reference'},
      {label: 'Encyclopaedia Britannica — Frantz Fanon', url: 'https://www.britannica.com/biography/Frantz-Fanon', kind: 'academic-reference'},
    ],
    assetId: 'fanon-portrait',
    panelAssetId: 'fanon-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'fanon'},
    presentation: presentation('Gallery 03 critical counter-route', 'Colonial embodiment', [
      {label: 'Philosopher', value: 'Frantz Fanon'},
      {label: 'Work', value: 'Black Skin, White Masks'},
      {label: 'Museum route', value: 'Primary home: Colonialism, Race, and Liberation'},
      {label: 'Atlas route', value: 'Fanon’s full profile'},
    ], 'Open Fanon’s full Atlas article'),
  },
  {
    id: 'levinas-saying-said',
    displayName: 'The Saying and the Said',
    shortTitle: 'Saying & Said',
    workLabel: 'LEVINAS · OTHERWISE THAN BEING',
    dateLabel: 'Otherwise than Being or Beyond Essence, 1974',
    question: 'Can language expose a speaker to another person before it organizes experience into stable themes?',
    frontSubtitle: 'Exposure, address, responsibility, thematization, and ethical speech',
    lead: 'In Otherwise than Being, Levinas distinguishes the saying from the said. The said is language organized into identifiable themes, propositions, and records; it is indispensable for knowledge, law, teaching, and public judgment. The saying names the exposure involved in addressing and answering another person before that relation is exhausted by a concept. Levinas does not offer a simple choice between pure ethical speech and corrupt representation. Saying must enter the said to become communicable, while every formulation can be reopened by responsibility. The displayed portrait is Husserl, not Levinas. It marks the phenomenological inheritance Levinas translated and transformed, and it must not be presented as Levinas’s likeness or archive.',
    keyIdeas: [
      'The saying names ethical exposure and address rather than merely the spoken form of a sentence.',
      'The said stabilizes meanings needed for knowledge and justice, but it can make another person seem fully captured.',
      'Ethical responsibility repeatedly interrupts and reopens formulations that have hardened into final descriptions.',
      'Communication requires thematization, so Levinas does not simply discard concepts, institutions, or public language.',
    ],
    cautions: [
      'Saying and said are not identical to speech and writing, sincerity and lying, or emotion and logic.',
      'Ethical openness cannot replace evidence, law, institutions, or comparison among competing claims.',
      'The displayed Husserl portrait is lineage material and is not a likeness, object, or document belonging to Levinas.',
    ],
    sections: [
      {
        heading: 'Recognition: more than transmitted content',
        paragraphs: ['A statement conveys information, but addressing someone also places the speaker in a relation of answerability. Levinas directs attention to that exposure without pretending that content, grammar, and shared standards can simply be left behind.'],
      },
      {
        heading: 'Orientation: why the said remains necessary',
        paragraphs: ['Justice requires names, testimony, comparison, reasons, and decisions. These belong to the said. The ethical task is to use such structures while resisting the fantasy that a category has fully contained the person to whom it is applied.'],
      },
      {
        heading: 'Depth: unsaying without silence',
        paragraphs: ['Levinas often revises his own formulations to keep them from becoming final possession of alterity. Unsaying is not mute withdrawal; it is the critical reopening of language when established terms conceal the vulnerability and demand that first called speech forth.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Emmanuel Levinas', url: 'https://plato.stanford.edu/entries/levinas/', kind: 'academic-reference'},
      {label: 'Routledge Encyclopedia of Philosophy — Emmanuel Levinas', url: 'https://www.rep.routledge.com/articles/biographical/levinas-emmanuel-1906-95/v-1', kind: 'academic-reference'},
      {label: 'BnF Data — Emmanuel Levinas authority record', url: 'https://data.bnf.fr/en/ark:/12148/cb119128222', kind: 'collection-record'},
    ],
    assetId: 'husserl-portrait',
    panelAssetId: 'husserl-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'levinas'},
    presentation: presentation('Gallery 03 work exhibit', 'Ethical language', [
      {label: 'Philosopher', value: 'Emmanuel Levinas'},
      {label: 'Work', value: 'Otherwise than Being or Beyond Essence'},
      {label: 'Visual', value: 'Husserl lineage material; no Levinas likeness claimed'},
      {label: 'Atlas route', value: 'Levinas’s full profile'},
    ], 'Open Levinas’s full Atlas article'),
  },
  {
    id: 'gadamer-art-play-truth',
    displayName: 'Art, Play, and Truth',
    shortTitle: 'Art, Play & Truth',
    workLabel: 'GADAMER · HERMENEUTICS OF ART',
    dateLabel: 'Developed in Truth and Method, 1960',
    question: 'What kind of truth can an artwork disclose if aesthetic experience is more than private taste?',
    frontSubtitle: 'Play, presentation, participation, festival, and transformed understanding',
    lead: 'Gadamer challenges the modern tendency to treat art chiefly as an object for a spectator’s private aesthetic feeling. He uses play to describe an event whose movement exceeds any one player: participants follow, sustain, and are carried by a structure that comes to presentation through them. An artwork likewise addresses a shared world and can alter how its subject matter is understood. This does not make every response correct or turn beauty into proof. It places interpretation within participation, history, and renewed presentation. The displayed portrait depicts Heidegger, not Gadamer. It records a philosophical inheritance relevant to Gadamer’s hermeneutics but is not Gadamer’s likeness or evidence that their accounts of art are identical.',
    keyIdeas: [
      'Play has a movement and structure that cannot be reduced to the private intentions of one player.',
      'Presentation is not a secondary copy; a work becomes present through performance, viewing, reading, or enactment.',
      'Art can disclose a subject matter and transform understanding without becoming a scientific proposition.',
      'Participation occurs within traditions that can be renewed, questioned, and differently applied.',
    ],
    cautions: [
      'Play does not mean that art is trivial, consequence-free, or detached from institutions and power.',
      'Claims about artistic truth still require interpretation and criticism; intensity alone is not evidence.',
      'The displayed Heidegger portrait is lineage context, not Gadamer’s likeness or a direct illustration of his theory.',
    ],
    sections: [
      {
        heading: 'Recognition: the event of performance',
        paragraphs: ['A play or musical work is not exhausted by a score, script, performer’s intention, or audience reaction. It comes to presentation through a structured event in which participants answer possibilities inherited from the work and situation.'],
      },
      {
        heading: 'Orientation: the spectator implicated',
        paragraphs: ['Encountering art can disclose assumptions the spectator brought unnoticed and can reorganize what appears significant. Gadamer therefore resists the picture of a detached consumer who owns an experience without being addressed or changed by it.'],
      },
      {
        heading: 'Depth: tradition under criticism',
        paragraphs: ['Museums, canons, markets, and institutions shape which works receive presentation and authority. Gadamer’s account clarifies historical belonging, while critical interpretation must also ask who was excluded, whose labor sustains the event, and how inherited standards can be contested.'],
      },
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Hans-Georg Gadamer', url: 'https://plato.stanford.edu/entries/gadamer/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Hans-Georg Gadamer', url: 'https://iep.utm.edu/gadamer/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Hermeneutics', url: 'https://plato.stanford.edu/entries/hermeneutics/', kind: 'academic-reference'},
    ],
    assetId: 'heidegger-wetterauer-portrait',
    panelAssetId: 'heidegger-wetterauer-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'gadamer'},
    presentation: presentation('Gallery 03 concept exhibit', 'Hermeneutics of art', [
      {label: 'Philosopher', value: 'Hans-Georg Gadamer'},
      {label: 'Work', value: 'Truth and Method'},
      {label: 'Visual', value: 'Heidegger lineage material; no Gadamer likeness claimed'},
      {label: 'Atlas route', value: 'Gadamer’s full profile'},
    ], 'Open Gadamer’s full Atlas article'),
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

export const PHENOMENOLOGY_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'phenomenology-intentionality', parentExhibitId: 'phenomenology', zoneId: 'phenomenology-method', position: {x: -5.55, z: -17.42}, rotationY: Math.PI, assetId: 'husserl-portrait', mediaWidth: 2.18, mediaHeight: 3.22, installationKind: 'phenomenology-concept', accent: PHENOMENOLOGY_PALETTE.horizon}),
  layout({id: 'husserl-crisis-lifeworld', parentExhibitId: 'husserl', zoneId: 'phenomenology-method', position: {x: 5.55, z: -17.42}, rotationY: Math.PI, assetId: 'husserl-goettingen-plaque', mediaWidth: 3.35, mediaHeight: 2.38, installationKind: 'phenomenology-context', accent: PHENOMENOLOGY_PALETTE.midnight}),
  layout({id: 'heidegger-being-time', parentExhibitId: 'heidegger', zoneId: 'phenomenology-being-embodiment', position: {x: -5.55, z: -6.22}, rotationY: Math.PI, assetId: 'heidegger-wetterauer-portrait', mediaWidth: 2.52, mediaHeight: 3.16, installationKind: 'phenomenology-work', accent: PHENOMENOLOGY_PALETTE.midnight}),
  layout({id: 'merleau-phenomenology-perception', parentExhibitId: 'merleau-ponty', zoneId: 'phenomenology-being-embodiment', position: {x: 5.55, z: -6.22}, rotationY: Math.PI, assetId: 'merleau-ponty-portrait', mediaWidth: 2.28, mediaHeight: 3.26, installationKind: 'phenomenology-work', accent: PHENOMENOLOGY_PALETTE.flesh}),
  layout({id: 'existentialism-facticity-freedom', parentExhibitId: 'existentialism', zoneId: 'existentialism-freedom', position: {x: -5.55, z: 4.98}, rotationY: Math.PI, assetId: 'sartre-anefo-1965', mediaWidth: 2.46, mediaHeight: 3.18, installationKind: 'phenomenology-concept', accent: PHENOMENOLOGY_PALETTE.ambiguity}),
  layout({id: 'sartre-bad-faith', parentExhibitId: 'sartre', zoneId: 'existentialism-freedom', position: {x: 5.55, z: 4.98}, rotationY: Math.PI, assetId: 'sartre-beauvoir-balzac', mediaWidth: 2.12, mediaHeight: 3.28, installationKind: 'phenomenology-work', accent: PHENOMENOLOGY_PALETTE.flesh}),
  layout({id: 'beauvoir-ethics-ambiguity', parentExhibitId: 'camus', zoneId: 'existentialism-situated-absurd', position: {x: 5.55, z: 16.18}, rotationY: Math.PI, assetId: 'beauvoir-gpo-1967', mediaWidth: 2.42, mediaHeight: 3.22, installationKind: 'phenomenology-context', accent: PHENOMENOLOGY_PALETTE.ambiguity}),
  layout({id: 'camus-absurd-revolt', parentExhibitId: 'camus', zoneId: 'existentialism-situated-absurd', position: {x: -5.55, z: 16.18}, rotationY: Math.PI, assetId: 'camus-combat-1943', mediaWidth: 2.18, mediaHeight: 3.26, installationKind: 'phenomenology-work', accent: PHENOMENOLOGY_PALETTE.horizon}),
  layout({id: 'levinas-ethics-before-ontology', parentExhibitId: 'levinas', zoneId: 'phenomenology-interpretation-alterity', position: {x: -5.55, z: 27.38}, rotationY: Math.PI, assetId: 'husserl-goettingen-plaque', mediaWidth: 3.35, mediaHeight: 2.38, installationKind: 'phenomenology-concept', accent: PHENOMENOLOGY_PALETTE.alterity}),
  layout({id: 'gadamer-truth-method', parentExhibitId: 'gadamer', zoneId: 'phenomenology-interpretation-alterity', position: {x: 5.55, z: 27.38}, rotationY: Math.PI, assetId: 'heidegger-pragher-lecture-1954', mediaWidth: 3.42, mediaHeight: 2.22, installationKind: 'phenomenology-context', accent: PHENOMENOLOGY_PALETTE.midnight}),
  layout({id: 'husserl-epoche-reduction', parentExhibitId: 'husserl', zoneId: 'phenomenology-method', position: {x: -5.55, z: -27.38}, rotationY: 0, assetId: 'husserl-portrait', mediaWidth: 2.18, mediaHeight: 3.22, installationKind: 'phenomenology-concept', accent: PHENOMENOLOGY_PALETTE.horizon}),
  layout({id: 'husserl-time-consciousness', parentExhibitId: 'husserl', zoneId: 'phenomenology-method', position: {x: 5.55, z: -27.38}, rotationY: 0, assetId: 'husserl-goettingen-plaque', mediaWidth: 3.35, mediaHeight: 2.38, installationKind: 'phenomenology-concept', accent: PHENOMENOLOGY_PALETTE.midnight}),
  layout({id: 'heidegger-being-with', parentExhibitId: 'heidegger', zoneId: 'phenomenology-being-embodiment', position: {x: -5.55, z: -16.18}, rotationY: 0, assetId: 'heidegger-pragher-lecture-1954', mediaWidth: 3.42, mediaHeight: 2.22, installationKind: 'phenomenology-context', accent: PHENOMENOLOGY_PALETTE.midnight}),
  layout({id: 'merleau-flesh-reversibility', parentExhibitId: 'merleau-ponty', zoneId: 'phenomenology-being-embodiment', position: {x: 5.55, z: -16.18}, rotationY: 0, assetId: 'merleau-ponty-grave', mediaWidth: 2.4, mediaHeight: 3.18, installationKind: 'phenomenology-work', accent: PHENOMENOLOGY_PALETTE.flesh}),
  layout({id: 'camus-plague-solidarity', parentExhibitId: 'camus', zoneId: 'existentialism-situated-absurd', position: {x: -5.55, z: 6.22}, rotationY: 0, assetId: 'camus-loc-1957', mediaWidth: 2.65, mediaHeight: 3.18, installationKind: 'phenomenology-work', accent: PHENOMENOLOGY_PALETTE.horizon}),
  layout({id: 'beauvoir-second-sex', parentExhibitId: 'camus', zoneId: 'existentialism-situated-absurd', position: {x: 5.55, z: 6.22}, rotationY: 0, assetId: 'beauvoir-suffrage-poster-1924', mediaWidth: 2.34, mediaHeight: 3.22, installationKind: 'phenomenology-context', accent: PHENOMENOLOGY_PALETTE.ambiguity}),
  layout({id: 'fanon-colonial-experience', parentExhibitId: 'camus', zoneId: 'existentialism-situated-absurd', position: {x: 11.38, z: 11.2}, rotationY: -Math.PI / 2, assetId: 'fanon-portrait', mediaWidth: 2.3, mediaHeight: 3.2, installationKind: 'phenomenology-context', accent: PHENOMENOLOGY_PALETTE.alterity}),
  layout({id: 'levinas-saying-said', parentExhibitId: 'levinas', zoneId: 'phenomenology-interpretation-alterity', position: {x: -5.55, z: 17.42}, rotationY: 0, assetId: 'husserl-portrait', mediaWidth: 2.18, mediaHeight: 3.22, installationKind: 'phenomenology-work', accent: PHENOMENOLOGY_PALETTE.alterity}),
  layout({id: 'gadamer-art-play-truth', parentExhibitId: 'gadamer', zoneId: 'phenomenology-interpretation-alterity', position: {x: 5.55, z: 17.42}, rotationY: 0, assetId: 'heidegger-wetterauer-portrait', mediaWidth: 2.52, mediaHeight: 3.16, installationKind: 'phenomenology-concept', accent: PHENOMENOLOGY_PALETTE.midnight}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

const supplementalById = new Map<MuseumSupplementalExhibitId, MuseumSupplementalExhibit>(
  PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS.map((record) => [record.id, record]),
);

export const findPhenomenologySupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit | undefined => supplementalById.get(id);

export const getPhenomenologySupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = findPhenomenologySupplementalExhibit(id);
  if (!record) throw new Error(`Gallery 03 supplemental exhibit ${id} is missing.`);
  return record;
};
