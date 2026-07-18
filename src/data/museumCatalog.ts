import type {MuseumAssetId} from './museum/museumAssetTypes';
import {
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_HALL_ROUTE_ALIASES,
  type MuseumCanonicalEntityKind,
  type MuseumCanonicalExhibit,
  type MuseumCanonicalHallId,
  type MuseumCanonicalRoomLens,
  type MuseumCanonicalRoomId,
  type MuseumLegacyHallId,
  type MuseumPresentationTier,
} from './museum/museumCanonicalProgram';

export {
  MUSEUM_CANONICAL_HALL_IDS,
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_CANONICAL_ROOM_IDS,
  MUSEUM_HALL_ROUTE_ALIASES,
  MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY,
  MUSEUM_LEGACY_HALL_IDS,
  MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY,
  MUSEUM_LIVE_HALL_TOTALS,
  MUSEUM_LIVE_PROGRAM_TOTALS,
  MUSEUM_LIVE_ROOM_TOTALS,
  MUSEUM_PLANNED_HALL_TITLES,
  MUSEUM_PRESENTATION_TIERS,
  getMuseumLegacyExhibitCompatibility,
  getMuseumPrimaryExhibitRef,
} from './museum/museumCanonicalProgram';
export type {
  MuseumCanonicalExhibit,
  MuseumCanonicalHall,
  MuseumCanonicalHallId,
  MuseumCanonicalRoom,
  MuseumCanonicalRoomLens,
  MuseumCanonicalRoomId,
  MuseumCanonicalRoomComparison,
  MuseumLegacyHallId,
  MuseumLegacyExhibitCompatibility,
  MuseumLegacyExhibitDisposition,
  MuseumPlannedHallId,
  MuseumPresentationTier,
  MuseumPrimaryExhibitRef,
} from './museum/museumCanonicalProgram';

export type MuseumPublicHallId = MuseumCanonicalHallId;
export type LegacyMuseumHallId = MuseumLegacyHallId;

/**
 * Compatibility union used by legacy scene modules while they are retired from the
 * public registry. Use MuseumPublicHallId for all new runtime and routing code.
 */
export type MuseumHallId = MuseumPublicHallId | LegacyMuseumHallId;

export type LegacyMuseumZoneId =
  | 'classical-foundations'
  | 'hellenistic-ways'
  | 'late-antiquity'
  | 'power-and-method'
  | 'sovereignty-rights-nature'
  | 'experience-freedom-critique'
  | 'faith-alienation-crisis'
  | 'existence-freedom-absurd'
  | 'power-knowledge-institutions'
  | 'signs-and-structures'
  | 'inquiry-and-testing'
  | 'webs-and-revolutions'
  | 'utility-equality-liberty'
  | 'freedom-decolonization-public-life'
  | 'justice-rights-democratic-reason'
  | 'disciplines-of-mind-and-self'
  | 'experience-intentionality-embodiment'
  | 'action-consciousness-personhood';

export type MuseumZoneId = LegacyMuseumZoneId | MuseumCanonicalRoomId;
export type MuseumRoomId = MuseumCanonicalRoomId;
export type MuseumExhibitKind = MuseumCanonicalEntityKind;

export type MuseumZoneCatalog = {
  id: MuseumZoneId;
  title: string;
  period: string;
  description: string;
  comparativeLenses?: readonly MuseumCanonicalRoomLens[];
};

type MuseumExhibitCatalogShape = {
  id: string;
  entityKind: MuseumExhibitKind;
  entityId: string;
  displayName: string;
  zoneId: MuseumZoneId;
  question: string;
  principalAssetId: MuseumAssetId;
  supportingAssetIds: readonly MuseumAssetId[];
};

const ancientZones = [
  {
    id: 'classical-foundations',
    title: 'Classical Foundations',
    period: '5th–4th centuries BCE',
    description: 'Three thinkers recast inquiry around examination, form, cause, character, and the life of the city.',
  },
  {
    id: 'hellenistic-ways',
    title: 'Hellenistic Ways of Life',
    period: '4th–1st centuries BCE',
    description: 'Rival schools turn philosophy into a practiced response to fortune, desire, convention, and uncertainty.',
  },
  {
    id: 'late-antiquity',
    title: 'Late Antiquity',
    period: '3rd–6th centuries CE',
    description: 'Neoplatonism gathers earlier arguments into a vast account of reality, intellect, soul, and return.',
  },
] as const satisfies readonly MuseumZoneCatalog[];

