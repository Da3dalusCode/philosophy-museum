import {branchById} from '../data/branches';
import {learningPaths} from '../data/learningPaths';
import {philosopherById} from '../data/philosophers';
import type {AppRoute, ArticleRoute} from './routes';

export type ArticleRouteEntry = {
  id: string;
  label: string;
  targetId: string;
  marker?: string;
};

const branchExtras = (branchId: string): ArticleRouteEntry[] => {
  const branch = branchById(branchId);
  return [
    {id: 'branch-quick-reference', label: 'Quick reference', targetId: 'branch-quick-reference', marker: '+'},
    {id: 'branch-reading', label: 'Reading path', targetId: 'branch-reading', marker: '+'},
    ...(branch?.sourceLinks?.length
      ? [{id: 'branch-sources', label: 'Sources', targetId: 'branch-sources', marker: '+'}]
      : []),
  ];
};

const philosopherExtras = (philosopherId: string): ArticleRouteEntry[] => {
  const philosopher = philosopherById(philosopherId);
  return [
    {id: 'profile-reading', label: 'Reading path', targetId: 'profile-reading', marker: '+'},
    {id: 'profile-branches', label: 'Atlas connections', targetId: 'profile-branches', marker: '+'},
    ...(philosopher?.sourceLinks?.length
      ? [{id: 'profile-sources', label: 'Sources', targetId: 'profile-sources', marker: '+'}]
      : []),
  ];
};

export const getArticleRouteEntries = (route: ArticleRoute): ArticleRouteEntry[] => {
  const entity = route.kind === 'branch'
    ? branchById(route.branchId)
    : philosopherById(route.philosopherId);
  const sections = entity?.articleSections?.map((section, index) => ({
    id: section.id,
    label: section.title,
    targetId: `article-${section.id}`,
    marker: String(index + 1).padStart(2, '0'),
  })) ?? [];
  const extras = route.kind === 'branch'
    ? branchExtras(route.branchId)
    : philosopherExtras(route.philosopherId);
  return [...sections, ...extras];
};

export const getArticleSectionTarget = (route: ArticleRoute): string | undefined =>
  route.section
    ? getArticleRouteEntries(route).find(({id}) => id === route.section)?.targetId
    : undefined;

const getArticleSectionTitle = (route: ArticleRoute): string | undefined =>
  route.section
    ? getArticleRouteEntries(route).find(({id}) => id === route.section)?.label
    : undefined;

export const getRouteTitle = (route: AppRoute): string => {
  let title: string;
  switch (route.kind) {
    case 'history':
      title = 'Big History';
      break;
    case 'map':
      title = 'Philosophy Map';
      break;
    case 'branch': {
      const branch = branchById(route.branchId);
      const section = getArticleSectionTitle(route);
      title = [branch?.name ?? route.branchId, section].filter(Boolean).join(' — ');
      break;
    }
    case 'philosopher': {
      const philosopher = philosopherById(route.philosopherId);
      const section = getArticleSectionTitle(route);
      title = [philosopher?.name ?? route.philosopherId, section].filter(Boolean).join(' — ');
      break;
    }
    case 'compare-branches':
      title = `${branchById(route.leftId)?.name ?? route.leftId} vs ${branchById(route.rightId)?.name ?? route.rightId}`;
      break;
    case 'compare-philosophers':
      title = `${philosopherById(route.leftId)?.name ?? route.leftId} vs ${philosopherById(route.rightId)?.name ?? route.rightId}`;
      break;
    case 'learning-path': {
      const path = learningPaths.find(({id}) => id === route.pathId);
      title = `${path?.title ?? route.pathId} — Step ${route.step}`;
      break;
    }
    case 'not-found':
      title = 'Route Not Found';
      break;
  }
  return `${title} | Philosophy Atlas`;
};

/** Preserve a documented convenience link while canonicalizing to Plato's real section ID. */
export const canonicalizeArticleSection = (
  kind: ArticleRoute['kind'],
  entityId: string,
  section: string | undefined,
): string | undefined => {
  if (kind === 'philosopher' && entityId === 'plato' && section === 'major-works') {
    return 'major-works-early-middle';
  }
  return section;
};
