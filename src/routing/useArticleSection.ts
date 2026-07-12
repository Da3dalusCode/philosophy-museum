import {useEffect} from 'react';
import {getArticleSectionTarget} from './routeMetadata';
import type {ArticleRoute} from './routes';

export const scrollToArticleTarget = (targetId: string): void => {
  const target = document.getElementById(targetId);
  if (!target) return;
  const details = target instanceof HTMLDetailsElement ? target : target.closest('details');
  if (details instanceof HTMLDetailsElement) details.open = true;
  target.scrollIntoView({block: 'start', behavior: 'auto'});
};

export const focusArticleTarget = (targetId: string): void => {
  const target = document.getElementById(targetId);
  if (!target) return;
  const focusTarget = target.querySelector<HTMLElement>('h2') ?? target;
  focusTarget.tabIndex = -1;
  focusTarget.focus({preventScroll: true});
};

export const useArticleSection = (route: ArticleRoute): void => {
  useEffect(() => {
    const targetId = getArticleSectionTarget(route);
    if (!targetId) return;
    const frame = window.requestAnimationFrame(() => scrollToArticleTarget(targetId));
    return () => window.cancelAnimationFrame(frame);
  }, [route.kind, route.kind === 'branch' ? route.branchId : route.philosopherId, route.section]);
};
