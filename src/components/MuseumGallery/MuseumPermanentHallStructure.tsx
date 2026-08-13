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
  shadowKeyReserved,
  shadowsEnabled,
  onSceneGesture,
}: {
  activeHallId: string;
  shadowKeyReserved: boolean;
  shadowsEnabled: boolean;
  onSceneGesture: () => void;
}) {
  return <group userData={{museumStructuralResidency: 'permanent-world'}}>
    {MUSEUM_PERMANENT_STRUCTURAL_HALLS.map((hall) => {
      // Circulation nodes may keep the logical hall's light for a stable seam,
      // but a node with its own architectural key must be the sole shadow owner.
      const ownsShadowKey = hall.hallId === activeHallId && !shadowKeyReserved;
      const {minX, maxX, minZ, maxZ} = hall.definition.layout.bounds;
      const shadowExtent = Math.ceil(Math.hypot(
        Math.max(Math.abs(minX), Math.abs(maxX)),
        Math.max(Math.abs(minZ), Math.abs(maxZ)),
      )) + 2;
      return <MuseumHallSpatialRoot key={hall.hallId} definition={hall.definition}>
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
            shadowed={shadowsEnabled && ownsShadowKey}
          />
          {hall.hallId === MEDITERRANEAN_GALLERY_ID
            && <MediterraneanOrientationStructure/>}
          {ownsShadowKey
            && <ContemporaryHallBaseLighting
              lighting={hall.definition.layout.lighting}
              shadowsEnabled={shadowsEnabled}
              shadowExtent={shadowExtent}
            />}
        </group>
      </MuseumHallSpatialRoot>;
    })}
  </group>;
}
