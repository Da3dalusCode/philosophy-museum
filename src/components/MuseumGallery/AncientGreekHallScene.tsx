import type {MuseumHallContentProps} from './museumWorldRegistry';
import {HallArchitecture} from './HallArchitecture';
import {MuseumHallSpatialRoot} from './MuseumHallSpatialRoot';
import {MuseumExhibits} from './MuseumExhibits';

/** Hall-specific atmosphere and geometry; the persistent Canvas and player live in MuseumWorldScene. */
export function AncientGreekHallContent({definition, nearby, onSelectExhibit}: MuseumHallContentProps) {
  return <>
    <color attach="background" args={['#080c10']}/>
    <fog attach="fog" args={['#080c10', 23, 73]}/>
    <hemisphereLight args={['#d9e1de', '#121719', .44]}/>
    <ambientLight intensity={.1}/>
    <MuseumHallSpatialRoot definition={definition}>
      <directionalLight position={[5, 10, 14]} intensity={1.02} color="#f1dfbf" castShadow={false}/>
      <pointLight position={[0, 5.7, 19]} color="#8eb3d0" intensity={13} distance={18} decay={2}/>
      <pointLight position={[0, 5.7, -3]} color="#bd795d" intensity={12} distance={20} decay={2}/>
      <pointLight position={[0, 5.7, -24]} color="#8c79b1" intensity={14} distance={16} decay={2}/>
      <pointLight position={[-7.4, 4.1, 17]} color="#f0d8b6" intensity={7} distance={7} decay={2}/>
      <pointLight position={[7.4, 4.1, -5]} color="#ecd0ae" intensity={7} distance={7} decay={2}/>
      <HallArchitecture definition={definition}/>
      <MuseumExhibits
        definition={definition}
        nearbyId={nearby?.hallId === definition.id ? nearby.exhibitId : undefined}
        onSelectExhibit={(exhibitId) => onSelectExhibit({hallId: definition.id, exhibitId})}
      />
    </MuseumHallSpatialRoot>
  </>;
}
