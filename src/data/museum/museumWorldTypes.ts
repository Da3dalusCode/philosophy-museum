import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumResolvedHallTemplate} from './museumHallTemplates';
import type {
  MuseumExhibitId,
  MuseumHallId,
  MuseumPublicHallId,
  MuseumZoneId,
} from '../museumCatalog';
import type {MuseumPlannedHallId} from './museumCanonicalProgram';

export type MuseumPoint = {x: number; z: number};
export type MuseumPoint3 = {x: number; y: number; z: number};
export type MuseumPose = MuseumPoint & {yaw: number; pitch: number};
export type MuseumBounds = {minX: number; maxX: number; minZ: number; maxZ: number};
export type MuseumSize3 = {width: number; height: number; depth: number};
export type MuseumWorldTransform = MuseumPoint & {yaw: number};

export type MuseumCollider = {
  id: string;
  center: MuseumPoint;
  size: {width: number; depth: number};
  rotation: number;
};

export type MuseumWallDefinition = MuseumCollider & {
  height: number;
  /** Render-only vertical offset. Omitted for floor-standing collision walls. */
  bottom?: number;
  /** Doorway or reservation whose clear-height opening this lintel closes above. */
  openingId?: string;
  /** Optional visual trim for authored overlaps; collision continues to use center/size. */
  renderCenter?: MuseumPoint;
  renderSize?: {width: number; depth: number};
  /** Preserves the authored run axis when a render-only fragment becomes thinner than the wall. */
  renderLongAxis?: 'width' | 'depth';
};

export type MuseumFurnishingDefinition = MuseumCollider & {
  kind: 'bench' | 'orientation-plinth' | 'reception-desk' | 'translation-table' | 'threshold-marker' | 'visitor-map-kiosk';
  height: number;
};

export type MuseumSceneVolumeRole =
  | 'base'
  | 'principal-object'
  | 'concept-object'
  | 'media'
  | 'plaque';

export type MuseumSceneVolume = {
  id: string;
  role: MuseumSceneVolumeRole;
  center: MuseumPoint3;
  size: MuseumSize3;
};

export type MuseumMediaMountKind =
  | 'recess-frame'
  | 'freestanding-panel'
  | 'lectern'
  | 'wall-frame';

export type MuseumMediaMountDefinition = {
  id: string;
  assetId: MuseumAssetId;
  kind: MuseumMediaMountKind;
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  width: number;
  height: number;
  frameDepth: number;
  supportHeight: number;
  anchorId: string;
  bounds: MuseumSceneVolume;
  supportBounds: MuseumSceneVolume;
};

export type MuseumPlaqueDefinition = {
  id: string;
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  width: number;
  height: number;
  supportHeight: number;
  anchorId: string;
  bounds: MuseumSceneVolume;
  supportBounds: MuseumSceneVolume;
};

export type MuseumInstallationSceneDefinition = {
  footprint: MuseumSize3;
  mediaMounts: readonly MuseumMediaMountDefinition[];
  plaque: MuseumPlaqueDefinition;
  objectBounds: readonly MuseumSceneVolume[];
  focalTarget: MuseumPoint3;
  interactionBounds: MuseumSceneVolume;
};

/** Curatorial importance is independent from whether an installation has local media. */
export type MuseumInstallationTier =
  | 'anchor'
  | 'standard'
  | 'supporting'
  | 'cluster'
  | 'archive';

export type MuseumInstallationTreatment =
  | 'anchor-bay'
  | 'standard-bay'
  | 'supporting-panel'
  | 'cluster-panel'
  | 'archive-label';

