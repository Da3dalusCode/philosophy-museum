import type {Object3D} from 'three';
import type {MuseumExhibitLightDefinition} from '../../data/museum/museumWorldTypes';
import type {MuseumHallContentProps} from './museumWorldRegistry';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
import {ContemporaryHallArchitecture} from './ContemporaryHallArchitecture';
import {ContemporaryMuseumExhibits} from './ContemporaryMuseumExhibits';

function ExhibitSpotlight({definition}: {definition: MuseumExhibitLightDefinition}) {
  return <spotLight position={[definition.position.x, definition.position.y, definition.position.z]} intensity={definition.intensity} distance={definition.distance} angle={definition.angle} penumbra={definition.penumbra} color="#fff0d7" castShadow={false} ref={(light) => {
    if (!light) return;
    const target = light.target as Object3D;
    target.position.set(definition.target.x, definition.target.y, definition.target.z);
    target.updateMatrixWorld();
  }}/>;
}

export function ModernityFreedomCritiqueHallContent({definition, active, nearby, onSelectExhibit, onSceneGesture}: MuseumHallContentProps) {
  return <MuseumHallSpatialRoot definition={definition}>
    {active && (
      <directionalLight position={[-8, 12, 8]} intensity={definition.layout.lighting.directionalIntensity} color="#fff4e2" castShadow={false}/>
    )}
    {active && definition.layout.lighting.exhibitLights.map((light) => <ExhibitSpotlight key={light.id} definition={light}/>)}
    <ContemporaryHallArchitecture definition={definition} onSceneGesture={onSceneGesture}/>
    <ContemporaryMuseumExhibits definition={definition} visibleExhibitIds={active ? undefined : ['kierkegaard', 'marx']} nearbyId={nearby?.hallId === definition.id ? nearby.exhibitId : undefined} onSelectExhibit={(exhibitId) => onSelectExhibit({hallId: definition.id, exhibitId})}/>
  </MuseumHallSpatialRoot>;
}
