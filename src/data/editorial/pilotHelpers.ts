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
