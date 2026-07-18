import type {MediterraneanVisualKind} from '../../data/museum/mediterraneanGalleryCuration';

const bronze = '#9d7748';
const stone = '#d6cbb7';
const ink = '#20272a';

function AtomField({archive = false}: {archive?: boolean}) {
  const points = [
    [-.34, .42, .12], [-.08, .58, .05], [.22, .38, .16], [.36, .65, .03],
    [-.28, .75, .02], [.03, .88, .1], [.3, .92, .08],
  ] as const;
  return <group>
    {archive && [-.18, 0, .18].map((x, index) => <mesh key={x} position={[x, .57 + index * .03, -.08 - index * .025]} rotation={[0, 0, -.08 + index * .08]}>
      <boxGeometry args={[.33, .68, .035]}/><meshStandardMaterial color={index === 1 ? '#b9aa90' : '#84745d'} roughness={.92}/>
    </mesh>)}
    {points.map(([x, y, z], index) => <mesh key={`${x}-${y}`} position={[x, y, z]}>
      <sphereGeometry args={[index % 3 === 0 ? .095 : .07, 14, 10]}/>
      <meshStandardMaterial color={index % 2 ? bronze : ink} roughness={.48} metalness={.34}/>
    </mesh>)}
  </group>;
}

function HarmonicBars({numberOnly = false}: {numberOnly?: boolean}) {
  const heights = numberOnly ? [.28, .42, .56, .7] : [.32, .5, .69, .5, .32];
  return <group>{heights.map((height, index) => {
    const x = (index - (heights.length - 1) / 2) * .19;
    return <mesh key={`${height}-${index}`} position={[x, .34 + height / 2, .08]}>
      <boxGeometry args={[.075, height, .075]}/>
      <meshStandardMaterial color={index % 2 ? bronze : '#647f86'} roughness={.42} metalness={.45}/>
    </mesh>;
  })}</group>;
}

