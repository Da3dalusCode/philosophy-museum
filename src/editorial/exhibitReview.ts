import {
  effectiveEditorialStatus,
  serializeEditorialReviewSnapshot,
  type EditorialRecord,
} from './reviewLock';

export type AuthoredMuseumExhibitReviewStatus =
  | 'unreviewed'
  | 'reconciled'
  | 'standard-compliant';
export type EffectiveMuseumExhibitReviewStatus =
  | AuthoredMuseumExhibitReviewStatus
  | 'out-of-date';

export type MuseumExhibitReview = {
  status: Exclude<AuthoredMuseumExhibitReviewStatus, 'unreviewed'>;
  reviewedOn: string;
  method: string;
  lock: string;
};

export type MuseumExhibitReviewRecord = Record<string, unknown> & {
  review?: MuseumExhibitReview;
};

const exhibitSnapshot = (record: MuseumExhibitReviewRecord): string => JSON.stringify(
  Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => key !== 'review')
      .map((key) => [key, record[key]]),
  ),
);

const fnv1a64 = (input: string): string => {
  let hash = 0xcbf29ce484222325n;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= BigInt(input.charCodeAt(index));
    hash = BigInt.asUintN(64, hash * 0x100000001b3n);
  }
  return `fnv1a64:${hash.toString(16).padStart(16, '0')}`;
};

export const computeMuseumExhibitReviewLock = (
  exhibit: MuseumExhibitReviewRecord,
  article: EditorialRecord,
): string => fnv1a64(JSON.stringify({
  article: serializeEditorialReviewSnapshot(article),
  exhibit: exhibitSnapshot(exhibit),
}));

export const authoredMuseumExhibitReviewStatus = (
  exhibit: MuseumExhibitReviewRecord,
): AuthoredMuseumExhibitReviewStatus => exhibit.review?.status ?? 'unreviewed';

export const effectiveMuseumExhibitReviewStatus = (
  exhibit: MuseumExhibitReviewRecord,
  article: EditorialRecord,
): EffectiveMuseumExhibitReviewStatus => {
  const status = authoredMuseumExhibitReviewStatus(exhibit);
  if (status === 'unreviewed') return status;
  if (exhibit.review?.lock !== computeMuseumExhibitReviewLock(exhibit, article)) return 'out-of-date';
  if (status === 'standard-compliant' && effectiveEditorialStatus(article) !== 'claim-reviewed') {
    return 'out-of-date';
  }
  return status;
};
