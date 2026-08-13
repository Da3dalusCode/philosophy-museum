import type {
  MuseumAmbientDiffuserDefinition,
  MuseumExhibitLayout,
  MuseumLightingFixtureDefinition,
  MuseumRoomLightingPlan,
  MuseumSpatialCell,
  MuseumSupplementalExhibitLayout,
  MuseumTrackDefinition,
} from './museumWorldTypes';

export const GALLERY_01_LIGHTING_PROTOTYPE_ID = 'gallery-01-option-a' as const;
export const GALLERY_02_LIGHTING_PROTOTYPE_ID = 'gallery-02-option-a' as const;

const GALLERY_01_ID = 'mediterranean-beginnings-classical';
const GALLERY_02_ID = 'hellenistic-roman-ways';
const HALF_PI = Math.PI / 2;

type PrototypeTargetSpec = Readonly<{
  sourceId: string;
  spatialCellId: string;
  x: number;
  z: number;
  rotationY: number;
  anchor?: boolean;
}>;

const primary = (
  id: string,
  spatialCellId: string,
  x: number,
  z: number,
  rotationY: number,
  anchor = false,
): PrototypeTargetSpec => ({sourceId: `primary:${id}`, spatialCellId, x, z, rotationY, anchor});

const supplemental = (
  id: string,
  spatialCellId: string,
  x: number,
  z: number,
  rotationY: number,
): PrototypeTargetSpec => ({sourceId: `supplemental:${id}`, spatialCellId, x, z, rotationY});

/** Exact installed Gallery 01 program: 22 primaries plus five supplementals. */
export const GALLERY_01_LIGHTING_TARGETS = [
  primary('ancient-greek', 'med-orientation-nature', 10.85, 21, -HALF_PI, true),
  primary('thales', 'med-orientation-nature', -4.925, 26.85, Math.PI, true),
  primary('anaximander', 'med-orientation-nature', -10.85, 21, HALF_PI, true),
  primary('anaximenes', 'med-orientation-nature', -4.925, 15.15, 0),
  supplemental('miletus-ionian-coast', 'med-orientation-nature', 5.885, 26.88, Math.PI),
  supplemental('greek-philosophy-reception', 'med-orientation-nature', 5.885, 15.12, 0),

  primary('pythagoras', 'med-being-change-plurality', -4.925, 12.85, Math.PI, true),
  primary('philolaus', 'med-being-change-plurality', -10.85, 8.8, HALF_PI),
  primary('parmenides', 'med-being-change-plurality', -10.85, 5.2, HALF_PI, true),
  primary('zeno-elea', 'med-being-change-plurality', -4.925, 1.15, 0),
  primary('heraclitus', 'med-being-change-plurality', 4.925, 12.85, Math.PI, true),
  primary('empedocles', 'med-being-change-plurality', 10.85, 10.5, -HALF_PI),
  primary('anaxagoras', 'med-being-change-plurality', 10.85, 7, -HALF_PI),
  primary('democritus', 'med-being-change-plurality', 10.85, 3.5, -HALF_PI, true),
  primary('leucippus', 'med-being-change-plurality', 4.925, 1.15, 0),

  primary('protagoras', 'med-sophists-socratic', -10.85, -7, HALF_PI, true),
  primary('prodicus', 'med-sophists-socratic', -5.3, -12.85, 0),
  primary('hippias-of-elis', 'med-sophists-socratic', -4.925, -1.15, Math.PI),
  primary('gorgias', 'med-sophists-socratic', 5.425, -1.15, Math.PI, true),
  primary('socrates', 'med-sophists-socratic', 10.85, -7, -HALF_PI, true),
  supplemental('socrates-trial-death', 'med-sophists-socratic', 5.885, -12.88, 0),

  primary('platonism', 'med-plato-aristotle', -5.885, -15.12, Math.PI),
  primary('plato', 'med-plato-aristotle', -10.85, -21, HALF_PI, true),
  primary('aristotelianism', 'med-plato-aristotle', 5.885, -15.12, Math.PI),
  primary('aristotle', 'med-plato-aristotle', 10.85, -21, -HALF_PI, true),
  supplemental('plato-republic', 'med-plato-aristotle', 5.425, -26.85, 0),
  supplemental('plato-cave-book-vii', 'med-plato-aristotle', -5.425, -26.85, 0),
] as const satisfies readonly PrototypeTargetSpec[];

