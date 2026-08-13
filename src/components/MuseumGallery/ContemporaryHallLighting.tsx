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
      userData={{
        museumLightId: `exhibit:${definition.id}`,
        museumLightRole: 'resident-exhibit',
      }}
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

/** Stable, low-cost architectural light for a hall whose structure is permanent. */
export function ContemporaryHallBaseLighting({
  lighting,
  shadowsEnabled = false,
  shadowExtent = 18,
}: {
  lighting: MuseumLightingDefinition;
  shadowsEnabled?: boolean;
  shadowExtent?: number;
}) {
  const directionalTarget = useMemo(() => {
    const target = new Object3D();
    target.position.set(0, 1, 0);
    return target;
  }, []);

  return <>
    <primitive object={directionalTarget}/>
    <directionalLight
      position={[0, 24, 4]}
      target={directionalTarget}
      userData={{
        museumLightId: 'architectural-base',
        museumLightRole: 'architectural-overhead',
      }}
      intensity={lighting.directionalIntensity}
      color="#fff4e2"
      castShadow={shadowsEnabled}
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-camera-near={1}
      shadow-camera-far={64}
      shadow-camera-left={-shadowExtent}
      shadow-camera-right={shadowExtent}
      shadow-camera-top={shadowExtent}
      shadow-camera-bottom={-shadowExtent}
      shadow-bias={-.00012}
      shadow-normalBias={.035}
    />
  </>;
}

/** Detailed per-installation lights remain tied to active resident content. */
export function ContemporaryHallExhibitLighting({lighting}: {lighting: MuseumLightingDefinition}) {
  return <>
    {lighting.exhibitLights.map((light) => <ExhibitSpotlight key={light.id} definition={light}/>)}
  </>;
}

/** Keeps every light and target in the same hall-local transform. */
export function ContemporaryHallLighting({lighting}: {lighting: MuseumLightingDefinition}) {
  return <>
    <ContemporaryHallBaseLighting lighting={lighting}/>
    <ContemporaryHallExhibitLighting lighting={lighting}/>
  </>;
}
