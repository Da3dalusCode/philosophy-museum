import {ExternalLink, ImageOff} from 'lucide-react';
import {useState, type CSSProperties} from 'react';
import {museumAssetUrl} from '../../data/museum/museumAssets';
import type {MuseumAssetRecord} from '../../data/museum/museumAssetTypes';

export function MuseumAssetImage({asset, priority = false}: {asset: MuseumAssetRecord; priority?: boolean}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="museum-asset-fallback" role="img" aria-label={`${asset.title} image unavailable`}><ImageOff aria-hidden="true"/><span>Object image unavailable</span></div>;
  return <img
    src={museumAssetUrl(asset.variants.panel)}
    width={asset.variants.panel.width}
    height={asset.variants.panel.height}
    alt={asset.alt}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    style={{'--museum-focal-x': `${(asset.focalPoint?.x ?? .5) * 100}%`, '--museum-focal-y': `${(asset.focalPoint?.y ?? .5) * 100}%`} as CSSProperties}
    onError={() => setFailed(true)}
  />;
}

export function MuseumSourceDetails({asset}: {asset: MuseumAssetRecord}) {
  return <details className="museum-object-source">
    <summary>Object record and image rights: “{asset.title}”</summary>
    <dl>
      <div><dt>Object</dt><dd>{asset.title}</dd></div>
      <div><dt>Creator / maker</dt><dd>{asset.creator}</dd></div>
      <div><dt>Date</dt><dd>{asset.objectDate}</dd></div>
      <div><dt>Collection</dt><dd>{asset.institution}</dd></div>
      {asset.imageCreator && <div><dt>Image</dt><dd>{asset.imageCreator}</dd></div>}
      <div><dt>Credit</dt><dd>{asset.attribution}</dd></div>
      <div><dt>{asset.rightsKind === 'license' ? 'Image license' : asset.rightsKind === 'dedication' ? 'Image dedication' : 'Image rights status'}</dt><dd>{asset.license}{asset.derivativeNotice ? ` · ${asset.derivativeNotice}` : ''}</dd></div>
      <div><dt>Historical status</dt><dd>{asset.historicalNote}</dd></div>
    </dl>
    <div className="museum-source-links">
      {asset.objectPageUrl && <a href={asset.objectPageUrl} target="_blank" rel="noreferrer">Institution record <ExternalLink size={14}/></a>}
      <a href={asset.sourcePageUrl} target="_blank" rel="noreferrer">Exact media source <ExternalLink size={14}/></a>
      {asset.licenseUrl && <a href={asset.licenseUrl} target="_blank" rel="noreferrer">{asset.license} <ExternalLink size={14}/></a>}
    </div>
  </details>;
}
