import {useMemo} from 'react';
import {Object3D} from 'three';
import type {
  MuseumExhibitLightDefinition,
  MuseumLightingDefinition,
} from '../../data/museum/museumWorldTypes';

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
      intensity={definition.intensity}
      distance={definition.distance}
      angle={definition.angle}
      penumbra={definition.penumbra}
      color="#fff0d7"
      decay={2}
      castShadow={false}
    />
  </>;
}

/** Keeps every light and target in the same hall-local transform. */
export function ContemporaryHallLighting({lighting}: {lighting: MuseumLightingDefinition}) {
  const directionalTarget = useMemo(() => new Object3D(), []);

  return <>
    <primitive object={directionalTarget}/>
    <directionalLight
      position={[-8, 12, 8]}
      target={directionalTarget}
      intensity={lighting.directionalIntensity}
      color="#fff4e2"
      castShadow={false}
    />
    {lighting.exhibitLights.map((light) => <ExhibitSpotlight key={light.id} definition={light}/>)}
  </>;
}
