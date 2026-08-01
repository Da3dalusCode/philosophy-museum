import {ArrowLeft, ExternalLink, ShieldCheck} from 'lucide-react';
import type {ReactNode} from 'react';
import {
  editorialStatusLabel,
  effectiveEditorialStatus,
  type EditorialRecord,
} from '../../editorial/reviewLock';
import type {
  CitationReference,
  EffectiveEditorialStatus,
  EditorialParagraph,
  EditorialSource,
  SourceLink,
} from '../../types/philosophy';
import type {RouteHref} from '../../routing/routes';

const safeIdPart = (value: string): string => value.replace(/[^A-Za-z0-9_-]/g, '-');
const citationAnchorId = (recordId: string, claimId: string, index: number): string =>
  `citation-${safeIdPart(recordId)}-${safeIdPart(claimId)}-${index + 1}`;
const sourceEntryId = (recordId: string, sourceId: string): string =>
  `evidence-${safeIdPart(recordId)}-${safeIdPart(sourceId)}`;

const focusAndScroll = (id: string): void => {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({block: 'center'});
  target.focus({preventScroll: true});
};

const sourceLabel = (source: EditorialSource): string =>
  [source.authors.join(', '), source.title].filter(Boolean).join(', ');

const sourceNumberMap = (record: EditorialRecord): Map<string, number> =>
  new Map(record.editorial?.sources.map((source, index) => [source.id, index + 1]) ?? []);

const citationLabel = (
  citation: CitationReference,
  source: EditorialSource | undefined,
  number: number | undefined,
): string => {
  const locator = citation.locator ? `, ${citation.locator.value}` : '';
  const note = citation.note ? `. ${citation.note}` : '';
  return `Source ${number ?? '?' }: ${source ? sourceLabel(source) : citation.sourceId}${locator}${note}`;
};

export function InlineCitations({
  record,
  claimId,
  citations,
}: {
  record: EditorialRecord;
  claimId: string;
  citations: CitationReference[];
}) {
  const sources = record.editorial?.sources ?? [];
  const numbers = sourceNumberMap(record);
  if (!citations.length) return null;
  return <span className="citation-cluster" aria-label="Citations">
    {citations.map((citation, index) => {
      const source = sources.find(({id}) => id === citation.sourceId);
      const number = numbers.get(citation.sourceId);
      return <button
        className="citation-marker"
        id={citationAnchorId(record.id, claimId, index)}
        key={`${citation.sourceId}-${citation.locator?.value ?? 'source'}-${index}`}
        type="button"
        aria-label={citationLabel(citation, source, number)}
        onClick={() => focusAndScroll(sourceEntryId(record.id, citation.sourceId))}
      >[{number ?? '?'}]</button>;
    })}
  </span>;
}

export function ClaimCitations({record, claimKey}: {record: EditorialRecord; claimKey: string}) {
  const claim = record.editorial?.structuredClaims[claimKey];
  return claim
    ? <InlineCitations record={record} claimId={`structured-${claimKey}`} citations={claim.citations}/>
    : null;
}

export function CitedParagraph({record, paragraph}: {record: EditorialRecord; paragraph: EditorialParagraph}) {
  return <p>{paragraph.text}<InlineCitations record={record} claimId={paragraph.id} citations={paragraph.citations}/></p>;
}

const allCitations = (record: EditorialRecord): {claimId: string; citation: CitationReference; index: number}[] => {
  const structured = Object.entries(record.editorial?.structuredClaims ?? {}).flatMap(([key, claim]) =>
    claim.citations.map((citation, index) => ({claimId: `structured-${key}`, citation, index})),
  );
  const prose = record.articleSections?.flatMap((section) => section.paragraphs.flatMap((paragraph) =>
    typeof paragraph === 'string'
      ? []
      : paragraph.citations.map((citation, index) => ({claimId: paragraph.id, citation, index})),
  )) ?? [];
  return [...structured, ...prose];
};

const firstCitationBySource = (record: EditorialRecord): Map<string, string> => {
  const first = new Map<string, string>();
  for (const {claimId, citation, index} of allCitations(record)) {
    if (!first.has(citation.sourceId)) {
      first.set(citation.sourceId, citationAnchorId(record.id, claimId, index));
    }
  }
  return first;
};