/** Stable ids for interpreted work exhibits that do not consume a primary assignment. */
export type MuseumSupplementalExhibitId =
  | 'miletus-ionian-coast'
  | 'greek-philosophy-reception'
  | 'socrates-trial-death'
  | 'plato-cave-book-vii'
  | 'plato-republic'
  | 'renaissance-texts-in-transit'
  | 'machiavelli-prince'
  | 'machiavelli-discourses'
  | 'ficino-enneads'
  | 'bacon-great-instauration'
  | 'bacon-novum-organum'
  | 'galileo-moon'
  | 'galileo-telescopes'
  | 'putney-debates'
  | 'hobbes-leviathan'
  | 'hobbes-de-cive'
  | 'english-civil-war'
  | 'hobbes-materialism-motion'
  | 'phenomenology-intentionality'
  | 'husserl-crisis-lifeworld'
  | 'heidegger-being-time'
  | 'merleau-phenomenology-perception'
  | 'existentialism-facticity-freedom'
  | 'existentialism-kierkegaard-precursor'
  | 'sartre-bad-faith'
  | 'sartre-existentialism-humanism'
  | 'beauvoir-ethics-ambiguity'
  | 'camus-absurd-revolt'
  | 'levinas-ethics-before-ontology'
  | 'gadamer-truth-method'
  | 'husserl-epoche-reduction'
  | 'husserl-time-consciousness'
  | 'heidegger-being-with'
  | 'merleau-flesh-reversibility'
  | 'beauvoir-second-sex'
  | 'camus-plague-solidarity'
  | 'fanon-colonial-experience'
  | 'levinas-saying-said'
  | 'gadamer-art-play-truth'
  | 'frege-sense-reference'
  | 'russell-whitehead-principia'
  | 'russell-logical-types'
  | 'moore-principia-ethica'
  | 'moore-open-question'
  | 'moore-common-sense'
  | 'moore-external-world'
  | 'moore-cambridge-practice'
  | 'wittgenstein-tractatus'
  | 'wittgenstein-tractatus-opening'
  | 'wittgenstein-truth-tables'
  | 'wittgenstein-investigations'
  | 'wittgenstein-language-games'
  | 'quine-two-dogmas'
  | 'quine-ontology'
  | 'quine-word-object'
  | 'quine-naturalized-epistemology'
  | 'carnap-tolerance'
  | 'anscombe-intention-why'
  | 'anscombe-practical-knowledge'
  | 'anscombe-modern-moral-philosophy'
  | 'anscombe-truman-degree'
  | 'anscombe-causality'
  | 'political-authority-legitimacy'
  | 'public-action-civil-disobedience'
  | 'arendt-human-condition'
  | 'arendt-eichmann-judgment'
  | 'rawls-theory-of-justice'
  | 'rawls-original-position'
  | 'nozick-anarchy-state-utopia'
  | 'nozick-entitlement-rectification'
  | 'nussbaum-capabilities-approach'
  | 'nussbaum-frontiers-justice'
  | 'amartya-sen-capability-development'
  | 'habermas-public-sphere'
  | 'democratic-deliberation-assembly'
  | 'south-sarva-darsana-compendium'
  | 'south-upanishad-manuscript-world'
  | 'mahavira-kalpasutra-transmission'
  | 'kanada-atomism-dyads'
  | 'vaiseshika-pramana'
  | 'patanjali-yogasutra-manuscript'
  | 'patanjali-samkhya-yoga-pramana'
  | 'shankara-aitareya-bhasya'
  | 'madhva-udupi-matha'
  | 'south-ibadat-khana-plurality'
  | 'south-nalanda-learning-network'
  | 'south-ashoka-public-dhamma'
  | 'jain-jambudvipa-moral-geography'
  | 'jain-samavasarana-open-assembly'
  | 'jain-tirthankara-stillness'
  | 'nyaya-argument-before-authority'
  | 'nyaya-spitzer-philosophy-fragments'
  | 'nyaya-smoke-fire-inference'
  | 'yoga-six-yogis-banyan'
  | 'yoga-posture-inner-heat'
  | 'yoga-asavari-ascetic-princess'
  | 'buddhist-early-discourse-scrolls'
  | 'nagarjuna-prajnaparamita-witness'
  | 'nagarjuna-dependent-arising'
  | 'vasubandhu-abhidharmakosa'
  | 'vasubandhu-mere-ideation'
  | 'buddhist-xuanzang-translation'
  | 'buddhist-tibetan-pecha'
  | 'buddhist-diamond-sutra'
  | 'buddhist-first-sermon-four-truths'
  | 'ashoka-dhamma-public-ethics'
  | 'early-buddhist-stupa-community'
  | 'nagarjuna-root-verses-middle-way'
  | 'madhyamaka-lineage-aryadeva'
  | 'prajnaparamita-wisdom-embodied'
  | 'asanga-vasubandhu-yogacara-lineage'
  | 'abhidharma-cosmology-mount-meru'
  | 'asanga-yogacara-transmission'
  | 'buddhist-pramana-two-sources'
  | 'nalanda-scholastic-institution'
  | 'dharmakirti-pramanavarttika-reception'
  | 'kumarajiva-madhyamaka-translation'
  | 'tripitaka-koreana-printing-canon'
  | 'pali-kammavaca-southeast-asia'
  | 'forum-mulla-sadra-existence'
  | 'forum-dignaga-pramana'
  | 'forum-mozi-standards'
  | 'forum-avicenna-demonstration'
  | 'forum-confucius-cultivation'
  | 'forum-mencius-humane-rule'
  | 'forum-al-farabi-virtuous-city'
  | 'forum-maimonides-law'
  | 'forum-confucian-music'
  | 'forum-al-ghazali-causation'
  | 'eac-zhu-four-books'
  | 'eac-zhu-white-deer'
  | 'eac-wang-letters'
  | 'eac-taijitu-heartmind'
  | 'eac-hwaeom-avatamsaka'
  | 'eac-xuanzang-translation'
  | 'eac-huineng-zen-reception'
  | 'eac-three-teachings'
  | 'eac-daoist-institutions'
  | 'eac-water-land-stars'
  | 'eac-yi-i-ojukheon'
  | 'eac-korea-four-seven'
  | 'eac-japan-ancient-learning'
  | 'eac-japan-hayashi'
  | 'eac-vietnam-le-quy-don'
  | 'eac-modern-confucianism'
  | 'saadia-beliefs-opinions'
  | 'judeo-arabic-geniza-law'
  | 'judah-halevi-kuzari'
  | 'judah-halevi-divan'
  | 'maimonides-mishneh-torah'
  | 'maimonides-guide-negative-theology'
  | 'maimonides-guide-translation-reception'
  | 'jewish-philosophy-after-maimonides'
  | 'spinoza-formation-rupture-threshold'
  | 'cynic-frank-speech-in-public'
  | 'cynic-hipparchia-crates'
  | 'cynic-cosmopolitan-constellation'
  | 'epicurean-fourfold-remedy'
  | 'epicurean-philodemus-library'
  | 'epicurean-herculaneum-afterlife'
  | 'skeptical-arguments-preserved'
  | 'porphyrian-tree-classification'
  | 'augustine-confessions-memory-time'
  | 'pseudo-dionysius-celestial-hierarchy'
  | 'late-commentary-codex'
  | 'boethius-philosophy-in-prison'
  | 'hypatia-alexandrian-teaching'
  | 'aristotle-across-languages'
  | 'proclus-elements-afterlife'
  | 'ficino-late-antique-revival'
  | 'latin-boethian-logic-curriculum'
  | 'latin-consolation-fortune-providence'
  | 'latin-carolingian-copying-script'
  | 'latin-eriugena-greek-christian-sources'
  | 'latin-sic-et-non-dialectic'
  | 'latin-heloise-love-intention-rule'
  | 'latin-lectio-quaestio-disputatio'
  | 'latin-arabic-latin-crosscurrents'
  | 'latin-summa-question-architecture'
  | 'latin-essence-existence-analogy'
  | 'latin-natural-law-virtue'
  | 'latin-paris-1277-contestation'
  | 'latin-universals-signs-individuals'
  | 'latin-poverty-censure-political-authority'
  | 'descartes-discourse-method'
  | 'descartes-meditations-foundation'
  | 'elisabeth-descartes-union'
  | 'descartes-treatise-man-embodiment'
  | 'spinoza-ethics-geometrical-order'
  | 'spinoza-scripture-freedom'
  | 'conway-principles-vital-creation'
  | 'conway-intellectual-network'
  | 'leibniz-monadology-perception'
  | 'leibniz-preestablished-harmony'
  | 'leibniz-new-essays-innateness'
  | 'leibniz-clarke-space-time'
  | 'leibniz-binary-symbolic-reason'
  | 'empiricism-micrographia-enlarged-sight'
  | 'locke-molyneux-crossmodal-vision'
  | 'locke-consciousness-prince-cobbler'
  | 'locke-rights-property-carolina'
  | 'berkeley-vision-learned-distance'
  | 'berkeley-perception-and-object'
  | 'berkeley-bermuda-college-project'
  | 'berkeley-camera-obscura-signs'
  | 'berkeley-siris-tar-water-chain'
  | 'hume-causation-billiard-table'
  | 'hume-self-theatre-without-spectator'
  | 'hume-sentiment-and-social-judgment'
  | 'hume-skepticism-backgammon-return'
  | 'hume-edinburgh-public-world'
  | 'enlightenment-persian-mirror'
  | 'enlightenment-comparison-map'
  | 'enlightenment-power-checks-power'
  | 'enlightenment-law-lived-institution'
  | 'enlightenment-liberty-slavery-contradiction'
  | 'enlightenment-geneva-citizenship'
  | 'enlightenment-luxury-amour-propre'
  | 'enlightenment-education-forms-person'
  | 'enlightenment-general-will'
  | 'enlightenment-rousseau-botany'
  | 'enlightenment-sympathy-judgment'
  | 'enlightenment-division-labor'
  | 'enlightenment-commerce-social-world'
  | 'enlightenment-chartered-monopoly'
  | 'enlightenment-industry-public-judgment'
  | 'enlightenment-marriage-domestic-government'
  | 'enlightenment-women-public-intellectuals'
  | 'enlightenment-access-to-knowledge'
  | 'enlightenment-revolution-from-street'
  | 'enlightenment-kant-sublime'
  | 'utility-bentham-young-reformer'
  | 'utility-penitentiary-reform'
  | 'utility-law-public-judgment'
  | 'utility-suffering-moral-standing'
  | 'liberty-romantic-formation'
  | 'liberty-harriet-collaboration'
  | 'liberty-cooperative-experiments'
  | 'liberty-public-assembly'
  | 'liberty-womens-suffrage'
  | 'liberty-imperial-exception'
  | 'capital-feuerbach-inversion'
  | 'capital-alienated-labor'
  | 'capital-machinery-knowledge'
  | 'capital-commodity-spectacle'
  | 'capital-class-revolution-1848'
  | 'transformations-ricardo-political-economy'
  | 'transformations-industrial-city'
  | 'transformations-gendered-labor'
  | 'transformations-global-cotton'
  | 'transformations-chartist-politics'
  | 'transformations-cotton-flows'
  | 'schopenhauer-kant-and-representation'
  | 'schopenhauer-frankfurt-work'
  | 'schopenhauer-music-and-wagner'
  | 'schopenhauer-oupnekhat-route'
  | 'schopenhauer-pessimism-afterlife'
  | 'kierkegaard-indirect-communication'
  | 'kierkegaard-fear-trembling'
  | 'kierkegaard-christendom-attack'
  | 'dostoevsky-brothers-karamazov'
  | 'nietzsche-birth-tragedy'
  | 'nietzsche-lou-interlocutor'
  | 'nietzsche-writing-machine'
  | 'nietzsche-eternal-recurrence'
  | 'nietzsche-archive-afterlife'
  | 'idealism-jena-system-labor'
  | 'idealism-weimar-intellectual-world'
  | 'fichte-napoleonic-political-geography'
  | 'fichte-revolution-freedom'
  | 'nature-caroline-intellectual-network'
  | 'nature-romantic-beholder'
  | 'nature-goethe-color'
  | 'nature-galvani-living-force'
  | 'nature-voltaic-pile'
  | 'hegel-lecture-room'
  | 'hegel-napoleon-jena'
  | 'hegel-birthplace-stuttgart'
  | 'hegel-berlin-institution'
  | 'hegel-haiti-recognition-debate'
  | 'afterlives-holderlin'
  | 'afterlives-novalis'
  | 'afterlives-runge-morning'
  | 'afterlives-young-hegelians'
  | 'afterlives-feuerbach'
  | 'afterlives-strauss'
  | 'peirce-observatory-measurement'
  | 'peirce-coast-survey-observatory'
  | 'peirce-mapmaking-standards'
  | 'peirce-printing-public-record'
  | 'james-naturalist-expedition'
  | 'james-alexandrina-observation'
  | 'james-home-library'
  | 'james-leonora-piper-inquiry'
  | 'james-self-portrait-formation'
  | 'dewey-michigan-intellectual-work'
  | 'dewey-child-drawing'
  | 'dewey-hull-house-kindergarten'
  | 'dewey-laboratory-school'
  | 'dewey-labor-education'
  | 'continuity-jane-addams'
  | 'continuity-hull-house-arts'
  | 'continuity-alain-locke'
  | 'continuity-anna-julia-cooper'
  | 'continuity-shaw-student-movement'
  | 'continuity-fannie-lou-hamer'
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
  | 'critical-theory-adorno-memorial'
  | 'ethics-confucian-ritual-practice'
  | 'ethics-jain-nonviolence-practice'
  | 'ethics-buddhist-discipline-compassion'
  | 'ethics-care-attention-practice'
  | 'ethics-labor-social-position'
  | 'virtue-practice-habituation'
  | 'murdoch-kestrel-unselfing'
  | 'foot-natural-goodness'
  | 'duty-kant-autonomy'
  | 'utility-bentham-reform'
  | 'utility-equality-inclusion'
  | 'utility-public-health-welfare'
  | 'thomson-violinist-bodily-rights'
  | 'thomson-bodily-autonomy-context'
  | 'parfit-psychological-continuity'
  | 'parfit-future-generations'
  | 'feminist-cooper-voice-education'
  | 'feminist-truth-abolition-rights'
  | 'feminist-crenshaw-intersectionality'
  | 'feminist-standpoint-situated-objectivity'
  | 'feminist-care-dependency-labor'
  | 'feminist-astell-reason-education'
  | 'feminist-wollstonecraft-manufactured-inequality'
  | 'feminist-de-gouges-citizenship'
  | 'feminist-bluestocking-intellectual-publics'
  | 'feminist-education-domesticity'
  | 'feminist-abolition-convention-exclusion'
  | 'beauvoir-labor-and-immanence'
  | 'beauvoir-situation-and-place'
  | 'beauvoir-second-sex-movement'
  | 'beauvoir-aging-and-otherness'
  | 'beauvoir-boupacha-colonial-violence'
  | 'butler-performativity-and-action'
  | 'butler-trans-livability'
  | 'butler-disability-dependency'
  | 'butler-coalition-and-contestation'
  | 'butler-assembly-precarity'
  | 'fanon-racializing-gaze'
  | 'fanon-colonial-psychiatry'
  | 'fanon-algerian-revolution'
  | 'fanon-violence-decolonization'
  | 'fanon-national-consciousness'
  | 'davis-prison-abolition'
  | 'davis-race-gender-class'
  | 'hooks-margin-center'
  | 'hooks-engaged-pedagogy-love'
  | 'cesaire-colonialism-thingification'
  | 'dubois-color-line-colonial-world'
  | 'said-orientalism-representation'
  | 'spivak-subaltern-representation'
  | 'ngugi-language-decolonization'
  | 'wynter-humanism-coloniality';

