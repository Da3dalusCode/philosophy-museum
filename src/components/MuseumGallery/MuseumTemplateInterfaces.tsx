import type {MuseumHallDefinition} from '../../data/museum/museumWorldTypes';

const THRESHOLD_LIGHT = '#fff1d5';

/**
 * Renders the standard threshold-light interface resolved by the hall-template
 * compiler. Inactive manifest slots deliberately have no luminous invitation.
 */
export function MuseumTemplateInterfaces({definition}: {definition: MuseumHallDefinition}) {
  const activePortals = definition.resolvedTemplate.portalInterfaces.filter(({active}) => active);
  return <group userData={{museumTemplateId: definition.resolvedTemplate.templateId}}>
    {activePortals.map((portal) => {
      const {position, width, depth} = portal.thresholdLightAnchor;
      const normalRunsAlongX = Math.abs(portal.inwardNormal.x) > .5;
      return <mesh
        key={portal.manifestSlotId}
        position={[position.x, position.y, position.z]}
        userData={{
          museumTemplatePortalId: portal.templateSlotId,
          museumManifestSlotId: portal.manifestSlotId,
          museumThresholdLight: true,
        }}
      >
        <boxGeometry args={normalRunsAlongX ? [depth, .045, width] : [width, .045, depth]}/>
        <meshBasicMaterial color={THRESHOLD_LIGHT} toneMapped={false}/>
      </mesh>;
    })}
  </group>;
}
