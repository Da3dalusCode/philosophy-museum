import {computeEditorialReviewLock, type EditorialRecord} from '../../editorial/reviewLock';
import type {
  CitationLocatorKind,
  CitationReference,
  EditorialParagraph,
  EditorialStructuredClaim,
} from '../../types/philosophy';

export const citation = (
  sourceId: string,
  kind?: CitationLocatorKind,
  value?: string,
  note?: string,
): CitationReference => ({
  sourceId,
  ...(kind && value ? {locator: {kind, value}} : {}),
  ...(note ? {note} : {}),
});

export const paragraph = (
  id: string,
  text: string,
  citations: CitationReference[],
): EditorialParagraph => ({id, text, citations});

export const structuredClaim = (
  value: string,
  citations: CitationReference[],
): EditorialStructuredClaim => ({value, citations});

export const finalizeClaimReviewedRecord = <T extends EditorialRecord>(record: T): T => {
  if (!record.editorial) throw new Error(`Editorial record ${record.id} has no editorial metadata.`);
  const reviewable = {
    ...record,
    editorial: {
      ...record.editorial,
      review: {...record.editorial.review, lock: undefined},
    },
  } as T;
  return {
    ...reviewable,
    editorial: {
      ...reviewable.editorial!,
      review: {
        ...reviewable.editorial!.review,
        lock: computeEditorialReviewLock(reviewable),
      },
    },
  } as T;
};
