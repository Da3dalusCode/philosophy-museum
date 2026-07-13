import {useMemo} from 'react';
import {Object3D} from 'three';
import type {MuseumExhibitLightDefinition} from '../../data/museum/museumWorldTypes';
import type {MuseumHallContentProps} from './museumWorldRegistry';
import {MedievalHallArchitecture} from './MedievalHallArchitecture';
import {MedievalWorldsExhibits} from './MedievalWorldsExhibits';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';

function ExhibitSpotlight({definition}: {definition: MuseumExhibitLightDefinition}) {
  const target = useMemo(() => {
    const object = new Object3D();
    object.position.set(definition.target.x, definition.target.y, definition.target.z);
    return object;
  }, [definition.target.x, definition.target.y, definition.target.z]);
  return <><primitive object={target}/><spotLight position={[definition.position.x, definition.position.y, definition.position.z]} target={target} color="#ffe8c5" intensity={definition.intensity} distance={definition.distance} angle={definition.angle} penumbra={definition.penumbra} decay={2} castShadow={false}/></>;
}

function MedievalKeyLight({intensity}: {intensity: number}) {
  const target = useMemo(() => {
    const object = new Object3D();
    object.position.set(0, 1.4, -27);
    return object;
  }, []);
  return <><primitive object={target}/><directionalLight position={[-12, 20, 24]} target={target} intensity={intensity} color="#f8dfbd" castShadow={false}/></>;
}

/** Medieval hall geometry only. The persistent Canvas, player, and global atmosphere are shared. */
export function MedievalWorldsHallContent({definition, active, nearby, onSelectExhibit, onSceneGesture}: MuseumHallContentProps) {
  return <MuseumHallSpatialRoot definition={definition}>
    {active && <MedievalKeyLight intensity={definition.layout.lighting.directionalIntensity}/>} 
    {active && definition.layout.lighting.exhibitLights.map((light) => <ExhibitSpotlight key={light.id} definition={light}/>)}
    <MedievalHallArchitecture definition={definition} onSceneGesture={onSceneGesture}/>
    <MedievalWorldsExhibits definition={definition} visibleExhibitIds={active ? undefined : ['augustine', 'boethius']} nearbyId={nearby?.hallId === definition.id ? nearby.exhibitId : undefined} onSelectExhibit={(exhibitId) => onSelectExhibit({hallId: definition.id, exhibitId})}/>
  </MuseumHallSpatialRoot>;
}