export type MuseumSupplementalInstallationKind =
  | 'cave-ascent'
  | 'republic-altarpiece'
  | 'mediterranean-context'
  | 'renaissance-work'
  | 'renaissance-context'
  | 'renaissance-observation'
  | 'phenomenology-work'
  | 'phenomenology-context'
  | 'phenomenology-concept'
  | 'analytic-work'
  | 'analytic-context'
  | 'analytic-concept'
  | 'justice-work'
  | 'justice-context'
  | 'justice-concept'
  | 'south-asian-work'
  | 'south-asian-context'
  | 'south-asian-concept'
  | 'buddhist-work'
  | 'buddhist-context'
  | 'buddhist-concept'
  | 'east-asian-work'
  | 'east-asian-context'
  | 'east-asian-concept'
  | 'jewish-work'
  | 'jewish-context'
  | 'jewish-concept'
  | 'hellenistic-work'
  | 'hellenistic-context'
  | 'hellenistic-concept'
  | 'late-antique-work'
  | 'late-antique-context'
  | 'late-antique-concept'
  | 'scholastic-work'
  | 'scholastic-context'
  | 'scholastic-concept'
  | 'rationalism-work'
  | 'rationalism-context'
  | 'rationalism-concept'
  | 'empiricism-work'
  | 'empiricism-context'
  | 'empiricism-concept'
  | 'enlightenment-work'
  | 'enlightenment-context'
  | 'enlightenment-concept'
  | 'utility-work'
  | 'utility-context'
  | 'utility-concept'
  | 'value-work'
  | 'value-context'
  | 'value-concept'
  | 'idealism-work'
  | 'idealism-context'
  | 'idealism-concept'
  | 'pragmatism-work'
  | 'pragmatism-context'
  | 'pragmatism-concept'
  | 'critique-work'
  | 'critique-context'
  | 'critique-concept'
  | 'moral-work'
  | 'moral-context'
  | 'moral-concept'
  | 'feminist-work'
  | 'feminist-context'
  | 'feminist-concept'
  | 'colonial-work'
  | 'colonial-context'
  | 'colonial-concept'
  | 'forum-comparative-lens';