const ancientExhibits = [
  {id: 'socrates', entityKind: 'philosopher', entityId: 'socrates', displayName: 'Socrates', zoneId: 'classical-foundations', question: 'What does an examined life demand of us?', principalAssetId: 'socrates-louvre-head', supportingAssetIds: ['socrates-death-of-socrates']},
  {id: 'plato', entityKind: 'philosopher', entityId: 'plato', displayName: 'Plato', zoneId: 'classical-foundations', question: 'What is more real than the appearances around us?', principalAssetId: 'plato-capitoline-bust', supportingAssetIds: ['plato-school-of-athens']},
  {id: 'aristotle', entityKind: 'philosopher', entityId: 'aristotle', displayName: 'Aristotle', zoneId: 'classical-foundations', question: 'How do causes, purposes, and habits make a life intelligible?', principalAssetId: 'aristotle-altemps-bust', supportingAssetIds: ['aristotle-athenian-constitution-papyrus']},
  {id: 'cynicism', entityKind: 'branch', entityId: 'cynicism', displayName: 'Cynicism', zoneId: 'hellenistic-ways', question: 'How much convention must we shed to live freely?', principalAssetId: 'cynicism-diogenes-walters', supportingAssetIds: ['cynicism-alexander-and-diogenes']},
  {id: 'epicureanism', entityKind: 'branch', entityId: 'epicureanism', displayName: 'Epicureanism', zoneId: 'hellenistic-ways', question: 'Which desires lead to durable tranquility?', principalAssetId: 'epicureanism-double-herm', supportingAssetIds: ['epicureanism-lucretius-manuscript']},
  {id: 'stoicism', entityKind: 'branch', entityId: 'stoicism', displayName: 'Stoicism', zoneId: 'hellenistic-ways', question: 'What remains in our power when fortune changes?', principalAssetId: 'stoicism-zeno-naples', supportingAssetIds: ['stoicism-marcus-aurelius-bust']},
  {id: 'skepticism', entityKind: 'branch', entityId: 'skepticism', displayName: 'Skepticism', zoneId: 'hellenistic-ways', question: 'Can suspending judgment loosen the grip of anxiety?', principalAssetId: 'skepticism-sextus-riedel', supportingAssetIds: ['skepticism-adversus-mathematicos']},
  {id: 'neoplatonism', entityKind: 'branch', entityId: 'neoplatonism', displayName: 'Neoplatonism', zoneId: 'late-antiquity', question: 'How can the many flow from—and return toward—the One?', principalAssetId: 'neoplatonism-plotinus-ostia', supportingAssetIds: ['neoplatonism-ficino-enneads']},
] as const satisfies readonly MuseumExhibitCatalogShape[];

const renaissanceReasonRevolutionZones = [
  {
    id: 'power-and-method',
    title: 'Power & Method',
    period: '16th–17th centuries',
    description: 'Machiavelli and Descartes unsettle inherited authorities by asking how power actually works and how inquiry can begin again.',
  },
  {
    id: 'sovereignty-rights-nature',
    title: 'Sovereignty, Rights & Nature',
    period: '17th century',
    description: 'Hobbes, Locke, and Spinoza construct rival accounts of political order, freedom, mind, nature, and religious authority.',
  },
  {
    id: 'experience-freedom-critique',
    title: 'Experience, Freedom & Critique',
    period: '18th century',
    description: 'Hume, Rousseau, and Kant test the limits of reason while recasting morality, society, autonomy, and the knowing subject.',
  },
] as const satisfies readonly MuseumZoneCatalog[];

