import {useThree} from '@react-three/fiber';
import {useEffect, useState} from 'react';
import {
  LinearMipmapLinearFilter,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from 'three';
import {getMuseumAsset, museumAssetUrl} from '../../data/museum/museumAssets';
import type {MuseumMediaMountDefinition} from '../../data/museum/museumWorldTypes';
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
  const texture = usePlaqueTexture({title, kicker: 'Object image unavailable', subtitle, accent, width: 768, height: 512});
  return <meshStandardMaterial map={texture} roughness={.74} metalness={0} emissive="#111111" emissiveIntensity={.08}/>;
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
  return <group position={mount.position} userData={{mountId: mount.id, mountKind: mount.kind, anchorId: mount.anchorId}}>
    <MountSupport mount={mount} bronze={bronze}/>
    <group rotation={mount.rotation}>
      <mesh position={[0, 0, -mount.frameDepth / 2]}>
        <boxGeometry args={[mount.width + .18, mount.height + .18, mount.frameDepth]}/>
        <meshStandardMaterial color="#171b1d" roughness={.8} metalness={.12}/>
      </mesh>
      <mesh position={[0, mount.height / 2 + rail / 2, .01]}><boxGeometry args={[mount.width + .2, rail, .09]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.4}/></mesh>
      <mesh position={[0, -mount.height / 2 - rail / 2, .01]}><boxGeometry args={[mount.width + .2, rail, .09]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.4}/></mesh>
      <mesh position={[-mount.width / 2 - rail / 2, 0, .01]}><boxGeometry args={[rail, mount.height, .09]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.4}/></mesh>
      <mesh position={[mount.width / 2 + rail / 2, 0, .01]}><boxGeometry args={[rail, mount.height, .09]}/><meshStandardMaterial color={bronze} metalness={.62} roughness={.4}/></mesh>
      <mesh position={[0, 0, .061]}>
        <planeGeometry args={[mount.width, mount.height]}/>
        {textureState.texture
          ? <meshStandardMaterial map={textureState.texture} roughness={.72} metalness={0} emissive="#0b0b0b" emissiveIntensity={.06}/>
          : textureState.failed
            ? <MuseumFallbackMaterial title={asset.title} subtitle={asset.objectDate} accent={accent}/>
            : <meshStandardMaterial color="#151b1f" roughness={.8}/>
        }
      </mesh>
    </group>
  </group>;
}
