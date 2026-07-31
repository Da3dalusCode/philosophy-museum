import type {
  Branch,
  EffectiveEditorialStatus,
  EditorialReviewStatus,
  Philosopher,
} from '../types/philosophy';

export type EditorialRecord = Branch | Philosopher;

const presentationOnlyKeys = new Set([
  'color',
  'iconName',
  'image',
  'imageUrl',
  'imageAlt',
  'imageSource',
  'imageCredit',
  'imageLicense',
  'relatedImages',
]);

const reviewSnapshot = (value: unknown, key?: string): unknown => {
  if (key && presentationOnlyKeys.has(key)) return undefined;
  if (Array.isArray(value)) {
    return value.map((item) => reviewSnapshot(item)).filter((item) => item !== undefined);
  }
  if (!value || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((childKey) => childKey !== 'review')
      .map((childKey) => [childKey, reviewSnapshot(record[childKey], childKey)])
      .filter(([, childValue]) => childValue !== undefined),
  );
};

export const serializeEditorialReviewSnapshot = (record: EditorialRecord): string =>
  JSON.stringify(reviewSnapshot(record));

export const computeEditorialReviewLock = (record: EditorialRecord): string => {
  const input = serializeEditorialReviewSnapshot(record);
  let hash = 0xcbf29ce484222325n;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= BigInt(input.charCodeAt(index));
    hash = BigInt.asUintN(64, hash * 0x100000001b3n);
  }
  return `fnv1a64:${hash.toString(16).padStart(16, '0')}`;
};

export const authoredEditorialStatus = (record: EditorialRecord): EditorialReviewStatus => {
  if (record.editorial?.review.status) return record.editorial.review.status;
  return record.sourceLinks?.length ? 'bibliography-only' : 'unreviewed';
};

export const effectiveEditorialStatus = (record: EditorialRecord): EffectiveEditorialStatus => {
  const status = authoredEditorialStatus(record);
  if (status !== 'claim-reviewed') return status;
  const storedLock = record.editorial?.review.lock;
  return storedLock && storedLock === computeEditorialReviewLock(record)
    ? status
    : 'review-out-of-date';
};

export const editorialStatusLabel: Record<EffectiveEditorialStatus, string> = {
  'unreviewed': 'Editorial review not started',
  'bibliography-only': 'Bibliography available',
  'source-mapped': 'Sources mapped to claims',
  'claim-reviewed': 'Claim review current',
  'review-out-of-date': 'Claim review needs renewal',
};
