import {
  EAST_ASIAN_PALETTE,
  getEastAsianSupplementalExhibit,
} from '../../data/museum/eastAsianSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {MuseumSupplementalExhibitCollection} from './MuseumSupplementalExhibitCollection';

export function EastAsianSupplementalExhibits({
  layouts,
  nearbyId,
  onSelect,
}: {
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
}) {
  return <MuseumSupplementalExhibitCollection
    collectionId="gallery-11-east-asian-continuities-v1"
    ink={EAST_ASIAN_PALETTE.ink}
    layouts={layouts}
    nearbyId={nearbyId}
    getExhibit={getEastAsianSupplementalExhibit}
    onSelect={onSelect}
  />;
}
