import type {
  ArticleSection,
  CitationReference,
  EditorialSource,
  Philosopher,
} from '../../types/philosophy';
import {paragraph as p, structuredClaim as claim} from './pilotHelpers';

export type ModernClusterEvidence = {
  life: CitationReference[];
  ideas: CitationReference[];
  works: CitationReference[];
  influence: CitationReference[];
  disputes: CitationReference[];
  reading: CitationReference[];
};

export type ModernClusterEditorialConfig = {
  sources: EditorialSource[];
  articleSections?: ArticleSection[];
  sectionCitations: Record<string, CitationReference[]>;
  evidence: ModernClusterEvidence;
  patch: Omit<Partial<Philosopher>, 'id' | 'articleSections' | 'editorial'>;
  reviewNotePath: string;
  reviewLock: string;
  reviewedOn?: string;
};

const serialize = (value: unknown): string =>
  typeof value === 'string' ? value : (JSON.stringify(value) ?? 'null');

const structuredClaims = (record: Philosopher, evidence: ModernClusterEvidence) => ({
  classification: claim(`${record.region} · ${record.tradition}`, evidence.life),
  date: claim(record.dateDisplay ?? record.lifespan, evidence.life),
  'dating-note': claim(record.dateNote ?? 'The displayed lifespan uses secure modern biographical dates.', evidence.life),
  'contribution-summary': claim(record.contributionSummary, evidence.ideas),
  'short-biography': claim(record.shortBio ?? record.lifeStory, evidence.life),
  'historical-context': claim(record.historicalContext, evidence.life),
  'central-problem': claim(record.centralQuestions?.[0] ?? record.contributionSummary, evidence.ideas),
  branches: claim(serialize({
    primary: record.primaryBranchIds,
    secondary: record.secondaryBranchIds,
    memberships: record.branchMemberships,
  }), evidence.influence),
  'ideas-and-works': claim(serialize({ideas: record.mainIdeas, works: record.keyWorks}), evidence.works),
  biography: claim(serialize({
    lifeStory: record.lifeStory,
    extendedBio: record.extendedBio,
    lifeEvents: record.lifeEvents,
  }), evidence.life),
  explanation: claim(record.beginnerExplanation, evidence.ideas),
  influence: claim(serialize({
    received: record.influencesReceived,
    idsReceived: record.influencedByIds,
    later: record.influenceOnLaterThought,
    idsLater: record.influencedIds,
  }), evidence.influence),
  'detailed-ideas': claim(serialize(record.majorIdeasDetailed), evidence.ideas),
  'detailed-works': claim(serialize(record.keyWorksDetailed), evidence.works),
  'development-and-disputes': claim(serialize({
    development: record.intellectualDevelopment,
    tensions: record.controversiesOrInterpretiveTensions,
    misunderstandings: record.commonMisunderstandings,
  }), evidence.disputes),
  'branch-contributions': claim(serialize(record.branchContributions), evidence.influence),
  'reading-paths': claim(serialize({
    first: record.suggestedFirstReading,
    beginner: record.beginnerReadingPath,
    advanced: record.advancedReadingPath,
  }), evidence.reading),
});

export const applyModernClusterEditorialConfig = (
  record: Philosopher,
  config: ModernClusterEditorialConfig | undefined,
): Philosopher => {
  if (!config) return record;
  if (config.sources.length < 4 || config.sources.length > 8) {
    throw new Error(`${record.id}: modern-cluster claim review requires 4–8 core sources.`);
  }

  const patched: Philosopher = {...record, ...config.patch, sourceLinks: []};
  const articleSections = (config.articleSections ?? patched.articleSections ?? []).map((section) => {
    const citations = config.sectionCitations[section.id];
    if (!citations?.length) {
      throw new Error(`${record.id}/${section.id}: modern-cluster section lacks reviewed evidence.`);
    }
    return {
      ...section,
      paragraphs: section.paragraphs.map((paragraph, index) => p(
        `${record.id}-${section.id}-${index + 1}`,
        typeof paragraph === 'string' ? paragraph : paragraph.text,
        citations,
      )),
    };
  });

  const reviewed: Philosopher = {...patched, articleSections};
  return {
    ...reviewed,
    editorial: {
      sources: config.sources,
      structuredClaims: structuredClaims(reviewed, config.evidence),
      review: {
        status: 'claim-reviewed',
        reviewedOn: config.reviewedOn ?? '2026-08-02',
        method: 'Full page-level claim review of every article paragraph and claim-bearing structured field against named primary works, independent specialist references, critical-edition or publisher records, and explicit interpretive disputes; quotations, dates, attributions, priority language, politically or interpretively sensitive claims, and locator/source roles received a targeted final check before lock generation.',
        reviewNotePath: config.reviewNotePath,
        lock: config.reviewLock,
        evidencePolicy: {
          minimumIndependentSecondarySources: 2,
          minimumIndependentSecondaryDomains: 2,
          requiredSourceTypes: ['primary-text'],
        },
      },
    },
  };
};
