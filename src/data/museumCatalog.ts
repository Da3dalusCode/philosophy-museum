import type {MuseumAssetId} from './museum/museumAssetTypes';

export type MuseumHallId = 'ancient-greek' | 'medieval-worlds';
export type MuseumZoneId =
  | 'classical-foundations'
  | 'hellenistic-ways'
  | 'late-antiquity'
  | 'late-antique-inheritance'
  | 'arabic-islamic-worlds'
  | 'jewish-latin-scholastic';
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

const medievalZones = [
  {
    id: 'late-antique-inheritance',
    title: 'Late Antique Inheritance',
    period: '4th–6th centuries CE',
    description: 'Roman North Africa and Ostrogothic Italy transform classical philosophy through Christian scripture, grace, logic, providence, and new institutions of reading.',
  },
  {
    id: 'arabic-islamic-worlds',
    title: 'Arabic & Islamic Philosophical Worlds',
    period: '10th–12th centuries CE',
    description: 'Court, medical, legal, theological, and philosophical cultures argue over demonstration, prophecy, causation, and the reach of reason across Arabic-language and Islamicate intellectual networks.',
  },
  {
    id: 'jewish-latin-scholastic',
    title: 'Jewish & Latin Scholastic Conversations',
    period: '12th–14th centuries CE',
    description: 'Judeo-Arabic, Hebrew, Greek, Arabic, and Latin texts enter legal communities, religious orders, and universities where revelation, universals, law, and explanation are contested.',
  },
] as const satisfies readonly MuseumZoneCatalog[];

const medievalExhibits = [
  {id: 'augustine', entityKind: 'philosopher', entityId: 'augustine', displayName: 'Augustine', zoneId: 'late-antique-inheritance', question: 'How do memory, time, will, evil, and grace reshape the inward life?', principalAssetId: 'augustine-lateran', supportingAssetIds: ['augustine-city-of-god']},
  {id: 'boethius', entityKind: 'philosopher', entityId: 'boethius', displayName: 'Boethius', zoneId: 'late-antique-inheritance', question: 'Can freedom and happiness survive fortune, imprisonment, and providence?', principalAssetId: 'boethius-consolation-teaching', supportingAssetIds: ['boethius-arithmetic']},
  {id: 'avicenna', entityKind: 'philosopher', entityId: 'avicenna', displayName: 'Ibn Sina / Avicenna', zoneId: 'arabic-islamic-worlds', question: 'What distinguishes what a thing is from the fact that it exists?', principalAssetId: 'avicenna-canon', supportingAssetIds: ['avicenna-thevet-portrait']},
  {id: 'al-ghazali', entityKind: 'philosopher', entityId: 'al-ghazali', displayName: 'al-Ghazali', zoneId: 'arabic-islamic-worlds', question: 'Where does philosophical demonstration succeed—and where does it overreach?', principalAssetId: 'al-ghazali-asas-al-qiyas', supportingAssetIds: ['al-ghazali-faysal']},
  {id: 'averroes', entityKind: 'philosopher', entityId: 'averroes', displayName: 'Ibn Rushd / Averroes', zoneId: 'arabic-islamic-worlds', question: 'How can demonstration, law, and scriptural interpretation belong to one intellectual life?', principalAssetId: 'averroes-de-anima', supportingAssetIds: ['averroes-lithograph']},
  {id: 'maimonides', entityKind: 'philosopher', entityId: 'maimonides', displayName: 'Maimonides', zoneId: 'jewish-latin-scholastic', question: 'How can language about God guide without pretending to comprehend God?', principalAssetId: 'maimonides-mishnah-autograph', supportingAssetIds: ['maimonides-mishneh-torah']},
  {id: 'aquinas', entityKind: 'philosopher', entityId: 'aquinas', displayName: 'Thomas Aquinas', zoneId: 'jewish-latin-scholastic', question: 'How can created being, natural reason, and revealed theology form a disciplined synthesis?', principalAssetId: 'aquinas-summa', supportingAssetIds: ['aquinas-triumph']},
  {id: 'ockham', entityKind: 'philosopher', entityId: 'ockham', displayName: 'William of Ockham', zoneId: 'jewish-latin-scholastic', question: 'What explanatory commitments can logic remove without losing the world?', principalAssetId: 'ockham-logica-sketch', supportingAssetIds: ['ockham-sentences']},
] as const satisfies readonly MuseumExhibitCatalogShape[];

export type AncientGreekExhibitId = (typeof ancientExhibits)[number]['id'];
export type MedievalWorldsExhibitId = (typeof medievalExhibits)[number]['id'];
export type MuseumExhibitCatalog = (typeof ancientExhibits)[number] | (typeof medievalExhibits)[number];
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

export const MUSEUM_HALLS = [{
  id: 'ancient-greek',
  title: 'Ancient Greek & Hellenistic Gallery',
  galleryNumber: 'Gallery 01',
  period: '5th century BCE–6th century CE',
  description: 'Walk from the examined life of classical Athens through rival Hellenistic practices and into the metaphysical ascent of late antiquity.',
  sweep: ['Classical inquiry', 'Hellenistic ways of life', 'Late-antique ascent'],
  zones: ancientZones,
  exhibits: ancientExhibits,
  guidedOrder: ancientExhibits.map(({id}) => id),
}, {
  id: 'medieval-worlds',
  title: 'Medieval Worlds Gallery',
  galleryNumber: 'Gallery 02',
  period: '4th–14th centuries CE',
  description: 'Follow several connected intellectual worlds as manuscripts, translations, courts, religious communities, and universities transform ancient inheritances without erasing disagreement.',
  sweep: ['Late-antique inheritance', 'Arabic & Islamic worlds', 'Jewish & Latin scholastic thought'],
  zones: medievalZones,
  exhibits: medievalExhibits,
  guidedOrder: medievalExhibits.map(({id}) => id),
}] as const satisfies readonly MuseumHallCatalog[];

export const DEFAULT_MUSEUM_HALL_ID: MuseumHallId = 'ancient-greek';

export function getMuseumHallCatalog(id: 'ancient-greek'): (typeof MUSEUM_HALLS)[0];
export function getMuseumHallCatalog(id: 'medieval-worlds'): (typeof MUSEUM_HALLS)[1];
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
