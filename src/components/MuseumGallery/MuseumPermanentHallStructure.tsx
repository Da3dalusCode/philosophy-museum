import {MUSEUM_PERMANENT_STRUCTURAL_HALLS} from '../../data/museum/museumBuildingRuntime';
import {ContemporaryHallArchitecture} from './ContemporaryHallArchitecture';
import {ContemporaryHallBaseLighting} from './ContemporaryHallLighting';
import {MediterraneanOrientationStructure} from './MediterraneanOrientationStructure';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
import {MuseumPrimaryExhibitStructures} from './MuseumPrimaryExhibitStructure';

const MEDITERRANEAN_GALLERY_ID = 'mediterranean-beginnings-classical';

/**
 * The two-hall pilot's authored physical truth lives outside lazy content
 * registration. Nothing in this subtree imports scene media or interactions.
 */
export function MuseumPermanentHallStructure({
  activeHallId,
  onSceneGesture,
}: {
  activeHallId: string;
  onSceneGesture: () => void;
}) {
  return <group userData={{museumStructuralResidency: 'permanent-pilot'}}>
    {MUSEUM_PERMANENT_STRUCTURAL_HALLS.map((hall) => <MuseumHallSpatialRoot
      key={hall.hallId}
      definition={hall.definition}
    >
      <group userData={{museumStructuralResidencyHallId: hall.hallId}}>
        <ContemporaryHallArchitecture
          definition={hall.definition}
          architectureWalls={hall.definition.architectureWalls}
          ownedPortalIds={new Set(hall.ownedPortalIds)}
          onSceneGesture={onSceneGesture}
        />
        <MuseumPrimaryExhibitStructures definition={hall.definition}/>
        {hall.hallId === MEDITERRANEAN_GALLERY_ID
          && <MediterraneanOrientationStructure/>}
        {hall.hallId === activeHallId
          && <ContemporaryHallBaseLighting lighting={hall.definition.layout.lighting}/>}
      </group>
    </MuseumHallSpatialRoot>)}
  </group>;
}