const renaissanceReasonRevolutionExhibits = [
  {id: 'machiavelli', entityKind: 'philosopher', entityId: 'machiavelli', displayName: 'Niccolò Machiavelli', zoneId: 'power-and-method', question: 'What does political judgment require when ideals and power diverge?', principalAssetId: 'machiavelli-santi-di-tito', supportingAssetIds: ['machiavelli-prince-1532']},
  {id: 'descartes', entityKind: 'philosopher', entityId: 'descartes', displayName: 'René Descartes', zoneId: 'power-and-method', question: 'What can remain certain after systematic doubt?', principalAssetId: 'descartes-hals-portrait', supportingAssetIds: ['descartes-discourse-1637']},
  {id: 'hobbes', entityKind: 'philosopher', entityId: 'hobbes', displayName: 'Thomas Hobbes', zoneId: 'sovereignty-rights-nature', question: 'Why would free people authorize a sovereign power?', principalAssetId: 'hobbes-wright-portrait', supportingAssetIds: ['hobbes-leviathan-1651']},
  {id: 'locke', entityKind: 'philosopher', entityId: 'locke', displayName: 'John Locke', zoneId: 'sovereignty-rights-nature', question: 'When does government protect rights—and when may it be resisted?', principalAssetId: 'locke-kneller-portrait', supportingAssetIds: ['locke-two-treatises-1690']},
  {id: 'spinoza', entityKind: 'philosopher', entityId: 'spinoza', displayName: 'Baruch Spinoza', zoneId: 'sovereignty-rights-nature', question: 'How might freedom arise within, rather than outside, nature?', principalAssetId: 'spinoza-hab-portrait', supportingAssetIds: ['spinoza-ethics-1677']},
  {id: 'hume', entityKind: 'philosopher', entityId: 'hume', displayName: 'David Hume', zoneId: 'experience-freedom-critique', question: 'How far can experience justify causation, self, and belief?', principalAssetId: 'hume-ramsay-portrait', supportingAssetIds: ['hume-treatise-1739']},
  {id: 'rousseau', entityKind: 'philosopher', entityId: 'rousseau', displayName: 'Jean-Jacques Rousseau', zoneId: 'experience-freedom-critique', question: 'Can people obey a law together and still remain free?', principalAssetId: 'rousseau-la-tour-portrait', supportingAssetIds: ['rousseau-social-contract-1762']},
  {id: 'kant', entityKind: 'philosopher', entityId: 'kant', displayName: 'Immanuel Kant', zoneId: 'experience-freedom-critique', question: 'What makes experience, obligation, and autonomy possible?', principalAssetId: 'kant-raab-portrait', supportingAssetIds: ['kant-critique-1781']},
] as const satisfies readonly MuseumExhibitCatalogShape[];

const modernityFreedomCritiqueZones = [
  {
    id: 'faith-alienation-crisis',
    title: 'Faith, Alienation & Crisis',
    period: '19th century',
    description: 'Kierkegaard and Marx challenge systems that hide lived choice, material conflict, and historical crisis.',
  },
  {
    id: 'existence-freedom-absurd',
    title: 'Existence, Freedom & the Absurd',
    period: '20th century',
    description: 'Nietzsche, Heidegger, Sartre, and Beauvoir examine value creation, situated existence, responsibility, and oppression.',
  },
  {
    id: 'power-knowledge-institutions',
    title: 'Power, Knowledge & Institutions',
    period: '20th century',
    description: 'Camus and Foucault test revolt, discipline, institutional power, and the making of modern subjects.',
  },
] as const satisfies readonly MuseumZoneCatalog[];

const modernityFreedomCritiqueExhibits = [
  {id: 'kierkegaard', entityKind: 'philosopher', entityId: 'kierkegaard', displayName: 'Søren Kierkegaard', zoneId: 'faith-alienation-crisis', question: 'What does it mean to choose when certainty cannot choose for us?', principalAssetId: 'kierkegaard-royal-library-portrait', supportingAssetIds: ['kierkegaard-fragments-manuscript']},
  {id: 'marx', entityKind: 'philosopher', entityId: 'marx', displayName: 'Karl Marx', zoneId: 'faith-alienation-crisis', question: 'How do material relations shape freedom, labor, and historical change?', principalAssetId: 'marx-mayall-portrait', supportingAssetIds: ['marx-capital-1867']},
  {id: 'nietzsche', entityKind: 'philosopher', entityId: 'nietzsche', displayName: 'Friedrich Nietzsche', zoneId: 'existence-freedom-absurd', question: 'How are values made, inherited, and overcome?', principalAssetId: 'nietzsche-schultze-1882', supportingAssetIds: ['nietzsche-zarathustra-1883']},
  {id: 'heidegger', entityKind: 'philosopher', entityId: 'heidegger', displayName: 'Martin Heidegger', zoneId: 'existence-freedom-absurd', question: 'What does our practical involvement disclose about being?', principalAssetId: 'heidegger-wetterauer-portrait', supportingAssetIds: ['heidegger-pragher-lecture-1954']},
  {id: 'sartre', entityKind: 'philosopher', entityId: 'sartre', displayName: 'Jean-Paul Sartre', zoneId: 'existence-freedom-absurd', question: 'What responsibility follows from freedom without a fixed essence?', principalAssetId: 'sartre-anefo-1965', supportingAssetIds: ['sartre-beauvoir-balzac']},
  {id: 'beauvoir', entityKind: 'philosopher', entityId: 'beauvoir', displayName: 'Simone de Beauvoir', zoneId: 'existence-freedom-absurd', question: 'How does freedom become possible—or blocked—between situated people?', principalAssetId: 'beauvoir-gpo-1967', supportingAssetIds: ['beauvoir-suffrage-poster-1924']},
  {id: 'camus', entityKind: 'philosopher', entityId: 'camus', displayName: 'Albert Camus', zoneId: 'power-knowledge-institutions', question: 'How can revolt answer a world that offers no final guarantee?', principalAssetId: 'camus-loc-1957', supportingAssetIds: ['camus-combat-1943']},
  {id: 'foucault', entityKind: 'philosopher', entityId: 'foucault', displayName: 'Michel Foucault', zoneId: 'power-knowledge-institutions', question: 'How do institutions and knowledge produce the subjects they govern?', principalAssetId: 'foucault-portugal-1968', supportingAssetIds: ['foucault-panopticon-plan']},
] as const satisfies readonly MuseumExhibitCatalogShape[];