/** Code-native interpretive objects avoid invented portraits while giving early arguments visual form. */
export function MediterraneanExhibitObject({kind, exhibitId, nearby}: {
  kind: MediterraneanVisualKind;
  exhibitId: string;
  nearby: boolean;
}) {
  const glow = nearby ? '#d59b54' : bronze;
  if (kind === 'water') return <group userData={{interpretiveObject: 'water-as-explanatory-principle'}}>
    {[.28, .45, .62].map((radius, index) => <mesh key={radius} position={[0, .48 + index * .08, .08]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, .028, 8, 28]}/><meshStandardMaterial color={index === 2 ? glow : '#5f8f9d'} roughness={.35} metalness={.35}/>
    </mesh>)}
  </group>;
  if (kind === 'boundless') return <group userData={{interpretiveObject: 'the-indefinite'}}>
    {[.22, .38, .56].map((radius, index) => <mesh key={radius} position={[0, .68, .08]} rotation={[0, index * .35, 0]}>
      <torusGeometry args={[radius, .035, 8, 32]}/><meshStandardMaterial color={index === 1 ? '#718b90' : glow} roughness={.38} metalness={.4}/>
    </mesh>)}
  </group>;
  if (kind === 'air') return <group userData={{interpretiveObject: 'rarefaction-and-condensation'}}>
    {[[-.26, .55, .18, .22], [.04, .72, .1, .31], [.3, .52, .16, .17]].map(([x, y, z, radius], index) => <mesh key={index} position={[x, y, z]} scale={[1.35, .75, 1]}>
      <sphereGeometry args={[radius, 16, 12]}/><meshStandardMaterial color={index === 1 ? '#acc4c6' : '#718e94'} transparent opacity={.72} roughness={.28}/>
    </mesh>)}
  </group>;
  if (kind === 'number') return <HarmonicBars numberOnly/>;
  if (kind === 'harmony') return <group userData={{interpretiveObject: 'limit-and-harmony'}}>
    <HarmonicBars/>
    <mesh position={[0, .62, .09]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.48, .025, 8, 30]}/><meshStandardMaterial color={glow} metalness={.45} roughness={.35}/></mesh>
  </group>;
  if (kind === 'being') return <group userData={{interpretiveObject: 'being-and-appearance'}}>
    <mesh position={[0, .65, .08]}><sphereGeometry args={[.43, 24, 18]}/><meshStandardMaterial color={stone} roughness={.82}/></mesh>
    <mesh position={[0, .65, .08]} rotation={[Math.PI / 2, .25, 0]}><torusGeometry args={[.54, .026, 8, 32]}/><meshStandardMaterial color={glow} metalness={.52} roughness={.3}/></mesh>
  </group>;
  if (kind === 'paradox') return <group userData={{interpretiveObject: 'motion-paradox'}}>
    {[0, 1, 2, 3].map((index) => <mesh key={index} position={[-.4 + index * .24, .42 + index * .14, .1]}>
      <boxGeometry args={[.18 - index * .025, .1, .1]}/><meshStandardMaterial color={index === 3 ? glow : '#6c7e81'} roughness={.4} metalness={.42}/>
    </mesh>)}
    <mesh position={[.5, .86, .1]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[.11, .28, 4]}/><meshStandardMaterial color={glow} roughness={.35} metalness={.5}/></mesh>
  </group>;
  if (kind === 'atoms-archive') return <AtomField archive/>;
  if (kind === 'atoms') return <AtomField/>;
  if (kind === 'change') return <group userData={{interpretiveObject: 'change-and-logos'}}>
    <mesh position={[0, .68, .08]} rotation={[Math.PI / 2, 0, 0]}><torusKnotGeometry args={[.34, .075, 72, 10, 2, 3]}/><meshStandardMaterial color={glow} roughness={.35} metalness={.38}/></mesh>
  </group>;
  if (kind === 'elements') return <group userData={{interpretiveObject: 'four-roots-and-forces'}}>
    {[
      [-.25, .52, '#668da0'], [.25, .52, '#b16043'], [-.25, .88, '#a88e56'], [.25, .88, '#8b806d'],
    ].map(([x, y, color], index) => <mesh key={index} position={[Number(x), Number(y), .1]}>
      <sphereGeometry args={[.17, 16, 12]}/><meshStandardMaterial color={String(color)} roughness={.55} metalness={.1}/>
    </mesh>)}
  </group>;
  if (kind === 'ordering-mind') return <group userData={{interpretiveObject: 'mixture-and-ordering-mind'}}>
    <AtomField/>
    <mesh position={[0, .72, .22]}><cylinderGeometry args={[.035, .035, .92, 10]}/><meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={.18} metalness={.55} roughness={.3}/></mesh>
  </group>;
  if (kind === 'civic-speech') return <group userData={{interpretiveObject: 'speech-and-civic-judgment'}}>
    {[-.22, .22].map((x, index) => <mesh key={x} position={[x, .66, .08]} rotation={[0, index ? Math.PI : 0, 0]}>
      <torusGeometry args={[.28, .055, 8, 26, Math.PI * 1.35]}/><meshStandardMaterial color={index ? glow : '#657e88'} roughness={.4} metalness={.35}/>
    </mesh>)}
  </group>;
  if (kind === 'examined-life') return <group userData={{interpretiveObject: 'question-and-examination'}}>
    <mesh position={[0, .68, .1]}><torusGeometry args={[.35, .055, 10, 32]}/><meshStandardMaterial color={glow} roughness={.36} metalness={.5}/></mesh>
    <mesh position={[0, .68, .1]} rotation={[0, 0, .7]}><boxGeometry args={[.06, .75, .06]}/><meshStandardMaterial color="#657e88" roughness={.42} metalness={.42}/></mesh>
  </group>;
  if (kind === 'academy') return <group userData={{interpretiveObject: 'academy-lineage'}}>
    {[-.34, 0, .34].map((x) => <mesh key={x} position={[x, .58, .08]}><cylinderGeometry args={[.055, .07, .7, 12]}/><meshStandardMaterial color={stone} roughness={.76}/></mesh>)}
    <mesh position={[0, .98, .08]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[.5, .13, 3]}/><meshStandardMaterial color={glow} roughness={.45} metalness={.24}/></mesh>
  </group>;
  if (kind === 'lyceum') return <group userData={{interpretiveObject: 'lyceum-classification'}}>
    <mesh position={[0, .62, .08]}><cylinderGeometry args={[.05, .07, .82, 10]}/><meshStandardMaterial color={glow} roughness={.4} metalness={.48}/></mesh>
    {[[-.22, .88, -.55], [.22, .88, .55], [-.31, .63, -.75], [.31, .63, .75]].map(([x, y, angle], index) => <mesh key={index} position={[x, y, .08]} rotation={[0, 0, angle]}>
      <cylinderGeometry args={[.035, .045, .48, 9]}/><meshStandardMaterial color={index < 2 ? '#71878b' : stone} roughness={.52} metalness={.22}/>
    </mesh>)}
  </group>;
  return <group userData={{interpretiveObject: exhibitId === 'ancient-greek' ? 'route-ahead' : 'historical-presence'}}>
    {[-.28, 0, .28].map((x, index) => <group key={x} position={[x, .65, .08]}>
      <mesh position={[0, .18, 0]}><sphereGeometry args={[.13, 16, 12]}/><meshStandardMaterial color={index === 1 ? glow : '#71878b'} roughness={.6}/></mesh>
      <mesh position={[0, -.12, 0]}><cylinderGeometry args={[.11, .16, .42, 12]}/><meshStandardMaterial color={index === 1 ? stone : '#81745f'} roughness={.72}/></mesh>
    </group>)}
  </group>;
}
