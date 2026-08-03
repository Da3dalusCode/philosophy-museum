import {branches} from '../src/data/branches';
import {philosophers} from '../src/data/philosophers';
import {MUSEUM_WORLD_DEFINITIONS} from '../src/data/museum/museumWorldDefinitions';
import {MUSEUM_SUPPLEMENTAL_EXHIBITS} from '../src/data/museum/museumSupplementalExhibits';
import {
  layoutPlaqueText,
  plaqueSupportedTitleLines,
  primaryPlaqueReadableMinimums,
  PRIMARY_PLAQUE_INVITATION_MAX_LINES,
  supplementalPlaqueReadableMinimums,
  supplementalPlaqueSupportedInvitationLines,
  type PlaqueTextLayout,
  type PlaqueTextRole,
} from '../src/components/MuseumGallery/plaqueTextures';
import {
  PRIMARY_PLAQUE_INVITATION_OVERRIDES,
  resolvePrimaryPlaqueConfiguration,
} from '../src/components/MuseumGallery/primaryPlaqueContract';
import {
  resolveSupplementalPlaqueConfiguration,
  supplementalPlaqueCurrentTitlePattern,
} from '../src/components/MuseumGallery/supplementalPlaqueContract';

type Failure = {
  hall: string;
  room: string;
  exhibitId: string;
  title: string;
  offendingRole: 'kicker' | 'title' | 'invitation' | 'contract';
  finalLineCount: number;
  finalFontSize: number;
  truncation: boolean;
  overflow: boolean;
  minimumSizeFailure: boolean;
  relationshipFailure: boolean;
  hierarchyFailure: boolean;
  plaqueType: string;
  canonicalContexts: string;
  message: string;
};

type PlaqueResult = {
  hall: string;
  room: string;
  exhibitId: string;
  title: string;
  invitation: string;
  titleFontSize: number;
  invitationFontSize: number;
  titleLineCount: number;
  invitationLineCount: number;
  width: number;
  height: number;
  plaqueType: string;
  canonicalContexts: readonly string[];
  sourceTitle: string;
};

const output = document.querySelector<HTMLPreElement>('#museum-plaque-audit-result');
if (!output) throw new Error('Primary plaque audit output element is missing.');

const normalized = (value: string): string => value.trim().replace(/\s+/gu, ' ');
const roleText = (layout: PlaqueTextLayout, role: PlaqueTextRole): string => normalized(
  layout.lines.filter((line) => line.role === role).map(({text}) => text).join(' '),
);
const roleFontSize = (layout: PlaqueTextLayout, role: PlaqueTextRole): number =>
  layout.lines.find((line) => line.role === role)?.fontSize ?? 0;
const hasOverflow = (layout: PlaqueTextLayout, role: PlaqueTextRole): boolean => {
  const right = layout.safeRect.x + layout.safeRect.width;
  const bottom = layout.safeRect.y + layout.safeRect.height;
  return layout.lines.filter((line) => line.role === role).some(({bounds}) =>
    bounds.left < layout.safeRect.x - .01
    || bounds.top < layout.safeRect.y - .01
    || bounds.right > right + .01
    || bounds.bottom > bottom + .01);
};