/** Exact installed Gallery 02 program: 18 primaries plus seven supplementals. */
export const GALLERY_02_LIGHTING_TARGETS = [
  primary('cynicism', 'hell-cynic-way', -9, -12.8, 0, true),
  primary('antisthenes', 'hell-cynic-way', -12.8, -9, HALF_PI),
  primary('diogenes', 'hell-cynic-way', -5.2, -11, -HALF_PI),
  supplemental('cynic-frank-speech-in-public', 'hell-cynic-way', -3, -11, HALF_PI),
  supplemental('cynic-hipparchia-crates', 'hell-cynic-way', -11, -5.2, Math.PI),
  supplemental('cynic-cosmopolitan-constellation', 'hell-cynic-way', -11, -3, 0),

  primary('epicureanism', 'hell-epicurean-garden', 9, -12.8, 0, true),
  primary('epicurus', 'hell-epicurean-garden', 12.8, -9, -HALF_PI, true),
  primary('lucretius', 'hell-epicurean-garden', 5.2, -11, HALF_PI),
  supplemental('epicurean-fourfold-remedy', 'hell-epicurean-garden', 3, -11, -HALF_PI),
  supplemental('epicurean-philodemus-library', 'hell-epicurean-garden', 11, -5.2, Math.PI),
  supplemental('epicurean-herculaneum-afterlife', 'hell-epicurean-garden', 11, -3, 0),

  primary('marcus-aurelius', 'hell-stoic-stoa', -12.8, 7.25, HALF_PI),
  primary('stoicism', 'hell-stoic-stoa', -12.8, 11.55, HALF_PI, true),
  primary('zeno', 'hell-stoic-stoa', -8.8, 12.8, Math.PI, true),
  primary('cleanthes', 'hell-stoic-stoa', -5.2, 11, -HALF_PI),
  primary('epictetus', 'hell-stoic-stoa', -3, 11, HALF_PI),
  primary('chrysippus', 'hell-stoic-stoa', -9.9, 5.2, 0),
  primary('seneca', 'hell-stoic-stoa', -11, 3, Math.PI),

  primary('skepticism', 'hell-skeptical-lineages', 12.8, 9, -HALF_PI, true),
  primary('pyrrho', 'hell-skeptical-lineages', 9, 12.8, Math.PI),
  primary('arcesilaus', 'hell-skeptical-lineages', 5.2, 11, HALF_PI),
  primary('sextus-empiricus', 'hell-skeptical-lineages', 3, 11, -HALF_PI),
  primary('carneades', 'hell-skeptical-lineages', 11, 5.2, 0),
  supplemental('skeptical-arguments-preserved', 'hell-skeptical-lineages', 11, 3, Math.PI),
] as const satisfies readonly PrototypeTargetSpec[];

const presentationNormal = (rotationY: number) => ({
  x: Math.round(Math.sin(rotationY)),
  z: Math.round(Math.cos(rotationY)),
});

const transformedTarget = (
  position: {x: number; z: number},
  rotationY: number,
  local: {x: number; y: number; z: number},
) => ({
  x: position.x + local.x * Math.cos(rotationY) + local.z * Math.sin(rotationY),
  y: local.y,
  z: position.z - local.x * Math.sin(rotationY) + local.z * Math.cos(rotationY),
});

type ResolvedSource = Readonly<{
  id: string;
  spatialCellId: string;
  position: {x: number; z: number};
  rotationY: number;
  target: {x: number; y: number; z: number};
}>;

const resolveSources = (
  exhibits: readonly MuseumExhibitLayout[],
  supplementalExhibits: readonly MuseumSupplementalExhibitLayout[],
): ReadonlyMap<string, ResolvedSource> => {
  const result = new Map<string, ResolvedSource>();
  exhibits.forEach((layout) => result.set(`primary:${layout.id}`, {
    id: `primary:${layout.id}`,
    spatialCellId: layout.spatialCellId,
    position: layout.position,
    rotationY: layout.rotationY,
    target: transformedTarget(layout.position, layout.rotationY, layout.scene.focalTarget),
  }));
  supplementalExhibits.forEach((layout) => result.set(`supplemental:${layout.id}`, {
    id: `supplemental:${layout.id}`,
    spatialCellId: layout.spatialCellId,
    position: layout.position,
    rotationY: layout.rotationY,
    target: transformedTarget(layout.position, layout.rotationY, {
      x: layout.mediaMount.position[0],
      y: layout.mediaMount.position[1],
      z: layout.mediaMount.position[2],
    }),
  }));
  return result;
};

const assertPrototypeSources = (
  hallId: string,
  specs: readonly PrototypeTargetSpec[],
  sourceById: ReadonlyMap<string, ResolvedSource>,
) => {
  if (new Set(specs.map(({sourceId}) => sourceId)).size !== specs.length) {
    throw new Error(`${hallId} lighting prototype contains a duplicate source.`);
  }
  for (const spec of specs) {
    const source = sourceById.get(spec.sourceId);
    if (!source) throw new Error(`${hallId} lighting prototype source ${spec.sourceId} is not installed.`);
    if (
      source.spatialCellId !== spec.spatialCellId
      || Math.abs(source.position.x - spec.x) > .001
      || Math.abs(source.position.z - spec.z) > .001
      || Math.abs(source.rotationY - spec.rotationY) > .001
    ) {
      throw new Error(`${hallId} lighting prototype source ${spec.sourceId} drifted from its approved placement.`);
    }
  }
};

