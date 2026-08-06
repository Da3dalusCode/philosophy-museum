import type {
  ArticleSection,
  Branch,
  CitationReference,
  EditorialSource,
  Philosopher,
} from '../../types/philosophy';
import {paragraph, structuredClaim} from './pilotHelpers';

export type ConnectedWorldsEvidence = {
  classification: CitationReference[];
  chronology: CitationReference[];
  concepts: CitationReference[];
  works: CitationReference[];
  relationships: CitationReference[];
  disputes: CitationReference[];
  reading: CitationReference[];
};

type SharedConfig = {
  sources: EditorialSource[];
  articleSections?: ArticleSection[];
  paragraphTextPatches?: Record<string, Record<number, string>>;
  sectionCitations: Record<string, CitationReference[]>;
  evidence: ConnectedWorldsEvidence;
  reviewNotePath: string;
  reviewLock: string;
  reviewedOn?: string;
};

export type ConnectedWorldsPhilosopherConfig = SharedConfig & {
  patch?: Omit<Partial<Philosopher>, 'id' | 'articleSections' | 'editorial'>;
};

export type ConnectedWorldsBranchConfig = SharedConfig & {
  patch?: Omit<Partial<Branch>, 'id' | 'articleSections' | 'editorial'>;
};

const serialize = (value: unknown): string =>
  typeof value === 'string' ? value : (JSON.stringify(value) ?? 'null');

