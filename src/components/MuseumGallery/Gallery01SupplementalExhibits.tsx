import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {getGallery01ContextSupplementalExhibit} from '../../data/museum/gallery01SupplementalExhibits';
import {MEDITERRANEAN_PALETTE} from '../../data/museum/mediterraneanGalleryCuration';
import {MuseumSupplementalExhibitCollection} from './MuseumSupplementalExhibitCollection';
import {PlatoSupplementalExhibits} from './PlatoSupplementalExhibits';

const PLATO_WORK_IDS = new Set<MuseumSupplementalExhibitId>([
  'plato-cave-book-vii',
  'plato-republic',
]);

export function Gallery01SupplementalExhibits({
  layouts,
  nearbyId,
  onSelect,
}: {
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
}) {
  const platoLayouts = layouts.filter(({id}) => PLATO_WORK_IDS.has(id));
  const contextLayouts = layouts.filter(({id}) => !PLATO_WORK_IDS.has(id));
  return <group userData={{supplementalCollection: 'gallery-01-context-and-works-v2'}}>
    <MuseumSupplementalExhibitCollection
      collectionId="gallery-01-context-exhibits-v1"
      layouts={contextLayouts}
      nearbyId={nearbyId}
      ink={MEDITERRANEAN_PALETTE.ink}
      getExhibit={getGallery01ContextSupplementalExhibit}
      onSelect={onSelect}
    />
    <PlatoSupplementalExhibits
      layouts={platoLayouts}
      nearbyId={nearbyId}
      onSelect={onSelect}
    />
  </group>;
}