export const createGallery01PrototypeTracks = (
  cells: readonly MuseumSpatialCell[],
): readonly MuseumTrackDefinition[] => cells.flatMap((cell) => {
  const centerZ = (cell.bounds.minZ + cell.bounds.maxZ) / 2;
  const y = cell.ceilingHeight - .23;
  const lowerZ = cell.bounds.minZ + 3.05;
  const upperZ = cell.bounds.maxZ - 3.05;
  return [-1, 1].map((side) => {
    const sideName = side < 0 ? 'west' : 'east';
    const x = side * 6.75;
    return {
      id: `prototype:${cell.id}:${sideName}-service`,
      center: {x, y, z: centerZ},
      size: {width: 6.1, height: .07, depth: .08},
      rotationY: 0,
      segments: [
        {id: `prototype:${cell.id}:${sideName}-side`, center: {x: side * 8.65, y, z: centerZ}, size: {width: .08, height: .07, depth: 7}, rotationY: 0},
        {id: `prototype:${cell.id}:lower-${sideName}`, center: {x, y, z: lowerZ}, size: {width: 6.1, height: .07, depth: .08}, rotationY: 0},
        {id: `prototype:${cell.id}:upper-${sideName}`, center: {x, y, z: upperZ}, size: {width: 6.1, height: .07, depth: .08}, rotationY: 0},
      ],
    };
  });
});

export const createGallery01PrototypeDiffusers = (
  cells: readonly MuseumSpatialCell[],
): readonly MuseumAmbientDiffuserDefinition[] => cells.flatMap((cell) => {
  const start = cell.bounds.minZ === -28 ? -23.3 : cell.bounds.minZ + 1.55;
  const end = cell.bounds.maxZ === 28 ? 23.3 : cell.bounds.maxZ - 1.55;
  return [-2.9, 2.9].map((x, index) => ({
    id: `prototype:${cell.id}:route-diffuser-${index + 1}`,
    spatialCellId: cell.id,
    center: {x, y: cell.ceilingHeight - .018, z: (start + end) / 2},
    size: {width: .7, height: .035, depth: end - start},
    colorTemperatureK: 3000,
  }));
});

export const createGallery02PrototypeDiffusers = (
  cells: readonly MuseumSpatialCell[],
): readonly MuseumAmbientDiffuserDefinition[] => cells.flatMap((cell) => {
  const centerX = (cell.bounds.minX + cell.bounds.maxX) / 2;
  const centerZ = (cell.bounds.minZ + cell.bounds.maxZ) / 2;
  return [-.45, .45].map((offset, index) => ({
    id: `prototype:${cell.id}:parallel-diffuser-${index + 1}`,
    spatialCellId: cell.id,
    center: {x: centerX, y: cell.ceilingHeight - .018, z: centerZ + offset},
    size: {width: 3, height: .035, depth: .62},
    colorTemperatureK: 3000,
  }));
});

const gallery01Fixture = (
  spec: PrototypeTargetSpec,
  source: ResolvedSource,
  cell: MuseumSpatialCell,
  index: number,
): MuseumLightingFixtureDefinition => {
  const {trackId, mountPosition} = resolveGallery01PrototypeMount(spec, cell);
  return {
    id: `prototype:g01:${index + 1}`,
    kind: 'track-head',
    prototypeRole: 'gallery-01-track-head',
    contrastScale: spec.anchor ? 1.6 : 1,
    spatialCellId: spec.spatialCellId,
    targetGroupId: `prototype:${spec.sourceId}`,
    sourceIds: [spec.sourceId],
    trackId,
    mountPosition,
    target: source.target,
    coverageRadius: 0,
    width: .3,
  };
};

export const resolveGallery01PrototypeMount = (
  spec: PrototypeTargetSpec,
  cell: Pick<MuseumSpatialCell, 'id' | 'bounds' | 'ceilingHeight'>,
) => {
  const normal = presentationNormal(spec.rotationY);
  const side = normal.x !== 0;
  const east = spec.x > 0;
  const upper = normal.z < 0;
  return {
    trackId: `prototype:${cell.id}:${east ? 'east' : 'west'}-service`,
    mountPosition: side
      ? {x: spec.x + normal.x * 2.2, y: cell.ceilingHeight - .28, z: spec.z}
      : {
          x: spec.x,
          y: cell.ceilingHeight - .28,
          z: upper ? cell.bounds.maxZ - 3.05 : cell.bounds.minZ + 3.05,
        },
  } as const;
};

