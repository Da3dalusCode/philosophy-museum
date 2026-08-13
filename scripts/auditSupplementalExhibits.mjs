import {createHash} from 'node:crypto';
import {readdir, readFile} from 'node:fs/promises';
import {ARTICLE_PROSE_WORD_MINIMUM, articleWordTokens, countArticleProseWords} from './articleDepthPolicy.mjs';
import {
  generatedArtifactMatches,
  writeGeneratedArtifactIfChanged,
} from './generatedArtifactIntegrity.mjs';
import {loadAppData} from './loadAppData.mjs';

const LEDGER_JSON_URL = new URL('../docs/editorial/supplemental-exhibit-review-ledger.json', import.meta.url);
const LEDGER_MARKDOWN_URL = new URL('../docs/editorial/supplemental-exhibit-review-ledger.md', import.meta.url);
const SCRIPTS_URL = new URL('./', import.meta.url);
const PUBLIC_URL = new URL('../public/', import.meta.url);
const PANEL_RENDERER_URL = new URL('../src/components/MuseumGallery/MuseumSupplementalInterpretationPanel.tsx', import.meta.url);
const MUSEUM_PAGE_URL = new URL('../src/components/MuseumGallery/MuseumPage.tsx', import.meta.url);
const MUSEUM_CSS_URL = new URL('../src/components/MuseumGallery/museum.css', import.meta.url);
const AUTHORED_STATUSES = ['unreviewed', 'reconciled', 'standard-compliant'];
const EFFECTIVE_STATUSES = [...AUTHORED_STATUSES, 'out-of-date'];
const RELATIONSHIP_STATUSES = ['matched', 'unmatched', 'ambiguous'];
const GENERIC_GUIDE_HEADING = /^(?:visitor guide|how to read(?: this exhibit)?|key ideas|historical cautions|interpretive anchors|keep in view)$/iu;
const INTERNAL_COPY = /Visitor Guide|How to read this exhibit|previously displayed|change-?log|\baudit(?:ed|ing)?\b|\b(?:modal|panel|room) object\b|generated (?:hall|image|illustration)/iu;
const HALL_EXCEPTIONS = {
  'mediterranean-beginnings-classical': {
    distinctPanelAndPhysicalAssets: new Set(['plato-republic']),
    requiredDisplayNames: new Map([['greek-philosophy-reception', 'The School of Athens']]),
  },
};

const args = process.argv.slice(2);
let requestedHall;
let requestedGallery;
let requireComplete = false;
let write = false;
for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === '--write') write = true;
  else if (arg === '--require-complete') requireComplete = true;
  else if (arg === '--hall') {
    requestedHall = args[index + 1];
    if (!requestedHall) throw new Error('--hall requires a canonical Museum hall ID');
    index += 1;
  } else if (arg === '--gallery') {
    requestedGallery = args[index + 1];
    if (!requestedGallery) throw new Error('--gallery requires a public gallery number');
    index += 1;
  } else throw new Error(`Unknown supplemental-audit option: ${arg}`);
}
if (requestedHall && requestedGallery) throw new Error('Use either --hall or --gallery, not both.');

const countWords = (value = '') => articleWordTokens(String(value)).length;
const normalizeCopy = (value = '') => String(value).toLocaleLowerCase('en-US').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const aspectRatio = (variant) => variant?.width && variant?.height ? variant.width / variant.height : null;
const aspectMatches = (left, right, tolerance = .002) => left !== null && right !== null && Math.abs(left - right) <= tolerance;
const dimensions = (variant) => variant ? {width: variant.width, height: variant.height} : null;
const escapeCell = (value) => String(value ?? '—').replaceAll('|', '\\|').replaceAll('\n', ' ');
const countsBy = (entries, key, values) => Object.fromEntries(values.map((value) => [
  value,
  entries.filter((entry) => entry[key] === value).length,
]));
const validHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};
const routeTarget = (route) => route?.kind === 'philosopher'
  ? {category: 'philosopher', id: route.philosopherId}
  : route?.kind === 'branch'
    ? {category: 'philosophy', id: route.branchId}
    : null;

const data = await loadAppData();
const [panelRendererSource, museumPageSource, museumCssSource, manifestNames] = await Promise.all([
  readFile(PANEL_RENDERER_URL, 'utf8'),
  readFile(MUSEUM_PAGE_URL, 'utf8'),
  readFile(MUSEUM_CSS_URL, 'utf8'),
  readdir(SCRIPTS_URL),
]);

if (requestedGallery) {
  const numeric = Number(String(requestedGallery).replace(/\D/gu, ''));
  if (!Number.isInteger(numeric) || numeric < 1 || numeric > data.museumPublicRouteHallIds.length) {
    throw new Error(`Unknown public gallery number: ${requestedGallery}`);
  }
  requestedHall = data.museumPublicRouteHallIds[numeric - 1];
}
if (requestedHall && !data.museumPublicRouteHallIds.includes(requestedHall)) {
  throw new Error(`Unknown canonical Museum hall ID: ${requestedHall}`);
}

