import type {ArticleSection} from '../types/philosophy';

export type StandaloneArticleCategory =
  | 'work'
  | 'text'
  | 'argument'
  | 'concept'
  | 'museum-exhibit'
  | 'other';

export type StandaloneArticle = {
  id: string;
  title: string;
  category: StandaloneArticleCategory;
  visitorEntryPoint: string;
  articleSections: ArticleSection[];
};

/**
 * Canonical long-form articles that are not philosopher or philosophy records.
 *
 * The current app has no standalone long-form work, text, concept, argument, or
 * Museum-exhibit route. Short wall drawers and Museum panels are supporting
 * surfaces and are deliberately not registered here. New standalone articles
 * must be added to this registry so the universal depth tooling discovers them.
 */
export const standaloneArticles: readonly StandaloneArticle[] = [];