const connectedWorldsContext: Record<string, string> = {
  'al-kindi': 'This profile treats the Kindian circle as a collaborative Arabic translation and research environment rather than the achievement of an isolated “first philosopher.” Al-Kindi’s own corpus is incomplete, dates are approximate, and later influence followed distinct routes through metaphysics, optics, mathematics, medicine, music, and cryptanalysis. Those qualifications make the surviving works more historically legible without diminishing their range.',
  'al-farabi': 'Al-Farabi’s career belongs to mobile learned networks linking Baghdad and Syria, while the biographical record remains sparse. His classifications of knowledge, accounts of demonstration and intellect, and political works should be read as connected inquiries rather than one closed blueprint. The attribution of the Harmonization remains disputed, and later Latin and Jewish receptions selected different parts of his corpus.',
  avicenna: 'Avicenna’s system joins logic, natural philosophy, psychology, medicine, and metaphysics while distinguishing their methods. His essence-and-existence vocabulary should not be retrofitted into every later textbook formula, and the Necessary Existent argument concerns modal and causal dependence rather than merely a first event. The Flying Person isolates immediate self-awareness; what it proves about immateriality remains disputed.',
  'al-ghazali': 'Al-Ghazali mastered philosophical methods before criticizing selected conclusions. The Incoherence organizes twenty discussions and treats three positions as religiously disqualifying; it does not reject logic, medicine, or every philosophical discipline. His treatment of causal regularity remains interpretively contested, and his enormous legal, theological, ethical, and devotional corpus resists the old story that one book ended philosophy in Islamic societies.',
  averroes: 'Averroes worked as jurist, physician, philosopher, and commentator, producing different levels of Aristotelian commentary for different purposes. The Decisive Treatise is a juridical argument about the place of demonstrative inquiry, not a declaration of “double truth.” His developing accounts of intellect and the sharply different Arabic, Hebrew, and Latin receptions must be distinguished rather than compressed into one Averroist doctrine.',
  'mulla-sadra': 'Mulla Sadra’s Safavid setting was later organized under the historiographic label “School of Isfahan,” not a self-declared institution. His account of the primacy and modulation of existence, substantial motion, knowledge, and resurrection transforms Avicennian, Illuminationist, theological, and mystical materials without dissolving their tensions. Dates, the Kahak retreat, and the interpretation of bodily resurrection remain qualified or disputed.',
  'saadia-gaon': 'Saadia’s project belongs to the Judeo-Arabic kalām environment and to scriptural, rabbinic, linguistic, legal, and communal controversies. His four sources of knowledge give reliable report an argued place beside sense, necessary reason, and inference. The rational versus heard-commandment distinction and his historically situated psychology should remain explicit, while parallels with Muʿtazilite theology are presented as selective and disputed.',
  'judah-halevi': 'Halevi’s Kuzari is a philosophically learned dialogue whose criticism of demonstration is selective rather than a rejection of reason. Its appeals to public signs and concurrent transmission, its difficult “Divine Thing,” and its account of prophecy remain contestable. Documents show him sailing from Alexandria in May 1141; arrival and death in the Land of Israel are a current inference, not directly documented fact.',
  maimonides: 'Maimonides wrote as jurist, communal leader, physician, and philosophical interpreter across displacement from Córdoba through Fez to Fustat. The Guide’s contradictions, negative theology, creation discussion, prophecy, providence, law, and account of perfection do not combine into a frictionless reconciliation. Al-Farabi and Avicenna are central philosophical interlocutors; direct dependence on Averroes should not be presumed.',
  augustine: 'Augustine’s arguments developed across a long career in Roman North Africa, including changes in his treatment of freedom and grace. His Platonist reading was transformative inheritance, not Neoplatonist school membership, and the exact “books of the Platonists” remain uncertain. The pear episode, two cities, and support for coercion require their specific textual and episcopal contexts rather than familiar one-line summaries.',
  boethius: 'Boethius was a late Roman author whose logical and educational writings became foundational for later Latin curricula; “first scholastic” is therefore a reception claim, not his historical identity. His dates and political prosecution remain partly uncertain. The Consolation denies that fortune’s goods constitute final happiness without making every external relation worthless, and its foreknowledge argument continues to invite objections. The theological tractates also differ in genre, and the attribution history of De fide catholica should not be hidden behind a single uniform-corpus label.',
  anselm: 'Anselm’s inquiry begins within believing, prayerful practice, yet the Monologion deliberately develops reason-alone arguments that a nonbeliever might assess. The Proslogion’s two stages, Gaunilo’s actual lost-island parody, and Anselm’s reply should remain distinct. Cur Deus Homo uses several theological and social vocabularies; reducing satisfaction to feudal honor or later penal substitution obscures the argument’s setting and contested reception.',
  aquinas: 'Aquinas’s work is both theological and philosophical, produced across Dominican study houses and the University of Paris in several argumentative genres. His transformations of Aristotle, Avicenna, Averroes, Maimonides, Christian scripture, and patristic authorities do not form an uncontested closed synthesis. The Five Ways, analogy, natural law, essence and being, cognition, and politics require their exact textual settings and continuing disputes.',
  'duns-scotus': 'Scotus developed rival accounts of metaphysics, cognition, individuation, modality, and freedom across Oxford, Paris, and Cologne, not merely a reaction to a settled Thomist synthesis. Univocity is a condition for valid concepts and inference, not a genus placing God and creatures on one scale. His corpus, chronology, formal distinction, and account of will require development-sensitive and text-specific presentation.',
  ockham: 'Ockham’s logic, semantics, metaphysics, cognition, theology, ethics, and political writings cannot be reduced to a razor slogan. The familiar maxim is not his wording, nominalism does not eliminate concepts or every relation, and intuitive cognition is not a global skeptical device. His Avignon investigation, flight, polemical setting, and several political genres must be distinguished rather than collapsed into one anti-papal doctrine.',
  'medieval-scholasticism': 'Scholasticism names changing practices of reading, commentary, question, objection, reply, and determination across schools, universities, religious studia, courts, and other settings. It was neither one doctrine nor all medieval thought. Translation and debate connected Latin authors with Islamic, Jewish, and Byzantine traditions through asymmetrical institutions and named agents; women’s exclusion from universities did not mean an absence of intellectual work outside them.',
  'philosophy-of-religion': 'A globally responsible philosophy of religion compares arguments, testimony, experience, practice, interpretation, suffering, authority, and forms of ultimacy without treating modern Christian theism as the unmarked template. Traditions contain internal disputes, and comparison needs bounded textual examples. Expanding the field’s canon and methods is an active proposal, while genealogical, feminist, postcolonial, naturalist, and skeptical critiques remain part of the inquiry rather than external interruptions.',
};

