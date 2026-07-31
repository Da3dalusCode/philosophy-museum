import {
  ARTICLE_PROSE_WORD_MINIMUM,
  articleParagraphText,
  countArticleProseWords,
  legacyArticleDepthTargetIds,
} from './articleDepthPolicy.mjs';
import {loadAppData} from './loadAppData.mjs';

const routeKey = (route) => {
  if (route?.kind === 'philosopher') return `philosopher:${route.philosopherId}`;
  if (route?.kind === 'branch') return `philosophy:${route.branchId}`;
  return undefined;
};

const routeTargetId = (route) =>
  route?.kind === 'philosopher' ? route.philosopherId
    : route?.kind === 'branch' ? route.branchId
      : undefined;

const canonicalKey = (record) => `${record.category}:${record.canonicalId}`;

const countSurfaceWords = (surface) => {
  const prose = [
    surface.lead,
    ...(surface.sections ?? []).flatMap((section) =>
      section.paragraphs ?? (section.paragraph ? [section.paragraph] : [])),
    ...Object.values(surface.objectInterpretations ?? {}),
  ].filter(Boolean).join(' ');
  return (prose.match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu) ?? []).length;
};

export const buildArticleDepthInventory = async () => {
  const {
    canonicalArticles,
    museumInterpretations,
    museumSupplementalExhibits,
  } = await loadAppData();
  const integrityIssues = [];
  const byCanonicalKey = new Map();
  const byVisitorEntryPoint = new Map();
  const canonicalIdOccurrences = new Map();

  for (const record of canonicalArticles) {
    const key = canonicalKey(record);
    if (byCanonicalKey.has(key)) integrityIssues.push(`Duplicate canonical article mapping: ${key}`);
    byCanonicalKey.set(key, record);
    if (byVisitorEntryPoint.has(record.visitorEntryPoint)) {
      integrityIssues.push(`Conflicting canonical visitor entry point: ${record.visitorEntryPoint}`);
    }
    byVisitorEntryPoint.set(record.visitorEntryPoint, record);
    canonicalIdOccurrences.set(
      record.canonicalId,
      [...(canonicalIdOccurrences.get(record.canonicalId) ?? []), record.category],
    );
  }
  for (const [id, categories] of canonicalIdOccurrences) {
    if (categories.length > 1) {
      integrityIssues.push(`Canonical ID ${id} is reused across categories: ${categories.join(', ')}`);
    }
  }

  const primarySurfaceIds = new Set();
  const museumPrimarySurfaces = museumInterpretations.map((surface) => {
    if (primarySurfaceIds.has(surface.id)) integrityIssues.push(`Duplicate primary Museum interpretation ID: ${surface.id}`);
    primarySurfaceIds.add(surface.id);
    const targetKey = routeKey(surface.articleRoute);
    const target = targetKey ? byCanonicalKey.get(targetKey) : undefined;
    if (!targetKey) integrityIssues.push(`Primary Museum interpretation ${surface.id} has a non-article route.`);
    if (targetKey && !target) integrityIssues.push(`Primary Museum interpretation ${surface.id} points to missing ${targetKey}.`);
    if (target && target.canonicalId !== surface.id) {
      integrityIssues.push(`Primary Museum interpretation ${surface.id} conflicts with article target ${target.canonicalId}.`);
    }
    return {
      surfaceId: surface.id,
      title: surface.name,
      hallId: surface.hallId,
      visitorEntryPoint: `#/museum/${encodeURIComponent(surface.hallId)}/exhibits/${encodeURIComponent(surface.id)}`,
      surfaceKind: 'museum-primary-exhibit',
      surfaceWords: countSurfaceWords(surface),
      canonicalArticleKey: targetKey,
      canonicalArticleId: target?.canonicalId,
    };
  });

  const supplementalSurfaceIds = new Map();
  const museumSupplementalSurfaces = museumSupplementalExhibits.map((entry) => {
    const surface = entry.exhibit;
    const prior = supplementalSurfaceIds.get(surface.id);
    const currentTarget = routeKey(surface.articleRoute);
    if (prior && prior !== currentTarget) {
      integrityIssues.push(`Supplemental Museum ID ${surface.id} has conflicting article mappings.`);
    } else if (prior) {
      integrityIssues.push(`Duplicate supplemental Museum exhibit ID: ${surface.id}`);
    }
    supplementalSurfaceIds.set(surface.id, currentTarget);
    const target = currentTarget ? byCanonicalKey.get(currentTarget) : undefined;
    if (surface.articleRoute && !currentTarget) {
      integrityIssues.push(`Supplemental Museum exhibit ${surface.id} claims a non-article backing route.`);
    }
    if (currentTarget && !target) {
      integrityIssues.push(`Supplemental Museum exhibit ${surface.id} points to missing ${currentTarget}.`);
    }
    const declaredKind = surface.presentation?.entityKind ?? surface.entityKind;
    if (currentTarget && declaredKind) {
      const expectedKind = surface.articleRoute.kind === 'branch' ? 'branch' : 'philosopher';
      if (declaredKind !== expectedKind) {
        integrityIssues.push(
          `Supplemental Museum exhibit ${surface.id} declares ${declaredKind} but routes to ${expectedKind}.`,
        );
      }
    }
    return {
      surfaceId: surface.id,
      title: surface.displayName ?? surface.title ?? surface.shortTitle ?? surface.id,
      hallId: entry.hallId,
      visitorEntryPoint: `#/museum/${encodeURIComponent(entry.hallId)}/exhibits/${encodeURIComponent(surface.id)}`,
      surfaceKind: 'museum-supplemental-exhibit',
      workLabel: surface.workLabel,
      surfaceWords: countSurfaceWords(surface),
      claimsArticleBacking: Boolean(surface.articleRoute),
      articleActionLabel: surface.presentation?.articleActionLabel,
      canonicalArticleKey: currentTarget,
      canonicalArticleId: target?.canonicalId,
      canonicalArticleCategory: target?.category,
    };
  });

  const primaryReuseCounts = new Map();
  const supplementalReuseCounts = new Map();
  for (const surface of museumPrimarySurfaces) {
    if (surface.canonicalArticleKey) {
      primaryReuseCounts.set(surface.canonicalArticleKey, (primaryReuseCounts.get(surface.canonicalArticleKey) ?? 0) + 1);
    }
  }
  for (const surface of museumSupplementalSurfaces) {
    if (surface.canonicalArticleKey) {
      supplementalReuseCounts.set(
        surface.canonicalArticleKey,
        (supplementalReuseCounts.get(surface.canonicalArticleKey) ?? 0) + 1,
      );
    }
  }

  const articles = canonicalArticles.map((record) => {
    const words = countArticleProseWords(record.articleSections);
    const hasArticle = Boolean(record.articleSections?.length);
    const key = canonicalKey(record);
    return {
      canonicalId: record.canonicalId,
      title: record.title,
      visitorEntryPoint: record.visitorEntryPoint,
      contentCategory: record.category,
      substantiveWordCount: words,
      complianceStatus: !hasArticle ? 'missing' : words >= ARTICLE_PROSE_WORD_MINIMUM ? 'pass' : 'fail',
      legacyDepthAuditIncluded: legacyArticleDepthTargetIds.includes(record.canonicalId),
      reusedInMuseum: (primaryReuseCounts.get(key) ?? 0) + (supplementalReuseCounts.get(key) ?? 0) > 0,
      museumPrimaryReuseCount: primaryReuseCounts.get(key) ?? 0,
      museumSupplementalReuseCount: supplementalReuseCounts.get(key) ?? 0,
    };
  });
  const articleByKey = new Map(articles.map((record) => [`${record.contentCategory}:${record.canonicalId}`, record]));
  for (const surface of [...museumPrimarySurfaces, ...museumSupplementalSurfaces]) {
    const target = surface.canonicalArticleKey ? articleByKey.get(surface.canonicalArticleKey) : undefined;
    surface.canonicalArticleWordCount = target?.substantiveWordCount;
    surface.canonicalArticleComplianceStatus = target?.complianceStatus;
  }

  const rawArticleByKey = new Map(canonicalArticles.map((record) => [canonicalKey(record), record]));
  return {
    policy: {
      minimumSubstantiveArticleWords: ARTICLE_PROSE_WORD_MINIMUM,
      counted: 'Unicode word tokens in canonical article-section paragraph prose only',
      excluded: [
        'titles and headings', 'navigation and metadata', 'source and citation metadata',
        'reading-list metadata', 'image and accessibility metadata', 'duplicated rendering',
        'Museum plaques and other short supporting surfaces',
      ],
    },
    articles,
    museumPrimarySurfaces,
    museumSupplementalSurfaces,
    integrityIssues,
    rawArticleByKey,
  };
};

export const rawParagraphText = articleParagraphText;
export const articleRouteTargetId = routeTargetId;