const manifestFiles = manifestNames.filter((name) => name.endsWith('AssetManifest.json')).sort();
const manifestEntries = await Promise.all(manifestFiles.map(async (name) => ({
  name,
  assets: JSON.parse(await readFile(new URL(name, SCRIPTS_URL), 'utf8')).assets ?? {},
})));
const manifestsByAssetId = new Map();
for (const {name, assets} of manifestEntries) {
  for (const [assetId, record] of Object.entries(assets)) {
    manifestsByAssetId.set(assetId, [...(manifestsByAssetId.get(assetId) ?? []), {name, record}]);
  }
}

const assetsById = new Map(data.museumAssets.map((asset) => [asset.id, asset]));
const articlesByKey = new Map(data.canonicalArticles.map((article) => [`${article.category}:${article.canonicalId}`, article]));
const guidedGlobalIndex = new Map(data.museumBuildingGuidedStops.map((stop, index) => [
  `${stop.hallId}:${stop.exhibitId}`,
  index + 1,
]));
const guidedHallIndexes = new Map();
for (const hallId of data.museumPublicRouteHallIds) {
  data.museumBuildingGuidedStops.filter((stop) => stop.hallId === hallId).forEach((stop, index) => {
    guidedHallIndexes.set(`${hallId}:${stop.exhibitId}`, index + 1);
  });
}
const supplementalHallIndexes = new Map();
for (const hallId of data.museumPublicRouteHallIds) {
  data.museumBuildingGuidedStops.filter((stop) => stop.hallId === hallId && stop.kind === 'supplemental')
    .forEach((stop, index) => supplementalHallIndexes.set(`${hallId}:${stop.exhibitId}`, index + 1));
}