const logicLanguageScienceZones = [
  {
    id: 'signs-and-structures',
    title: 'Signs & Structures',
    period: 'Late 19th–early 20th centuries',
    description: 'Peirce, Frege, and Russell remake logic while asking how signs, propositions, reference, and mathematical structure carry meaning.',
  },
  {
    id: 'inquiry-and-testing',
    title: 'Inquiry & Testing',
    period: 'Early–mid 20th century',
    description: 'Dewey, Carnap, and Popper offer rival pictures of experimental inquiry, logical reconstruction, criticism, and scientific method.',
  },
  {
    id: 'webs-and-revolutions',
    title: 'Webs & Revolutions',
    period: 'Mid–late 20th century',
    description: 'Quine and Kuhn challenge clean boundaries between truths, theories, evidence, communities, and historical scientific change.',
  },
] as const satisfies readonly MuseumZoneCatalog[];

const logicLanguageScienceExhibits = [
  {id: 'peirce', entityKind: 'philosopher', entityId: 'peirce', displayName: 'Charles Sanders Peirce', zoneId: 'signs-and-structures', question: 'How do signs guide fallible inquiry toward habits of action and public correction?', principalAssetId: 'peirce-sarony-portrait', supportingAssetIds: ['peirce-existential-graphs']},
  {id: 'frege', entityKind: 'philosopher', entityId: 'frege', displayName: 'Gottlob Frege', zoneId: 'signs-and-structures', question: 'How can logical form clarify number, reference, and the difference between sense and object?', principalAssetId: 'frege-portrait', supportingAssetIds: ['frege-begriffsschrift-1879']},
  {id: 'russell', entityKind: 'philosopher', entityId: 'russell', displayName: 'Bertrand Russell', zoneId: 'signs-and-structures', question: 'Can logical analysis reveal what our sentences commit us to?', principalAssetId: 'russell-portrait-1894', supportingAssetIds: ['russell-on-denoting-1905']},
  {id: 'dewey', entityKind: 'philosopher', entityId: 'dewey', displayName: 'John Dewey', zoneId: 'inquiry-and-testing', question: 'What if knowing is an experimental practice for transforming uncertain situations?', principalAssetId: 'dewey-portrait-1902', supportingAssetIds: ['dewey-democracy-education-1916']},
  {id: 'carnap', entityKind: 'philosopher', entityId: 'carnap', displayName: 'Rudolf Carnap', zoneId: 'inquiry-and-testing', question: 'Which disputes can be clarified by choosing and constructing explicit linguistic frameworks?', principalAssetId: 'carnap-portrait', supportingAssetIds: ['carnap-reichenbach-collection']},
  {id: 'popper', entityKind: 'philosopher', entityId: 'popper', displayName: 'Karl Popper', zoneId: 'inquiry-and-testing', question: 'How can bold theories remain answerable to tests that might refute them?', principalAssetId: 'popper-portrait-1987', supportingAssetIds: ['popper-alien-registration']},
  {id: 'quine', entityKind: 'philosopher', entityId: 'quine', displayName: 'W. V. O. Quine', zoneId: 'webs-and-revolutions', question: 'What changes when beliefs confront experience as an interconnected web?', principalAssetId: 'quine-portrait', supportingAssetIds: ['quine-qualitative-sphere']},
  {id: 'kuhn', entityKind: 'philosopher', entityId: 'kuhn', displayName: 'Thomas Kuhn', zoneId: 'webs-and-revolutions', question: 'How do scientific communities move between normal inquiry and revolutionary change?', principalAssetId: 'kuhn-portrait-1977', supportingAssetIds: ['kuhn-structure-1962']},
] as const satisfies readonly MuseumExhibitCatalogShape[];

