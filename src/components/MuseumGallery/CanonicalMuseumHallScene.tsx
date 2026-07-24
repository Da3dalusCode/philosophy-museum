import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import type {MuseumHallContentProps} from './museumWorldRegistry';
import {AnalyticSupplementalExhibits} from './AnalyticSupplementalExhibits';
import {CanonicalMuseumExhibits} from './CanonicalMuseumExhibits';
import {ContemporaryHallArchitecture} from './ContemporaryHallArchitecture';
import {ContemporaryHallLighting} from './ContemporaryHallLighting';
import {MediterraneanGalleryCuration} from './MediterraneanGalleryCuration';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
import {MuseumVisitorMapKiosk} from './MuseumVisitorMapKiosk';
import {PhenomenologySupplementalExhibits} from './PhenomenologySupplementalExhibits';
import {PlatoSupplementalExhibits} from './PlatoSupplementalExhibits';
import {RenaissanceSupplementalExhibits} from './RenaissanceSupplementalExhibits';

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
  const entryAssetIds = new Set(definition.prefetch.entrySceneAssetIdsByEntrance?.[entryEntranceId ?? ''] ?? []);
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
    {definition.id === 'renaissance-humanism-new-method'
      && definition.layout.supplementalExhibits
      && <RenaissanceSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'phenomenology-existence-embodiment'
      && definition.layout.supplementalExhibits
      && <PhenomenologySupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'analytic-traditions'
      && definition.layout.supplementalExhibits
      && <AnalyticSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {ownsKiosk && (
      <MuseumVisitorMapKiosk active={active} nearby={visitorMapNearby} onActivate={onSelectVisitorMap}/>
    )}
  </MuseumHallSpatialRoot>;
}