try {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Browser canvas text metrics are unavailable.');

  const philosopherTitles = new Map(philosophers.map(({id, name}) => [id, name]));
  const branchTitles = new Map(branches.map(({id, name}) => [id, name]));
  const failures: Failure[] = [];
  const results: PlaqueResult[] = [];

  for (const definition of MUSEUM_WORLD_DEFINITIONS) {
    for (const exhibit of definition.layout.exhibits) {
      const config = resolvePrimaryPlaqueConfiguration(definition, exhibit);
      canvas.width = config.width ?? 1;
      canvas.height = config.height ?? 1;
      const layout = layoutPlaqueText(context, config);
      const expectedTitle = config.entityKind === 'philosopher'
        ? philosopherTitles.get(config.entityId)
        : branchTitles.get(config.entityId);
      const titleText = roleText(layout, 'title');
      const invitationText = roleText(layout, 'subtitle');
      const titleFontSize = roleFontSize(layout, 'title');
      const invitationFontSize = roleFontSize(layout, 'subtitle');
      const minimums = primaryPlaqueReadableMinimums(layout.height);
      const titleTruncation = layout.lines.some(({role, ellipsized, text}) =>
        role === 'title' && (ellipsized || text.includes('…')));
      const invitationTruncation = layout.lines.some(({role, ellipsized, text}) =>
        role === 'subtitle' && (ellipsized || text.includes('…')));
      const titleBoundsOverflow = hasOverflow(layout, 'title');
      const invitationBoundsOverflow = hasOverflow(layout, 'subtitle');
      const titleOverflow = !layout.fitsSafeRect || titleBoundsOverflow;
      const invitationOverflow = !layout.fitsSafeRect || invitationBoundsOverflow;

      const fail = (
        offendingRole: Failure['offendingRole'],
        message: string,
        truncation = false,
        overflow = false,
        minimumSizeFailure = false,
        relationshipFailure = false,
        hierarchyFailure = false,
      ) => failures.push({
        hall: `${config.hallId} — ${config.hallTitle}`,
        room: `${config.roomId} — ${config.roomTitle}`,
        exhibitId: config.exhibitId,
        title: config.title,
        offendingRole,
        finalLineCount: offendingRole === 'title'
          ? layout.lineCounts.title
          : offendingRole === 'invitation' ? layout.lineCounts.subtitle : 0,
        finalFontSize: offendingRole === 'title'
          ? titleFontSize
          : offendingRole === 'invitation' ? invitationFontSize : 0,
        truncation,
        overflow,
        minimumSizeFailure,
        relationshipFailure,
        hierarchyFailure,
        plaqueType: 'primary-canonical',
        canonicalContexts: `${config.entityKind}:${config.entityId}`,
        message: `${message}; texture=${layout.width}×${layout.height}px; safe=${Math.round(layout.safeRect.width)}×${Math.round(layout.safeRect.height)}px`,
      });

      if (config.contentKind !== 'primary') fail('contract', 'production configuration did not select the primary contract');
      if (config.kicker !== '' || layout.lineCounts.kicker !== 0) fail('kicker', 'generic kicker or eyebrow rendered');
      if (!expectedTitle || config.title !== expectedTitle || titleText !== expectedTitle) {
        fail('title', `rendered title "${titleText}" does not equal canonical title "${expectedTitle ?? 'missing'}"`);
      }
      if (!titleText) fail('title', 'title is absent');
      if (!invitationText) fail('invitation', 'invitation is absent');
      if (invitationText !== normalized(config.subtitle)) fail('invitation', 'invitation is incomplete');
      if (titleTruncation) fail('title', 'title contains truncation or ellipsis', true);
      if (invitationTruncation) fail('invitation', 'invitation contains truncation or ellipsis', true);
      if (titleOverflow) fail('title', `title layout fails its safe rectangle (layoutFits=${layout.fitsSafeRect}; roleBoundsOverflow=${titleBoundsOverflow})`, false, true);
      if (invitationOverflow) fail('invitation', `invitation layout fails its safe rectangle (layoutFits=${layout.fitsSafeRect}; roleBoundsOverflow=${invitationBoundsOverflow})`, false, true);
      if (titleFontSize < minimums.title) fail('title', `title is below the ${minimums.title}px readable minimum`, false, false, true);
      if (invitationFontSize < minimums.subtitle) fail('invitation', `invitation is below the ${minimums.subtitle}px readable minimum`, false, false, true);
      if (layout.lineCounts.title > plaqueSupportedTitleLines(layout.width, layout.height)) {
        fail('title', 'title exceeds the supported line capacity');
      }
      if (layout.lineCounts.subtitle > PRIMARY_PLAQUE_INVITATION_MAX_LINES) {
        fail('invitation', 'invitation exceeds the supported four-line capacity');
      }
      if (titleFontSize <= invitationFontSize) fail('title', 'title is not typographically dominant');

      results.push({
        hall: config.hallId,
        room: config.roomId,
        exhibitId: config.exhibitId,
        title: config.title,
        invitation: config.subtitle,
        titleFontSize,
        invitationFontSize,
        titleLineCount: layout.lineCounts.title,
        invitationLineCount: layout.lineCounts.subtitle,
        width: layout.width,
        height: layout.height,
        plaqueType: 'primary-canonical',
        canonicalContexts: [`${config.entityKind}:${config.entityId}`],
        sourceTitle: config.title,
      });
    }
  }

  if (results.length !== 191) {
    failures.push({
      hall: 'Museum-wide', room: 'all primary rooms', exhibitId: 'primary-program', title: 'Primary program',
      offendingRole: 'contract', finalLineCount: 0, finalFontSize: 0,
      truncation: false, overflow: false, minimumSizeFailure: false,
      relationshipFailure: false, hierarchyFailure: false,
      plaqueType: 'primary-canonical', canonicalContexts: 'Museum-wide primary registry',
      message: `expected 191 production primary plaques; audited ${results.length}`,
    });
  }

  const representativeIds = [
    'han-feizi',
    'confucius',
    'machiavelli',
    'hobbes',
    'buddhist-epistemology',
    'buddha',
    'shankara',
    'rawls',
  ];
  const representatives = representativeIds.map((id) => results.find(({exhibitId}) => exhibitId === id));
  for (const [index, representative] of representatives.entries()) {
    if (!representative) {
      failures.push({
        hall: 'missing', room: 'missing', exhibitId: representativeIds[index], title: 'missing',
        offendingRole: 'contract', finalLineCount: 0, finalFontSize: 0,
        truncation: false, overflow: false, minimumSizeFailure: false,
        relationshipFailure: false, hierarchyFailure: false,
        plaqueType: 'primary-canonical', canonicalContexts: 'representative primary control',
        message: 'representative regression case is absent',
      });
    }
  }

  const supplementalResults: PlaqueResult[] = [];
  const taxonomyCounts: Record<string, number> = {};
  const currentTitlePatternCounts: Record<string, number> = {};
  let titlesChanged = 0;
  let invitationsRevised = 0;
  let genericKickersRemoved = 0;
  let canonicalRelationshipCorrections = 0;

  for (const entry of MUSEUM_SUPPLEMENTAL_EXHIBITS) {
    const {exhibit, layout: physicalLayout, hallId} = entry;
    const config = resolveSupplementalPlaqueConfiguration(hallId, exhibit, physicalLayout);
    canvas.width = config.width ?? 1;
    canvas.height = config.height ?? 1;
    const layout = layoutPlaqueText(context, config);
    const titleText = roleText(layout, 'title');
    const invitationText = roleText(layout, 'subtitle');
    const titleFontSize = roleFontSize(layout, 'title');
    const invitationFontSize = roleFontSize(layout, 'subtitle');
    const minimums = supplementalPlaqueReadableMinimums(layout.height);
    const titleTruncation = layout.lines.some(({role, ellipsized, text}) =>
      role === 'title' && (ellipsized || text.includes('…') || text.includes('...')));
    const invitationTruncation = layout.lines.some(({role, ellipsized, text}) =>
      role === 'subtitle' && (ellipsized || text.includes('…') || text.includes('...')));
    const titleBoundsOverflow = hasOverflow(layout, 'title');
    const invitationBoundsOverflow = hasOverflow(layout, 'subtitle');
    const titleOverflow = !layout.fitsSafeRect || titleBoundsOverflow;
    const invitationOverflow = !layout.fitsSafeRect || invitationBoundsOverflow;
    const canonicalContexts = config.canonicalContexts.map(({kind, id, title}) => `${kind}:${id} (${title})`);

    const fail = (
      offendingRole: Failure['offendingRole'],
      message: string,
      truncation = false,
      overflow = false,
      minimumSizeFailure = false,
      relationshipFailure = false,
      hierarchyFailure = false,
    ) => failures.push({
      hall: `${config.hallId} — ${config.hallTitle}`,
      room: `${config.roomId} — ${config.roomTitle}`,
      exhibitId: config.exhibitId,
      title: config.title,
      offendingRole,
      finalLineCount: offendingRole === 'title'
        ? layout.lineCounts.title
        : offendingRole === 'invitation' ? layout.lineCounts.subtitle : 0,
      finalFontSize: offendingRole === 'title'
        ? titleFontSize
        : offendingRole === 'invitation' ? invitationFontSize : 0,
      truncation,
      overflow,
      minimumSizeFailure,
      relationshipFailure,
      hierarchyFailure,
      plaqueType: config.plaqueType,
      canonicalContexts: canonicalContexts.join(', ') || 'none',
      message: `${message}; texture=${layout.width}×${layout.height}px; safe=${Math.round(layout.safeRect.width)}×${Math.round(layout.safeRect.height)}px`,
    });

    if (config.contentKind !== 'supplemental') fail('contract', 'production configuration did not select the supplemental contract');
    if (config.kicker !== '' || layout.lineCounts.kicker !== 0) fail('kicker', 'generic kicker or category label rendered', false, false, false, false, true);
    if (!titleText) fail('title', 'title is absent');
    if (!invitationText) fail('invitation', 'invitation is absent');
    if (titleText !== normalized(config.title)) fail('title', 'title is incomplete');
    if (invitationText !== normalized(config.subtitle)) fail('invitation', 'invitation is incomplete');
    if (!/[.!?][”"']?$/u.test(invitationText)) fail('invitation', 'invitation is not a complete sentence');
    if (titleTruncation) fail('title', 'title contains truncation or ellipsis', true);
    if (invitationTruncation) fail('invitation', 'invitation contains truncation or ellipsis', true);
    if (titleOverflow) fail('title', `title layout fails its safe rectangle (layoutFits=${layout.fitsSafeRect}; roleBoundsOverflow=${titleBoundsOverflow})`, false, true);
    if (invitationOverflow) fail('invitation', `invitation layout fails its safe rectangle (layoutFits=${layout.fitsSafeRect}; roleBoundsOverflow=${invitationBoundsOverflow})`, false, true);
    if (titleFontSize < minimums.title) fail('title', `title is below the ${minimums.title}px geometry-aware readable minimum`, false, false, true);
    if (invitationFontSize < minimums.subtitle) fail('invitation', `invitation is below the ${minimums.subtitle}px geometry-aware readable minimum`, false, false, true);
    if (layout.lineCounts.title > Math.min(3, plaqueSupportedTitleLines(layout.width, layout.height))) {
      fail('title', 'title exceeds the supported supplemental line capacity');
    }
    if (layout.lineCounts.subtitle > supplementalPlaqueSupportedInvitationLines(layout.width, layout.height)) {
      fail('invitation', 'invitation exceeds the supported supplemental line capacity');
    }
    if (titleFontSize <= invitationFontSize) fail('title', 'title is not typographically dominant', false, false, false, false, true);
    if (!config.canonicalContexts.length) fail('contract', 'no authoritative canonical context resolves', false, false, false, true);
    if (config.canonicalContexts.some(({title}) => normalized(title) === titleText)) {
      fail('title', 'supplemental subject title merely repeats its canonical parent', false, false, false, false, true);
    }

    taxonomyCounts[config.plaqueType] = (taxonomyCounts[config.plaqueType] ?? 0) + 1;
    const currentPattern = supplementalPlaqueCurrentTitlePattern(exhibit.shortTitle);
    currentTitlePatternCounts[currentPattern] = (currentTitlePatternCounts[currentPattern] ?? 0) + 1;
    if (normalized(config.title) !== normalized(config.sourceTitle)) titlesChanged += 1;
    if (normalized(config.subtitle) !== normalized(config.sourceInvitation)) invitationsRevised += 1;
    if (exhibit.workLabel && config.kicker === '') genericKickersRemoved += 1;
    const routedContextId = exhibit.articleRoute?.kind === 'philosopher'
      ? exhibit.articleRoute.philosopherId
      : exhibit.articleRoute?.kind === 'branch' ? exhibit.articleRoute.branchId : undefined;
    if (routedContextId && routedContextId !== physicalLayout.parentExhibitId) canonicalRelationshipCorrections += 1;

    supplementalResults.push({
      hall: config.hallId,
      room: config.roomId,
      exhibitId: config.exhibitId,
      title: config.title,
      invitation: config.subtitle,
      titleFontSize,
      invitationFontSize,
      titleLineCount: layout.lineCounts.title,
      invitationLineCount: layout.lineCounts.subtitle,
      width: layout.width,
      height: layout.height,
      plaqueType: config.plaqueType,
      canonicalContexts,
      sourceTitle: config.sourceTitle,
    });
  }

  if (supplementalResults.length !== 406) {
    failures.push({
      hall: 'Museum-wide', room: 'all supplemental rooms', exhibitId: 'supplemental-program', title: 'Supplemental program',
      offendingRole: 'contract', finalLineCount: 0, finalFontSize: 0,
      truncation: false, overflow: false, minimumSizeFailure: false,
      relationshipFailure: true, hierarchyFailure: false,
      plaqueType: 'supplemental-registry', canonicalContexts: 'Museum-wide supplemental registry',
      message: `expected 406 physical supplemental wall plaques; audited ${supplementalResults.length}`,
    });
  }

  const supplementalRepresentativeIds = [
    'epicurean-philodemus-library',
    'skeptical-arguments-preserved',
    'cynic-hipparchia-crates',
    'proclus-elements-afterlife',
    'porphyrian-tree-classification',
    'nagarjuna-dependent-arising',
  ];
  const supplementalRepresentatives = supplementalRepresentativeIds
    .map((id) => supplementalResults.find(({exhibitId}) => exhibitId === id));
  for (const [index, representative] of supplementalRepresentatives.entries()) {
    if (!representative) {
      failures.push({
        hall: 'missing', room: 'missing', exhibitId: supplementalRepresentativeIds[index], title: 'missing',
        offendingRole: 'contract', finalLineCount: 0, finalFontSize: 0,
        truncation: false, overflow: false, minimumSizeFailure: false,
        relationshipFailure: true, hierarchyFailure: false,
        plaqueType: 'supplemental-representative', canonicalContexts: 'missing',
        message: 'representative supplemental regression case is absent',
      });
    }
  }

  output.textContent = JSON.stringify({
    ok: failures.length === 0,
    failures,
    results,
    representatives,
    invitationOverrideCount: Object.keys(PRIMARY_PLAQUE_INVITATION_OVERRIDES).length,
    supplementalResults,
    supplementalRepresentatives,
    supplementalSummary: {
      totalRecords: MUSEUM_SUPPLEMENTAL_EXHIBITS.length,
      physicalInstallations: supplementalResults.length,
      physicalWallPlaques: supplementalResults.length,
      numberRequiringChanges: MUSEUM_SUPPLEMENTAL_EXHIBITS.length,
      taxonomyCounts,
      currentTitlePatternCounts,
      genericKickersRemoved,
      titlesChanged,
      invitationsRevised,
      canonicalRelationshipCorrections,
    },
  });
} catch (error) {
  output.textContent = JSON.stringify({
    ok: false,
    fatal: error instanceof Error ? `${error.message}\n${error.stack ?? ''}` : String(error),
  });
}