export type MuseumSupplementalExhibitLayout = {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: MuseumExhibitId;
  /** Optional tour anchor when the exhibit's conceptual parent lives in another hall. */
  guidedAfterExhibitId?: MuseumExhibitId;
  zoneId: MuseumZoneId;
  spatialCellId: string;
  position: MuseumPoint;
  rotationY: number;
  interactionRadius: number;
  collider: MuseumCollider;
  viewpoint: MuseumPose;
  assetId: MuseumAssetId;
  mediaMount: MuseumMediaMountDefinition;
  label: {
    position: readonly [number, number, number];
    width: number;
    height: number;
  };
  footprint: MuseumSize3;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
};

export type MuseumExhibitLayout = {
  id: MuseumExhibitId;
  zoneId: MuseumZoneId;
  spatialCellId: string;
  position: MuseumPoint;
  rotationY: number;
  interactionRadius: number;
  /** Curatorially reserved wall/run width; may exceed a compact object's collider. */
  bayWidth?: number;
  presentationTier?: MuseumInstallationTier;
  treatment?: MuseumInstallationTreatment;
  collider: MuseumCollider;
  viewpoint: MuseumPose;
  scene: MuseumInstallationSceneDefinition;
};

export type MuseumSpatialCell = {
  id: string;
  kind: 'room' | 'passage';
  title: string;
  bounds: MuseumBounds;
  ceilingHeight: number;
  exhibitIds: readonly MuseumExhibitId[];
  lightingGroupId: string;
  /** Authored walking direction for ceiling guides in compact connector cells. */
  guidanceAxis?: 'x' | 'z';
  /** Optional visual trim for a shared hall seam; traversal still uses bounds. */
  renderBounds?: MuseumBounds;
};

