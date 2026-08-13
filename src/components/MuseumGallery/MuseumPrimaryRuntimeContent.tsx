import {useMemo, type ComponentProps} from 'react';
import {getMuseumInterpretation} from '../../data/museum/museumInterpretations';
import type {MuseumExhibitRef} from '../../data/museum/museumWorldTypes';
import type {MuseumExhibitCatalog, MuseumExhibitId, MuseumPublicHallId} from '../../data/museumCatalog';
import {MuseumInterpretationPanel} from './MuseumInterpretationPanel';

export function MuseumPrimaryDirectorySummary({hallId, exhibitId}: {
  hallId: MuseumPublicHallId;
  exhibitId: MuseumExhibitId;
}) {
  return <p>{getMuseumInterpretation({hallId, exhibitId}).lead}</p>;
}

export function MuseumPrimaryProximityCard({hallId, exhibit, onOpen}: {
  hallId: MuseumPublicHallId;
  exhibit: MuseumExhibitCatalog;
  onOpen: () => void;
}) {
  const content = useMemo(
    () => getMuseumInterpretation({hallId, exhibitId: exhibit.id}),
    [exhibit.id, hallId],
  );
  return <aside className="museum-proximity-card" data-zone={exhibit.zoneId}>
    <p><span>{exhibit.entityKind === 'philosopher' ? 'Philosopher' : 'School & tradition'}</span><span>{content.dateLabel}</span></p>
    <h2>{exhibit.displayName}</h2>
    <blockquote>{exhibit.question}</blockquote>
    <button type="button" onClick={onOpen}>E / Enter · Interpret exhibit</button>
  </aside>;
}

type InterpretationPanelProps = ComponentProps<typeof MuseumInterpretationPanel>;

export function MuseumPrimaryInterpretationModal({reference, ...props}: Omit<InterpretationPanelProps, 'content'> & {
  reference: MuseumExhibitRef;
}) {
  const content = useMemo(() => getMuseumInterpretation(reference), [reference.exhibitId, reference.hallId]);
  return <MuseumInterpretationPanel {...props} content={content}/>;
}