const ethicsJusticePoliticalLifeZones = [
  {
    id: 'utility-equality-liberty',
    title: 'Utility, Equality & Liberty',
    period: 'Late 18th–19th centuries',
    description: 'Bentham, Wollstonecraft, and Mill turn moral argument toward legal reform, equal education, liberty, and the consequences of institutions.',
  },
  {
    id: 'freedom-decolonization-public-life',
    title: 'Freedom, Decolonization & Public Life',
    period: 'Mid-20th century',
    description: 'Arendt and Fanon confront statelessness, total domination, racialization, colonial violence, political action, and liberation.',
  },
  {
    id: 'justice-rights-democratic-reason',
    title: 'Justice, Rights & Democratic Reason',
    period: 'Late 20th–21st centuries',
    description: 'Rawls, Nozick, and Habermas dispute fair institutions, holdings, public justification, communicative power, and democratic legitimacy.',
  },
] as const satisfies readonly MuseumZoneCatalog[];

const ethicsJusticePoliticalLifeExhibits = [
  {id: 'bentham', entityKind: 'philosopher', entityId: 'bentham', displayName: 'Jeremy Bentham', zoneId: 'utility-equality-liberty', question: 'Can law and policy be judged by the happiness and suffering they produce?', principalAssetId: 'bentham-pickering-portrait', supportingAssetIds: ['bentham-principles-1823']},
  {id: 'wollstonecraft', entityKind: 'philosopher', entityId: 'wollstonecraft', displayName: 'Mary Wollstonecraft', zoneId: 'utility-equality-liberty', question: 'How can freedom be credible while education and citizenship are organized by gender?', principalAssetId: 'wollstonecraft-opie-portrait', supportingAssetIds: ['wollstonecraft-vindication-1792']},
  {id: 'mill', entityKind: 'philosopher', entityId: 'mill', displayName: 'John Stuart Mill', zoneId: 'utility-equality-liberty', question: 'Where should social power stop so individuality and experiments in living can flourish?', principalAssetId: 'mill-stereoscopic-portrait', supportingAssetIds: ['mill-on-liberty-1859']},
  {id: 'arendt', entityKind: 'philosopher', entityId: 'arendt', displayName: 'Hannah Arendt', zoneId: 'freedom-decolonization-public-life', question: 'What forms of public action, judgment, and shared world make political freedom possible?', principalAssetId: 'arendt-portrait-1933', supportingAssetIds: ['arendt-grave-bard']},
  {id: 'fanon', entityKind: 'philosopher', entityId: 'fanon', displayName: 'Frantz Fanon', zoneId: 'freedom-decolonization-public-life', question: 'How does colonial domination enter bodies, identities, institutions, and struggles for liberation?', principalAssetId: 'fanon-portrait', supportingAssetIds: ['fanon-paris-plaque']},
  {id: 'rawls', entityKind: 'philosopher', entityId: 'rawls', displayName: 'John Rawls', zoneId: 'justice-rights-democratic-reason', question: 'Which principles would fairly situated citizens choose for their basic institutions?', principalAssetId: 'rawls-portrait', supportingAssetIds: ['rawls-theory-justice-1971']},
  {id: 'nozick', entityKind: 'philosopher', entityId: 'nozick', displayName: 'Robert Nozick', zoneId: 'justice-rights-democratic-reason', question: 'When do individual rights constrain redistribution and the purposes of the state?', principalAssetId: 'nozick-portrait', supportingAssetIds: ['nozick-anarchy-state-utopia-1974']},
  {id: 'habermas', entityKind: 'philosopher', entityId: 'habermas', displayName: 'Jürgen Habermas', zoneId: 'justice-rights-democratic-reason', question: 'How can communication and public justification generate legitimate democratic power?', principalAssetId: 'habermas-portrait', supportingAssetIds: ['habermas-lecture-2011']},
] as const satisfies readonly MuseumExhibitCatalogShape[];

const mindConsciousnessSelfZones = [
  {
    id: 'disciplines-of-mind-and-self',
    title: 'Disciplines of Mind & Self',
    period: 'Classical South Asia',
    description: 'Patañjali-associated Yoga and Vasubandhu analyze attention, affliction, cognition, practice, continuity, and the refusal of a simple permanent self.',
  },
  {
    id: 'experience-intentionality-embodiment',
    title: 'Experience, Intentionality & Embodiment',
    period: 'Late 19th–mid-20th centuries',
    description: 'James, Husserl, and Merleau-Ponty begin from lived experience, directed consciousness, habit, perception, and the body’s worldly intelligence.',
  },
  {
    id: 'action-consciousness-personhood',
    title: 'Action, Consciousness & Personhood',
    period: 'Mid-20th–21st centuries',
    description: 'Anscombe, Nagel, and Parfit ask what makes an action intentional, an experience subjective, and a person continuous through time.',
  },
] as const satisfies readonly MuseumZoneCatalog[];