export type MuseumSignDefinition = {
  id: string;
  kind: 'entrance' | 'zone' | 'wayfinding' | 'orientation' | 'planned-status' | 'final-threshold';
  title: string;
  kicker: string;
  subtitle: string;
  position: MuseumPoint3;
  rotationY: number;
  width: number;
  height: number;
};

export type MuseumSpatialConnection = {
  id: string;
  fromCellId: string;
  toCellId: string;
  openingBounds: MuseumBounds;
};

export type MuseumRoomEntryView = {
  spatialCellId: string;
  /** Optional intellectual route when several directory routes share one physical room. */
  semanticZoneId?: string;
  pose: MuseumPose;
  expectedVisibleExhibitIds: readonly MuseumExhibitId[];
};

export type MuseumGuidedWalkLeg = {
  fromExhibitId: MuseumExhibitId;
  toExhibitId: MuseumExhibitId;
  waypoints: readonly MuseumPoint[];
};

export type MuseumCirculationPath = {
  id: string;
  points: readonly MuseumPoint[];
  clearanceRadius: number;
};

export type MuseumTrackSegmentDefinition = {
  id: string;
  center: MuseumPoint3;
  size: MuseumSize3;
  /** Optional hall-local yaw for short rails that follow an exhibit wall. */
  rotationY?: number;
};