const reviewedArticleSections = (
  recordId: string,
  sections: ArticleSection[],
  sectionCitations: Record<string, CitationReference[]>,
  paragraphTextPatches: Record<string, Record<number, string>> = {},
): ArticleSection[] => sections.map((section, sectionIndex) => {
  const citations = sectionCitations[section.id] ?? sectionCitations['*'];
  if (!citations?.length) {
    throw new Error(`${recordId}/${section.id}: connected-worlds section lacks reviewed evidence.`);
  }
  return {
    ...section,
    paragraphs: [
      ...section.paragraphs.map((value, index) => paragraph(
      `${recordId}-${section.id}-${index + 1}`,
      paragraphTextPatches[section.id]?.[index]
        ?? (typeof value === 'string' ? value : value.text),
      citations,
      )),
      ...(sectionIndex === 0 && connectedWorldsContext[recordId]
        ? [paragraph(`${recordId}-${section.id}-connected-worlds-context`, connectedWorldsContext[recordId], citations)]
        : []),
    ],
  };
});

const review = (config: SharedConfig) => ({
  status: 'claim-reviewed' as const,
  reviewedOn: config.reviewedOn ?? '2026-08-05',
  method: 'Entity-complete review of every substantive article paragraph and claim-bearing structured field against inspected primary texts, independent specialist references, and stable textual locators. Dates, attributions, retrospective labels, transmission claims, school boundaries, and disputed interpretations received targeted review, followed by reconciliation against target-specific Museum and other authoritative surfaces.',
  reviewNotePath: config.reviewNotePath,
  lock: config.reviewLock,
  evidencePolicy: {
    minimumIndependentSecondarySources: 2,
    minimumIndependentSecondaryDomains: 2,
    requiredSourceTypes: ['primary-text' as const],
  },
});

const philosopherClaims = (record: Philosopher, evidence: ConnectedWorldsEvidence) => ({
  classification: structuredClaim(`${record.region} · ${record.tradition}`, evidence.classification),
  date: structuredClaim(record.dateDisplay ?? record.lifespan, evidence.chronology),
  'dating-note': structuredClaim(record.dateNote ?? 'The displayed lifespan uses conventional modern biographical dates.', evidence.chronology),
  'contribution-summary': structuredClaim(record.contributionSummary, evidence.concepts),
  'short-biography': structuredClaim(record.shortBio ?? record.lifeStory, evidence.chronology),
  'historical-context': structuredClaim(record.historicalContext, evidence.chronology),
  'central-problem': structuredClaim(record.centralQuestions?.[0] ?? record.contributionSummary, evidence.concepts),
  branches: structuredClaim(serialize({
    primary: record.primaryBranchIds,
    secondary: record.secondaryBranchIds,
    memberships: record.branchMemberships,
  }), evidence.relationships),
  'ideas-and-works': structuredClaim(serialize({ideas: record.mainIdeas, works: record.keyWorks}), evidence.works),
  biography: structuredClaim(serialize({
    lifeStory: record.lifeStory,
    extendedBio: record.extendedBio,
    lifeEvents: record.lifeEvents,
  }), evidence.chronology),
  explanation: structuredClaim(record.beginnerExplanation, evidence.concepts),
  influence: structuredClaim(serialize({
    received: record.influencesReceived,
    idsReceived: record.influencedByIds,
    later: record.influenceOnLaterThought,
    idsLater: record.influencedIds,
  }), evidence.relationships),
  'detailed-ideas': structuredClaim(serialize(record.majorIdeasDetailed), evidence.concepts),
  'detailed-works': structuredClaim(serialize(record.keyWorksDetailed), evidence.works),
  'development-and-disputes': structuredClaim(serialize({
    development: record.intellectualDevelopment,
    tensions: record.controversiesOrInterpretiveTensions,
    misunderstandings: record.commonMisunderstandings,
  }), evidence.disputes),
  'branch-contributions': structuredClaim(serialize(record.branchContributions), evidence.relationships),
  'reading-paths': structuredClaim(serialize({
    first: record.suggestedFirstReading,
    beginner: record.beginnerReadingPath,
    advanced: record.advancedReadingPath,
  }), evidence.reading),
});