const mindConsciousnessSelfExhibits = [
  {id: 'patanjali', entityKind: 'philosopher', entityId: 'patanjali', displayName: 'Patañjali', zoneId: 'disciplines-of-mind-and-self', question: 'How can disciplined practice transform the fluctuations and afflictions of mind?', principalAssetId: 'patanjali-statue', supportingAssetIds: ['patanjali-yoga-sutra-manuscript']},
  {id: 'vasubandhu', entityKind: 'philosopher', entityId: 'vasubandhu', displayName: 'Vasubandhu', zoneId: 'disciplines-of-mind-and-self', question: 'How should we analyze experience, cognition, and continuity without positing an independent self?', principalAssetId: 'vasubandhu-statue', supportingAssetIds: ['vasubandhu-abhidharmakosha-manuscript']},
  {id: 'william-james', entityKind: 'philosopher', entityId: 'william-james', displayName: 'William James', zoneId: 'experience-intentionality-embodiment', question: 'What is consciousness like when followed as a changing, selective stream?', principalAssetId: 'william-james-portrait', supportingAssetIds: ['william-james-principles-1890']},
  {id: 'husserl', entityKind: 'philosopher', entityId: 'husserl', displayName: 'Edmund Husserl', zoneId: 'experience-intentionality-embodiment', question: 'How can careful description disclose the structures by which consciousness is directed toward a world?', principalAssetId: 'husserl-portrait', supportingAssetIds: ['husserl-goettingen-plaque']},
  {id: 'merleau-ponty', entityKind: 'philosopher', entityId: 'merleau-ponty', displayName: 'Maurice Merleau-Ponty', zoneId: 'experience-intentionality-embodiment', question: 'How does the lived body open a meaningful world before reflective thought?', principalAssetId: 'merleau-ponty-portrait', supportingAssetIds: ['merleau-ponty-grave']},
  {id: 'anscombe', entityKind: 'philosopher', entityId: 'anscombe', displayName: 'G. E. M. Anscombe', zoneId: 'action-consciousness-personhood', question: 'What distinguishes an intentional action from an event that merely happens through us?', principalAssetId: 'anscombe-portrait', supportingAssetIds: ['anscombe-philosophical-investigations-1953']},
  {id: 'thomas-nagel', entityKind: 'philosopher', entityId: 'thomas-nagel', displayName: 'Thomas Nagel', zoneId: 'action-consciousness-personhood', question: 'Why can an objective account leave out what an experience is like for its subject?', principalAssetId: 'thomas-nagel-portrait', supportingAssetIds: ['thomas-nagel-teaching']},
  {id: 'derek-parfit', entityKind: 'philosopher', entityId: 'derek-parfit', displayName: 'Derek Parfit', zoneId: 'action-consciousness-personhood', question: 'What matters in survival if personal identity is not a further indivisible fact?', principalAssetId: 'derek-parfit-portrait', supportingAssetIds: ['derek-parfit-repugnant-conclusion']},
] as const satisfies readonly MuseumExhibitCatalogShape[];

export type AncientGreekExhibitId = (typeof ancientExhibits)[number]['id'];
export type RenaissanceReasonRevolutionExhibitId = (typeof renaissanceReasonRevolutionExhibits)[number]['id'];
export type ModernityFreedomCritiqueExhibitId = (typeof modernityFreedomCritiqueExhibits)[number]['id'];
export type LogicLanguageScienceExhibitId = (typeof logicLanguageScienceExhibits)[number]['id'];
export type EthicsJusticePoliticalLifeExhibitId = (typeof ethicsJusticePoliticalLifeExhibits)[number]['id'];
export type MindConsciousnessSelfExhibitId = (typeof mindConsciousnessSelfExhibits)[number]['id'];
type LegacyMuseumExhibitCatalog =
  | (typeof ancientExhibits)[number]
  | (typeof renaissanceReasonRevolutionExhibits)[number]
  | (typeof modernityFreedomCritiqueExhibits)[number]
  | (typeof logicLanguageScienceExhibits)[number]
  | (typeof ethicsJusticePoliticalLifeExhibits)[number]
  | (typeof mindConsciousnessSelfExhibits)[number];

type MuseumCanonicalProgramExhibit =
  (typeof MUSEUM_CANONICAL_PROGRAM)[number]['rooms'][number]['exhibits'][number];
export type MuseumCanonicalExhibitId = MuseumCanonicalProgramExhibit['id'];

export type MuseumCanonicalExhibitCatalog = Omit<
  MuseumCanonicalExhibit,
  'id' | 'principalAssetId' | 'supportingAssetIds'
