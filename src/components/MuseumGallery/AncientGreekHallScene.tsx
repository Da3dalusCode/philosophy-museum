import {useMemo} from 'react';
import {Object3D} from 'three';
import type {MuseumExhibitLightDefinition} from '../../data/museum/museumWorldTypes';
import type {MuseumHallContentProps} from './museumWorldRegistry';
import {HallArchitecture} from './HallArchitecture';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
import {MuseumExhibits} from './MuseumExhibits';

function ExhibitSpotlight({definition}: {definition: MuseumExhibitLightDefinition}) {
  const target = useMemo(() => {
    const object = new Object3D();
    object.position.set(definition.target.x, definition.target.y, definition.target.z);
    return object;
  }, [definition.target.x, definition.target.y, definition.target.z]);

  return <>
    <primitive object={target}/>
    <spotLight
      position={[definition.position.x, definition.position.y, definition.position.z]}
      target={target}
      color="#fff0dc"
      intensity={definition.intensity}
      distance={definition.distance}
      angle={definition.angle}
      penumbra={definition.penumbra}
      decay={2}
      castShadow={false}
    />
  </>;
}

/** Hall-specific atmosphere and geometry; the persistent Canvas and player live in MuseumWorldScene. */
export function AncientGreekHallContent({definition, nearby, onSelectExhibit, onSceneGesture}: MuseumHallContentProps) {
  const {lighting} = definition.layout;
  return <>
    <color attach="background" args={['#d8d3ca']}/>
    <hemisphereLight args={['#fff8e8', '#48433d', lighting.hemisphereIntensity]}/>
    <ambientLight color="#fff5e5" intensity={lighting.ambientIntensity}/>
    <MuseumHallSpatialRoot definition={definition}>
      <directionalLight
        position={[14, 18, 28]}
        intensity={lighting.directionalIntensity}
        color="#fff0dc"
        castShadow={false}
      />
      {lighting.exhibitLights.map((light) => <ExhibitSpotlight key={light.id} definition={light}/>)}
      <HallArchitecture definition={definition} onSceneGesture={onSceneGesture}/>
      <MuseumExhibits
        definition={definition}
        nearbyId={nearby?.hallId === definition.id ? nearby.exhibitId : undefined}
        onSelectExhibit={(exhibitId) => onSelectExhibit({hallId: definition.id, exhibitId})}
      />
    </MuseumHallSpatialRoot>
  </>;
}
