import {branches} from '../src/data/branches';
import {philosophers} from '../src/data/philosophers';
import {MUSEUM_WORLD_DEFINITIONS} from '../src/data/museum/museumWorldDefinitions';
import {
  layoutPlaqueText,
  plaqueSupportedTitleLines,
  primaryPlaqueReadableMinimums,
  PRIMARY_PLAQUE_INVITATION_MAX_LINES,
  type PlaqueTextLayout,
  type PlaqueTextRole,
} from '../src/components/MuseumGallery/plaqueTextures';
import {
  PRIMARY_PLAQUE_INVITATION_OVERRIDES,
  resolvePrimaryPlaqueConfiguration,
} from '../src/components/MuseumGallery/primaryPlaqueContract';

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
      });
    }
  }

  if (results.length !== 191) {
    failures.push({
      hall: 'Museum-wide', room: 'all primary rooms', exhibitId: 'primary-program', title: 'Primary program',
      offendingRole: 'contract', finalLineCount: 0, finalFontSize: 0,
      truncation: false, overflow: false, minimumSizeFailure: false,
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
        message: 'representative regression case is absent',
      });
    }
  }

  output.textContent = JSON.stringify({
    ok: failures.length === 0,
    failures,
    results,
    representatives,
    invitationOverrideCount: Object.keys(PRIMARY_PLAQUE_INVITATION_OVERRIDES).length,
  });
} catch (error) {
  output.textContent = JSON.stringify({
    ok: false,
    fatal: error instanceof Error ? `${error.message}\n${error.stack ?? ''}` : String(error),
  });
}