> & {
  id: MuseumCanonicalExhibitId;
  roomId: MuseumCanonicalRoomId;
  zoneId: MuseumCanonicalRoomId;
  tier: MuseumPresentationTier;
  principalAssetId?: MuseumAssetId;
  supportingAssetIds: readonly MuseumAssetId[];
};

export type MuseumExhibitCatalog = LegacyMuseumExhibitCatalog | MuseumCanonicalExhibitCatalog;
export type MuseumExhibitId = LegacyMuseumExhibitCatalog['id'] | MuseumCanonicalExhibitId;

export type MuseumHallCatalog = {
  id: MuseumHallId;
  title: string;
  galleryNumber: string;
  period: string;
  description: string;
  sweep: readonly string[];
  zones: readonly MuseumZoneCatalog[];
  exhibits: readonly MuseumExhibitCatalog[];
  guidedOrder: readonly MuseumExhibitId[];
  wingId?: string;
  templateId?: string;
  recordCapacity?: number;
  roomIds?: readonly MuseumCanonicalRoomId[];
};

const LEGACY_MUSEUM_HALLS = [
  {
    id: 'ancient-greek',
    title: 'Ancient Greek & Hellenistic Gallery',
    galleryNumber: 'Gallery 01',
    period: '5th century BCE–6th century CE',
    description: 'Walk from the examined life of classical Athens through rival Hellenistic practices and into the metaphysical ascent of late antiquity.',
    sweep: ['Classical inquiry', 'Hellenistic ways of life', 'Late-antique ascent'],
    zones: ancientZones,
    exhibits: ancientExhibits,
    guidedOrder: ancientExhibits.map(({id}) => id),
  },
  {
    id: 'renaissance-reason-revolution',
    title: 'Renaissance, Reason, and Revolution',
    galleryNumber: 'Gallery 02',
    period: '16th–18th centuries',
    description: 'Follow the remaking of political judgment, scientific method, sovereignty, rights, experience, freedom, and critique across early modern Europe.',
    sweep: ['Power and method', 'Sovereignty and rights', 'Experience and critique'],
    zones: renaissanceReasonRevolutionZones,
    exhibits: renaissanceReasonRevolutionExhibits,
    guidedOrder: renaissanceReasonRevolutionExhibits.map(({id}) => id),
  },
  {
    id: 'modernity-freedom-critique',
    title: 'Modernity, Freedom, and Critique',
    galleryNumber: 'Gallery 03',
    period: '19th–20th centuries',
    description: 'Move through crises of faith, labor, value, existence, oppression, absurdity, and the institutional production of modern subjects.',
    sweep: ['Faith, alienation, and crisis', 'Existence, freedom, and absurdity', 'Power, knowledge, and institutions'],
    zones: modernityFreedomCritiqueZones,
    exhibits: modernityFreedomCritiqueExhibits,
    guidedOrder: modernityFreedomCritiqueExhibits.map(({id}) => id),
  },
  {
    id: 'logic-language-science',
    title: 'Logic, Language, and Science',
    galleryNumber: 'Gallery 04',
    period: '19th–20th centuries',
    description: 'Trace the remaking of logic, meaning, inquiry, evidence, and scientific change from pragmatist signs and formal systems to webs of belief and paradigms.',
    sweep: ['Signs and structures', 'Inquiry and testing', 'Webs and revolutions'],
    zones: logicLanguageScienceZones,
    exhibits: logicLanguageScienceExhibits,
    guidedOrder: logicLanguageScienceExhibits.map(({id}) => id),
  },
  {
    id: 'ethics-justice-political-life',
    title: 'Ethics, Justice, and Political Life',
    galleryNumber: 'Gallery 05',
    period: '18th–21st centuries',
    description: 'Enter disputes over utility, equality, liberty, public action, colonial domination, rights, fair institutions, and the communicative foundations of democracy.',
    sweep: ['Utility, equality, and liberty', 'Freedom and decolonization', 'Justice and democratic reason'],
    zones: ethicsJusticePoliticalLifeZones,
    exhibits: ethicsJusticePoliticalLifeExhibits,
    guidedOrder: ethicsJusticePoliticalLifeExhibits.map(({id}) => id),
  },
  {
    id: 'mind-consciousness-self',
    title: 'Mind, Consciousness, and the Self',
    galleryNumber: 'Gallery 06',
    period: 'Classical South Asia–21st century',
    description: 'Compare disciplined and Buddhist analyses of mind with modern accounts of experience, intentionality, embodiment, action, subjectivity, and personal identity.',
    sweep: ['Disciplines of mind and self', 'Experience and embodiment', 'Action, consciousness, and personhood'],
    zones: mindConsciousnessSelfZones,
    exhibits: mindConsciousnessSelfExhibits,
    guidedOrder: mindConsciousnessSelfExhibits.map(({id}) => id),
  },
] as const satisfies readonly MuseumHallCatalog[];

