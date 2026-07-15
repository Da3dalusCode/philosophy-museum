import type {MuseumHallContentProps} from './museumWorldRegistry';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
import {ContemporaryHallArchitecture} from './ContemporaryHallArchitecture';
import {ContemporaryHallLighting} from './ContemporaryHallLighting';
import {ContemporaryMuseumExhibits} from './ContemporaryMuseumExhibits';

export function LogicLanguageScienceHallContent({definition, active, viewerHallId, nearby, onSelectExhibit, onSceneGesture}: MuseumHallContentProps) {
  const inactiveIds = viewerHallId === 'ethics-justice-political-life'
    ? ['quine', 'kuhn'] as const
    : ['peirce', 'frege', 'russell'] as const;
  return <MuseumHallSpatialRoot definition={definition}>
    {active && <ContemporaryHallLighting lighting={definition.layout.lighting}/>}
    <ContemporaryHallArchitecture definition={definition} onSceneGesture={onSceneGesture}/>
    <ContemporaryMuseumExhibits definition={definition} visibleExhibitIds={active ? undefined : inactiveIds} nearbyId={nearby?.hallId === definition.id ? nearby.exhibitId : undefined} onSelectExhibit={(exhibitId) => onSelectExhibit({hallId: definition.id, exhibitId})}/>
  </MuseumHallSpatialRoot>;
}