const branchClaims = (record: Branch, evidence: ConnectedWorldsEvidence) => ({
  classification: structuredClaim(record.category, evidence.classification),
  'date-anchor': structuredClaim(`${record.roughStartYear}: ${record.originPeriod}`, evidence.chronology),
  'origin-story': structuredClaim(record.originStory ?? '', evidence.chronology),
  'short-definition': structuredClaim(record.shortDefinition, evidence.classification),
  purpose: structuredClaim(record.oneSentencePurpose, evidence.classification),
  'beginner-explanation': structuredClaim(record.beginnerExplanation, evidence.concepts),
  'core-questions': structuredClaim(serialize(record.coreQuestions), evidence.concepts),
  'historical-development': structuredClaim(serialize(record.historicalDevelopmentDetailed ?? record.historicalDevelopment), evidence.chronology),
  terminology: structuredClaim(serialize(record.keyConcepts), evidence.concepts),
  'detailed-concepts': structuredClaim(serialize(record.keyConceptsDetailed), evidence.concepts),
  classifications: structuredClaim(serialize(record.subBranches), evidence.classification),
  relationships: structuredClaim(serialize({
    related: record.relatedBranchIds,
    contrasting: record.contrastingBranchIds,
    rivals: record.rivalPositions,
  }), evidence.relationships),
  'major-figures': structuredClaim(serialize(record.majorFigures ?? record.majorPhilosopherIds), evidence.relationships),
  chronology: structuredClaim(serialize(record.timelineEventIds), evidence.chronology),
  works: structuredClaim(serialize(record.majorWorks), evidence.works),
  debates: structuredClaim(serialize({internal: record.internalDebates, tensions: record.internalTensions}), evidence.disputes),
  misunderstandings: structuredClaim(serialize(record.misconceptionsDetailed ?? record.commonMisunderstandings), evidence.disputes),
  applications: structuredClaim(serialize(record.modernRelevanceDetailed ?? record.modernExamples), evidence.concepts),
  'reading-path': structuredClaim(serialize({beginner: record.beginnerReadingPath, advanced: record.advancedReadingPath}), evidence.reading),
});

export const applyConnectedWorldsPhilosopherConfig = (
  record: Philosopher,
  config: ConnectedWorldsPhilosopherConfig | undefined,
): Philosopher => {
  if (!config) return record;
  if (!config.sources.length) throw new Error(`${record.id}: connected-worlds review has no sources.`);
  const patched: Philosopher = {...record, ...config.patch, sourceLinks: []};
  const articleSections = reviewedArticleSections(
    record.id,
    config.articleSections ?? patched.articleSections ?? [],
    config.sectionCitations,
    config.paragraphTextPatches,
  );
  const reviewed = {...patched, articleSections};
  return {
    ...reviewed,
    editorial: {
      sources: config.sources,
      structuredClaims: philosopherClaims(reviewed, config.evidence),
      review: review(config),
    },
  };
};

export const applyConnectedWorldsBranchConfig = (
  record: Branch,
  config: ConnectedWorldsBranchConfig | undefined,
): Branch => {
  if (!config) return record;
  if (!config.sources.length) throw new Error(`${record.id}: connected-worlds review has no sources.`);
  const patched: Branch = {...record, ...config.patch, sourceLinks: []};
  const articleSections = reviewedArticleSections(
    record.id,
    config.articleSections ?? patched.articleSections ?? [],
    config.sectionCitations,
    config.paragraphTextPatches,
  );
  const reviewed = {...patched, articleSections};
  return {
    ...reviewed,
    editorial: {
      sources: config.sources,
      structuredClaims: branchClaims(reviewed, config.evidence),
      review: review(config),
    },
  };
};