const toCanonicalCatalogExhibit = (
  record: MuseumCanonicalProgramExhibit,
  roomId: MuseumCanonicalRoomId,
): MuseumCanonicalExhibitCatalog => ({
  ...record,
  roomId,
  zoneId: roomId,
  principalAssetId: ('principalAssetId' in record ? record.principalAssetId : undefined) as MuseumAssetId | undefined,
  supportingAssetIds: (record.supportingAssetIds ?? []) as readonly MuseumAssetId[],
});

export const MUSEUM_HALLS = MUSEUM_CANONICAL_PROGRAM.map((hall, index) => {
  const exhibits = hall.rooms.flatMap((room) => room.exhibits.map((record) =>
    toCanonicalCatalogExhibit(record, room.id),
  ));
  return {
    id: hall.id,
    title: hall.title,
    galleryNumber: hall.id === 'core-questions-forum' ? 'Forum' : `Gallery ${String(index + 1).padStart(2, '0')}`,
    period: hall.period,
    description: hall.description,
    sweep: hall.rooms.map(({title}) => title),
    zones: hall.rooms.map((room) => ({
      id: room.id,
      title: room.title,
      period: hall.period,
      description: `${room.title}. Program capacity: ${room.recordCapacity} primary records.`,
      comparativeLenses: 'comparativeLenses' in room ? room.comparativeLenses : [],
    })),
    exhibits,
    guidedOrder: exhibits.map(({id}) => id),
    wingId: hall.wingId,
    templateId: hall.templateId,
    recordCapacity: hall.recordCapacity,
    roomIds: hall.rooms.map(({id}) => id),
  };
}) satisfies readonly MuseumHallCatalog[];

export type MuseumCanonicalHallCatalog = (typeof MUSEUM_HALLS)[number];

export const DEFAULT_MUSEUM_HALL_ID: MuseumPublicHallId = 'mediterranean-beginnings-classical';

export function getMuseumHallCatalog(id: 'ancient-greek'): (typeof LEGACY_MUSEUM_HALLS)[0];
export function getMuseumHallCatalog(id: 'renaissance-reason-revolution'): (typeof LEGACY_MUSEUM_HALLS)[1];
export function getMuseumHallCatalog(id: 'modernity-freedom-critique'): (typeof LEGACY_MUSEUM_HALLS)[2];
export function getMuseumHallCatalog(id: 'logic-language-science'): (typeof LEGACY_MUSEUM_HALLS)[3];
export function getMuseumHallCatalog(id: 'ethics-justice-political-life'): (typeof LEGACY_MUSEUM_HALLS)[4];
export function getMuseumHallCatalog(id: 'mind-consciousness-self'): (typeof LEGACY_MUSEUM_HALLS)[5];
export function getMuseumHallCatalog(id: MuseumPublicHallId): MuseumCanonicalHallCatalog;
export function getMuseumHallCatalog(id: MuseumHallId): MuseumHallCatalog | undefined;
export function getMuseumHallCatalog(id: string): MuseumHallCatalog | undefined;
export function getMuseumHallCatalog(id: string): MuseumHallCatalog | undefined {
  return MUSEUM_HALLS.find((hall) => hall.id === id)
    ?? LEGACY_MUSEUM_HALLS.find((hall) => hall.id === id);
}

/** Public route guard: retired prototype IDs deliberately return false. */
export const isMuseumHallId = (id: string | undefined): id is MuseumPublicHallId =>
  Boolean(id && MUSEUM_HALLS.some((hall) => hall.id === id));

export const resolveMuseumHallRouteAlias = (
  id: string | undefined,
): MuseumPublicHallId | undefined => {
  if (!id) return undefined;
  if (isMuseumHallId(id)) return id;
  return MUSEUM_HALL_ROUTE_ALIASES[id as LegacyMuseumHallId];
};

export const getMuseumExhibitCatalog = (
  hallId: string,
  exhibitId: string,
): MuseumExhibitCatalog | undefined =>
  getMuseumHallCatalog(hallId)?.exhibits.find((exhibit) => exhibit.id === exhibitId);

export const isMuseumExhibitId = (
  hallId: string,
  exhibitId: string | undefined,
): exhibitId is MuseumExhibitId => Boolean(exhibitId && getMuseumExhibitCatalog(hallId, exhibitId));