const GALLERY_02_DOORWAY_MOUNTS = new Map<string, Readonly<{x: number; z: number}>>([
  ['supplemental:cynic-cosmopolitan-constellation', {x: -7.8, z: -1.5}],
  ['supplemental:epicurean-herculaneum-afterlife', {x: 7.8, z: -1.5}],
  ['primary:seneca', {x: -7.8, z: 1.5}],
  ['supplemental:skeptical-arguments-preserved', {x: 7.8, z: 1.5}],
]);

const gallery02Fixture = (
  spec: PrototypeTargetSpec,
  source: ResolvedSource,
  cell: MuseumSpatialCell,
  index: number,
): MuseumLightingFixtureDefinition => {
  return {
    id: `prototype:g02:${index + 1}`,
    kind: 'recessed-spot',
    prototypeRole: 'gallery-02-recessed-gimbal',
    contrastScale: spec.anchor ? 1.6 : 1,
    spatialCellId: spec.spatialCellId,
    targetGroupId: `prototype:${spec.sourceId}`,
    sourceIds: [spec.sourceId],
    mountPosition: resolveGallery02PrototypeMount(spec, cell),
    target: source.target,
    coverageRadius: 0,
    width: .3,
  };
};

export const resolveGallery02PrototypeMount = (
  spec: PrototypeTargetSpec,
  cell: Pick<MuseumSpatialCell, 'ceilingHeight'>,
) => {
  const normal = presentationNormal(spec.rotationY);
  const doorwayMount = GALLERY_02_DOORWAY_MOUNTS.get(spec.sourceId);
  return {
    x: doorwayMount?.x ?? spec.x + normal.x * 2.35,
    y: cell.ceilingHeight - .035,
    z: doorwayMount?.z ?? spec.z + normal.z * 2.35,
  };
};

const roomPlans = (
  cells: readonly MuseumSpatialCell[],
  fixtures: readonly MuseumLightingFixtureDefinition[],
  tracks: readonly MuseumTrackDefinition[],
): readonly MuseumRoomLightingPlan[] => cells.map((cell) => {
  const roomFixtures = fixtures.filter(({spatialCellId}) => spatialCellId === cell.id);
  const roomTracks = tracks.filter(({id}) => id.startsWith(`prototype:${cell.id}:`));
  return {
    spatialCellId: cell.id,
    profile: tracks.length ? 'linear' : 'hub',
    sourceIds: roomFixtures.flatMap(({sourceIds}) => sourceIds),
    fixtureIds: roomFixtures.map(({id}) => id),
    trackIds: roomTracks.map(({id}) => id),
  };
});

export const createGalleryLightingPrototype = ({
  hallId,
  cells,
  exhibits,
  supplementalExhibits,
}: {
  hallId: string;
  cells: readonly MuseumSpatialCell[];
  exhibits: readonly MuseumExhibitLayout[];
  supplementalExhibits: readonly MuseumSupplementalExhibitLayout[];
}) => {
  if (hallId !== GALLERY_01_ID && hallId !== GALLERY_02_ID) return undefined;
  const specs = hallId === GALLERY_01_ID ? GALLERY_01_LIGHTING_TARGETS : GALLERY_02_LIGHTING_TARGETS;
  const expectedCount = hallId === GALLERY_01_ID ? 27 : 25;
  if (specs.length !== expectedCount) throw new Error(`${hallId} lighting prototype count changed.`);
  const sourceById = resolveSources(exhibits, supplementalExhibits);
  assertPrototypeSources(hallId, specs, sourceById);
  const cellById = new Map(cells.map((cell) => [cell.id, cell]));
  const fixtures = specs.map((spec, index) => {
    const source = sourceById.get(spec.sourceId)!;
    const cell = cellById.get(spec.spatialCellId);
    if (!cell) throw new Error(`${hallId} lighting prototype room ${spec.spatialCellId} is missing.`);
    return hallId === GALLERY_01_ID
      ? gallery01Fixture(spec, source, cell, index)
      : gallery02Fixture(spec, source, cell, index);
  });
  const tracks = hallId === GALLERY_01_ID ? createGallery01PrototypeTracks(cells) : [];
  const ambientDiffusers = hallId === GALLERY_01_ID
    ? createGallery01PrototypeDiffusers(cells)
    : createGallery02PrototypeDiffusers(cells);
  return {
    prototypeId: hallId === GALLERY_01_ID
      ? GALLERY_01_LIGHTING_PROTOTYPE_ID
      : GALLERY_02_LIGHTING_PROTOTYPE_ID,
    tracks,
    fixtures,
    ambientDiffusers,
    roomPlans: roomPlans(cells, fixtures, tracks),
  } as const;
};
