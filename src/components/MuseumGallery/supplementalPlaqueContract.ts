import {branches} from '../../data/branches';
import {philosophers} from '../../data/philosophers';
import {
  getMuseumHallCatalog,
  type MuseumPublicHallId,
} from '../../data/museumCatalog';
import {MUSEUM_TEXTURE_SPECS, museumTextureDimensionsForPlane} from '../../data/museum/museumTexturePolicy';
import {MUSEUM_SUPPLEMENTAL_EXHIBITS} from '../../data/museum/museumSupplementalExhibits';
import type {
  MuseumCanonicalContextRef,
  MuseumSupplementalExhibit,
  MuseumSupplementalPlaqueType,
} from '../../data/museum/platoSupplementalExhibits';
import type {MuseumSupplementalExhibitLayout} from '../../data/museum/museumWorldTypes';
import type {PlaqueTextureOptions} from './plaqueTextures';
import {usePlaqueTexture} from './plaqueTextures';

export type ResolvedSupplementalCanonicalContext = MuseumCanonicalContextRef & {
  title: string;
};

export type SupplementalPlaqueConfiguration = PlaqueTextureOptions & {
  contentKind: 'supplemental';
  kicker: '';
  subtitle: string;
  hallId: MuseumPublicHallId;
  hallTitle: string;
  roomId: string;
  roomTitle: string;
  exhibitId: string;
  plaqueType: MuseumSupplementalPlaqueType;
  canonicalContexts: readonly ResolvedSupplementalCanonicalContext[];
  physicalWidth: number;
  physicalHeight: number;
  sourceTitle: string;
  sourceInvitation: string;
};

const TITLE_OVERRIDES = {
  'plato-republic': 'Republic',
  'epicurean-philodemus-library': 'The Villa of the Papyri Library',
  'skeptical-arguments-preserved': 'The Transmission of Sextus Empiricus',
  'eac-three-teachings': 'The Three Teachings',
  'buddhist-diamond-sutra': 'Diamond Sūtra Print Culture',
  'boethius-philosophy-in-prison': 'Boethius in Latin Transmission',
  'hypatia-alexandrian-teaching': 'Hypatia’s Teaching and Reception',
} as const satisfies Readonly<Record<string, string>>;

const INVITATION_OVERRIDES = {
  'cynic-hipparchia-crates': 'Hipparchia and Crates made Cynic philosophy visible as a shared practice of poverty, frank speech, and resistance to conventional status and gender roles.',
  'epicurean-philodemus-library': 'The Villa of the Papyri preserved works linked to Philodemus, revealing how Epicurean ethics, rhetoric, poetry, and school history developed within a Roman elite setting.',
  'skeptical-arguments-preserved': 'The writings of Sextus Empiricus preserved Pyrrhonian modes and opposed arguments, while print and translation repeatedly reframed skepticism for later debates about method, religion, and certainty.',
  'porphyrian-tree-classification': 'Later diagrams turned Porphyry’s account of genus, species, and difference into a visual framework that influenced medieval and early modern logic.',
  'proclus-elements-afterlife': 'Proclus organized metaphysical propositions into an axiomatic sequence exploring unity, causation, procession, and return, a form that shaped later philosophical traditions.',
  'enlightenment-access-to-knowledge': 'At Sceaux, privileged access to books and instruments made women’s rational capacity visible while exposing the unequal education criticized by Mary Wollstonecraft.',
  'enlightenment-revolution-from-street': 'The Women’s March to Versailles shows collective political agency beyond formal citizenship, the exclusion Mary Wollstonecraft challenged in revolutionary rights discourse.',
  'continental-freiburg-phenomenological-line': 'Freiburg’s institutional history links Husserl and Heidegger while showing why Continental Philosophy cannot treat phenomenological inheritance as politically innocent.',
} as const satisfies Readonly<Record<string, string>>;

const TYPE_OVERRIDES = {
  'cynic-hipparchia-crates': 'paired-or-grouped-historical-figures',
  'epicurean-philodemus-library': 'object-manuscript-site-or-archaeological-context',
  'skeptical-arguments-preserved': 'reception-or-transmission-history',
  'porphyrian-tree-classification': 'concept-argument-diagram-or-method',
  'proclus-elements-afterlife': 'work-or-text',
} as const satisfies Readonly<Record<string, MuseumSupplementalPlaqueType>>;

const PAIRED_OR_GROUPED_IDS = new Set([
  'asanga-vasubandhu-yogacara-lineage',
  'cynic-hipparchia-crates',
  'elisabeth-descartes-union',
  'madhyamaka-lineage-aryadeva',
  'nature-caroline-intellectual-network',
]);