export type MuseumTrackDefinition = MuseumTrackSegmentDefinition & {
  /** Physical segments owned by one logical service track. */
  segments?: readonly MuseumTrackSegmentDefinition[];
};

export type MuseumAmbientDiffuserDefinition = {
  id: string;
  spatialCellId: string;
  center: MuseumPoint3;
  size: MuseumSize3;
  colorTemperatureK: number;
};

export type MuseumExhibitLightDefinition = {
  id: string;
  exhibitId: MuseumExhibitId;
  trackId: string;
  mountPosition: MuseumPoint3;
  position: MuseumPoint3;
  target: MuseumPoint3;
  intensity: number;
  distance: number;
  angle: number;
  penumbra: number;
};

export type MuseumFixtureKind = 'track-head' | 'recessed-spot' | 'wall-washer';
export type MuseumRoomLightingProfile = 'compact' | 'linear' | 'hub';

/**
 * A visible, non-WebGL fixture. One fixture may credibly serve a deliberately
 * grouped display run; source membership is retained for complete audits.
 */
export type MuseumLightingFixtureDefinition = {
  id: string;
  kind: MuseumFixtureKind;
  spatialCellId: string;
  targetGroupId: string;
  sourceIds: readonly string[];
  trackId?: string;
  mountPosition: MuseumPoint3;
  target: MuseumPoint3;
  coverageRadius: number;
  width: number;
  /** Hall-local prototype geometry; absent from the museum-wide fixture system. */
  prototypeRole?: 'gallery-01-track-head' | 'gallery-02-recessed-gimbal';
  /** Visible-emission ratio only; no per-fixture WebGL light is created. */
  contrastScale?: number;
};

export type MuseumRoomLightingPlan = {
  spatialCellId: string;
  profile: MuseumRoomLightingProfile;
  sourceIds: readonly string[];
  fixtureIds: readonly string[];
  trackIds: readonly string[];
};

export type MuseumLightingDefinition = {
  ambientIntensity: number;
  hemisphereIntensity: number;
  directionalIntensity: number;
  tracks: readonly MuseumTrackDefinition[];
  prototypeId?: 'gallery-01-option-a' | 'gallery-02-option-a';
  ambientDiffusers?: readonly MuseumAmbientDiffuserDefinition[];
  /** Canonical grouped fixture geometry; absent on legacy authored halls. */
  fixtures?: readonly MuseumLightingFixtureDefinition[];
  roomPlans?: readonly MuseumRoomLightingPlan[];
  /** Legacy live-light definitions. Canonical halls keep this array empty. */
  exhibitLights: readonly MuseumExhibitLightDefinition[];
};