const rendererContract = {
  structuredSidebar: /exhibit\.visitorGuide[\s\S]*museum-visitor-guide/u.test(panelRendererSource),
  principalAssetPreview: /getMuseumAsset\(exhibit\.panelAssetId\)[\s\S]*<MuseumAssetImage asset=\{asset\}/u.test(panelRendererSource),
  fullArticleCta: /href\(exhibit\.articleRoute\)[\s\S]*presentation\.articleActionLabel/u.test(panelRendererSource),
  directRoutePanel: /supplementalExhibit && <MuseumSupplementalInterpretationPanel/u.test(museumPageSource),
  nonUniformScalingProtected: /\.museum-primary-reference \.museum-object-hero img\{width:auto;max-width:100%;height:auto;[\s\S]*?object-fit:contain/u.test(museumCssSource),
};

const fileVerificationCache = new Map();
const verifyInstalledAsset = (asset, manifestMatch) => {
  if (!asset || !manifestMatch) return Promise.resolve({status: 'not-verifiable', variants: {}});
  if (fileVerificationCache.has(asset.id)) return fileVerificationCache.get(asset.id);
  const promise = (async () => {
    const variants = {};
    for (const kind of ['scene', 'panel']) {
      const runtimeVariant = asset.variants?.[kind];
      const manifestVariant = manifestMatch.record?.[kind];
      if (!runtimeVariant?.path || !manifestVariant) {
        variants[kind] = {status: 'missing-record'};
        continue;
      }
      try {
        const relativePath = runtimeVariant.path.replace(/^\//u, '');
        const bytes = await readFile(new URL(relativePath, PUBLIC_URL));
        const sha256 = createHash('sha256').update(bytes).digest('hex');
        variants[kind] = {
          status: bytes.length === manifestVariant.bytes
            && sha256 === manifestVariant.sha256
            && runtimeVariant.width === manifestVariant.width
            && runtimeVariant.height === manifestVariant.height
            ? 'verified'
            : 'mismatch',
          bytes: bytes.length,
          sha256,
        };
      } catch {
        variants[kind] = {status: 'missing-file'};
      }
    }
    return {
      status: Object.values(variants).every(({status}) => status === 'verified') ? 'verified' : 'failed',
      variants,
    };
  })();
  fileVerificationCache.set(asset.id, promise);
  return promise;
};

const assetLedger = async (assetId, verifyFiles) => {
  const asset = assetsById.get(assetId);
  if (!asset) return {id: assetId ?? null, status: 'missing'};
  const candidates = manifestsByAssetId.get(asset.id) ?? [];
  const exactCandidates = candidates.filter(({record}) => record.sourcePageUrl === asset.sourcePageUrl);
  const manifestMatch = exactCandidates[0] ?? candidates[0];
  const installedFile = verifyFiles ? await verifyInstalledAsset(asset, manifestMatch) : {status: 'not-checked', variants: {}};
  return {
    id: asset.id,
    status: 'registered',
    identity: {
      title: asset.title,
      entityKind: asset.entityKind,
      entityId: asset.entityId,
      role: asset.role,
      mediaKind: asset.mediaKind,
      creator: asset.creator,
      objectDate: asset.objectDate,
      imageCreator: asset.imageCreator ?? null,
      institution: asset.institution,
      likenessStatus: asset.likenessStatus,
    },
    provenance: {
      sourcePageUrl: asset.sourcePageUrl,
      objectPageUrl: asset.objectPageUrl ?? null,
      historicalNote: asset.historicalNote,
      derivativeNotice: asset.derivativeNotice ?? null,
      manifestFiles: candidates.map(({name}) => name),
      exactSourceRecord: exactCandidates.length > 0,
    },
    rights: {
      license: asset.license,
      licenseUrl: asset.licenseUrl ?? null,
      rightsKind: asset.rightsKind,
      attribution: asset.attribution,
    },
    accessibility: {caption: asset.caption, alt: asset.alt},
    dimensions: {scene: dimensions(asset.variants?.scene), panel: dimensions(asset.variants?.panel)},
    installedFile,
  };
};

const visualEvidence = (value) => value === undefined || value === null
  ? {status: 'not-recorded', evidence: null}
  : {status: 'recorded', evidence: value};

const rawEntries = await Promise.all(data.museumSupplementalExhibits.map(async ({hallId, exhibit, layout}) => {
  const galleryIndex = data.museumPublicRouteHallIds.indexOf(hallId);
  const hall = data.museumCanonicalProgram.find(({id}) => id === hallId);
  const room = hall?.rooms.find(({id}) => id === layout.zoneId);
  const target = routeTarget(exhibit.articleRoute);
  const candidates = target ? data.canonicalArticles.filter((article) =>
    article.category === target.category && article.canonicalId === target.id) : [];
  const article = candidates.length === 1 ? candidates[0] : null;
  const relationshipStatus = !target || candidates.length === 0 ? 'unmatched' : candidates.length === 1 ? 'matched' : 'ambiguous';
  const authoredArticleStatus = article ? data.reviewLock.authoredEditorialStatus(article.editorialRecord) : null;
  const effectiveArticleStatus = article ? data.reviewLock.effectiveEditorialStatus(article.editorialRecord) : null;
  const authoredStatus = data.exhibitReview.authoredMuseumExhibitReviewStatus(exhibit);
  const effectiveStatus = article
    ? data.exhibitReview.effectiveMuseumExhibitReviewStatus(exhibit, article.editorialRecord)
    : authoredStatus === 'unreviewed' ? 'unreviewed' : 'out-of-date';
  const standardAuthored = authoredStatus === 'standard-compliant';
  const sourceIds = exhibit.sources.map(({id}) => id).filter(Boolean);
  const sourceIdSet = new Set(sourceIds);
  const paragraphs = exhibit.sections.flatMap((section) => section.paragraphs.map((text) => ({
    text,
    sourceIds: section.sourceIds ?? [],
  })));
  const sidebarSections = exhibit.visitorGuide ?? [];
  const sidebarRows = sidebarSections.flatMap((section) => section.items.map((item) => ({
    heading: section.heading,
    ...item,
  })));
  const mainWordCount = countWords(paragraphs.map(({text}) => text).join(' '));
  const principalAsset = assetsById.get(exhibit.panelAssetId);
  const physicalAsset = assetsById.get(layout.assetId);
  const principal = await assetLedger(exhibit.panelAssetId, standardAuthored);
  const physical = exhibit.panelAssetId === layout.assetId
    ? principal
    : await assetLedger(layout.assetId, standardAuthored);
  const articleWords = article ? countArticleProseWords(article.articleSections) : null;
  const directRoute = {kind: 'museum', hallId, exhibitId: exhibit.id};
  const directHash = data.hashRouter.serializeHashRoute(directRoute);
  const parsedDirectRoute = data.hashRouter.parseHashRoute(directHash);
  const expectedArticleHash = exhibit.articleRoute ? data.hashRouter.serializeHashRoute(exhibit.articleRoute) : null;
  const expectedCtaLabel = article ? `Read the full sourced ${article.title} article` : null;
  const mountRatio = layout.mediaMount?.width && layout.mediaMount?.height
    ? layout.mediaMount.width / layout.mediaMount.height
    : null;
  const principalSceneRatio = aspectRatio(principalAsset?.variants?.scene);
  const principalPanelRatio = aspectRatio(principalAsset?.variants?.panel);
  const physicalSceneRatio = aspectRatio(physicalAsset?.variants?.scene);
  const physicalPanelRatio = aspectRatio(physicalAsset?.variants?.panel);
  const visitorCopy = [
    exhibit.displayName,
    exhibit.objectInterpretation,
    ...paragraphs.map(({text}) => text),
    ...sidebarSections.flatMap(({heading, items}) => [heading, ...items.flatMap(({label, description}) => [label, description])]),
  ].filter(Boolean).join(' ');
  const issues = [];

  if (standardAuthored) {
    if (relationshipStatus !== 'matched') issues.push(`canonical article relationship is ${relationshipStatus}`);
    if (effectiveArticleStatus !== 'claim-reviewed') issues.push(`canonical article review status is ${effectiveArticleStatus ?? 'missing'}`);
    if (articleWords === null || articleWords < ARTICLE_PROSE_WORD_MINIMUM) {
      issues.push(`canonical article depth is ${articleWords ?? 'missing'} words`);
    }
    if (effectiveStatus !== 'standard-compliant') issues.push(`effective exhibit review status is ${effectiveStatus}`);
    if (!exhibit.review?.reviewedOn || !/^\d{4}-\d{2}-\d{2}$/u.test(exhibit.review.reviewedOn)) issues.push('missing valid exhibit review date');
    if (!exhibit.review?.method?.trim()) issues.push('missing exhibit review method');
    if (!exhibit.review?.resolution?.trim()) issues.push('missing explicit review resolution');
    if (exhibit.presentation?.exhibitLayout !== 'object-led') issues.push('presentation is not object-led');
    if (paragraphs.length !== 3 || exhibit.sections.some(({heading}) => heading.trim())) {
      issues.push(`main interpretation is not three untitled prose paragraphs (${paragraphs.length} paragraphs)`);
    }
    if (mainWordCount < 280) issues.push(`main interpretation has ${mainWordCount} words`);
    if (new Set(paragraphs.map(({text}) => normalizeCopy(text))).size !== paragraphs.length) issues.push('main interpretation repeats a paragraph');
    if (sidebarSections.length < 1 || sidebarSections.length > 3) issues.push(`sidebar has ${sidebarSections.length} sections`);
    if (sidebarRows.length < 2 || sidebarRows.length > 6) issues.push(`sidebar has ${sidebarRows.length} rows`);
    for (const section of sidebarSections) {
      if (!section.heading.trim() || GENERIC_GUIDE_HEADING.test(section.heading.trim())) issues.push(`generic sidebar heading: ${section.heading || '(blank)'}`);
      if (section.items.length < 1 || section.items.length > 3) issues.push(`${section.heading || '(blank)'} has ${section.items.length} rows`);
      for (const item of section.items) {
        if (!item.label.trim() || !item.description.trim()) issues.push(`${section.heading || '(blank)'} has an empty label or explanation`);
        if (countWords(item.description) > 45) issues.push(`${section.heading}/${item.label} is not concise (${countWords(item.description)} words)`);
      }
    }
    if (INTERNAL_COPY.test(visitorCopy)) issues.push('visitor-facing copy retains generic, internal, or change-log language');
    if (!exhibit.objectInterpretation?.trim()) issues.push('missing object interpretation');
    if (!exhibit.wallPlaque?.title?.trim() && !exhibit.shortTitle?.trim()) issues.push('missing factual wall-plaque title');
    if (!exhibit.wallPlaque?.invitation?.trim()) issues.push('missing wall-plaque invitation');
    if (!exhibit.articleRoute || expectedArticleHash !== article?.visitorEntryPoint) issues.push('full-article route does not match the canonical article');
    if (exhibit.presentation?.articleActionLabel !== expectedCtaLabel) issues.push('full-article CTA does not follow the reviewed convention');
    if (!rendererContract.fullArticleCta) issues.push('supplemental renderer no longer renders the full-article CTA');
    if (!rendererContract.directRoutePanel || parsedDirectRoute.route.kind !== 'museum'
      || parsedDirectRoute.route.hallId !== hallId || parsedDirectRoute.route.exhibitId !== exhibit.id
      || parsedDirectRoute.canonicalHash !== directHash) issues.push('direct exhibit route does not resolve canonically');
    if (!rendererContract.principalAssetPreview) issues.push('detail panel no longer renders the principal object preview');
    if (!rendererContract.structuredSidebar) issues.push('detail panel no longer renders structured sidebar sections');
    if (!rendererContract.nonUniformScalingProtected) issues.push('object preview is not protected from non-uniform scaling');
    if (!guidedGlobalIndex.has(`${hallId}:${exhibit.id}`)) issues.push('supplemental is absent from the authoritative walking order');
    if (sourceIds.length !== exhibit.sources.length || sourceIdSet.size !== sourceIds.length) issues.push('interpretation source IDs are missing or duplicated');
    for (const source of exhibit.sources) {
      if (!source.id?.trim() || !source.label?.trim() || !source.kind || !validHttpsUrl(source.url)) {
        issues.push(`interpretation source ${source.id || '(missing)'} is incomplete or invalid`);
      }
    }
    for (const [index, paragraph] of paragraphs.entries()) {
      if (!paragraph.sourceIds.length) issues.push(`paragraph ${index + 1} has no source mapping`);
      for (const id of paragraph.sourceIds) if (!sourceIdSet.has(id)) issues.push(`paragraph ${index + 1} cites unknown source ${id}`);
    }
    for (const [index, row] of sidebarRows.entries()) {
      if (!row.sourceIds?.length) issues.push(`sidebar row ${index + 1} has no source mapping`);
      for (const id of row.sourceIds ?? []) if (!sourceIdSet.has(id)) issues.push(`sidebar row ${index + 1} cites unknown source ${id}`);
    }
    const duplicatedSidebarRows = new Set(sidebarRows.map(({label, description}) => `${normalizeCopy(label)}:${normalizeCopy(description)}`));
    if (duplicatedSidebarRows.size !== sidebarRows.length) issues.push('sidebar repeats a row');
    if (sidebarRows.some(({description}) => paragraphs.some(({text}) => normalizeCopy(text) === normalizeCopy(description)))) {
      issues.push('sidebar duplicates main interpretation prose');
    }
    for (const [role, assetRecord] of [['principal', principal], ['physical', physical]]) {
      if (assetRecord.status !== 'registered') {
        issues.push(`${role} asset is missing`);
        continue;
      }
      const requiredValues = [
        assetRecord.identity.title, assetRecord.identity.creator, assetRecord.identity.objectDate,
        assetRecord.identity.institution, assetRecord.provenance.sourcePageUrl,
        assetRecord.provenance.historicalNote, assetRecord.rights.license,
        assetRecord.rights.rightsKind, assetRecord.rights.attribution,
        assetRecord.accessibility.caption, assetRecord.accessibility.alt,
      ];
      if (requiredValues.some((value) => !String(value ?? '').trim())) issues.push(`${role} asset identity, provenance, rights, caption, or alt text is incomplete`);
      if (!validHttpsUrl(assetRecord.provenance.sourcePageUrl) || !assetRecord.provenance.exactSourceRecord) issues.push(`${role} asset lacks an exact acquisition source record`);
      if (!assetRecord.dimensions.scene || !assetRecord.dimensions.panel) issues.push(`${role} asset lacks scene or panel dimensions`);
      if (assetRecord.installedFile.status !== 'verified') issues.push(`${role} asset derivatives do not match their acquisition manifest`);
    }
    const distinctAllowed = HALL_EXCEPTIONS[hallId]?.distinctPanelAndPhysicalAssets?.has(exhibit.id);
    if (!distinctAllowed && (exhibit.panelAssetId !== exhibit.assetId || layout.assetId !== exhibit.assetId)) {
      issues.push('panel or physical asset differs from the reviewed exhibit asset');
    }
    const requiredDisplayName = HALL_EXCEPTIONS[hallId]?.requiredDisplayNames?.get(exhibit.id);
    if (requiredDisplayName && exhibit.displayName !== requiredDisplayName) issues.push(`display name must remain ${requiredDisplayName}`);
    if (!aspectMatches(principalSceneRatio, principalPanelRatio)) issues.push('principal scene and panel derivatives have inconsistent aspect ratios');
    if (!aspectMatches(physicalSceneRatio, physicalPanelRatio)) issues.push('physical scene and panel derivatives have inconsistent aspect ratios');
    if (!aspectMatches(mountRatio, physicalSceneRatio, .00001)) issues.push('3D media mount distorts the physical scene derivative');
  }

  return {
    gallery: {
      number: galleryIndex + 1,
      label: `Gallery ${String(galleryIndex + 1).padStart(2, '0')}`,
      hallId,
      hallTitle: hall?.title ?? null,
      roomId: layout.zoneId,
      roomTitle: room?.title ?? null,
      walkingOrder: {
        globalStop: guidedGlobalIndex.get(`${hallId}:${exhibit.id}`) ?? null,
        galleryStop: guidedHallIndexes.get(`${hallId}:${exhibit.id}`) ?? null,
        gallerySupplemental: supplementalHallIndexes.get(`${hallId}:${exhibit.id}`) ?? null,
      },
    },
    exhibit: {
      id: exhibit.id,
      title: exhibit.displayName,
      directRoute: directHash,
      directRouteStatus: parsedDirectRoute.canonicalHash === directHash ? 'canonical' : 'invalid',
    },
    canonicalArticle: {
      relationshipStatus,
      route: exhibit.articleRoute ?? null,
      category: article?.category ?? target?.category ?? null,
      id: article?.canonicalId ?? target?.id ?? null,
      title: article?.title ?? null,
      visitorEntryPoint: article?.visitorEntryPoint ?? null,
      candidateCount: candidates.length,
      authoredReviewStatus: authoredArticleStatus,
      effectiveReviewStatus: effectiveArticleStatus,
      reviewLockPresent: Boolean(article?.editorialRecord.editorial?.review.lock),
      reviewLockCurrent: authoredArticleStatus === 'claim-reviewed' ? effectiveArticleStatus === 'claim-reviewed' : null,
      depth: {
        substantiveWordCount: articleWords,
        requiredMinimum: ARTICLE_PROSE_WORD_MINIMUM,
        status: articleWords === null ? 'missing' : articleWords >= ARTICLE_PROSE_WORD_MINIMUM ? 'pass' : 'fail',
      },
    },
    exhibitReview: {
      authoredStatus,
      effectiveStatus,
      reviewedOn: exhibit.review?.reviewedOn ?? null,
      method: exhibit.review?.method ?? null,
      resolution: exhibit.review?.resolution ?? null,
      lockPresent: Boolean(exhibit.review?.lock),
      lockCurrent: authoredStatus === 'unreviewed' ? null : effectiveStatus !== 'out-of-date',
    },
    interpretation: {
      objectLed: exhibit.presentation?.exhibitLayout === 'object-led',
      objectInterpretation: exhibit.objectInterpretation ?? null,
      mainWordCount,
      paragraphCount: paragraphs.length,
      untitledParagraphs: exhibit.sections.every(({heading}) => !heading.trim()),
      sidebarSectionCount: sidebarSections.length,
      sidebarItemCount: sidebarRows.length,
      sidebarSections: sidebarSections.map(({heading, items}) => ({
        heading,
        items: items.map(({label, description, sourceIds: ids}) => ({label, description, sourceIds: ids})),
      })),
    },
    claimEvidence: {
      sources: exhibit.sources,
      paragraphMappings: paragraphs.map(({text, sourceIds: ids}, index) => ({
        paragraph: index + 1,
        wordCount: countWords(text),
        sourceIds: ids,
        valid: ids.length > 0 && ids.every((id) => sourceIdSet.has(id)),
      })),
      sidebarMappings: sidebarRows.map(({heading, label, description, sourceIds: ids}, index) => ({
        row: index + 1,
        heading,
        label,
        descriptionWordCount: countWords(description),
        sourceIds: ids,
        valid: ids?.length > 0 && ids.every((id) => sourceIdSet.has(id)),
      })),
    },
    assets: {principal, physical},
    aspectRatios: {
      principalSceneToPanel: {
        scene: principalSceneRatio,
        panel: principalPanelRatio,
        status: aspectMatches(principalSceneRatio, principalPanelRatio) ? 'match' : 'mismatch',
      },
      physicalSceneToPanel: {
        scene: physicalSceneRatio,
        panel: physicalPanelRatio,
        status: aspectMatches(physicalSceneRatio, physicalPanelRatio) ? 'match' : 'mismatch',
      },
      mediaMountToPhysicalScene: {
        mount: mountRatio,
        scene: physicalSceneRatio,
        status: aspectMatches(mountRatio, physicalSceneRatio, .00001) ? 'match' : 'mismatch',
      },
      nonUniformScalingProtected: rendererContract.nonUniformScalingProtected,
    },
    linking: {
      directExhibitRoute: {href: directHash, status: parsedDirectRoute.canonicalHash === directHash ? 'pass' : 'fail'},
      detailObjectPreview: {assetId: exhibit.panelAssetId, status: rendererContract.principalAssetPreview && principal.status === 'registered' ? 'pass' : 'fail'},
      fullArticleCta: {
        label: exhibit.presentation?.articleActionLabel ?? null,
        expectedLabel: expectedCtaLabel,
        href: expectedArticleHash,
        status: article && expectedArticleHash === article.visitorEntryPoint
          && exhibit.presentation?.articleActionLabel === expectedCtaLabel
          && rendererContract.fullArticleCta ? 'pass' : 'fail',
      },
    },
    visualReview: {
      desktop: visualEvidence(exhibit.review?.visualReview?.desktop),
      mobile: visualEvidence(exhibit.review?.visualReview?.mobile),
      threeDimensional: visualEvidence(exhibit.review?.visualReview?.threeDimensional),
    },
    contract: {
      evaluated: standardAuthored,
      status: standardAuthored ? issues.length ? 'fail' : 'pass' : 'not-evaluated',
      issues,
    },
  };
}));

const entries = rawEntries.sort((left, right) =>
  left.gallery.number - right.gallery.number
  || (left.gallery.walkingOrder.galleryStop ?? Number.MAX_SAFE_INTEGER) - (right.gallery.walkingOrder.galleryStop ?? Number.MAX_SAFE_INTEGER)
  || left.exhibit.id.localeCompare(right.exhibit.id));

const exactMainInterpretationUses = new Map();
const exactSidebarUses = new Map();
for (const entry of entries.filter(({exhibitReview}) => exhibitReview.authoredStatus === 'standard-compliant')) {
  const runtime = data.museumSupplementalExhibits.find(({hallId, exhibit}) => hallId === entry.gallery.hallId && exhibit.id === entry.exhibit.id)?.exhibit;
  const mainKey = normalizeCopy(runtime?.sections.flatMap(({paragraphs}) => paragraphs).join(' ') ?? '');
  const sidebarKey = normalizeCopy((runtime?.visitorGuide ?? []).flatMap(({heading, items}) => [
    heading,
    ...items.flatMap(({label, description}) => [label, description]),
  ]).join(' '));
  if (mainKey) exactMainInterpretationUses.set(mainKey, [...(exactMainInterpretationUses.get(mainKey) ?? []), entry]);
  if (sidebarKey) exactSidebarUses.set(sidebarKey, [...(exactSidebarUses.get(sidebarKey) ?? []), entry]);
}
for (const uses of [...exactMainInterpretationUses.values(), ...exactSidebarUses.values()]) {
  const uniqueEntries = [...new Set(uses)];
  if (uniqueEntries.length < 2) continue;
  const ids = uniqueEntries.map(({exhibit}) => exhibit.id).join(', ');
  for (const entry of uniqueEntries) entry.contract.issues.push(`exact reviewed template copy repeats across: ${ids}`);
}
for (const entry of entries) {
  if (entry.contract.evaluated) entry.contract.status = entry.contract.issues.length ? 'fail' : 'pass';
}

const duplicateRegistryKeys = entries.map(({gallery, exhibit}) => `${gallery.hallId}:${exhibit.id}`)
  .filter((key, index, all) => all.indexOf(key) !== index);
const reviewedEntries = entries.filter(({exhibitReview}) => exhibitReview.authoredStatus !== 'unreviewed');
const standardEntries = entries.filter(({exhibitReview}) => exhibitReview.authoredStatus === 'standard-compliant');
const resolvedEntries = standardEntries.filter(({exhibitReview, contract}) =>
  exhibitReview.effectiveStatus === 'standard-compliant' && contract.status === 'pass');
const selectedEntries = requestedHall ? entries.filter(({gallery}) => gallery.hallId === requestedHall) : entries;
const errors = [];
for (const key of new Set(duplicateRegistryKeys)) errors.push(`${key}: duplicate authoritative supplemental registry entry`);
for (const entry of reviewedEntries) {
  const prefix = `${entry.gallery.label}/${entry.exhibit.id}`;
  if (entry.canonicalArticle.relationshipStatus !== 'matched') errors.push(`${prefix}: reviewed exhibit has ${entry.canonicalArticle.relationshipStatus} article relationship`);
  if (entry.exhibitReview.effectiveStatus === 'out-of-date') errors.push(`${prefix}: reviewed exhibit lock is out of date`);
  if (entry.exhibitReview.authoredStatus === 'standard-compliant' && entry.contract.status !== 'pass') {
    errors.push(`${prefix}: ${entry.contract.issues.join('; ')}`);
  }
}
const ledgerErrors = [...errors];
if (requireComplete) {
  for (const entry of selectedEntries) {
    if (entry.exhibitReview.effectiveStatus !== 'standard-compliant' || entry.contract.status !== 'pass') {
      errors.push(`${entry.gallery.label}/${entry.exhibit.id}: selected gallery is incomplete (${entry.exhibitReview.effectiveStatus})`);
    }
  }
}
const selectedResolvedCount = selectedEntries.filter(({exhibitReview, contract}) =>
  exhibitReview.effectiveStatus === 'standard-compliant' && contract.status === 'pass').length;

const gallerySummaries = data.museumPublicRouteHallIds.map((hallId, index) => {
  const galleryEntries = entries.filter(({gallery}) => gallery.hallId === hallId);
  const hall = data.museumCanonicalProgram.find(({id}) => id === hallId);
  return {
    galleryNumber: index + 1,
    galleryLabel: `Gallery ${String(index + 1).padStart(2, '0')}`,
    hallId,
    hallTitle: hall?.title ?? null,
    total: galleryEntries.length,
    backlog: galleryEntries.filter(({exhibitReview}) => exhibitReview.authoredStatus === 'unreviewed').length,
    reviewed: galleryEntries.filter(({exhibitReview}) => exhibitReview.authoredStatus !== 'unreviewed').length,
    standardCompliant: galleryEntries.filter(({exhibitReview, contract}) =>
      exhibitReview.effectiveStatus === 'standard-compliant' && contract.status === 'pass').length,
  };
});
const dataAsOf = reviewedEntries.map(({exhibitReview}) => exhibitReview.reviewedOn).filter(Boolean).sort().at(-1) ?? null;
const ledger = {
  dataAsOf,
  authority: 'Runtime MUSEUM_SUPPLEMENTAL_EXHIBITS registry ordered by the runtime public route and guided walking order',
  contract: {
    articleDepthMinimum: ARTICLE_PROSE_WORD_MINIMUM,
    standardCompliantRequirements: [
      'exact current claim-reviewed canonical article relationship and article-depth compliance',
      'current exhibit review lock with recorded method and resolution',
      'object-led presentation with three untitled prose paragraphs and at least 280 words',
      'one to three subject-specific sidebar sections with two to six concise sourced rows',
      'valid claim-level source mappings for every paragraph and sidebar row',
      'complete principal and physical asset identity, provenance, rights, accessibility, exact source records, and installed derivatives',
      'matching scene/panel ratios, aspect-safe 3D mount, and non-uniform-scaling protection',
      'canonical direct route, detail object preview, and full sourced article CTA',
    ],
    visualReviewPolicy: 'Desktop, mobile, and 3D review evidence is reported only when explicitly recorded on the authored review; absence is not inferred as completion.',
  },
  inventory: {
    total: entries.length,
    backlog: entries.length - reviewedEntries.length,
    reviewed: reviewedEntries.length,
    resolvedStandardCompliant: resolvedEntries.length,
    countsByAuthoredStatus: countsBy(entries.map((entry) => ({status: entry.exhibitReview.authoredStatus})), 'status', AUTHORED_STATUSES),
    countsByEffectiveStatus: countsBy(entries.map((entry) => ({status: entry.exhibitReview.effectiveStatus})), 'status', EFFECTIVE_STATUSES),
    countsByArticleRelationship: countsBy(entries.map((entry) => ({status: entry.canonicalArticle.relationshipStatus})), 'status', RELATIONSHIP_STATUSES),
  },
  rendererContract,
  gallerySummaries,
  errors: ledgerErrors,
  entries,
};
const serialized = `${JSON.stringify(ledger, null, 2)}\n`;
const markdown = `# Supplemental exhibit-review ledger

Data as of: ${dataAsOf ?? 'no supplemental reviews'}

This generated program ledger derives every record from the authoritative runtime supplemental registry, canonical article registry, current article and exhibit locks, public Museum route, guided walking order, asset registry, acquisition manifests, and shared renderer. Authored review metadata remains on each exhibit; this ledger is not a second exhibit registry.

Regenerate with \`npm run report:supplementals\`. Audit reviewed regressions safely with \`npm run audit:supplementals\`. Select a gallery with \`-- --gallery 03\` or \`-- --hall <hall-id>\`; add \`--require-complete\` to require every selected supplemental to be resolved.

## Program status

| Total | Backlog | Reviewed | Standard compliant | Errors |
| ---: | ---: | ---: | ---: | ---: |
| ${entries.length} | ${ledger.inventory.backlog} | ${reviewedEntries.length} | ${resolvedEntries.length} | ${ledgerErrors.length} |

Unreviewed records are explicit backlog: they are inventoried but neither reported as compliant nor treated as a global audit failure. Reviewed lock regressions and objective contract regressions fail.

## Gallery inventory

| Gallery | Hall | Total | Backlog | Reviewed | Standard compliant |
| --- | --- | ---: | ---: | ---: | ---: |
${gallerySummaries.map((summary) => `| ${summary.galleryLabel} | ${escapeCell(summary.hallTitle)} | ${summary.total} | ${summary.backlog} | ${summary.reviewed} | ${summary.standardCompliant} |`).join('\n')}

## Reviewed supplementals

| Gallery / walking order | Exhibit | Article lock / depth | Exhibit status | Main prose | Sidebar | Claim mappings | Assets | Ratios | Routes | Visual evidence |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- | --- |
${reviewedEntries.map((entry) => `| ${entry.gallery.label} · ${entry.gallery.walkingOrder.galleryStop} | ${escapeCell(entry.exhibit.title)} | ${entry.canonicalArticle.effectiveReviewStatus} / ${entry.canonicalArticle.depth.status} | ${entry.exhibitReview.authoredStatus} → ${entry.exhibitReview.effectiveStatus} | ${entry.interpretation.mainWordCount} / ${entry.interpretation.paragraphCount}¶ | ${entry.interpretation.sidebarSectionCount} / ${entry.interpretation.sidebarItemCount} | ${entry.claimEvidence.paragraphMappings.length + entry.claimEvidence.sidebarMappings.length} | ${escapeCell(entry.assets.principal.id)} / ${escapeCell(entry.assets.physical.id)} | ${entry.aspectRatios.principalSceneToPanel.status} / ${entry.aspectRatios.physicalSceneToPanel.status} / ${entry.aspectRatios.mediaMountToPhysicalScene.status} | ${entry.linking.directExhibitRoute.status} / ${entry.linking.detailObjectPreview.status} / ${entry.linking.fullArticleCta.status} | ${entry.visualReview.desktop.status} / ${entry.visualReview.mobile.status} / ${entry.visualReview.threeDimensional.status} |`).join('\n') || '| — | — | — | — | — | — | — | — | — | — | — |'}

## Complete supplemental inventory

| Gallery | Room | Walking order | Exhibit | Canonical article | Article review / depth | Exhibit review | Main / sidebar | Principal / physical asset | Direct route |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
${entries.map((entry) => `| ${entry.gallery.label} | ${escapeCell(entry.gallery.roomTitle)} | ${entry.gallery.walkingOrder.galleryStop ?? '—'} | ${escapeCell(entry.exhibit.title)} | ${escapeCell(entry.canonicalArticle.title ?? entry.canonicalArticle.id)} | ${entry.canonicalArticle.effectiveReviewStatus ?? '—'} / ${entry.canonicalArticle.depth.status} | ${entry.exhibitReview.authoredStatus} → ${entry.exhibitReview.effectiveStatus} | ${entry.interpretation.mainWordCount} / ${entry.interpretation.sidebarSectionCount}:${entry.interpretation.sidebarItemCount} | ${escapeCell(entry.assets.principal.id)} / ${escapeCell(entry.assets.physical.id)} | ${escapeCell(entry.exhibit.directRoute)} |`).join('\n')}
`;

const ledgerArtifacts = [
  [LEDGER_JSON_URL, serialized, 'JSON'],
  [LEDGER_MARKDOWN_URL, markdown, 'Markdown'],
];

if (write) {
  const changed = await Promise.all(ledgerArtifacts.map(([url, generated]) =>
    writeGeneratedArtifactIfChanged(url, generated)));
  console.log(
    `${changed.some(Boolean) ? 'Wrote changed' : 'Verified unchanged'} supplemental exhibit-review ledgers `
    + `for ${entries.length} authoritative registry records.`,
  );
} else {
  for (const [url, generated, label] of ledgerArtifacts) {
    try {
      const existing = await readFile(url, 'utf8');
      if (!generatedArtifactMatches(existing, generated)) {
        errors.push(`generated supplemental ${label} ledger is stale; run npm run report:supplementals`);
      }
    } catch {
      errors.push(`generated supplemental ${label} ledger is missing; run npm run report:supplementals`);
    }
  }
}

const scope = requestedHall ? `${gallerySummaries.find(({hallId}) => hallId === requestedHall)?.galleryLabel} (${requestedHall})` : 'program';
console.log(
  `Supplemental review audit: ${entries.length} authoritative records; ${ledger.inventory.backlog} backlog; `
  + `${reviewedEntries.length} reviewed; ${resolvedEntries.length} standard-compliant. `
  + `Selected ${scope}: ${selectedEntries.length} records, ${selectedResolvedCount} resolved; ${errors.length} errors.`,
);
if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
}
