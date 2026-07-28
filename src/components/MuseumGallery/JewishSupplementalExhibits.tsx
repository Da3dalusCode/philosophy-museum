import {
  JEWISH_PALETTE,
  getJewishSupplementalExhibit,
} from '../../data/museum/jewishSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {MuseumSupplementalExhibitCollection} from './MuseumSupplementalExhibitCollection';

export function JewishSupplementalExhibits({
  layouts,
  nearbyId,
  onSelect,
}: {
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
}) {
  return <MuseumSupplementalExhibitCollection
    collectionId="gallery-12-jewish-philosophy-v1"
    ink={JEWISH_PALETTE.ink}
    layouts={layouts}
    nearbyId={nearbyId}
    getExhibit={getJewishSupplementalExhibit}
    onSelect={onSelect}
  />;
}
