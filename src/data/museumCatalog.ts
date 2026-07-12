export type MuseumHallId = 'ancient-greek';
export type MuseumExhibitId =
  | 'socrates'
  | 'plato'
  | 'aristotle'
  | 'cynicism'
  | 'epicureanism'
  | 'stoicism'
  | 'skepticism'
  | 'neoplatonism';
export type MuseumZoneId = 'classical-foundations' | 'hellenistic-ways' | 'late-antiquity';
export type MuseumExhibitKind = 'philosopher' | 'branch';

export type MuseumZoneCatalog = {
  id: MuseumZoneId;
  title: string;
  period: string;
  description: string;
};

export type MuseumExhibitCatalog = {
  id: MuseumExhibitId;
  entityKind: MuseumExhibitKind;
  entityId: string;
  displayName: string;
  zoneId: MuseumZoneId;
  question: string;
};

export type MuseumHallCatalog = {
  id: MuseumHallId;
  title: string;
  description: string;
  zones: readonly MuseumZoneCatalog[];
  exhibits: readonly MuseumExhibitCatalog[];
  guidedOrder: readonly MuseumExhibitId[];
};

const zones = [
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

const exhibits = [
  {id: 'socrates', entityKind: 'philosopher', entityId: 'socrates', displayName: 'Socrates', zoneId: 'classical-foundations', question: 'What does an examined life demand of us?'},
  {id: 'plato', entityKind: 'philosopher', entityId: 'plato', displayName: 'Plato', zoneId: 'classical-foundations', question: 'What is more real than the appearances around us?'},
  {id: 'aristotle', entityKind: 'philosopher', entityId: 'aristotle', displayName: 'Aristotle', zoneId: 'classical-foundations', question: 'How do causes, purposes, and habits make a life intelligible?'},
  {id: 'cynicism', entityKind: 'branch', entityId: 'cynicism', displayName: 'Cynicism', zoneId: 'hellenistic-ways', question: 'How much convention must we shed to live freely?'},
  {id: 'epicureanism', entityKind: 'branch', entityId: 'epicureanism', displayName: 'Epicureanism', zoneId: 'hellenistic-ways', question: 'Which desires lead to durable tranquility?'},
  {id: 'stoicism', entityKind: 'branch', entityId: 'stoicism', displayName: 'Stoicism', zoneId: 'hellenistic-ways', question: 'What remains in our power when fortune changes?'},
  {id: 'skepticism', entityKind: 'branch', entityId: 'skepticism', displayName: 'Skepticism', zoneId: 'hellenistic-ways', question: 'Can suspending judgment loosen the grip of anxiety?'},
  {id: 'neoplatonism', entityKind: 'branch', entityId: 'neoplatonism', displayName: 'Neoplatonism', zoneId: 'late-antiquity', question: 'How can the many flow from—and return toward—the One?'},
] as const satisfies readonly MuseumExhibitCatalog[];

export const MUSEUM_HALLS = [{
  id: 'ancient-greek',
  title: 'Ancient Greek & Hellenistic Gallery',
  description: 'Walk from the examined life of classical Athens through rival Hellenistic practices and into the metaphysical ascent of late antiquity.',
  zones,
  exhibits,
  guidedOrder: exhibits.map(({id}) => id),
}] as const satisfies readonly MuseumHallCatalog[];

export const DEFAULT_MUSEUM_HALL_ID: MuseumHallId = 'ancient-greek';

export const getMuseumHallCatalog = (id: string): MuseumHallCatalog | undefined =>
  MUSEUM_HALLS.find((hall) => hall.id === id);

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