const RECEPTION_PATTERN = /(?:afterlife|archive|canon|circulation|copying|lineage|preserv|print|reception|revival|translat|transmission)/iu;
const OBJECT_OR_SITE_PATTERN = /(?:archaeolog|astrolabe|bamboo|battery|book|codex|drawing|library|manuscript|map|object|papyr|portrait|scroll|site|stupa|telescope|villa|woodblock)/iu;
const EVENT_OR_INSTITUTION_PATTERN = /(?:academy|assembly|city|college|convention|court|debate|institution|laboratory|march|movement|parliament|revolution|school|trial|university|war)/iu;

export const classifySupplementalPlaque = (
  exhibit: MuseumSupplementalExhibit,
  layout: MuseumSupplementalExhibitLayout,
): MuseumSupplementalPlaqueType => {
  if (exhibit.wallPlaque?.type) return exhibit.wallPlaque.type;
  const override = TYPE_OVERRIDES[exhibit.id as keyof typeof TYPE_OVERRIDES];
  if (override) return override;
  if (PAIRED_OR_GROUPED_IDS.has(exhibit.id)) return 'paired-or-grouped-historical-figures';
  if (
    layout.installationKind.endsWith('-work')
    || layout.installationKind === 'cave-ascent'
    || layout.installationKind === 'republic-altarpiece'
  ) return 'work-or-text';
  if (
    layout.installationKind.endsWith('-concept')
    || layout.installationKind === 'renaissance-observation'
    || layout.installationKind === 'forum-comparative-lens'
  ) return 'concept-argument-diagram-or-method';

  const evidence = `${exhibit.id} ${exhibit.shortTitle} ${exhibit.workLabel}`;
  if (RECEPTION_PATTERN.test(evidence)) return 'reception-or-transmission-history';
  if (OBJECT_OR_SITE_PATTERN.test(evidence)) return 'object-manuscript-site-or-archaeological-context';
  if (EVENT_OR_INSTITUTION_PATTERN.test(evidence)) return 'historical-event-or-institutional-context';
  return 'other';
};

const resolveContext = ({kind, id}: MuseumCanonicalContextRef): ResolvedSupplementalCanonicalContext | undefined => {
  const title = kind === 'philosopher'
    ? philosophers.find((item) => item.id === id)?.name
    : branches.find((item) => item.id === id)?.name;
  return title ? {kind, id, title} : undefined;
};

export const resolveSupplementalCanonicalContexts = (
  hallId: MuseumPublicHallId,
  exhibit: MuseumSupplementalExhibit,
  layout: MuseumSupplementalExhibitLayout,
): readonly ResolvedSupplementalCanonicalContext[] => {
  const explicit = exhibit.wallPlaque?.canonicalContexts;
  const route = exhibit.articleRoute;
  const routed = route?.kind === 'philosopher'
    ? [{kind: 'philosopher' as const, id: route.philosopherId}]
    : route?.kind === 'branch'
      ? [{kind: 'branch' as const, id: route.branchId}]
      : [];
  const parent = getMuseumHallCatalog(hallId)?.exhibits.find(({id}) => id === layout.parentExhibitId);
  const fallback = parent ? [{kind: parent.entityKind, id: parent.entityId}] : [];
  const requested = explicit?.length ? explicit : routed.length ? routed : fallback;
  const unique = new Map<string, ResolvedSupplementalCanonicalContext>();
  for (const context of requested) {
    const resolved = resolveContext(context);
    if (resolved) unique.set(`${resolved.kind}:${resolved.id}`, resolved);
  }
  return [...unique.values()];
};

const normalize = (value: string): string => value.trim().replace(/\s+/gu, ' ');

const factualTitle = (exhibit: MuseumSupplementalExhibit): string => {
  const explicit = exhibit.wallPlaque?.title ?? TITLE_OVERRIDES[exhibit.id as keyof typeof TITLE_OVERRIDES];
  if (explicit) return explicit;
  const source = normalize(exhibit.shortTitle);
  const colon = source.indexOf(':');
  return colon >= 0 ? normalize(source.slice(colon + 1)) : source;
};

const sentenceSegments = (value: string): readonly string[] => {
  const Segmenter = Intl.Segmenter;
  return [...new Segmenter('en', {granularity: 'sentence'}).segment(normalize(value))]
    .map(({segment}) => normalize(segment))
    .filter(Boolean);
};

const wordCount = (value: string): number => normalize(value).split(/\s+/u).filter(Boolean).length;