export type MuseumHallLayout = {
  id: MuseumHallId;
  title: string;
  eyeHeight: number;
  playerRadius: number;
  bounds: MuseumBounds;
  floorArea: number;
  cameraFov: number;
  cameraFar: number;
  spawn: MuseumPose;
  spawnFocalPoint: MuseumPoint;
  reset: MuseumPose;
  spatialCells: readonly MuseumSpatialCell[];
  spatialConnections: readonly MuseumSpatialConnection[];
  entryViews: readonly MuseumRoomEntryView[];
  wallColliders: readonly MuseumWallDefinition[];
  furnishings: readonly MuseumFurnishingDefinition[];
  obstacleColliders: readonly MuseumCollider[];
  exhibits: readonly MuseumExhibitLayout[];
  /** Interpreted work/idea installations kept separate from canonical primaries. */
  supplementalExhibits?: readonly MuseumSupplementalExhibitLayout[];
  primaryCirculation: MuseumCirculationPath;
  guidedOrder: readonly MuseumExhibitId[];
  guidedWalkLegs: readonly MuseumGuidedWalkLeg[];
  lighting: MuseumLightingDefinition;
  signs?: readonly MuseumSignDefinition[];
};

export type MuseumHallConnection = {
  id: string;
  connectionId: string;
  sourceNodeId: MuseumPhysicalNodeId;
  targetNodeId: MuseumPhysicalNodeId;
  localEntranceId: string;
  targetEntranceId: string;
};

export type MuseumHallEntrance = {
  id: string;
  position: MuseumPoint;
  /** Local-space direction from the seam into this hall. */
  inwardNormal: MuseumPoint;
  arrivalPose: MuseumPose;
  transitionBounds: {
    center: MuseumPoint;
    size: {width: number; depth: number};
  };
};

export type MuseumHallPrefetch = {
  /** Entrance-keyed exhibit subsets rendered while this hall is approached but inactive. */
  entryExhibitIdsByEntrance: Readonly<Record<string, readonly MuseumExhibitId[]>>;
  /** Entrance-keyed scene media that must be ready before that physical crossing. */
  entrySceneAssetIdsByEntrance?: Readonly<Record<string, readonly MuseumAssetId[]>>;
  /** Union used when a direct route activates a hall without an approached doorway. */
  entrySceneAssetIds: readonly MuseumAssetId[];
  /** The complete hall scene-media set, warmed after the entry set is ready. */
  sceneAssetIds: readonly MuseumAssetId[];
};

export type MuseumHallContentDefinition = {
  id: MuseumHallId;
  layout: MuseumHallLayout;
  /** Hall-local render-only walls such as lintels over authored interior openings. */
  architectureOnlyWalls?: readonly MuseumWallDefinition[];
  prefetch: MuseumHallPrefetch;
  fallbackLabel: string;
};

export type MuseumHallDefinition = Omit<MuseumHallContentDefinition, 'id'> & {
  id: MuseumPublicHallId;
  physicalNodeId: MuseumPhysicalNodeId;
  worldTransform: MuseumWorldTransform;
  /** Compiler-owned shell: collision walls plus render-only portal lintels. */
  architectureWalls: readonly MuseumWallDefinition[];
  /** Canonical interface contract resolved through the node's geometry adapter. */
  resolvedTemplate: MuseumResolvedHallTemplate;
  entrances: readonly MuseumHallEntrance[];
};

export type MuseumPhysicalNodeId = string;
export type MuseumPhysicalNodeKind =
  | 'hall'
  | 'court'
  | 'corridor'
  | 'entrance'
  | 'crossing'
  | 'turn-court'
  | 'final-threshold'
  | 'reserve-extension';
export type MuseumImplementationStatus = 'live' | 'planned' | 'retired';
export type MuseumPilotRole =
  | 'public-entrance'
  | 'outer-hall'
  | 'forum-hall'
  | 'south-return-sleeve'
  | 'outer-loop-link'
  | 'forum-spoke'
  | 'shortcut'
  | 'chronological-gallery'
  | 'crosscut-intersection'
  | 'north-south-crosscut'
  | 'serpentine-turn'
  | 'final-return'
  | 'reserve-extension';
export type MuseumGalleryState = 'curated-open' | 'planned-walkable';

export type MuseumDoorwaySlot = {
  id: string;
  position: MuseumPoint;
  /** Local-space direction from the seam into this physical node. */
  inwardNormal: MuseumPoint;
  clearWidth: number;
  clearHeight: number;
  transitionDepth: number;
  landingBounds: MuseumBounds;
  arrivalPose: MuseumPose;
};

