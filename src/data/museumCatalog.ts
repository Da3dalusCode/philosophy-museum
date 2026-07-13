import type {MuseumAssetId} from './museum/museumAssetTypes';

export type MuseumHallId =
  | 'ancient-greek'
  | 'renaissance-reason-revolution'
  | 'modernity-freedom-critique';

export type MuseumZoneId =
  | 'classical-foundations'
  | 'hellenistic-ways'
  | 'late-antiquity'
  | 'power-and-method'
  | 'sovereignty-rights-nature'
  | 'experience-freedom-critique'
  | 'faith-alienation-crisis'
  | 'existence-freedom-absurd'
  | 'power-knowledge-institutions';

export type MuseumExhibitKind = 'philosopher' | 'branch';

export type MuseumZoneCatalog = {
  id: MuseumZoneId;
  title: string;
  period: string;
  description: string;
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

export type AncientGreekExhibitId = (typeof ancientExhibits)[number]['id'];
export type RenaissanceReasonRevolutionExhibitId = (typeof renaissanceReasonRevolutionExhibits)[number]['id'];
export type ModernityFreedomCritiqueExhibitId = (typeof modernityFreedomCritiqueExhibits)[number]['id'];
export type MuseumExhibitCatalog =
  | (typeof ancientExhibits)[number]
  | (typeof renaissanceReasonRevolutionExhibits)[number]
  | (typeof modernityFreedomCritiqueExhibits)[number];
export type MuseumExhibitId = MuseumExhibitCatalog['id'];

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
};

export const MUSEUM_HALLS = [
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
] as const satisfies readonly MuseumHallCatalog[];

export const DEFAULT_MUSEUM_HALL_ID: MuseumHallId = 'ancient-greek';

export function getMuseumHallCatalog(id: 'ancient-greek'): (typeof MUSEUM_HALLS)[0];
export function getMuseumHallCatalog(id: 'renaissance-reason-revolution'): (typeof MUSEUM_HALLS)[1];
export function getMuseumHallCatalog(id: 'modernity-freedom-critique'): (typeof MUSEUM_HALLS)[2];
export function getMuseumHallCatalog(id: MuseumHallId): (typeof MUSEUM_HALLS)[number];
export function getMuseumHallCatalog(id: string): MuseumHallCatalog | undefined;
export function getMuseumHallCatalog(id: string): MuseumHallCatalog | undefined {
  return MUSEUM_HALLS.find((hall) => hall.id === id);
}

export const isMuseumHallId = (id: string | undefined): id is MuseumHallId =>
  Boolean(id && getMuseumHallCatalog(id));

export const getMuseumExhibitCatalog = (
  hallId: string,
  exhibitId: string,
): MuseumExhibitCatalog | undefined =>
  getMuseumHallCatalog(hallId)?.exhibits.find((exhibit) => exhibit.id === exhibitId);

export const isMuseumExhibitId = (
  hallId: string,
  exhibitId: string | undefined,
): exhibitId is MuseumExhibitId => Boolean(exhibitId && getMuseumExhibitCatalog(hallId, exhibitId));
