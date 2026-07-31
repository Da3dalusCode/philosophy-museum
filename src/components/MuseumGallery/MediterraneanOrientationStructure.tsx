import {
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  MEDITERRANEAN_PALETTE,
} from '../../data/museum/mediterraneanGalleryCuration';
import {VISITOR_MAP_FRAME_MATERIAL} from './MuseumVisitorMapKiosk';

/** The authored Gallery 01 orientation body without generated or scene media. */
export function MediterraneanOrientationStructure() {
  const display = MEDITERRANEAN_ORIENTATION_DISPLAY;
  const panelHeight = 2.8;
  return <group
    position={[display.center.x, 0, display.center.z]}
    rotation={[0, display.rotation, 0]}
    userData={{museumOrientationStructure: display.id}}
  >
    <mesh position={[0, 1.72, -.07]}>
      <boxGeometry args={[display.size.width + .18, panelHeight + .18, .24]}/>
      {[0, 1, 2, 3, 5].map((materialIndex) => <meshStandardMaterial
        key={materialIndex}
        attach={`material-${materialIndex}`}
        {...VISITOR_MAP_FRAME_MATERIAL}
      />)}
      <meshStandardMaterial
        attach="material-4"
        color={MEDITERRANEAN_PALETTE.limestone}
        roughness={.84}
      />
    </mesh>
    <mesh position={[0, .18, 0]}>
      <boxGeometry args={[display.size.width * .86, .24, display.size.depth]}/>
      <meshStandardMaterial
        color={MEDITERRANEAN_PALETTE.bronze}
        roughness={.7}
        metalness={.12}
      />
    </mesh>
  </group>;
}
