import {branchById} from '../../data/branches';
import {philosopherById} from '../../data/philosophers';
import type {MuseumExhibitCatalog, MuseumExhibitId} from '../../data/museumCatalog';
import type {NavigableAppRoute} from '../../routing/routes';

export type MuseumExhibitContent = {
  id: MuseumExhibitId;
  displayName: string;
  dateLabel: string;
  entityType: string;
  introduction: string;
  centralQuestion: string;
  featuredIdea: string;
  whyItMatters: string;
  representativeWork: string;
  accent: string;
  articleRoute: NavigableAppRoute;
};

const branchConnective: Partial<Record<MuseumExhibitId, {
  featuredIdea: string;
  whyItMatters: string;
  representativeWork?: string;
}>> = {
  cynicism: {
    featuredIdea: 'Freedom through radical simplicity: test whether convention serves virtue or merely disguises dependence.',
    whyItMatters: 'Cynicism makes philosophy public and embodied, challenging status, comfort, and respectability as measures of a good life.',
    representativeWork: 'Diogenes Laertius, Lives of the Eminent Philosophers, Book VI',
  },
  epicureanism: {
    featuredIdea: 'Tranquility grows by distinguishing natural, necessary desires from the restless wants encouraged by fear and competition.',
    whyItMatters: 'Epicureanism offers a disciplined ethics of friendship, modest pleasure, and freedom from fear rather than a doctrine of excess.',
    representativeWork: 'Epicurus, Letter to Menoeceus',
  },
  stoicism: {
    featuredIdea: 'The discipline of control directs effort toward judgment and action while meeting outcomes without surrendering character.',
    whyItMatters: 'Stoicism connects personal steadiness to virtue, reason, and social responsibility—not mere emotional suppression.',
    representativeWork: 'Epictetus, Enchiridion',
  },
  skepticism: {
    featuredIdea: 'Suspension of judgment interrupts the rush from appearance to certainty while inquiry continues.',
    whyItMatters: 'Ancient Skepticism turns intellectual restraint into a practice for testing arguments and loosening dogmatic anxiety.',
    representativeWork: 'Sextus Empiricus, Outlines of Pyrrhonism',
  },
  neoplatonism: {
    featuredIdea: 'Reality unfolds from the One through Intellect and Soul, while philosophical practice traces a path of return.',
    whyItMatters: 'Neoplatonism became a major bridge between classical philosophy and later Islamic, Jewish, and Christian metaphysics.',
    representativeWork: 'Plotinus, Enneads',
  },
};

const yearLabel = (year: number): string => year < 0 ? `c. ${Math.abs(year)} BCE` : `c. ${year} CE`;

export const getMuseumExhibitContent = (exhibit: MuseumExhibitCatalog): MuseumExhibitContent => {
  if (exhibit.entityKind === 'philosopher') {
    const philosopher = philosopherById(exhibit.entityId);
    if (!philosopher) throw new Error(`Museum exhibit ${exhibit.id} references a missing philosopher.`);
    const detailedIdea = philosopher.majorIdeasDetailed?.[0];
    return {
      id: exhibit.id,
      displayName: philosopher.name,
      dateLabel: philosopher.dateDisplay ?? philosopher.lifespan,
      entityType: 'Philosopher',
      introduction: philosopher.shortBio ?? philosopher.beginnerExplanation,
      centralQuestion: philosopher.centralQuestions?.[0] ?? exhibit.question,
      featuredIdea: detailedIdea
        ? `${detailedIdea.name}: ${detailedIdea.explanation}`
        : philosopher.mainIdeas[0] ?? philosopher.contributionSummary,
      whyItMatters: detailedIdea?.whyItMatters ?? philosopher.contributionSummary,
      representativeWork: philosopher.keyWorksDetailed?.[0]?.title
        ?? philosopher.keyWorks[0]
        ?? philosopher.suggestedFirstReading,
      accent: philosopher.color,
      articleRoute: {kind: 'philosopher', philosopherId: philosopher.id},
    };
  }

  const branch = branchById(exhibit.entityId);
  if (!branch) throw new Error(`Museum exhibit ${exhibit.id} references a missing branch.`);
  const connective = branchConnective[exhibit.id];
  const concept = branch.keyConceptsDetailed?.[0];
  return {
    id: exhibit.id,
    displayName: branch.name,
    dateLabel: yearLabel(branch.roughStartYear),
    entityType: 'School / branch',
    introduction: branch.beginnerExplanation || branch.shortDefinition,
    centralQuestion: branch.coreQuestions[0] ?? exhibit.question,
    featuredIdea: connective?.featuredIdea
      ?? (concept ? `${concept.name}: ${concept.explanation}` : branch.keyConcepts[0]?.plainDefinition)
      ?? branch.shortDefinition,
    whyItMatters: connective?.whyItMatters ?? branch.whyItMatters,
    representativeWork: connective?.representativeWork
      ?? branch.majorWorks?.[0]?.title
      ?? branch.beginnerReadingPath?.[0]?.title
      ?? branch.suggestedReadingPath[0],
    accent: branch.color,
    articleRoute: {kind: 'branch', branchId: branch.id},
  };
};
