import type {ArticleSection} from '../types/philosophy';
import {branches} from './branches';
import {philosophers} from './philosophers';
import {standaloneArticles, type StandaloneArticleCategory} from './standaloneArticles';

export type CanonicalArticleCategory = 'philosopher' | 'philosophy' | StandaloneArticleCategory;

export type CanonicalArticle = {
  canonicalId: string;
  title: string;
  category: CanonicalArticleCategory;
  visitorEntryPoint: string;
  articleSections: ArticleSection[] | undefined;
};

export const canonicalArticles: readonly CanonicalArticle[] = [
  ...philosophers.map((record) => ({
    canonicalId: record.id,
    title: record.name,
    category: 'philosopher' as const,
    visitorEntryPoint: `#/philosophers/${encodeURIComponent(record.id)}`,
    articleSections: record.articleSections,
  })),
  ...branches.map((record) => ({
    canonicalId: record.id,
    title: record.name,
    category: 'philosophy' as const,
    visitorEntryPoint: `#/branches/${encodeURIComponent(record.id)}`,
    articleSections: record.articleSections,
  })),
  ...standaloneArticles.map((record) => ({
    canonicalId: record.id,
    title: record.title,
    category: record.category,
    visitorEntryPoint: record.visitorEntryPoint,
    articleSections: record.articleSections,
  })),
];
