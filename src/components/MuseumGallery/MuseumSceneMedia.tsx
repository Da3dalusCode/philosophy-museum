import {useThree} from '@react-three/fiber';
import {useEffect, useMemo, useState} from 'react';
import {
  LinearMipmapLinearFilter,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from 'three';
import {getMuseumAsset, museumAssetUrl} from '../../data/museum/museumAssets';
import type {MuseumAssetId} from '../../data/museum/museumAssetTypes';
import {usePlaqueTexture} from './plaqueTextures';

type TextureState = {texture?: Texture; failed: boolean};

const useIsolatedMuseumTexture = (url: string): TextureState => {
  const {gl, invalidate} = useThree();
  const [state, setState] = useState<TextureState>({failed: false});
  useEffect(() => {
    let disposed = false;
    let loaded: Texture | undefined;
    setState({failed: false});
    try {
      new TextureLoader().load(
        url,
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          loaded = texture;
          texture.colorSpace = SRGBColorSpace;
          texture.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
          texture.minFilter = LinearMipmapLinearFilter;
          texture.generateMipmaps = true;
          texture.needsUpdate = true;
          setState({texture, failed: false});
          invalidate();
        },
        undefined,
        () => {
          if (!disposed) {
            setState({failed: true});
            invalidate();
          }
        },
      );
    } catch {
      setState({failed: true});
      invalidate();
    }
    return () => {
      disposed = true;
      loaded?.dispose();
    };
  }, [gl, invalidate, url]);
  return state;
};

function MuseumFallbackMaterial({title, subtitle, accent}: {title: string; subtitle: string; accent: string}) {
  const texture = usePlaqueTexture({
    title,
    kicker: 'Object image unavailable',
    subtitle,
    accent,
    width: 768,
    height: 512,
  });
  return <meshBasicMaterial map={texture} toneMapped={false}/>;
}

export function MuseumSceneMedia({
  assetId,
  width,
  maxHeight,
  position,
  rotation = [0, 0, 0],
  nearby,
  accent,
}: {
  assetId: MuseumAssetId;
  width: number;
  maxHeight: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  nearby: boolean;
  accent: string;
}) {
  const asset = getMuseumAsset(assetId);
  const url = museumAssetUrl(asset.variants.scene);
  const textureState = useIsolatedMuseumTexture(url);
  const height = useMemo(() => Math.min(
    maxHeight,
    width * asset.variants.scene.height / asset.variants.scene.width,
  ), [asset.variants.scene.height, asset.variants.scene.width, maxHeight, width]);
  return <group position={position} rotation={rotation}>
    <mesh position={[0, 0, -.055]}>
      <boxGeometry args={[width + .15, height + .15, .1]}/>
      <meshStandardMaterial color={nearby ? accent : '#5f4b35'} metalness={.62} roughness={.4} emissive={accent} emissiveIntensity={nearby ? .14 : .015}/>
    </mesh>
    <mesh position={[0, 0, .012]}>
      <planeGeometry args={[width, height]}/>
      {textureState.texture
        ? <meshBasicMaterial map={textureState.texture} toneMapped={false}/>
        : textureState.failed
          ? <MuseumFallbackMaterial title={asset.title} subtitle={asset.objectDate} accent={accent}/>
          : <meshStandardMaterial color="#151b1f" roughness={.8}/>
      }
    </mesh>
  </group>;
}
