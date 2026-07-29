import type {MuseumHallContentProps} from './museumWorldRegistry';
import {AnalyticSupplementalExhibits} from './AnalyticSupplementalExhibits';
import {BuddhistSupplementalExhibits} from './BuddhistSupplementalExhibits';
import {ClassicalChineseSupplementalExhibits} from './ClassicalChineseSupplementalExhibits';
import {CanonicalMuseumExhibits} from './CanonicalMuseumExhibits';
import {ContemporaryHallArchitecture} from './ContemporaryHallArchitecture';
import {ContemporaryHallLighting} from './ContemporaryHallLighting';
import {JusticeSupplementalExhibits} from './JusticeSupplementalExhibits';
import {ClassicalSouthAsianSupplementalExhibits} from './ClassicalSouthAsianSupplementalExhibits';
import {CoreQuestionsForumSupplementalExhibits} from './CoreQuestionsForumSupplementalExhibits';
import {EastAsianSupplementalExhibits} from './EastAsianSupplementalExhibits';
import {IslamicSupplementalExhibits} from './IslamicSupplementalExhibits';
import {JewishSupplementalExhibits} from './JewishSupplementalExhibits';
import {MediterraneanGalleryCuration} from './MediterraneanGalleryCuration';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
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
  onSelectExhibit,
  onSelectSupplementalExhibit,
  onSceneGesture,
}: MuseumHallContentProps) {
  const entryIds = definition.prefetch.entryExhibitIdsByEntrance[entryEntranceId ?? ''] ?? [];
  const entryAssetIds = new Set(definition.prefetch.entrySceneAssetIdsByEntrance?.[entryEntranceId ?? ''] ?? []);
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
    {definition.id === 'core-questions-forum'
      && definition.layout.supplementalExhibits
      && <CoreQuestionsForumSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
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
    {definition.id === 'justice-democratic-reason'
      && definition.layout.supplementalExhibits
      && <JusticeSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'classical-south-asian-worlds'
      && definition.layout.supplementalExhibits
      && <ClassicalSouthAsianSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'buddhist-philosophies'
      && definition.layout.supplementalExhibits
      && <BuddhistSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'classical-chinese-traditions'
      && definition.layout.supplementalExhibits
      && <ClassicalChineseSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'islamic-philosophical-worlds'
      && definition.layout.supplementalExhibits
      && <IslamicSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'east-asian-continuities'
      && definition.layout.supplementalExhibits
      && <EastAsianSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
    {definition.id === 'jewish-philosophy'
      && definition.layout.supplementalExhibits
      && <JewishSupplementalExhibits
        layouts={active
          ? definition.layout.supplementalExhibits
          : definition.layout.supplementalExhibits.filter(({assetId}) => entryAssetIds.has(assetId))}
        nearbyId={nearbySupplemental?.hallId === definition.id ? nearbySupplemental.supplementalExhibitId : undefined}
        onSelect={(supplementalExhibitId) => onSelectSupplementalExhibit({hallId: definition.id, supplementalExhibitId})}
      />}
  </MuseumHallSpatialRoot>;
}
