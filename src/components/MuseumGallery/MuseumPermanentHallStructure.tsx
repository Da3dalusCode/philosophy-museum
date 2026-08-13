import {MUSEUM_PERMANENT_STRUCTURAL_HALLS} from '../../data/museum/museumBuildingRuntime';
import {museumHallHasPermanentSignFaces} from '../../data/museum/museumStructuralResidency';
import {ContemporaryHallArchitecture} from './ContemporaryHallArchitecture';
import {ContemporaryHallBaseLighting} from './ContemporaryHallLighting';
import {MediterraneanOrientationStructure} from './MediterraneanOrientationStructure';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
import {MuseumPrimaryExhibitStructures} from './MuseumPrimaryExhibitStructure';

const MEDITERRANEAN_GALLERY_ID = 'mediterranean-beginnings-classical';

/**
 * Every canonical hall's authored physical truth lives outside lazy content
 * registration. Nothing in this subtree imports scene media or interactions.
 */
export function MuseumPermanentHallStructure({
  activeHallId,
  shadowsEnabled,
  onSceneGesture,
}: {
  activeHallId: string;
  shadowsEnabled: boolean;
  onSceneGesture: () => void;
}) {
  return <group userData={{museumStructuralResidency: 'permanent-world'}}>
    {MUSEUM_PERMANENT_STRUCTURAL_HALLS.map((hall) => <MuseumHallSpatialRoot
      key={hall.hallId}
      definition={hall.definition}
    >
      <group userData={{museumStructuralResidencyHallId: hall.hallId}}>
        <ContemporaryHallArchitecture
          definition={hall.definition}
          architectureWalls={hall.definition.architectureWalls}
          ownedPortalIds={new Set(hall.ownedPortalIds)}
          includeSignFaces={museumHallHasPermanentSignFaces(hall.hallId)}
          onSceneGesture={onSceneGesture}
        />
        <MuseumPrimaryExhibitStructures
          definition={hall.definition}
          shadowed={shadowsEnabled && hall.hallId === activeHallId}
        />
        {hall.hallId === MEDITERRANEAN_GALLERY_ID
          && <MediterraneanOrientationStructure/>}
        {hall.hallId === activeHallId
          && <ContemporaryHallBaseLighting
            lighting={hall.definition.layout.lighting}
            shadowsEnabled={shadowsEnabled}
          />}
      </group>
    </MuseumHallSpatialRoot>)}
  </group>;
}
