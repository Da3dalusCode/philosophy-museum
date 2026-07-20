import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import type {MuseumHallContentProps} from './museumWorldRegistry';
import {CanonicalMuseumExhibits} from './CanonicalMuseumExhibits';
import {ContemporaryHallArchitecture} from './ContemporaryHallArchitecture';
import {ContemporaryHallLighting} from './ContemporaryHallLighting';
import {MediterraneanGalleryCuration} from './MediterraneanGalleryCuration';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
import {MuseumVisitorMapKiosk} from './MuseumVisitorMapKiosk';
import {PlatoSupplementalExhibits} from './PlatoSupplementalExhibits';

/** Shared lazy subtree for every canonical hall; the definition supplies all differences. */
export function CanonicalMuseumHallContent({
  definition,
  active,
  entryEntranceId,
  nearby,
  nearbySupplemental,
  visitorMapNearby,
  onSelectExhibit,
  onSelectSupplementalExhibit,
  onSelectVisitorMap,
  onSceneGesture,
}: MuseumHallContentProps) {
  const entryIds = definition.prefetch.entryExhibitIdsByEntrance[entryEntranceId ?? ''] ?? [];
  const ownsKiosk = definition.id === MUSEUM_BUILDING_MANIFEST.kiosk.publicHallId;
  return <MuseumHallSpatialRoot definition={definition}>
    {active && <ContemporaryHallLighting lighting={definition.layout.lighting}/>}
    <ContemporaryHallArchitecture definition={definition} onSceneGesture={onSceneGesture}/>
    <CanonicalMuseumExhibits
      definition={definition}
      visibleExhibitIds={active ? undefined : entryIds}
      nearbyId={nearby?.hallId === definition.id ? nearby.exhibitId : undefined}
      onSelectExhibit={(exhibitId) => onSelectExhibit({hallId: definition.id, exhibitId})}
    />
    {definition.id === 'mediterranean-beginnings-classical'
      && (active || entryEntranceId === 'S0')
      && definition.layout.supplementalExhibits
      && <PlatoSupplementalExhibits
        layouts={definition.layout.supplementalExhibits}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'mediterranean-beginnings-classical' && <MediterraneanGalleryCuration/>}
    {ownsKiosk && (
      <MuseumVisitorMapKiosk active={active} nearby={visitorMapNearby} onActivate={onSelectVisitorMap}/>
    )}
  </MuseumHallSpatialRoot>;
}
