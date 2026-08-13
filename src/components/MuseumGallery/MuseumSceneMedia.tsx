import {useThree} from '@react-three/fiber';
import {useEffect, useState} from 'react';
import {
  LinearFilter,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from 'three';
import {
  MUSEUM_FRAME_RAIL_FRONT_Z,
  MUSEUM_SCENE_IMAGE_PLANE_Z,
  MUSEUM_SCENE_MEDIA_LOADING_COLOR,
} from '../../data/museum/museumMediaPolicy';
import {getMuseumAsset, museumAssetUrl} from '../../data/museum/museumAssets';
import {
  MUSEUM_TEXTURE_SPECS,
  museumTextureDimensionsForPlane,
} from '../../data/museum/museumTexturePolicy';
import type {MuseumMediaMountDefinition} from '../../data/museum/museumWorldTypes';
import {usePlaqueTexture} from './plaqueTextures';

type TextureState =
  | {status: 'loading'}
  | {status: 'ready'; texture: Texture}
  | {status: 'failed'};

const useIsolatedMuseumTexture = (url: string): TextureState => {
  const {gl, invalidate} = useThree();
  const [state, setState] = useState<TextureState>({status: 'loading'});
  useEffect(() => {
    let disposed = false;
    let loaded: Texture | undefined;
    setState({status: 'loading'});
    try {
      new TextureLoader().load(
        url,
        (sourceTexture) => {
          if (disposed) {
            sourceTexture.dispose();
            return;
          }
          const texture = sourceTexture;
          loaded = texture;
          texture.colorSpace = SRGBColorSpace;
          texture.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
          // Scene variants are deliberately non-power-of-two. Linear filtering without
          // mipmaps stays complete on WebGL 1 and WebGL 2 instead of sampling as black.
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          setState({status: 'ready', texture});
        },
        undefined,
        () => {
          if (!disposed) {
            setState({status: 'failed'});
          }
        },
      );
    } catch {
      setState({status: 'failed'});
    }
    return () => {
      disposed = true;
      loaded?.dispose();
    };
  }, [gl, url]);
  useEffect(() => {
    invalidate();
  }, [invalidate, state]);
  return state;
};

function MuseumFallbackMaterial({title, subtitle, accent, planeWidth, planeHeight}: {
  title: string;
  subtitle: string;
  accent: string;
  planeWidth: number;
  planeHeight: number;
}) {
  const textureSize = museumTextureDimensionsForPlane(
    planeWidth,
    planeHeight,
    {
      width: MUSEUM_TEXTURE_SPECS.sceneFallback.width,
      height: MUSEUM_TEXTURE_SPECS.sceneFallback.height,
      mipmaps: MUSEUM_TEXTURE_SPECS.sceneFallback.mipmaps,
    },
  );
  const texture = usePlaqueTexture({
    title,
    kicker: 'Object image unavailable',
    subtitle,
    accent,
    width: textureSize.width,
    height: textureSize.height,
  });
  return <meshBasicMaterial map={texture} toneMapped={false}/>;
}

function MountSupport({mount, bronze}: {mount: MuseumMediaMountDefinition; bronze: string}) {
  if (mount.kind === 'wall-frame') return <group>
    {[-mount.width * .32, mount.width * .32].map((x) => <mesh key={x} position={[x, 0, -.17]}>
      <boxGeometry args={[.055, mount.height * .72, .28]}/>
      <meshStandardMaterial color={bronze} metalness={.66} roughness={.4}/>
    </mesh>)}
  </group>;

  const postY = -mount.height / 2 - mount.supportHeight / 2;
  const footY = -mount.height / 2 - mount.supportHeight;
  if (mount.kind === 'lectern') return <group>
    <mesh position={[0, postY, -.05]}><boxGeometry args={[.09, mount.supportHeight, .09]}/><meshStandardMaterial color={bronze} metalness={.65} roughness={.42}/></mesh>
    <mesh position={[0, footY, .02]}><boxGeometry args={[.56, .08, .42]}/><meshStandardMaterial color={bronze} metalness={.58} roughness={.48}/></mesh>
    <mesh position={[0, -mount.height / 2 - .02, .02]} rotation={[-.35, 0, 0]}><boxGeometry args={[mount.width * .72, .07, .32]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.42}/></mesh>
  </group>;

  return <group>
    {[-mount.width * .31, mount.width * .31].map((x) => <mesh key={x} position={[x, postY, -.04]}>
      <boxGeometry args={[.075, mount.supportHeight, .075]}/>
      <meshStandardMaterial color={bronze} metalness={.62} roughness={.44}/>
    </mesh>)}
    {[-mount.width * .31, mount.width * .31].map((x) => <mesh key={`foot-${x}`} position={[x, footY, .02]}>
      <boxGeometry args={[.32, .07, .42]}/>
      <meshStandardMaterial color={bronze} metalness={.56} roughness={.48}/>
    </mesh>)}
  </group>;
}

export function MuseumSceneMedia({mount, nearby, accent}: {
  mount: MuseumMediaMountDefinition;
  nearby: boolean;
  accent: string;
}) {
  const asset = getMuseumAsset(mount.assetId);
  const textureState = useIsolatedMuseumTexture(museumAssetUrl(asset.variants.scene));
  const bronze = nearby ? accent : '#675039';
  const rail = .065;
  const railDepth = .09;
  const railCenterZ = MUSEUM_FRAME_RAIL_FRONT_Z - railDepth / 2;
  return <group position={mount.position} userData={{mountId: mount.id, mountKind: mount.kind, anchorId: mount.anchorId}}>
    <MountSupport mount={mount} bronze={bronze}/>
    <group rotation={mount.rotation}>
      <mesh position={[0, 0, -mount.frameDepth / 2]}>
        <boxGeometry args={[mount.width + .18, mount.height + .18, mount.frameDepth]}/>
        <meshStandardMaterial color="#171b1d" roughness={.8} metalness={.12}/>
      </mesh>
      <mesh position={[0, mount.height / 2 + rail / 2, railCenterZ]}><boxGeometry args={[mount.width + .2, rail, railDepth]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.4}/></mesh>
      <mesh position={[0, -mount.height / 2 - rail / 2, railCenterZ]}><boxGeometry args={[mount.width + .2, rail, railDepth]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.4}/></mesh>
      <mesh position={[-mount.width / 2 - rail / 2, 0, railCenterZ]}><boxGeometry args={[rail, mount.height, railDepth]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.4}/></mesh>
      <mesh position={[mount.width / 2 + rail / 2, 0, railCenterZ]}><boxGeometry args={[rail, mount.height, railDepth]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.4}/></mesh>
      <mesh position={[0, 0, MUSEUM_SCENE_IMAGE_PLANE_Z]}>
        <planeGeometry args={[mount.width, mount.height]}/>
        {textureState.status === 'ready'
          ? <meshBasicMaterial key="scene-ready" map={textureState.texture} toneMapped={false}/>
          : textureState.status === 'failed'
            ? <MuseumFallbackMaterial
              key="scene-failed"
              title={asset.title}
              subtitle={asset.objectDate}
              accent={accent}
              planeWidth={mount.width}
              planeHeight={mount.height}
            />
            : <meshBasicMaterial key="scene-loading" color={MUSEUM_SCENE_MEDIA_LOADING_COLOR} toneMapped={false}/>
        }
      </mesh>
    </group>
  </group>;
}