const contextTitles = (contexts: readonly ResolvedSupplementalCanonicalContext[]): string => {
  const titles = contexts.map(({title}) => title);
  if (titles.length <= 1) return titles[0] ?? 'the related canonical tradition';
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(', ')}, and ${titles.at(-1)}`;
};

const mentionsContext = (
  invitation: string,
  contexts: readonly ResolvedSupplementalCanonicalContext[],
): boolean => {
  const lower = invitation.toLocaleLowerCase();
  return contexts.some(({title}) => lower.includes(title.toLocaleLowerCase()));
};

const relationshipSentence = (
  type: MuseumSupplementalPlaqueType,
  contexts: readonly ResolvedSupplementalCanonicalContext[],
): string => {
  const titles = contextTitles(contexts);
  switch (type) {
    case 'work-or-text': return `It belongs within the wider philosophical project of ${titles}.`;
    case 'concept-argument-diagram-or-method': return `It clarifies a central question in ${titles}.`;
    case 'paired-or-grouped-historical-figures': return `Together these figures extend the historical story of ${titles}.`;
    case 'object-manuscript-site-or-archaeological-context': return `The material setting makes the historical world of ${titles} visible.`;
    case 'reception-or-transmission-history': return `Its transmission shows how ${titles} was preserved or transformed.`;
    case 'historical-event-or-institutional-context': return `The setting places ${titles} within lived history and institutions.`;
    case 'other': return `It situates this subject within ${titles}.`;
  }
};

const completeInvitation = (
  exhibit: MuseumSupplementalExhibit,
  type: MuseumSupplementalPlaqueType,
  contexts: readonly ResolvedSupplementalCanonicalContext[],
): string => {
  const explicit = exhibit.wallPlaque?.invitation
    ?? INVITATION_OVERRIDES[exhibit.id as keyof typeof INVITATION_OVERRIDES];
  if (explicit) return normalize(explicit);
  const sentences = sentenceSegments(exhibit.lead);
  let invitation = sentences[0] ?? normalize(exhibit.lead);
  if (wordCount(invitation) < 18 && sentences[1] && wordCount(`${invitation} ${sentences[1]}`) <= 34) {
    invitation = `${invitation} ${sentences[1]}`;
  }
  if (!mentionsContext(invitation, contexts)) invitation = `${invitation} ${relationshipSentence(type, contexts)}`;
  return normalize(invitation);
};

/**
 * Resolves the exact production inputs for a physical supplemental wall plaque.
 * Every supplemental renderer and the browser-canvas audit consume this path.
 */
export const resolveSupplementalPlaqueConfiguration = (
  hallId: MuseumPublicHallId,
  exhibit: MuseumSupplementalExhibit,
  layout: MuseumSupplementalExhibitLayout,
): SupplementalPlaqueConfiguration => {
  const hall = getMuseumHallCatalog(hallId);
  const room = hall?.zones.find(({id}) => id === layout.zoneId);
  if (!hall || !room) {
    throw new Error(`Cannot resolve the supplemental plaque for ${hallId}/${layout.zoneId}/${layout.id}.`);
  }
  const plaqueType = classifySupplementalPlaque(exhibit, layout);
  const canonicalContexts = resolveSupplementalCanonicalContexts(hallId, exhibit, layout);
  const textureSize = museumTextureDimensionsForPlane(
    layout.label.width,
    layout.label.height,
    MUSEUM_TEXTURE_SPECS.platoSupplementalLabel,
  );
  return {
    contentKind: 'supplemental',
    title: factualTitle(exhibit),
    kicker: '',
    subtitle: completeInvitation(exhibit, plaqueType, canonicalContexts),
    accent: layout.accent,
    width: textureSize.width,
    height: textureSize.height,
    theme: hallId === 'mediterranean-beginnings-classical' ? 'mediterranean' : 'dark',
    hallId,
    hallTitle: hall.title,
    roomId: String(layout.zoneId),
    roomTitle: room.title,
    exhibitId: exhibit.id,
    plaqueType,
    canonicalContexts,
    physicalWidth: layout.label.width,
    physicalHeight: layout.label.height,
    sourceTitle: exhibit.shortTitle,
    sourceInvitation: exhibit.frontSubtitle,
  };
};

export const useSupplementalPlaqueTexture = (
  exhibit: MuseumSupplementalExhibit,
  layout: MuseumSupplementalExhibitLayout,
) => {
  const entry = MUSEUM_SUPPLEMENTAL_EXHIBITS.find(({exhibit: item}) => item.id === exhibit.id);
  if (!entry) throw new Error(`Supplemental plaque ${exhibit.id} is absent from the physical registry.`);
  return usePlaqueTexture(resolveSupplementalPlaqueConfiguration(entry.hallId, exhibit, layout));
};

export const supplementalPlaqueCurrentTitlePattern = (
  title: string,
): 'parent-or-subtitle-colon' | 'possessive-author-or-framing' | 'already-factual-concise' => {
  if (title.includes(':')) return 'parent-or-subtitle-colon';
  if (/[’']s\b/u.test(title)) return 'possessive-author-or-framing';
  return 'already-factual-concise';
};