export type MuseumNavigationLayout = {
  id: string;
  title: string;
  eyeHeight: number;
  playerRadius: number;
  bounds: MuseumBounds;
  cameraFov: number;
  cameraFar: number;
  spawn: MuseumPose;
  reset: MuseumPose;
  spatialCells: readonly MuseumSpatialCell[];
  spatialConnections: readonly MuseumSpatialConnection[];
  wallColliders: readonly MuseumWallDefinition[];
  furnishings: readonly MuseumFurnishingDefinition[];
  obstacleColliders: readonly MuseumCollider[];
  exhibits: readonly MuseumExhibitLayout[];
  supplementalExhibits?: readonly MuseumSupplementalExhibitLayout[];
  signs?: readonly MuseumSignDefinition[];
};

export type MuseumRuntimeNodeDefinition = {
  id: MuseumPhysicalNodeId;
  kind: MuseumPhysicalNodeKind;
  /** Every one of the 26 architectural galleries has a stable program id. */
  programHallId?: MuseumPlannedHallId;
  /** Only curated/open galleries own a content registration. */
  publicHallId?: MuseumPublicHallId;
  galleryState?: MuseumGalleryState;
  publicGalleryNumber?: number;
  visitSequence?: number;
  bandId?: string;
  roomIds?: readonly string[];
  roomLayoutStrategy?: string;
  routePortals?: Readonly<Record<string, string>>;
  fastTravelEligible?: boolean;
  pilotRole: MuseumPilotRole;
  templateId?: 'standard-rect' | 'sequence-3' | 'crossroads-4' | 'focal-terminal';
  geometryAdapterId?: string;
  implementationStatus: MuseumImplementationStatus;
  levelId: 'L0';
  worldTransform: MuseumWorldTransform;
  layout: MuseumNavigationLayout;
  /** Full-height wall segments plus render-only lintels for public architecture. */
  architectureWalls?: readonly MuseumWallDefinition[];
  /** Present on public hall nodes compiled through a hall-template contract. */
  resolvedTemplate?: MuseumResolvedHallTemplate;
  entrances: readonly MuseumHallEntrance[];
  mapLabel: string;
  mapStatus:
    | 'open'
    | 'orientation-open'
    | 'future'
    | 'planned-walkable'
    | 'crosscut-open'
    | 'final-open'
    | 'closed-reserve';
};

export type MuseumDirectedConnection = MuseumHallConnection & {
  routeRole: MuseumPhysicalConnection['routeRole'];
  accessible: boolean;
  implementationStatus: MuseumPhysicalConnection['implementationStatus'];
};

export type MuseumPhysicalConnection = {
  id: string;
  a: {nodeId: MuseumPhysicalNodeId; slotId: string};
  b: {nodeId: MuseumPhysicalNodeId; slotId: string};
  routeRole:
    | 'outer-loop'
    | 'forum-spoke'
    | 'shortcut'
    | 'gallery-branch'
    | 'through-route'
    | 'crosscut'
    | 'turn-court'
    | 'entrance-link'
    | 'final-return'
    | 'reserve-extension';
  accessible: boolean;
  implementationStatus: 'live' | 'blocked' | 'planned';
};

export type MuseumReservation = {
  id: string;
  reservationType: 'insertion' | 'outward-expansion' | 'gallery-reserve';
  hostNodeId: MuseumPhysicalNodeId;
  label: string;
  /** Reserved future footprint, kept outside the live circulation envelope. */
  center: MuseumPoint;
  size: {width: number; depth: number};
  /** Physical wall-line center and clear blocking width for the closed portal. */
  barrierCenter: MuseumPoint;
  barrierWidth: number;
  rotation: number;
  blocked: true;
  implementationStatus: 'reserved';
  targetProgramHallId?: string;
  expansionPortalId?: string;
};

export type MuseumExhibitRef = {
  hallId: MuseumPublicHallId;
  exhibitId: MuseumExhibitId;
};

export type MuseumSupplementalExhibitRef = {
  hallId: MuseumPublicHallId;
  supplementalExhibitId: MuseumSupplementalExhibitId;
};

export type MuseumInteractionTarget =
  | ({kind: 'exhibit'} & MuseumExhibitRef)
  | ({kind: 'supplemental-exhibit'} & MuseumSupplementalExhibitRef)
  | {kind: 'visitor-map'; nodeId: MuseumPhysicalNodeId; kioskId: string};