const SourceEntry = ({
  record,
  source,
  number,
  firstCitationId,
}: {
  record: EditorialRecord;
  source: EditorialSource;
  number: number;
  firstCitationId?: string;
}) => <li id={sourceEntryId(record.id, source.id)} value={number} tabIndex={-1}>
  <div className="evidence-source-heading">
    <b>{source.authors.join(', ')}</b>
    <span>{source.year ?? 'n.d.'} · {source.type.replaceAll('-', ' ')}</span>
  </div>
  <cite>{source.title}</cite>
  <p>{[
    source.containerTitle,
    source.translator ? `Translated by ${source.translator}` : undefined,
    source.publisher,
    source.edition,
    source.doi ? `DOI ${source.doi}` : undefined,
    source.isbn ? `ISBN ${source.isbn}` : undefined,
  ].filter(Boolean).join(' · ')}</p>
  {source.note && <p className="evidence-source-note">{source.note}</p>}
  <div className="evidence-source-actions">
    <a href={source.url} target="_blank" rel="noreferrer">
      Open source <ExternalLink size={13}/><span className="sr-only"> (opens an external site)</span>
    </a>
    {firstCitationId && <button type="button" onClick={() => focusAndScroll(firstCitationId)}>
      <ArrowLeft size={13}/> Return to first citation
    </button>}
  </div>
</li>;

const LegacyFurtherReading = ({links}: {links: SourceLink[]}) => <ul className="legacy-reference-list">
  {links.map((link) => <li key={`${link.url}-${link.label}`}>
    <a href={link.url} target="_blank" rel="noreferrer">
      {link.label} <ExternalLink size={12}/><span className="sr-only"> (opens an external site)</span>
    </a>
    <small>{link.type}{link.notes ? ` · ${link.notes}` : ''}</small>
  </li>)}
</ul>;

export function EditorialReferences({record}: {record: EditorialRecord}) {
  const editorial = record.editorial;
  const citations = allCitations(record);
  const citedIds = new Set(citations.map(({citation}) => citation.sourceId));
  const numbers = sourceNumberMap(record);
  const firstCitationIds = firstCitationBySource(record);
  const evidenceSources = editorial?.sources.filter(({id}) => citedIds.has(id)) ?? [];
  const furtherReadingIds = new Set(editorial?.furtherReadingSourceIds ?? []);
  const furtherReadingSources = editorial?.sources.filter(({id}) => furtherReadingIds.has(id)) ?? [];
  const legacyLinks = record.sourceLinks ?? [];

  if (!evidenceSources.length && !furtherReadingSources.length && !legacyLinks.length) return null;
  return <section id={record.id === 'feminist-philosophy' ? 'branch-sources' : 'profile-sources'} className="article-reference editorial-references">
    <div className="section-title editorial-reference-title">
      <span><ShieldCheck/></span>
      <div><small>Editorial record</small><h2>Evidence and further reading</h2></div>
    </div>
    {evidenceSources.length > 0 && <div className="evidence-source-group">
      <h3>Cited evidence</h3>
      <p>Numbered entries below are cited by specific claims on this page.</p>
      <ol className="evidence-source-list">
        {evidenceSources.map((source) => <SourceEntry
          key={source.id}
          record={record}
          source={source}
          number={numbers.get(source.id) ?? 0}
          firstCitationId={firstCitationIds.get(source.id)}
        />)}
      </ol>
    </div>}
    {(furtherReadingSources.length > 0 || legacyLinks.length > 0) && <div className="evidence-source-group further-reading-group">
      <h3>Further reading</h3>
      <p>These links are recommendations, not evidence for the numbered claims above.</p>
      {furtherReadingSources.length > 0 && <ol className="evidence-source-list">
        {furtherReadingSources.map((source) => <SourceEntry
          key={source.id}
          record={record}
          source={source}
          number={numbers.get(source.id) ?? 0}
        />)}
      </ol>}
      {legacyLinks.length > 0 && <LegacyFurtherReading links={legacyLinks}/>}
    </div>}
  </section>;
}

const statusDescription: Record<EffectiveEditorialStatus, string> = {
  'unreviewed': 'No claim-level source review has been recorded for this page.',
  'bibliography-only': 'The page offers references, but they are not mapped to individual claims.',
  'source-mapped': 'Sources are mapped to claims; a complete claim review has not been recorded.',
  'claim-reviewed': 'The displayed claim set and its citations match the recorded review lock.',
  'review-out-of-date': 'Claim-bearing content changed after the recorded review and needs another review.',
};

export function EditorialStatusPanel({record, href}: {record: EditorialRecord; href: RouteHref}) {
  const status = effectiveEditorialStatus(record);
  const reviewedOn = status === 'claim-reviewed' ? record.editorial?.review.reviewedOn : undefined;
  return <aside className={`editorial-status editorial-status-${status}`} aria-label="Editorial review status">
    <ShieldCheck size={17}/>
    <div>
      <b>{editorialStatusLabel[status]}</b>
      <span>{statusDescription[status]}{reviewedOn ? ` Reviewed ${reviewedOn}.` : ''}</span>
    </div>
    <a href={href({kind: 'editorial-methodology'})}>How review works <span aria-hidden="true">→</span></a>
  </aside>;
}

export function CitedText({record, claimKey, children}: {record: EditorialRecord; claimKey: string; children: ReactNode}) {
  return <>{children}<ClaimCitations record={record} claimKey={claimKey}/></>;
}
