import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {dirname, extname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const galleryRoot = resolve(repoRoot, 'src/components/MuseumGallery');
const registrySource = readFileSync(resolve(galleryRoot, 'museumWorldRegistry.ts'), 'utf8');
const museumPageSource = readFileSync(resolve(galleryRoot, 'MuseumPage.tsx'), 'utf8');
const museumWorldSource = readFileSync(resolve(galleryRoot, 'MuseumWorldScene.tsx'), 'utf8');
const museumBuildingArchitectureSource = readFileSync(resolve(galleryRoot, 'MuseumBuildingArchitecture.tsx'), 'utf8');
const museumControlsSource = readFileSync(resolve(galleryRoot, 'useMuseumControls.ts'), 'utf8');
const museumTouchControlsSource = readFileSync(resolve(galleryRoot, 'MuseumTouchControls.tsx'), 'utf8');
const museumModalSource = readFileSync(resolve(galleryRoot, 'MuseumModal.tsx'), 'utf8');
const museumVisitorMapSource = readFileSync(resolve(galleryRoot, 'MuseumVisitorMap.tsx'), 'utf8');
const museumKioskSource = readFileSync(resolve(galleryRoot, 'MuseumVisitorMapKiosk.tsx'), 'utf8');
const museumSceneMediaSource = readFileSync(resolve(galleryRoot, 'MuseumSceneMedia.tsx'), 'utf8');
const plaqueTextureSource = readFileSync(resolve(galleryRoot, 'plaqueTextures.ts'), 'utf8');
const ancientArchitectureSource = readFileSync(resolve(galleryRoot, 'HallArchitecture.tsx'), 'utf8');
const contemporaryArchitectureSource = readFileSync(resolve(galleryRoot, 'ContemporaryHallArchitecture.tsx'), 'utf8');
const templateInterfacesSource = readFileSync(resolve(galleryRoot, 'MuseumTemplateInterfaces.tsx'), 'utf8');
const contemporaryExhibitsSource = readFileSync(resolve(galleryRoot, 'ContemporaryMuseumExhibits.tsx'), 'utf8');
const museumCssSource = readFileSync(resolve(galleryRoot, 'museum.css'), 'utf8');
const museumResidencySource = readFileSync(resolve(galleryRoot, 'museumResidency.ts'), 'utf8');
const museumDataRoot = resolve(repoRoot, 'src/data/museum');
const buildingManifest = JSON.parse(readFileSync(resolve(museumDataRoot, 'museumBuildingManifest.json'), 'utf8'));
const buildingRuntimeSource = readFileSync(resolve(museumDataRoot, 'museumBuildingRuntime.ts'), 'utf8');
const hallTemplatesSource = readFileSync(resolve(museumDataRoot, 'museumHallTemplates.ts'), 'utf8');
const hallProgram = JSON.parse(readFileSync(resolve(repoRoot, 'docs/museum-masterplan/hall-program.json'), 'utf8'));
const visitorMapDataSource = readFileSync(resolve(museumDataRoot, 'museumVisitorMap.ts'), 'utf8');
const visitorMapProjectionSource = readFileSync(resolve(museumDataRoot, 'museumVisitorMapProjection.ts'), 'utf8');
const hallContentFileNames = [
  'ancientGreekHall.ts',
  'renaissanceReasonRevolutionHall.ts',
  'modernityFreedomCritiqueHall.ts',
  'logicLanguageScienceHall.ts',
  'ethicsJusticePoliticalLifeHall.ts',
  'mindConsciousnessSelfHall.ts',
];
const hallContentSources = hallContentFileNames.map((fileName) => ({
  fileName,
  source: readFileSync(resolve(museumDataRoot, fileName), 'utf8'),
}));
const virtualEntry = 'virtual:philosophy-atlas-museum-audit';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  ssr: {noExternal: ['react', 'three']},
  plugins: [{
    name: 'museum-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museumCatalog.ts';
      export * from '/src/data/museum/ancientGreekHall.ts';
      export * from '/src/data/museum/renaissanceReasonRevolutionHall.ts';
      export * from '/src/data/museum/modernityFreedomCritiqueHall.ts';
      export * from '/src/data/museum/logicLanguageScienceHall.ts';
      export * from '/src/data/museum/ethicsJusticePoliticalLifeHall.ts';
      export * from '/src/data/museum/mindConsciousnessSelfHall.ts';
      export * from '/src/data/museum/museumVisitorMap.ts';
      export * from '/src/data/museum/museumVisitorMapProjection.ts';
      export * from '/src/data/museum/museumWorldDefinitions.ts';
      export * from '/src/data/museum/museumBuildingRuntime.ts';
      export * from '/src/data/museum/museumHallTemplates.ts';
      export * from '/src/data/museum/museumAssets.ts';
      export * from '/src/data/museum/museumTextureBudget.ts';
      export * from '/src/data/museum/museumTexturePolicy.ts';
      export * from '/src/data/museum/museumInterpretations.ts';
      export * from '/src/components/MuseumGallery/museumMovement.ts';
      export * from '/src/components/MuseumGallery/plaqueTextures.ts';
      export * from '/src/components/MuseumGallery/museumPointerLockState.ts';
      export * from '/src/components/MuseumGallery/museumRuntime.ts';
      export * from '/src/components/MuseumGallery/museumResidency.ts';
      export * from '/src/components/MuseumGallery/museumSession.ts';
      export * from '/src/components/MuseumGallery/museumVisitState.ts';
      export * from '/src/components/MuseumGallery/museumWorldTransform.ts';
      export * from '/src/components/MuseumGallery/museumHallTransitions.ts';
      export {branches} from '/src/data/branches.ts';
      export {philosophers} from '/src/data/philosophers.ts';
    ` : undefined,
  }],
  build: {
    ssr: true,
    write: false,
    minify: false,
    target: 'node18',
    rollupOptions: {input: virtualEntry, output: {format: 'es', codeSplitting: false}},
  },
});

const outputs = (Array.isArray(result) ? result : [result]).flatMap(({output}) => output);
const entry = outputs.find((item) => item.type === 'chunk' && item.isEntry);
assert(entry, 'Vite did not produce an executable Museum audit entry.');
let museum;
try {
  museum = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);
} catch (error) {
  console.error(`Museum audit module failed to evaluate: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

const {
  ANCIENT_GREEK_HALL_DEFINITION,
  ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION,
  LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION,
  MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION,
  MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION,
  RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION,
  MUSEUM_ASSETS,
  MUSEUM_DECODED_TEXTURE_BUDGET_BYTES,
  MUSEUM_DECODED_TEXTURE_BUDGET_MIB,
  MUSEUM_TEXTURE_SPECS,
  MUSEUM_HALLS,
  MUSEUM_HALL_TEMPLATE_REGISTRY,
  MUSEUM_INTERPRETATIONS,
  MUSEUM_LEGACY_GEOMETRY_ADAPTERS,
  MUSEUM_DIRECTED_CONNECTIONS,
  MUSEUM_RUNTIME_NODES,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_DOORWAYS,
  MUSEUM_VISITOR_MAP_ENTRANCE,
  MUSEUM_VISITOR_MAP_KIOSK,
  MUSEUM_VISITOR_MAP_KIOSK_MARKER,
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS,
  MUSEUM_VISITOR_MAP_NODES,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_VISITOR_MAP_RESERVATIONS,
  MUSEUM_VISITOR_MAP_VIEWBOX,
  MUSEUM_WORLD_DEFINITIONS,
  branches,
  philosophers,
  MUSEUM_POINTER_LOCK_SETTLED,
  MUSEUM_READINESS_GATE_CONFIG,
  MUSEUM_READINESS_PRESENTATIONS,
  MUSEUM_FAST_WALK_SPEED,
  MUSEUM_STANDARD_WALK_SPEED,
  createMuseumHallTravelContext,
  createMuseumExhibitVisitContext,
  createMuseumInputState,
  cutMuseumWallsForDoorway,
  circleIntersectsCollider,
  directMuseumVisitContext,
  estimateMuseumHallTextureResidency,
  getMuseumReservationBarrierBody,
  getMuseumConnectionTargetHallId,
  getMuseumNodeConnections,
  hasMuseumBrowserModifier,
  isValidMuseumPosition,
  museumHistoryStateWithVisitContext,
  museumHistoryStateWithHallTravelContext,
  museumConnectionCrossed,
  museumPhaseHasActiveIntent,
  museumPointerLockEventFailureRequestId,
  museumPointerLockSurvivesBlockedOverlay,
  moveWithCollisions,
  museumTextureDimensionsForPlane,
  layoutPlaqueText,
  plaqueSupportedSubtitleLines,
  plaqueSupportedTitleLines,
  plaqueTextLayoutFitsSafeRect,
  parseMuseumHallTravelContext,
  parseMuseumExhibitVisitContext,
  parseMuseumSession,
  positionInsideSpatialUnion,
  resolveMuseumCloseResumeStrategy,
  resolveMuseumExitPolicy,
  resolveMuseumHallArrival,
  resolveMuseumHallResidency,
  resolveMuseumHallResidencyPlan,
  resolveMuseumReadinessGateGeometry,
  resolveMuseumReadinessGateStatus,
  resolveMuseumWalkingSpeed,
  resolveMuseumHallShell,
  resolveMuseumVisitorMapDestination,
  sanitizeMuseumPose,
  transitionMuseumPointerLock,
  transitionMuseumVisitPhase,
  visitorMapInteractionAtPose,
} = museum;

const HALL_IDS = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
];
const EXPECTED_EXHIBITS = {
  'ancient-greek': ['socrates', 'plato', 'aristotle', 'cynicism', 'epicureanism', 'stoicism', 'skepticism', 'neoplatonism'],
  'renaissance-reason-revolution': ['machiavelli', 'descartes', 'hobbes', 'locke', 'spinoza', 'hume', 'rousseau', 'kant'],
  'modernity-freedom-critique': ['kierkegaard', 'marx', 'nietzsche', 'heidegger', 'sartre', 'beauvoir', 'camus', 'foucault'],
  'logic-language-science': ['peirce', 'frege', 'russell', 'dewey', 'carnap', 'popper', 'quine', 'kuhn'],
  'ethics-justice-political-life': ['bentham', 'wollstonecraft', 'mill', 'arendt', 'fanon', 'rawls', 'nozick', 'habermas'],
  'mind-consciousness-self': ['patanjali', 'vasubandhu', 'william-james', 'husserl', 'merleau-ponty', 'anscombe', 'thomas-nagel', 'derek-parfit'],
};
const definitions = [...MUSEUM_WORLD_DEFINITIONS];
const definitionsById = new Map(definitions.map((definition) => [definition.id, definition]));
const hallsById = new Map(MUSEUM_HALLS.map((hall) => [hall.id, hall]));
const activeExhibitRefs = new Set(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map((exhibit) => `${hall.id}/${exhibit.id}`)));
const activeExhibitIds = new Set(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map(({id}) => id)));
const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));

let checks = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};
const unique = (values) => new Set(values).size === values.length;
const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const distance = (first, second) => Math.hypot(first.x - second.x, first.z - second.z);
const approx = (actual, expected, message, epsilon = 1e-6) => assert(Math.abs(actual - expected) <= epsilon, `${message}: expected ${expected}, got ${actual}`);
const createDeterministicTextContext = () => {
  let font = '400 16px system-ui';
  return {
    textAlign: 'left',
    textBaseline: 'alphabetic',
    get font() { return font; },
    set font(value) { font = value; },
    measureText(text) {
      const size = Number.parseFloat(font.match(/([0-9.]+)px/u)?.[1] ?? '16');
      const width = [...text].reduce((sum, character) => sum + (
        /[MW@%&]/u.test(character) ? size * .82
          : /[ilI1.,'’]/u.test(character) ? size * .3
            : character === ' ' ? size * .32
              : size * .56
      ), 0);
      return {
        width,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: width,
        actualBoundingBoxAscent: size * .78,
        actualBoundingBoxDescent: size * .22,
      };
    },
  };
};
const assertPlaqueSurface = ({label, planeWidth, planeHeight, reference, title, kicker, subtitle}) => {
  const dimensions = museumTextureDimensionsForPlane(planeWidth, planeHeight, reference);
  const planeAspect = planeWidth / planeHeight;
  const textureAspect = dimensions.width / dimensions.height;
  assert(
    Math.abs(textureAspect - planeAspect) <= planeAspect / Math.min(dimensions.width, dimensions.height) + 1e-6,
    `${label} texture aspect ${textureAspect} does not match plane ${planeAspect}`,
  );
  assert(
    dimensions.width * dimensions.height <= reference.width * reference.height,
    `${label} exceeds its decoded base-pixel budget`,
  );
  const layout = layoutPlaqueText(createDeterministicTextContext(), {
    title,
    kicker,
    subtitle,
    width: dimensions.width,
    height: dimensions.height,
  });
  assert(layout.fitsSafeRect, `${label} text leaves its safe rectangle`);
  assert(plaqueTextLayoutFitsSafeRect(layout), `${label} glyph bounds leave its safe rectangle`);
  assert(layout.lineCounts.kicker >= 1, `${label} drops its kicker`);
  assert(layout.lineCounts.title >= 1, `${label} drops its title`);
  if (subtitle) assert(layout.lineCounts.subtitle >= 1, `${label} drops its subtitle`);
  assert(layout.lineCounts.kicker <= 1, `${label} kicker exceeds one line`);
  assert(layout.lineCounts.title <= plaqueSupportedTitleLines(dimensions.width, dimensions.height), `${label} title exceeds its supported layout`);
  assert(layout.lineCounts.subtitle <= plaqueSupportedSubtitleLines(dimensions.width, dimensions.height), `${label} subtitle exceeds its supported layout`);
  assert(layout.lines.every(({text}) => text.trim().length > 0), `${label} emits an empty text line`);
  const truncatedLines = layout.lines.filter(({ellipsized}) => ellipsized);
  assert(!truncatedLines.length, `${label} truncates authored text (${truncatedLines.map(({role, text}) => `${role}: ${text}`).join('; ')})`);
  assert(layout.lines.every(({fontSize}) => fontSize >= 10), `${label} text falls below the readable floor`);
  return {dimensions, layout};
};
const rotateDirectionToWorld = (placed, direction) => {
  const cosine = Math.cos(placed.transform.yaw);
  const sine = Math.sin(placed.transform.yaw);
  return {
    x: direction.x * cosine + direction.z * sine,
    z: -direction.x * sine + direction.z * cosine,
  };
};
const manifestPointToWorld = (node, point) => {
  const rotated = rotateDirectionToWorld(node, point);
  return {x: node.transform.x + rotated.x, z: node.transform.z + rotated.z};
};
const sumCellArea = (layout) => layout.spatialCells.reduce((sum, {bounds}) =>
  sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0);
const allColliders = (layout) => [...layout.wallColliders, ...layout.obstacleColliders];
const sampleSegment = (start, end, interval, callback) => {
  const length = distance(start, end);
  const samples = Math.max(1, Math.ceil(length / interval));
  for (let index = 0; index <= samples; index += 1) {
    const fraction = index / samples;
    callback({x: start.x + (end.x - start.x) * fraction, z: start.z + (end.z - start.z) * fraction});
  }
  return length;
};
const colliderCorners = (collider) => {
  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  return [-1, 1].flatMap((xSign) => [-1, 1].map((zSign) => {
    const x = xSign * collider.size.width / 2;
    const z = zSign * collider.size.depth / 2;
    return {
      x: collider.center.x + x * cosine + z * sine,
      z: collider.center.z - x * sine + z * cosine,
    };
  }));
};
const colliderAxes = (collider) => {
  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  return [{x: cosine, z: -sine}, {x: sine, z: cosine}];
};
const projectionRadius = (collider, axis) => {
  const [widthAxis, depthAxis] = colliderAxes(collider);
  return Math.abs(widthAxis.x * axis.x + widthAxis.z * axis.z) * collider.size.width / 2
    + Math.abs(depthAxis.x * axis.x + depthAxis.z * axis.z) * collider.size.depth / 2;
};
const collidersOverlap = (first, second) => {
  const delta = {x: second.center.x - first.center.x, z: second.center.z - first.center.z};
  return [...colliderAxes(first), ...colliderAxes(second)].every((axis) => {
    const separation = Math.abs(delta.x * axis.x + delta.z * axis.z);
    return separation < projectionRadius(first, axis) + projectionRadius(second, axis) - 1e-6;
  });
};
const assertPhysicalSignPlacement = (definition, sign) => {
  const frameHeight = sign.height + .1;
  const frameBottom = sign.position.y - frameHeight / 2;
  const frameTop = sign.position.y + frameHeight / 2;
  const nearbyCells = definition.layout.spatialCells.filter(({bounds}) =>
    sign.position.x >= bounds.minX - .5
    && sign.position.x <= bounds.maxX + .5
    && sign.position.z >= bounds.minZ - .5
    && sign.position.z <= bounds.maxZ + .5);
  assert(nearbyCells.length > 0, `${definition.id}/${sign.id} is not mounted within an authored cell`);
  assert(frameBottom >= definition.layout.eyeHeight + .45, `${definition.id}/${sign.id} hangs in the ordinary eye line`);
  assert(
    frameTop <= Math.min(...nearbyCells.map(({ceilingHeight}) => ceilingHeight)) - .04,
    `${definition.id}/${sign.id} lacks local ceiling clearance`,
  );

  const depthAxis = colliderAxes({rotation: sign.rotationY})[1];
  const frameCollider = {
    id: `sign:${sign.id}`,
    center: {
      x: sign.position.x - depthAxis.x * .04,
      z: sign.position.z - depthAxis.z * .04,
    },
    size: {width: sign.width + .1, depth: .07},
    rotation: sign.rotationY,
  };
  let validParallelMounts = 0;
  const parallelMountPlaneWalls = [];
  for (const wall of definition.architectureWalls) {
    const wallBottom = wall.bottom ?? 0;
    const wallTop = wallBottom + wall.height;
    if (frameTop <= wallBottom || frameBottom >= wallTop) continue;
    const delta = {
      x: wall.center.x - frameCollider.center.x,
      z: wall.center.z - frameCollider.center.z,
    };
    const separation = Math.abs(delta.x * depthAxis.x + delta.z * depthAxis.z);
    const penetration = projectionRadius(frameCollider, depthAxis) + projectionRadius(wall, depthAxis) - separation;
    const signWidthAxis = colliderAxes(frameCollider)[0];
    const [wallWidthAxis, wallDepthAxis] = colliderAxes(wall);
    const wallLongAxis = wall.size.width >= wall.size.depth ? wallWidthAxis : wallDepthAxis;
    const parallelMount = Math.abs(signWidthAxis.x * wallLongAxis.x + signWidthAxis.z * wallLongAxis.z) > .9;
    if (parallelMount && penetration >= -.08) {
      parallelMountPlaneWalls.push({
        tangentCenter: delta.x * signWidthAxis.x + delta.z * signWidthAxis.z,
        tangentRadius: projectionRadius(wall, signWidthAxis),
      });
    }
    if (!collidersOverlap(frameCollider, wall)) continue;
    if (parallelMount) {
      assert(penetration <= .16, `${definition.id}/${sign.id} is buried ${penetration.toFixed(3)}m into ${wall.id}`);
      validParallelMounts += 1;
    } else {
      const tangentSeparation = Math.abs(delta.x * signWidthAxis.x + delta.z * signWidthAxis.z);
      const tangentPenetration = projectionRadius(frameCollider, signWidthAxis) + projectionRadius(wall, signWidthAxis) - tangentSeparation;
      assert(penetration <= .3 && tangentPenetration <= .55, `${definition.id}/${sign.id} intrudes into the corner of ${wall.id}`);
    }
  }
  const frameHalfWidth = frameCollider.size.width / 2;
  const maximumJambGap = Math.max(.5, sign.width * .4);
  const hasLeftJamb = parallelMountPlaneWalls.some(({tangentCenter, tangentRadius}) => {
    const gap = -frameHalfWidth - (tangentCenter + tangentRadius);
    return tangentCenter < 0 && gap >= -.05 && gap <= maximumJambGap;
  });
  const hasRightJamb = parallelMountPlaneWalls.some(({tangentCenter, tangentRadius}) => {
    const gap = tangentCenter - tangentRadius - frameHalfWidth;
    return tangentCenter > 0 && gap >= -.05 && gap <= maximumJambGap;
  });
  assert(
    validParallelMounts > 0 || (hasLeftJamb && hasRightJamb),
    `${definition.id}/${sign.id} has neither a parallel host surface nor a bounded pair of co-planar mounting jambs`,
  );

  const front = {x: Math.sin(sign.rotationY), z: Math.cos(sign.rotationY)};
  const ordinaryViewpoints = [
    definition.layout.spawn,
    definition.layout.reset,
    ...definition.layout.entryViews.map(({pose}) => pose),
    ...definition.layout.primaryCirculation.points,
  ];
  assert(ordinaryViewpoints.some((viewpoint) => {
    const offset = {x: viewpoint.x - sign.position.x, z: viewpoint.z - sign.position.z};
    const horizontalDistance = Math.hypot(offset.x, offset.z);
    if (horizontalDistance < .8 || horizontalDistance > 48) return false;
    const facesViewpoint = (front.x * offset.x + front.z * offset.z) / horizontalDistance > .08;
    const verticalAngle = Math.abs(Math.atan2(sign.position.y - definition.layout.eyeHeight, horizontalDistance));
    return facesViewpoint && verticalAngle <= 55 * Math.PI / 180;
  }), `${definition.id}/${sign.id} has no authored ordinary front-side sightline`);
};
const doorwayOpeningCollider = (slot, playerRadius = 0) => ({
  id: `audit-opening:${slot.id}`,
  center: slot.position,
  size: Math.abs(slot.inwardNormal.x) > .5
    ? {width: .08, depth: Math.max(.1, slot.clearWidth - playerRadius * 2 - .04)}
    : {width: Math.max(.1, slot.clearWidth - playerRadius * 2 - .04), depth: .08},
  rotation: 0,
});
const contractedLandingCollider = (slot, playerRadius) => {
  const width = slot.landingBounds.maxX - slot.landingBounds.minX - playerRadius * 2 - .04;
  const depth = slot.landingBounds.maxZ - slot.landingBounds.minZ - playerRadius * 2 - .04;
  return {
    id: `audit-landing:${slot.id}`,
    center: {
      x: (slot.landingBounds.minX + slot.landingBounds.maxX) / 2,
      z: (slot.landingBounds.minZ + slot.landingBounds.maxZ) / 2,
    },
    size: {width: Math.max(.1, width), depth: Math.max(.1, depth)},
    rotation: 0,
  };
};
const auditNavigationConnectivity = (node, points, step = .18) => {
  const {layout} = node;
  const colliders = allColliders(layout);
  const radius = layout.playerRadius;
  const minimum = {x: layout.bounds.minX + radius, z: layout.bounds.minZ + radius};
  const maximum = {x: layout.bounds.maxX - radius, z: layout.bounds.maxZ - radius};
  const columns = Math.floor((maximum.x - minimum.x) / step) + 1;
  const rows = Math.floor((maximum.z - minimum.z) / step) + 1;
  const cellCount = columns * rows;
  assert(columns > 0 && rows > 0, `${node.id} has no navigable grid extent`);

  const state = new Uint8Array(cellCount);
  const visited = new Uint8Array(cellCount);
  const pointAt = (index) => ({
    x: minimum.x + index % columns * step,
    z: minimum.z + Math.floor(index / columns) * step,
  });
  const validAt = (index) => {
    if (index < 0 || index >= cellCount) return false;
    if (state[index] === 0) {
      state[index] = isValidMuseumPosition(pointAt(index), radius, layout.bounds, colliders, layout.spatialCells) ? 2 : 1;
    }
    return state[index] === 2;
  };
  const nearestGridIndex = ({label, point}) => {
    assert(
      isValidMuseumPosition(point, radius, layout.bounds, colliders, layout.spatialCells),
      `${node.id} ${label} is not collision-safe`,
    );
    const column = Math.round((point.x - minimum.x) / step);
    const row = Math.round((point.z - minimum.z) / step);
    let nearest;
    let nearestDistance = Infinity;
    for (let offsetRow = -3; offsetRow <= 3; offsetRow += 1) {
      for (let offsetColumn = -3; offsetColumn <= 3; offsetColumn += 1) {
        const candidateColumn = column + offsetColumn;
        const candidateRow = row + offsetRow;
        if (candidateColumn < 0 || candidateColumn >= columns || candidateRow < 0 || candidateRow >= rows) continue;
        const index = candidateRow * columns + candidateColumn;
        if (!validAt(index)) continue;
        const candidate = pointAt(index);
        const candidateDistance = distance(point, candidate);
        if (candidateDistance >= nearestDistance) continue;
        let connected = true;
        sampleSegment(point, candidate, .05, (sample) => {
          if (!isValidMuseumPosition(sample, radius, layout.bounds, colliders, layout.spatialCells)) connected = false;
        });
        if (connected) {
          nearest = index;
          nearestDistance = candidateDistance;
        }
      }
    }
    assert(nearest !== undefined && nearestDistance <= step * 2, `${node.id} ${label} cannot join the collision grid`);
    return nearest;
  };

  const seeds = points.map(nearestGridIndex);
  const queue = new Int32Array(cellCount);
  let queueStart = 0;
  let queueEnd = 0;
  queue[queueEnd++] = seeds[0];
  visited[seeds[0]] = 1;
  while (queueStart < queueEnd) {
    const index = queue[queueStart++];
    const column = index % columns;
    const neighbors = [index - columns, index + columns];
    if (column > 0) neighbors.push(index - 1);
    if (column + 1 < columns) neighbors.push(index + 1);
    for (const neighbor of neighbors) {
      if (neighbor < 0 || neighbor >= cellCount || visited[neighbor] || !validAt(neighbor)) continue;
      visited[neighbor] = 1;
      queue[queueEnd++] = neighbor;
    }
  }
  points.forEach(({label}, index) => {
    assert(visited[seeds[index]], `${node.id} ${label} is trapped in a separate collision component`);
  });
};
const localPointToWorld = (collider, point) => {
  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  return {
    x: collider.center.x + point.x * cosine + point.z * sine,
    z: collider.center.z - point.x * sine + point.z * cosine,
  };
};
const wrappedAngularDelta = (angle, yaw) =>
  Math.atan2(Math.sin(angle - yaw), Math.cos(angle - yaw));
const bearingFromPose = (pose, point) =>
  Math.atan2(-(point.x - pose.x), -(point.z - pose.z));
const assertFinitePose = (pose, message) => {
  for (const key of ['x', 'z', 'yaw', 'pitch']) assert(Number.isFinite(pose[key]), `${message} has non-finite ${key}`);
};

check('oriented collision math matches the yaw convention used by rendered Three groups', () => {
  const collider = {id: 'rotation-contract', center: {x: 2, z: -3}, size: {width: 2, depth: .4}, rotation: .55};
  const renderedInside = localPointToWorld(collider, {x: .9, z: 0});
  const renderedOutside = localPointToWorld(collider, {x: 0, z: .5});
  assert(circleIntersectsCollider(renderedInside, .04, collider), 'a point inside the rendered rotated housing misses its collider');
  assert(!circleIntersectsCollider(renderedOutside, .04, collider), 'a point outside the rendered rotated housing hits a mirrored collider');
});

check('the active Museum catalog is exactly the ordered six-hall collection', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), HALL_IDS);
  assert.deepEqual(definitions.map(({id}) => id), HALL_IDS);
  assert(unique(HALL_IDS));
  assert.equal(hallsById.size, 6);
  assert.equal(definitionsById.size, 6);
  assert(!hallsById.has('medieval-worlds'), 'the retired Medieval hall must not remain active');
});

check('the executable hall-template registry exactly mirrors the approved planning contract', () => {
  const planningShape = MUSEUM_HALL_TEMPLATE_REGISTRY.map((template) => ({
    id: template.id,
    title: template.title,
    footprintMetres: template.footprintMetres,
    roomRange: [...template.roomRange],
    portalSlots: template.portalSlots.map(({id}) => id),
    optionalPortalSlots: template.portalSlots.filter(({optional}) => optional).map(({id}) => id),
    wallThicknessMetres: template.wallThicknessMetres,
    ceilingHeightMetres: template.ceilingHeightMetres,
    publicPortal: template.publicPortal,
  }));
  assert.deepEqual(planningShape, hallProgram.templates);
  assert.equal(MUSEUM_HALL_TEMPLATE_REGISTRY.filter(({availability}) => availability === 'normal-active').length, 3);
  assert.equal(MUSEUM_HALL_TEMPLATE_REGISTRY.filter(({availability}) => availability === 'rare-special-case').length, 1);
  assert.equal(MUSEUM_HALL_TEMPLATE_REGISTRY.find(({id}) => id === 'focal-terminal')?.availability, 'rare-special-case');
  assert(!buildingManifest.nodes.some(({templateId}) => templateId === 'focal-terminal'), 'the pilot must not spend the rare focal-terminal template');

  for (const template of MUSEUM_HALL_TEMPLATE_REGISTRY) {
    assert.deepEqual(template.safeArrivalLanding, {
      width: hallProgram.sharedPhysicalContract.safeArrivalLanding.width,
      depth: hallProgram.sharedPhysicalContract.safeArrivalLanding.depth,
      poseOffsetFromPortal: hallProgram.sharedPhysicalContract.safeArrivalLanding.poseOffsetFromPortal,
    });
    assert.deepEqual(template.lightingInterface, hallProgram.sharedPhysicalContract.lightingInterface);
    assert.deepEqual(template.exhibitSlotPolicy, {
      standardBayWidth: hallProgram.sharedPhysicalContract.exhibitBayWidths.standard,
      anchorBayWidth: hallProgram.sharedPhysicalContract.exhibitBayWidths.anchor,
      clearViewingFloor: hallProgram.sharedPhysicalContract.clearViewingFloorTarget,
    });
    assert.deepEqual(template.collisionPolicy, {
      openingAuthority: 'live-connection-endpoints',
      inactiveSlotClosure: 'full-height-collision-wall',
      activeSlotLintel: 'render-only-above-clear-height',
    });
  }

  const usedAdapterIds = [...new Set(buildingManifest.nodes.filter(({kind}) => kind === 'hall').map(({geometryAdapterId}) => geometryAdapterId))].sort();
  assert.deepEqual(usedAdapterIds, MUSEUM_LEGACY_GEOMETRY_ADAPTERS.map(({id}) => id).sort());
  for (const node of buildingManifest.nodes.filter(({kind}) => kind === 'hall')) {
    const adapter = MUSEUM_LEGACY_GEOMETRY_ADAPTERS.find(({id}) => id === node.geometryAdapterId);
    assert(adapter, `${node.id} has no executable legacy geometry adapter`);
    assert.equal(adapter.templateId, node.templateId);
    assert(adapter.declaredDeviations.length > 0, `${adapter.id} hides its legacy-envelope deviations`);
  }
});

check('every public hall resolves portal, map, lighting, collision, and exhibit-slot runtime interfaces', () => {
  const liveEndpointKeys = new Set(buildingManifest.connections
    .filter(({implementationStatus}) => implementationStatus === 'live')
    .flatMap(({a, b}) => [`${a.nodeId}/${a.slotId}`, `${b.nodeId}/${b.slotId}`]));
  const runtimeById = new Map(MUSEUM_RUNTIME_NODES.map((node) => [node.id, node]));
  const mapProjectionById = new Map(MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.map((projection) => [projection.id, projection]));
  for (const definition of definitions) {
    const manifestNode = buildingManifest.nodes.find(({publicHallId}) => publicHallId === definition.id);
    assert(manifestNode, `${definition.id} has no hall manifest node`);
    const runtimeNode = runtimeById.get(manifestNode.id);
    assert(runtimeNode, `${manifestNode.id} has no runtime node`);
    const resolved = definition.resolvedTemplate;
    assert.equal(runtimeNode.resolvedTemplate, resolved, `${manifestNode.id} runtime and public definitions drifted`);
    assert.equal(resolved.templateId, manifestNode.templateId);
    assert.equal(resolved.adapterId, manifestNode.geometryAdapterId);
    assert.equal(resolved.conformance, 'legacy-adapted');
    assert.equal(resolved.footprintConformance, 'legacy-adapted');
    assert(resolved.deviations.length > 0, `${manifestNode.id} claims legacy adaptation without recorded deviation`);
    assert.deepEqual(resolved.collisionPolicy, {
      openingAuthority: 'live-connection-endpoints',
      inactiveSlotClosure: 'full-height-collision-wall',
      activeSlotLintel: 'render-only-above-clear-height',
    });

    const expectedActiveIds = manifestNode.doorwaySlots
      .filter(({id}) => liveEndpointKeys.has(`${manifestNode.id}/${id}`))
      .map(({id}) => id)
      .sort();
    assert.deepEqual(resolved.portalInterfaces.filter(({active}) => active).map(({manifestSlotId}) => manifestSlotId).sort(), expectedActiveIds);
    assert.equal(resolved.portalInterfaces.length, manifestNode.doorwaySlots.length);
    const template = MUSEUM_HALL_TEMPLATE_REGISTRY.find(({id}) => id === resolved.templateId);
    assert(template);
    for (const portal of resolved.portalInterfaces) {
      const slot = manifestNode.doorwaySlots.find(({id}) => id === portal.manifestSlotId);
      const canonical = template.portalSlots.find(({id}) => id === portal.templateSlotId);
      assert(slot && canonical, `${manifestNode.id}/${portal.manifestSlotId} has no canonical portal binding`);
      const expectedEdge = Math.abs(slot.inwardNormal.x) > Math.abs(slot.inwardNormal.z)
        ? slot.inwardNormal.x > 0 ? 'west' : 'east'
        : slot.inwardNormal.z > 0 ? 'north' : 'south';
      assert.equal(canonical.edge, expectedEdge);
      assert.deepEqual(portal.actual, {
        clearWidth: slot.clearWidth,
        clearHeight: slot.clearHeight,
        transitionDepth: slot.transitionDepth,
      });
      assert(portal.actual.clearWidth >= template.publicPortal.clearWidthMetres);
      assert(portal.actual.clearHeight >= template.publicPortal.clearHeightMetres);
      assert(portal.actual.transitionDepth >= template.publicPortal.transitionDepthMetres);
    }

    const expectedMapCells = definition.layout.spatialCells.map((cell) => ({
      id: cell.id,
      bounds: {...(cell.renderBounds ?? cell.bounds)},
    }));
    assert.deepEqual(resolved.mapCells, expectedMapCells);
    assert.deepEqual(mapProjectionById.get(manifestNode.id)?.cells.map(({id}) => id), resolved.mapCells.map(({id}) => id));
    assert.deepEqual(resolved.lightingInterface.roles, hallProgram.sharedPhysicalContract.lightingInterface);
    assert.equal(resolved.lightingInterface.thresholdAnchors.length, expectedActiveIds.length);
    assert.deepEqual(resolved.lightingInterface.perimeterTrackIds, definition.layout.lighting.tracks.map(({id}) => id));
    assert.deepEqual(
      [...resolved.lightingInterface.anchorTrackIds].sort(),
      [...new Set(definition.layout.lighting.exhibitLights.map(({trackId}) => trackId))].sort(),
    );
    assert(resolved.lightingInterface.accessibleLabelAnchorIds.length >= definition.layout.exhibits.length);
    assert(unique(resolved.lightingInterface.accessibleLabelAnchorIds));

    assert.deepEqual(resolved.exhibitSlotPolicy, {
      standardBayWidth: hallProgram.sharedPhysicalContract.exhibitBayWidths.standard,
      anchorBayWidth: hallProgram.sharedPhysicalContract.exhibitBayWidths.anchor,
      clearViewingFloor: hallProgram.sharedPhysicalContract.clearViewingFloorTarget,
    });
    assert.equal(resolved.exhibitSlots.length, 8);
    assert.deepEqual(resolved.exhibitSlots.map(({exhibitId}) => exhibitId).sort(), definition.layout.exhibits.map(({id}) => id).sort());
    for (const slot of resolved.exhibitSlots) {
      assert(['anchor-capable', 'standard', 'legacy-below-standard'].includes(slot.bayClass));
      assert(['meets-target', 'legacy-below-target'].includes(slot.viewingClearance));
    }
  }
});

check('compiled hall shells keep active portal gaps collision-free and lintels render-only', () => {
  for (const definition of definitions) {
    const manifestNode = buildingManifest.nodes.find(({publicHallId}) => publicHallId === definition.id);
    assert(manifestNode);
    const activePortals = definition.resolvedTemplate.portalInterfaces.filter(({active}) => active);
    assert.equal(
      definition.architectureWalls.length,
      definition.layout.wallColliders.length + activePortals.filter(({lintelHeight}) => lintelHeight >= .08).length,
    );
    for (const wall of definition.layout.wallColliders) {
      assert(definition.architectureWalls.some(({id}) => id === wall.id), `${definition.id} collision wall ${wall.id} is not rendered`);
    }
    for (const portal of activePortals) {
      const manifestSlot = manifestNode.doorwaySlots.find(({id}) => id === portal.manifestSlotId);
      assert(manifestSlot);
      const opening = doorwayOpeningCollider({
        id: portal.manifestSlotId,
        position: portal.position,
        inwardNormal: portal.inwardNormal,
        clearWidth: portal.actual.clearWidth,
      }, definition.layout.playerRadius);
      const blockingOpeningColliders = allColliders(definition.layout).filter((collider) => collidersOverlap(opening, collider));
      assert.equal(blockingOpeningColliders.length, 0, `${definition.id}/${portal.manifestSlotId} has collision in its pedestrian-safe opening band: ${blockingOpeningColliders.map(({id}) => id).join(', ')}`);
      const landing = contractedLandingCollider(manifestSlot, definition.layout.playerRadius);
      const blockingLandingColliders = allColliders(definition.layout).filter((collider) => collidersOverlap(landing, collider));
      assert.equal(blockingLandingColliders.length, 0, `${definition.id}/${portal.manifestSlotId} has collision in its safe landing: ${blockingLandingColliders.map(({id}) => id).join(', ')}`);
      const lintels = definition.architectureWalls.filter((wall) => wall.openingId === portal.manifestSlotId && (wall.bottom ?? 0) > 0);
      assert.equal(lintels.length, portal.lintelHeight >= .08 ? 1 : 0, `${definition.id}/${portal.manifestSlotId} lintel count drifted`);
      for (const lintel of lintels) {
        approx(lintel.bottom, portal.actual.clearHeight, `${definition.id}/${portal.manifestSlotId} clear height`);
        approx(lintel.height, portal.lintelHeight, `${definition.id}/${portal.manifestSlotId} lintel height`);
        assert(!definition.layout.wallColliders.some(({id}) => id === lintel.id), `${lintel.id} leaked into collision`);
      }
    }
  }
});

check('connection endpoint toggles deterministically open or close an authored hall seam', () => {
  const manifestNode = buildingManifest.nodes.find(({publicHallId}) => publicHallId === 'ethics-justice-political-life');
  assert(manifestNode);
  const portal = manifestNode.doorwaySlots.find(({id}) => id === 'logic-threshold');
  assert(portal);
  const syntheticWall = {
    id: 'audit:authored-wall-across-logic-threshold',
    center: portal.position,
    size: Math.abs(portal.inwardNormal.x) > .5
      ? {width: buildingManifest.physicalContract.wallThickness, depth: portal.clearWidth + 4}
      : {width: portal.clearWidth + 4, depth: buildingManifest.physicalContract.wallThickness},
    rotation: 0,
    height: 5.8,
  };
  const opening = doorwayOpeningCollider(portal, ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION.layout.playerRadius);
  const cutPieces = cutMuseumWallsForDoorway([syntheticWall], portal);
  assert.equal(cutPieces.length, 2, 'an active endpoint must split an authored wall around its clear width');
  assert(!cutPieces.some((wall) => collidersOverlap(opening, wall)), 'the split leaves collision in the active opening');

  const authoredLayout = {
    ...ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION.layout,
    wallColliders: [...ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION.layout.wallColliders, syntheticWall],
  };
  const openShell = resolveMuseumHallShell(manifestNode, authoredLayout, new Set([portal.id]));
  const closedShell = resolveMuseumHallShell(manifestNode, authoredLayout, new Set());
  assert.equal(openShell.resolvedTemplate.portalInterfaces.find(({manifestSlotId}) => manifestSlotId === portal.id)?.active, true);
  assert.equal(closedShell.resolvedTemplate.portalInterfaces.find(({manifestSlotId}) => manifestSlotId === portal.id)?.active, false);
  assert(!openShell.layout.wallColliders.some(({id}) => id === `${manifestNode.id}:${portal.id}:inactive-closure`));
  const closure = closedShell.layout.wallColliders.find(({id}) => id === `${manifestNode.id}:${portal.id}:inactive-closure`);
  assert(closure, 'removing the live endpoint must create a full-height collision closure');
  assert(collidersOverlap(opening, closure), 'the inactive closure does not actually close the portal');
  assert(openShell.architectureWalls.some((wall) => wall.openingId === portal.id && (wall.bottom ?? 0) === portal.clearHeight));
  assert(!closedShell.architectureWalls.some((wall) => wall.openingId === portal.id && (wall.bottom ?? 0) > 0));
});

check('hall renderers consume the compiled shell and executable template interfaces', () => {
  assert.match(buildingRuntimeSource, /liveConnectionEndpointKeys/);
  assert.match(buildingRuntimeSource, /resolveMuseumHallShell\(node, content\.layout, activeSlotIds\)/);
  assert.match(ancientArchitectureSource, /definition\.architectureWalls\.map/);
  assert.match(contemporaryArchitectureSource, /definition\.architectureWalls\.map/);
  assert.doesNotMatch(ancientArchitectureSource, /layout\.wallColliders\.map/);
  assert.doesNotMatch(contemporaryArchitectureSource, /layout\.wallColliders\.map/);
  assert.match(templateInterfacesSource, /definition\.resolvedTemplate\.portalInterfaces\.filter/);
  assert.match(templateInterfacesSource, /museumThresholdLight: true/);
  assert.match(visitorMapProjectionSource, /node\.resolvedTemplate\?\.mapCells \?\? node\.layout\.spatialCells/);
  assert.match(hallTemplatesSource, /openingAuthority: 'live-connection-endpoints'/);
  assert.match(hallTemplatesSource, /exhibitSlots: layout\.exhibits\.map/);
});

check('each hall has the mandated eight exhibits, three zones, and guided order', () => {
  for (const hall of MUSEUM_HALLS) {
    assert.deepEqual(hall.exhibits.map(({id}) => id), EXPECTED_EXHIBITS[hall.id]);
    assert.equal(hall.exhibits.length, 8);
    assert.equal(hall.zones.length, 3);
    assert(unique(hall.exhibits.map(({id}) => id)));
    assert(unique(hall.zones.map(({id}) => id)));
    assert.deepEqual([...hall.guidedOrder], EXPECTED_EXHIBITS[hall.id]);
    const zoneIds = new Set(hall.zones.map(({id}) => id));
    for (const exhibit of hall.exhibits) assert(zoneIds.has(exhibit.zoneId), `${hall.id}/${exhibit.id} uses an unknown zone`);
  }
  assert.equal(activeExhibitRefs.size, 48);
  assert.equal(activeExhibitIds.size, 48, 'active exhibit IDs must remain globally unique');
});

check('catalog entities resolve to real philosopher or branch records', () => {
  const philosopherIds = new Set(philosophers.map(({id}) => id));
  const branchIds = new Set(branches.map(({id}) => id));
  for (const hall of MUSEUM_HALLS) {
    for (const exhibit of hall.exhibits) {
      assert.equal(exhibit.id, exhibit.entityId, `${hall.id}/${exhibit.id} must keep its entity-matching stable ID`);
      const ids = exhibit.entityKind === 'philosopher' ? philosopherIds : branchIds;
      assert(ids.has(exhibit.entityId), `${hall.id}/${exhibit.id} has no ${exhibit.entityKind} record`);
      assert.equal(exhibit.supportingAssetIds.length, 1, `${hall.id}/${exhibit.id} must have exactly two curated assets total`);
    }
  }
});

check('each authored layout agrees exactly with its catalog and remains internally safe', () => {
  for (const definition of definitions) {
    const {layout} = definition;
    const hall = hallsById.get(definition.id);
    assert(hall);
    assert.equal(layout.id, definition.id);
    assert.equal(layout.title, hall.title);
    assert.deepEqual(layout.exhibits.map(({id}) => id).sort(), hall.exhibits.map(({id}) => id).sort());
    assert.deepEqual([...layout.guidedOrder], [...hall.guidedOrder]);
    assert.equal(layout.guidedWalkLegs.length, 7);
    approx(sumCellArea(layout), layout.floorArea, `${layout.id} floor area`);
    assert(layout.spatialCells.length >= 3);
    assert(layout.spatialConnections.length >= layout.spatialCells.length - 1);
    assert(layout.wallColliders.length > 0);
    assert.equal(layout.lighting.exhibitLights.length, 8);
    assert(unique(layout.lighting.exhibitLights.map(({exhibitId}) => exhibitId)));
    assert.equal(layout.cameraFov, 68, `${layout.id} must keep the persistent camera projection contract`);
    assert.equal(layout.cameraFar, 110, `${layout.id} must keep the persistent camera far plane`);

    const cellById = new Map(layout.spatialCells.map((cell) => [cell.id, cell]));
    const layoutExhibitById = new Map(layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
    assert.equal(cellById.size, layout.spatialCells.length);
    assert.equal(layoutExhibitById.size, 8);
    for (const cell of layout.spatialCells) {
      assert(cell.bounds.minX < cell.bounds.maxX && cell.bounds.minZ < cell.bounds.maxZ, `${layout.id}/${cell.id} has invalid bounds`);
      for (const exhibitId of cell.exhibitIds) {
        const exhibit = layoutExhibitById.get(exhibitId);
        assert(exhibit, `${layout.id}/${cell.id} names unknown exhibit ${exhibitId}`);
        assert.equal(exhibit.spatialCellId, cell.id, `${layout.id}/${exhibitId} is assigned to a different cell`);
      }
    }
    for (const connection of layout.spatialConnections) {
      assert(cellById.has(connection.fromCellId), `${layout.id}/${connection.id} has unknown from-cell`);
      assert(cellById.has(connection.toCellId), `${layout.id}/${connection.id} has unknown to-cell`);
    }
    for (const exhibit of layout.exhibits) {
      assert(cellById.has(exhibit.spatialCellId), `${layout.id}/${exhibit.id} has unknown spatial cell`);
      assert.equal(exhibit.collider.id, `exhibit-${exhibit.id}`);
      assert(exhibit.interactionRadius > 0);
      assert(isValidMuseumPosition(exhibit.viewpoint, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells), `${layout.id}/${exhibit.id} viewpoint is unsafe`);
      assert.equal(exhibit.scene.mediaMounts.length, 2, `${layout.id}/${exhibit.id} must render two media objects`);
      const catalog = hall.exhibits.find(({id}) => id === exhibit.id);
      const mounted = exhibit.scene.mediaMounts.map(({assetId}) => assetId).sort();
      assert.deepEqual(mounted, [catalog.principalAssetId, ...catalog.supportingAssetIds].sort(), `${layout.id}/${exhibit.id} mounted assets drifted`);
    }
    assert(isValidMuseumPosition(layout.spawn, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells), `${layout.id} spawn is unsafe`);
    assert(isValidMuseumPosition(layout.reset, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells), `${layout.id} reset is unsafe`);

    const expectedFromEntryViews = [];
    const horizontalHalfFov = Math.atan(Math.tan(layout.cameraFov * Math.PI / 360) * (16 / 9));
    for (const entryView of layout.entryViews) {
      const cell = cellById.get(entryView.spatialCellId);
      assert(cell, `${layout.id} entry view names unknown spatial cell ${entryView.spatialCellId}`);
      assert(
        isValidMuseumPosition(entryView.pose, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells),
        `${layout.id}/${entryView.spatialCellId} entry pose is unsafe`,
      );
      assert(
        entryView.pose.x >= cell.bounds.minX && entryView.pose.x <= cell.bounds.maxX
          && entryView.pose.z >= cell.bounds.minZ && entryView.pose.z <= cell.bounds.maxZ,
        `${layout.id}/${entryView.spatialCellId} entry pose sits outside its authored room`,
      );
      for (const exhibitId of entryView.expectedVisibleExhibitIds) {
        const exhibit = layoutExhibitById.get(exhibitId);
        assert(exhibit, `${layout.id}/${entryView.spatialCellId} entry view names unknown exhibit ${exhibitId}`);
        assert.equal(exhibit.spatialCellId, entryView.spatialCellId, `${layout.id}/${exhibitId} is not in the entry view's room`);
        const bearing = Math.atan2(-(exhibit.position.x - entryView.pose.x), -(exhibit.position.z - entryView.pose.z));
        const angularDelta = Math.atan2(Math.sin(bearing - entryView.pose.yaw), Math.cos(bearing - entryView.pose.yaw));
        assert(
          Math.abs(angularDelta) <= horizontalHalfFov,
          `${layout.id}/${exhibitId} falls outside the 16:9 entry-view frustum (${(Math.abs(angularDelta) * 180 / Math.PI).toFixed(1)}°)`,
        );
        expectedFromEntryViews.push(exhibitId);
      }
    }
    assert(unique(expectedFromEntryViews), `${layout.id} repeats an exhibit across room-entry compositions`);
    assert.deepEqual(expectedFromEntryViews.sort(), layout.exhibits.map(({id}) => id).sort(), `${layout.id} entry views must introduce all eight exhibits`);
  }
});

check('the visitor map is projected from the live manifest/runtime and resolves only safe public destinations', () => {
  const nodeIds = MUSEUM_VISITOR_MAP_NODES.map(({hallId}) => hallId);
  assert(unique(nodeIds), 'visitor-map hall IDs must be unique');
  assert.deepEqual([...nodeIds].sort(), definitions.map(({id}) => id).sort());
  assert.deepEqual([...nodeIds].sort(), MUSEUM_HALLS.map(({id}) => id).sort());
  assert.deepEqual(MUSEUM_VISITOR_MAP_PROJECTION.map(({hall}) => hall.id), definitions.map(({id}) => id));
  const hallNodeByPublicId = new Map(buildingManifest.nodes.filter(({publicHallId}) => publicHallId).map((node) => [node.publicHallId, node]));
  for (const node of MUSEUM_VISITOR_MAP_NODES) {
    assert.deepEqual(Object.keys(node).sort(), ['destination', 'hallId', 'physicalNodeId'], `${node.hallId} duplicates catalog or projection data`);
    assert.equal(node.physicalNodeId, hallNodeByPublicId.get(node.hallId)?.id, `${node.hallId} is detached from its physical node`);
    const definition = definitionsById.get(node.hallId);
    assert(definition, `${node.hallId} has no registered Museum definition`);
    const destination = resolveMuseumVisitorMapDestination(definition, node);
    assert(destination, `${node.hallId} visitor-map destination cannot resolve`);
    assertFinitePose(destination, `${node.hallId} visitor-map destination`);
    assert(
      isValidMuseumPosition(destination, definition.layout.playerRadius, definition.layout.bounds, allColliders(definition.layout), definition.layout.spatialCells),
      `${node.hallId} visitor-map destination is not collision-safe`,
    );
    if (node.destination.kind === 'spawn') assert.deepEqual(destination, definition.layout.spawn, `${node.hallId} must use its authored spawn`);
    else assert(definition.entrances.some(({id}) => id === node.destination.entranceId), `${node.hallId} names an unknown visitor-map entrance`);
  }
  assert.deepEqual(MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.map(({id}) => id), buildingManifest.nodes.map(({id}) => id));
  for (const projected of MUSEUM_VISITOR_MAP_NODE_PROJECTIONS) {
    assert(projected.cells.length > 0, `${projected.id} has no projected cells`);
    assert(projected.cells.every(({points, area}) => points.length === 4 && area > 0 && points.every(({x, y}) => Number.isFinite(x) && Number.isFinite(y))), `${projected.id} has invalid projected geometry`);
  }
  assert.equal(MUSEUM_VISITOR_MAP_EDGES.length, buildingManifest.connections.length, 'visitor-map seams must render exactly once');
  assert.deepEqual(MUSEUM_VISITOR_MAP_EDGES.map(({connectionId}) => connectionId).sort(), buildingManifest.connections.map(({id}) => id).sort());
  assert(MUSEUM_VISITOR_MAP_EDGES.every(({points}) => points.length >= 2 && points.every(({x, y}) => Number.isFinite(x) && Number.isFinite(y))));
  const doorwayCount = buildingManifest.nodes.reduce((sum, node) => sum + node.doorwaySlots.length, 0);
  assert.equal(MUSEUM_VISITOR_MAP_DOORWAYS.length, doorwayCount);
  assert.equal(MUSEUM_VISITOR_MAP_ENTRANCE.key, `${buildingManifest.mainEntrance.nodeId}:${buildingManifest.mainEntrance.slotId}`);
  assert.equal(MUSEUM_VISITOR_MAP_RESERVATIONS.length, buildingManifest.reservations.length);
  assert.deepEqual(MUSEUM_VISITOR_MAP_RESERVATIONS.map(({id}) => id).sort(), buildingManifest.reservations.map(({id}) => id).sort());
  assert.equal(MUSEUM_VISITOR_MAP_KIOSK_MARKER.kioskId, buildingManifest.kiosk.kioskId);
  assert([MUSEUM_VISITOR_MAP_VIEWBOX.minX, MUSEUM_VISITOR_MAP_VIEWBOX.minY, MUSEUM_VISITOR_MAP_VIEWBOX.width, MUSEUM_VISITOR_MAP_VIEWBOX.height].every(Number.isFinite));
  assert(MUSEUM_VISITOR_MAP_VIEWBOX.width > 0 && MUSEUM_VISITOR_MAP_VIEWBOX.height > 0);
  assert.match(visitorMapDataSource, /MUSEUM_BUILDING_MANIFEST/);
  assert.match(visitorMapDataSource, /MUSEUM_WORLD_DEFINITIONS/);
  assert.match(visitorMapProjectionSource, /MUSEUM_BUILDING_MANIFEST/);
  assert.match(visitorMapProjectionSource, /MUSEUM_RUNTIME_NODES/);
  assert.match(visitorMapProjectionSource, /MUSEUM_DIRECTED_CONNECTIONS/);
  assert.doesNotMatch(visitorMapDataSource, /\bmapPosition\b|\{x:\s*\d+\s*,\s*y:\s*\d+\}/, 'visitor-map data must not contain manual percentage coordinates');
});

check('circulation doorways render authored clear-height lintels without adding overhead collision', () => {
  const longCirculationCells = MUSEUM_RUNTIME_NODES
    .filter(({kind}) => kind !== 'hall')
    .flatMap(({layout}) => layout.spatialCells)
    .filter(({renderBounds, bounds}) => {
      const visible = renderBounds ?? bounds;
      return Math.max(visible.maxX - visible.minX, visible.maxZ - visible.minZ) >= 24;
    });
  assert(longCirculationCells.length >= 3, 'the pilot has no audited long circulation runs');
  assert.match(museumBuildingArchitectureSource, /guideSegmentCount = Math\.max\(1, Math\.ceil\(run \/ 12\)\)/);
  assert.match(museumBuildingArchitectureSource, /markerCount = !forum && run >= 24/);
  assert.match(museumBuildingArchitectureSource, /circulationGuide: 'threshold-marker'/);
  for (const manifestNode of buildingManifest.nodes.filter(({kind}) => kind !== 'hall')) {
    const runtimeNode = MUSEUM_RUNTIME_NODES.find(({id}) => id === manifestNode.id);
    assert(runtimeNode?.architectureWalls?.length, `${manifestNode.id} has no circulation architecture wall set`);
    assert(runtimeNode.architectureWalls.length > runtimeNode.layout.wallColliders.length, `${manifestNode.id} renders no lintels`);
    assert(runtimeNode.layout.wallColliders.every(({bottom, openingId}) => (bottom ?? 0) === 0 && !openingId), `${manifestNode.id} leaked a lintel into 2D movement collision`);
    for (const slot of manifestNode.doorwaySlots) {
      const openingId = `${manifestNode.id}:${slot.id}`;
      let lintels = runtimeNode.architectureWalls.filter((wall) => wall.openingId === openingId);
      if (lintels.length === 0) {
        const connection = buildingManifest.connections.find(({a, b}) =>
          (a.nodeId === manifestNode.id && a.slotId === slot.id)
          || (b.nodeId === manifestNode.id && b.slotId === slot.id));
        const counterpart = connection
          ? connection.a.nodeId === manifestNode.id && connection.a.slotId === slot.id ? connection.b : connection.a
          : undefined;
        const counterpartNode = counterpart ? MUSEUM_RUNTIME_NODES.find(({id}) => id === counterpart.nodeId) : undefined;
        lintels = counterpartNode?.architectureWalls?.filter((wall) => wall.openingId === `${counterpart.nodeId}:${counterpart.slotId}`) ?? [];
      }
      assert(lintels.length > 0, `${openingId} physical seam has no rendered lintel on either side`);
      for (const lintel of lintels) {
        approx(lintel.bottom, slot.clearHeight, `${openingId} rendered clear height`);
        assert(lintel.height > 0, `${openingId} lintel has no height`);
      }
    }
  }
  assert.match(museumBuildingArchitectureSource, /node\.architectureWalls \?\? node\.layout\.wallColliders/);
  assert.match(museumBuildingArchitectureSource, /bottom \+ wall\.height \/ 2/);
});

check('future footprints, map labels, wall cuts, rendered barriers, and colliders stay distinct', () => {
  const footprintColliders = buildingManifest.reservations.map((reservation) => ({
    id: reservation.id,
    center: reservation.center,
    size: reservation.size,
    rotation: reservation.rotation,
  }));
  for (let firstIndex = 0; firstIndex < footprintColliders.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < footprintColliders.length; secondIndex += 1) {
      const first = footprintColliders[firstIndex];
      const second = footprintColliders[secondIndex];
      assert(!collidersOverlap(first, second), `${first.id} footprint overlaps ${second.id}`);
      const firstMap = MUSEUM_VISITOR_MAP_RESERVATIONS.find(({id}) => id === first.id);
      const secondMap = MUSEUM_VISITOR_MAP_RESERVATIONS.find(({id}) => id === second.id);
      const firstLabelY = firstMap.labelPoint.y + (firstMap.reservationType === 'insertion' ? -2.4 : 2.4);
      const secondLabelY = secondMap.labelPoint.y + (secondMap.reservationType === 'insertion' ? -2.4 : 2.4);
      assert(Math.hypot(firstMap.labelPoint.x - secondMap.labelPoint.x, firstLabelY - secondLabelY) >= 8, `${first.id} map label stacks with ${second.id}`);
    }
  }

  for (const reservation of buildingManifest.reservations) {
    assert(reservation.barrierWidth > 0 && reservation.barrierWidth <= reservation.size.width, `${reservation.id} has an invalid barrier width`);
    approx(reservation.center.x, reservation.barrierCenter.x - Math.sin(reservation.rotation) * reservation.size.depth / 2, `${reservation.id} footprint x must start at its wall-line barrier`);
    approx(reservation.center.z, reservation.barrierCenter.z - Math.cos(reservation.rotation) * reservation.size.depth / 2, `${reservation.id} footprint z must start at its wall-line barrier`);
    const body = getMuseumReservationBarrierBody(reservation);
    const runtimeNode = MUSEUM_RUNTIME_NODES.find(({id}) => id === reservation.hostNodeId);
    assert(runtimeNode, `${reservation.id} has no runtime host`);
    const collider = runtimeNode.layout.obstacleColliders.find(({id}) => id === reservation.id);
    assert(collider, `${reservation.id} has no collision body`);
    assert.deepEqual(collider.center, body.center, `${reservation.id} render/collision center diverged`);
    assert.deepEqual(collider.size, body.size, `${reservation.id} render/collision size diverged`);
    approx(collider.rotation, body.rotation, `${reservation.id} render/collision rotation`);
    assert.equal(body.size.width, reservation.barrierWidth, `${reservation.id} body ignores manifest barrier width`);
    const lintels = runtimeNode.architectureWalls?.filter(({openingId}) => openingId === reservation.id) ?? [];
    assert(lintels.length > 0, `${reservation.id} was not cut into its host wall`);
    for (const lintel of lintels) approx(lintel.bottom, buildingManifest.physicalContract.doorClearHeight, `${reservation.id} portal clear height`);
  }
  assert.match(museumBuildingArchitectureSource, /getMuseumReservationBarrierBody\(reservation\)/);
  assert.doesNotMatch(museumBuildingArchitectureSource, /Math\.min\(6\.4|reservation\.size\.width/);
});

check('the Hall I visitor-map kiosk is visible, approachable, collision-backed, and clear of circulation', () => {
  const definition = ANCIENT_GREEK_HALL_DEFINITION;
  const {layout} = definition;
  const kiosk = MUSEUM_VISITOR_MAP_KIOSK;
  assert.equal(kiosk.hallId, definition.id);
  assert.equal(kiosk.kind, 'visitor-map-kiosk');
  assert(kiosk.center.x > layout.spawn.x, 'the kiosk must sit to the spawn visitor’s right');
  for (const value of [kiosk.center.x, kiosk.center.z, kiosk.size.width, kiosk.size.depth, kiosk.rotation, kiosk.height, kiosk.interactionRadius]) {
    assert(Number.isFinite(value), 'the kiosk housing contains non-finite geometry');
  }
  assert(kiosk.size.width >= 1.8 && kiosk.size.width <= 3.2);
  assert(kiosk.size.depth >= .5 && kiosk.size.depth <= 1.3);
  assert(kiosk.height >= 2 && kiosk.height <= 3);
  assert(kiosk.interactionRadius >= 2.4 && kiosk.interactionRadius <= 4);
  for (const value of [kiosk.screen.width, kiosk.screen.height, kiosk.screen.centerY]) {
    assert(Number.isFinite(value) && value > 0, 'the kiosk screen geometry must be finite and positive');
  }
  assert(kiosk.screen.width <= kiosk.size.width - .2, 'the visitor-map screen leaves its horizontal housing');
  assert(kiosk.screen.centerY - kiosk.screen.height / 2 > .3, 'the visitor-map screen intersects the base');
  assert(kiosk.screen.centerY + kiosk.screen.height / 2 < kiosk.height, 'the visitor-map screen leaves the housing height');
  assert(Number.isFinite(kiosk.light.intensity) && kiosk.light.intensity > 0);
  assert(Number.isFinite(kiosk.light.distance) && kiosk.light.distance > 0);
  const furnishingMatches = layout.furnishings.filter(({id}) => id === kiosk.id);
  const colliderMatches = layout.obstacleColliders.filter(({id}) => id === kiosk.id);
  assert.equal(furnishingMatches.length, 1, 'the kiosk must be an authored furnishing exactly once');
  assert.equal(colliderMatches.length, 1, 'the kiosk collider must join movement obstacles exactly once');
  assert.equal(furnishingMatches[0], kiosk, 'the rendered furnishing must use the shared kiosk geometry object');
  assert.equal(colliderMatches[0], kiosk, 'movement collision must use the shared kiosk geometry object');
  const atrium = layout.spatialCells.find(({id}) => id === 'orientation-atrium');
  assert(atrium, 'Hall I needs its Orientation Atrium');
  const corners = colliderCorners(kiosk);
  for (const corner of corners) {
    assert(corner.x > atrium.bounds.minX && corner.x < atrium.bounds.maxX, 'the kiosk footprint leaves the atrium on x');
    assert(corner.z > atrium.bounds.minZ && corner.z < atrium.bounds.maxZ, 'the kiosk footprint leaves the atrium on z');
  }
  assert(distance(layout.spawn, kiosk.center) > kiosk.interactionRadius + 1.5, 'the kiosk must invite approach rather than activate at spawn');
  assert(distance(kiosk.approachPose, kiosk.center) < kiosk.interactionRadius - .15, 'the authored approach pose must enter interaction range');
  assertFinitePose(kiosk.approachPose, 'the visitor-map approach pose');
  assert.equal(visitorMapInteractionAtPose(definition.id, layout.spawn), undefined, 'spawn must not be in kiosk interaction range');
  assert.deepEqual(visitorMapInteractionAtPose(definition.id, kiosk.approachPose), {kind: 'visitor-map', hallId: definition.id, kioskId: kiosk.id});
  const behindKiosk = localPointToWorld(kiosk, {x: 0, z: -(kiosk.size.depth / 2 + .5)});
  assert.equal(visitorMapInteractionAtPose(definition.id, behindKiosk), undefined, 'the one-sided screen activates from behind');
  assert(
    isValidMuseumPosition(kiosk.approachPose, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells),
    'the kiosk approach pose must be collision-free',
  );
  assert(!circleIntersectsCollider(kiosk.approachPose, layout.playerRadius, kiosk), 'the kiosk approach pose intersects its housing');
  const approachBearing = bearingFromPose(kiosk.approachPose, kiosk.center);
  assert(Math.abs(wrappedAngularDelta(approachBearing, kiosk.approachPose.yaw)) < .08, 'the authored approach pose does not face the screen');
  for (const collider of allColliders(layout).filter(({id}) => id !== kiosk.id)) {
    assert(!collidersOverlap(kiosk, collider), `the kiosk housing overlaps collider ${collider.id}`);
  }
  sampleSegment(layout.spawn, kiosk.approachPose, .08, (point) => {
    assert(
      isValidMuseumPosition(point, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells),
      `the direct spawn-to-kiosk approach collides near ${JSON.stringify(point)}`,
    );
  });
  sampleSegment(layout.spawn, layout.spawnFocalPoint, .08, (point) => {
    assert(!circleIntersectsCollider(point, layout.primaryCirculation.clearanceRadius, kiosk), 'the kiosk interrupts the entrance-to-gallery sightline');
  });

  const screenPlaneZ = .151;
  const screenWorldPoints = [-kiosk.screen.width / 2, 0, kiosk.screen.width / 2].map((x) =>
    localPointToWorld(kiosk, {x, z: screenPlaneZ}));
  for (const aspect of [16 / 9, 9 / 16]) {
    const horizontalHalfFov = Math.atan(Math.tan(layout.cameraFov * Math.PI / 360) * aspect);
    for (const point of screenWorldPoints) {
      const delta = wrappedAngularDelta(bearingFromPose(layout.spawn, point), layout.spawn.yaw);
      assert(Math.abs(delta) <= horizontalHalfFov, `the visitor-map screen leaves the initial ${aspect > 1 ? '16:9' : '9:16'} frustum at ${(Math.abs(delta) * 180 / Math.PI).toFixed(1)}°`);
    }
  }
  const verticalHalfFov = layout.cameraFov * Math.PI / 360;
  for (const point of [screenWorldPoints[0], screenWorldPoints.at(-1)]) {
    const horizontalDistance = distance(layout.spawn, point);
    for (const y of [kiosk.screen.centerY - kiosk.screen.height / 2, kiosk.screen.centerY + kiosk.screen.height / 2]) {
      const verticalAngle = Math.atan2(y - layout.eyeHeight, horizontalDistance);
      assert(Math.abs(verticalAngle - layout.spawn.pitch) <= verticalHalfFov, 'the visitor-map screen leaves the initial vertical frustum');
    }
  }
  const screenCenter = screenWorldPoints[1];
  const otherColliders = allColliders(layout).filter(({id}) => id !== kiosk.id);
  sampleSegment(layout.spawn, screenCenter, .08, (point) => {
    for (const collider of otherColliders) {
      assert(!circleIntersectsCollider(point, .02, collider), `collider ${collider.id} occludes the kiosk from spawn`);
    }
  });
  const front = {x: Math.sin(kiosk.rotation), z: Math.cos(kiosk.rotation)};
  const toSpawnLength = distance(kiosk.center, layout.spawn);
  const toSpawn = {x: (layout.spawn.x - kiosk.center.x) / toSpawnLength, z: (layout.spawn.z - kiosk.center.z) / toSpawnLength};
  assert(front.x * toSpawn.x + front.z * toSpawn.z > .9, 'the kiosk screen must face the initial visitor');
});

check('primary circulation and every guided leg remain continuous and collision-free', () => {
  for (const definition of definitions) {
    const {layout} = definition;
    const colliders = allColliders(layout);
    const circulation = layout.primaryCirculation;
    assert(circulation.id.trim());
    assert(circulation.clearanceRadius >= layout.playerRadius);
    assert(circulation.points.length >= 2);
    let circulationLength = 0;
    for (let index = 1; index < circulation.points.length; index += 1) {
      circulationLength += sampleSegment(circulation.points[index - 1], circulation.points[index], .1, (point) => {
        assert(positionInsideSpatialUnion(point, circulation.clearanceRadius, layout.spatialCells), `${layout.id} primary circulation exits the spatial union near ${JSON.stringify(point)}`);
        assert(isValidMuseumPosition(point, circulation.clearanceRadius, layout.bounds, colliders, layout.spatialCells), `${layout.id} primary circulation loses authored clearance near ${JSON.stringify(point)}`);
      });
    }
    assert(circulationLength > 20, `${layout.id} primary circulation is implausibly short`);

    const exhibits = new Map(layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
    for (const [index, leg] of layout.guidedWalkLegs.entries()) {
      assert.equal(leg.fromExhibitId, layout.guidedOrder[index]);
      assert.equal(leg.toExhibitId, layout.guidedOrder[index + 1]);
      const from = exhibits.get(leg.fromExhibitId);
      const to = exhibits.get(leg.toExhibitId);
      assert(from && to);
      const points = [from.viewpoint, ...leg.waypoints, to.viewpoint];
      for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
        sampleSegment(points[pointIndex - 1], points[pointIndex], .1, (point) => {
          assert(positionInsideSpatialUnion(point, layout.playerRadius, layout.spatialCells), `${layout.id} guided leg ${leg.fromExhibitId} → ${leg.toExhibitId} exits the hall`);
          assert(isValidMuseumPosition(point, layout.playerRadius, layout.bounds, colliders, layout.spatialCells), `${layout.id} guided leg ${leg.fromExhibitId} → ${leg.toExhibitId} collides near ${JSON.stringify(point)}`);
        });
      }
    }
  }
});

check('the Ancient compositions retain the required classical triad and Hellenistic perimeter U', () => {
  const layout = ANCIENT_GREEK_HALL_DEFINITION.layout;
  const positions = Object.fromEntries(layout.exhibits.map(({id, position, rotationY}) => [id, {...position, rotationY}]));
  assert.deepEqual(positions.socrates, {x: -8.6, z: 13.3, rotationY: Math.PI / 2});
  assert.deepEqual(positions.plato, {x: 0, z: 10.35, rotationY: 0});
  assert.deepEqual(positions.aristotle, {x: 8.6, z: 13.3, rotationY: -Math.PI / 2});
  assert(positions.cynicism.x > 0 && positions.epicureanism.x < 0);
  assert(positions.stoicism.x < 0 && positions.skepticism.x > 0);
  assert.equal(positions.stoicism.rotationY, 0);
  assert.equal(positions.skepticism.rotationY, 0);
  const hellenisticEntry = layout.entryViews.find(({spatialCellId}) => spatialCellId === 'hellenistic-ways-room');
  assert(hellenisticEntry, 'the Hellenistic room needs an entry view');
  assert.deepEqual([...hellenisticEntry.expectedVisibleExhibitIds].sort(), ['cynicism', 'epicureanism', 'skepticism', 'stoicism']);
});

check('hall files own content and bounded prefetch assets, not building adjacency', () => {
  for (const definition of definitions) {
    assert.equal(definition.prefetch.sceneAssetIds.length, 16);
    assert(unique(definition.prefetch.sceneAssetIds));
    assert(unique(definition.prefetch.entrySceneAssetIds));
    for (const id of definition.prefetch.entrySceneAssetIds) assert(definition.prefetch.sceneAssetIds.includes(id), `${definition.id} entry prefetch includes non-scene asset ${id}`);
    const liveTargetEntrances = MUSEUM_DIRECTED_CONNECTIONS
      .filter(({targetNodeId, implementationStatus}) => targetNodeId === definition.physicalNodeId && implementationStatus === 'live')
      .map(({targetEntranceId}) => targetEntranceId)
      .sort();
    const entryExhibitsByEntrance = definition.prefetch.entryExhibitIdsByEntrance;
    assert.deepEqual(Object.keys(entryExhibitsByEntrance).sort(), liveTargetEntrances, `${definition.id} entry previews do not cover every live target entrance exactly once`);
    const exhibitsById = new Map(definition.layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
    for (const [entranceId, exhibitIds] of Object.entries(entryExhibitsByEntrance)) {
      assert(exhibitIds.length > 0, `${definition.id}/${entranceId} has an empty entry preview`);
      assert(unique(exhibitIds), `${definition.id}/${entranceId} repeats an entry exhibit`);
      for (const exhibitId of exhibitIds) assert(exhibitsById.has(exhibitId), `${definition.id}/${entranceId} references missing exhibit ${exhibitId}`);
    }
    const entryExhibitIds = [...new Set(Object.values(entryExhibitsByEntrance).flat())];
    const renderedEntryAssetIds = [...new Set(entryExhibitIds.flatMap((exhibitId) =>
      exhibitsById.get(exhibitId).scene.mediaMounts.map(({assetId}) => assetId)))].sort();
    assert.deepEqual([...definition.prefetch.entrySceneAssetIds].sort(), renderedEntryAssetIds, `${definition.id} entry prefetch media does not exactly match its rendered doorway previews`);
    assert.equal(Object.hasOwn(definition.prefetch, 'adjacentHallIds'), false, `${definition.id} exposes legacy prefetch adjacency`);
    assert.equal(Object.hasOwn(definition, 'connections'), false, `${definition.id} exposes hall-authored connections`);
  }
  for (const {fileName, source} of hallContentSources) {
    assert.doesNotMatch(source, /\badjacentHallIds\b/, `${fileName} authors adjacentHallIds`);
    assert.doesNotMatch(source, /\bconnections\s*:/, `${fileName} authors physical connections`);
  }
});

check('the approved live-pilot manifest compiles one undirected seam into two conceptual directions', () => {
  assert.equal(buildingManifest.status, 'approved-live-pilot');
  assert.equal(buildingManifest.physicalOptionId, 'ring-of-wings');
  assert.equal(buildingManifest.level.id, 'L0');
  assert(buildingManifest.nodes.every(({levelId, implementationStatus}) => levelId === 'L0' && implementationStatus === 'live'));
  const hallNodes = buildingManifest.nodes.filter(({kind}) => kind === 'hall');
  assert.equal(hallNodes.length, 6);
  assert.deepEqual(hallNodes.map(({publicHallId}) => publicHallId).sort(), [...HALL_IDS].sort());
  assert.equal(MUSEUM_RUNTIME_NODES.length, buildingManifest.nodes.length);
  assert.deepEqual(MUSEUM_RUNTIME_NODES.map(({id}) => id), buildingManifest.nodes.map(({id}) => id));
  assert.equal(MUSEUM_DIRECTED_CONNECTIONS.length, buildingManifest.connections.length * 2);
  assert.match(buildingRuntimeSource, /MUSEUM_BUILDING_MANIFEST\.connections\.flatMap/);
  assert.match(buildingRuntimeSource, /:a-to-b/);
  assert.match(buildingRuntimeSource, /:b-to-a/);
  const directedByConnection = new Map();
  for (const direction of MUSEUM_DIRECTED_CONNECTIONS) {
    const list = directedByConnection.get(direction.connectionId) ?? [];
    list.push(direction);
    directedByConnection.set(direction.connectionId, list);
  }
  for (const connection of buildingManifest.connections) {
    const directions = directedByConnection.get(connection.id);
    assert.equal(directions?.length, 2, `${connection.id} must compile to exactly two directions`);
    assert(directions.some(({sourceNodeId, targetNodeId, localEntranceId, targetEntranceId}) => sourceNodeId === connection.a.nodeId && targetNodeId === connection.b.nodeId && localEntranceId === connection.a.slotId && targetEntranceId === connection.b.slotId), `${connection.id} lacks a→b`);
    assert(directions.some(({sourceNodeId, targetNodeId, localEntranceId, targetEntranceId}) => sourceNodeId === connection.b.nodeId && targetNodeId === connection.a.nodeId && localEntranceId === connection.b.slotId && targetEntranceId === connection.a.slotId), `${connection.id} lacks b→a`);
  }
});

check('the Ring of Wings loop, four spokes, and entrance–Forum shortcut remain fully reachable', () => {
  const graphForRole = (role) => {
    const graph = new Map();
    for (const connection of buildingManifest.connections.filter(({routeRole}) => routeRole === role)) {
      if (!graph.has(connection.a.nodeId)) graph.set(connection.a.nodeId, new Set());
      if (!graph.has(connection.b.nodeId)) graph.set(connection.b.nodeId, new Set());
      graph.get(connection.a.nodeId).add(connection.b.nodeId);
      graph.get(connection.b.nodeId).add(connection.a.nodeId);
    }
    return graph;
  };
  const reachable = (graph, start) => {
    const visited = new Set([start]);
    const pending = [start];
    while (pending.length) {
      const current = pending.shift();
      for (const next of graph.get(current) ?? []) if (!visited.has(next)) {
        visited.add(next);
        pending.push(next);
      }
    }
    return visited;
  };
  const outer = graphForRole('outer-loop');
  assert.equal(buildingManifest.connections.filter(({routeRole}) => routeRole === 'outer-loop').length, 12);
  assert.equal(outer.size, 12);
  assert([...outer.values()].every((neighbors) => neighbors.size === 2), 'outer loop is not a closed cycle');
  assert(HALL_IDS.every((id) => outer.has(`hall:${id}`)), 'a public hall left the outer loop');
  assert.equal(reachable(outer, outer.keys().next().value).size, outer.size, 'outer loop is disconnected');

  const spokes = graphForRole('forum-spoke');
  const spokeNodes = buildingManifest.nodes.filter(({pilotRole}) => pilotRole === 'forum-spoke');
  assert.equal(spokeNodes.length, 4);
  assert.equal(buildingManifest.connections.filter(({routeRole}) => routeRole === 'forum-spoke').length, 8);
  assert(spokeNodes.every(({id}) => spokes.get(id)?.size === 2));
  assert.equal(spokes.get(buildingManifest.forumLocationNodeId)?.size, 4);

  const shortcut = graphForRole('shortcut');
  const shortcutNodes = buildingManifest.nodes.filter(({pilotRole}) => pilotRole === 'shortcut' || pilotRole === 'entrance-forum-shortcut');
  assert.equal(shortcutNodes.length, 1);
  assert.equal(buildingManifest.connections.filter(({routeRole}) => routeRole === 'shortcut').length, 2);
  assert.equal(shortcut.get(shortcutNodes[0].id)?.size, 2);
  assert(shortcut.has(buildingManifest.mainEntrance.nodeId));
  assert(shortcut.has(buildingManifest.forumLocationNodeId));
});

check('every authored doorway seam matches in world space, dimensions, normals, and safe landings', () => {
  const nodeById = new Map(buildingManifest.nodes.map((node) => [node.id, node]));
  const runtimeNodeById = new Map(MUSEUM_RUNTIME_NODES.map((node) => [node.id, node]));
  const usedSlots = new Set();
  const contract = buildingManifest.physicalContract;
  for (const node of buildingManifest.nodes) {
    assert(unique(node.doorwaySlots.map(({id}) => id)), `${node.id} repeats a doorway slot`);
    for (const slot of node.doorwaySlots) {
      const ref = `${node.id}/${slot.id}`;
      assert([slot.position.x, slot.position.z, slot.inwardNormal.x, slot.inwardNormal.z, slot.clearWidth, slot.clearHeight, slot.transitionDepth].every(Number.isFinite), `${ref} has non-finite doorway data`);
      assert(slot.clearWidth >= contract.doorClearWidth && slot.clearHeight >= contract.doorClearHeight && slot.transitionDepth >= contract.transitionDepth, `${ref} falls below doorway dimensions`);
      approx(Math.hypot(slot.inwardNormal.x, slot.inwardNormal.z), 1, `${ref} normal length`);
      assert(slot.landingBounds.maxX - slot.landingBounds.minX + 1e-6 >= contract.safeLandingWidth, `${ref} landing is too narrow`);
      assert(slot.landingBounds.maxZ - slot.landingBounds.minZ + 1e-6 >= contract.safeLandingDepth, `${ref} landing is too shallow`);
      assert(slot.arrivalPose.x >= slot.landingBounds.minX - 1e-6 && slot.arrivalPose.x <= slot.landingBounds.maxX + 1e-6 && slot.arrivalPose.z >= slot.landingBounds.minZ - 1e-6 && slot.arrivalPose.z <= slot.landingBounds.maxZ + 1e-6, `${ref} arrival leaves its landing`);
      const runtimeNode = runtimeNodeById.get(node.id);
      assert(runtimeNode, `${ref} has no runtime node`);
      const landing = {
        center: {
          x: (slot.landingBounds.minX + slot.landingBounds.maxX) / 2,
          z: (slot.landingBounds.minZ + slot.landingBounds.maxZ) / 2,
        },
        size: {
          width: slot.landingBounds.maxX - slot.landingBounds.minX,
          depth: slot.landingBounds.maxZ - slot.landingBounds.minZ,
        },
      };
      const horizontalSamples = Math.max(1, Math.ceil(landing.size.width / .2));
      const verticalSamples = Math.max(1, Math.ceil(landing.size.depth / .2));
      for (let xIndex = 0; xIndex <= horizontalSamples; xIndex += 1) {
        for (let zIndex = 0; zIndex <= verticalSamples; zIndex += 1) {
          const point = {
            x: landing.center.x - landing.size.width / 2 + landing.size.width * xIndex / horizontalSamples,
            z: landing.center.z - landing.size.depth / 2 + landing.size.depth * zIndex / verticalSamples,
          };
          assert(runtimeNode.layout.spatialCells.some(({bounds}) =>
            point.x >= bounds.minX - 1e-7 && point.x <= bounds.maxX + 1e-7
            && point.z >= bounds.minZ - 1e-7 && point.z <= bounds.maxZ + 1e-7),
          `${ref} landing leaves its authored runtime spatial union near ${JSON.stringify(point)}`);
        }
      }
      assert(
        isValidMuseumPosition(slot.arrivalPose, runtimeNode.layout.playerRadius, runtimeNode.layout.bounds, allColliders(runtimeNode.layout), runtimeNode.layout.spatialCells),
        `${ref} arrival is not collision-safe`,
      );
    }
  }
  for (const connection of buildingManifest.connections) {
    const aNode = nodeById.get(connection.a.nodeId);
    const bNode = nodeById.get(connection.b.nodeId);
    const aSlot = aNode?.doorwaySlots.find(({id}) => id === connection.a.slotId);
    const bSlot = bNode?.doorwaySlots.find(({id}) => id === connection.b.slotId);
    assert(aNode && bNode && aSlot && bSlot, `${connection.id} has an unresolved doorway endpoint`);
    for (const ref of [`${connection.a.nodeId}:${connection.a.slotId}`, `${connection.b.nodeId}:${connection.b.slotId}`]) {
      assert(!usedSlots.has(ref), `${connection.id} reuses ${ref}`);
      usedSlots.add(ref);
    }
    const aWorld = manifestPointToWorld(aNode, aSlot.position);
    const bWorld = manifestPointToWorld(bNode, bSlot.position);
    assert(distance(aWorld, bWorld) <= 1e-6, `${connection.id} seam positions differ`);
    const aNormal = rotateDirectionToWorld(aNode, aSlot.inwardNormal);
    const bNormal = rotateDirectionToWorld(bNode, bSlot.inwardNormal);
    approx(aNormal.x * bNormal.x + aNormal.z * bNormal.z, -1, `${connection.id} inward-normal dot product`);
    approx(aSlot.clearWidth, bSlot.clearWidth, `${connection.id} clear width`);
    approx(aSlot.clearHeight, bSlot.clearHeight, `${connection.id} clear height`);
    approx(aSlot.transitionDepth, bSlot.transitionDepth, `${connection.id} transition depth`);
  }
});

check('every live doorway, spawn, and reset shares one walkable collision component per physical node', () => {
  for (const node of MUSEUM_RUNTIME_NODES) {
    auditNavigationConnectivity(node, [
      {label: 'spawn', point: node.layout.spawn},
      {label: 'reset', point: node.layout.reset},
      ...node.entrances.map((entrance) => ({label: `${entrance.id} arrival`, point: entrance.arrivalPose})),
    ]);
  }
});

check('collision-resolved movement can physically cross all 44 directed seams', () => {
  const runtimeNodeById = new Map(MUSEUM_RUNTIME_NODES.map((node) => [node.id, node]));
  const stepDistance = .1;
  const iterationLimit = 80;
  assert(stepDistance <= .12);
  for (const connection of MUSEUM_DIRECTED_CONNECTIONS) {
    const source = runtimeNodeById.get(connection.sourceNodeId);
    const target = runtimeNodeById.get(connection.targetNodeId);
    assert(source, `${connection.id} has no source runtime node`);
    assert(target, `${connection.id} has no target runtime node`);
    const entrance = source.entrances.find(({id}) => id === connection.localEntranceId);
    assert(entrance, `${connection.id} has no source entrance ${connection.localEntranceId}`);
    const {layout} = source;
    const colliders = allColliders(layout);
    assert(
      isValidMuseumPosition(entrance.arrivalPose, layout.playerRadius, layout.bounds, colliders, layout.spatialCells),
      `${connection.id} starts from an invalid source arrival pose`,
    );
    const signedDistance = (point) =>
      (point.x - entrance.position.x) * entrance.inwardNormal.x
      + (point.z - entrance.position.z) * entrance.inwardNormal.z;
    let current = {x: entrance.arrivalPose.x, z: entrance.arrivalPose.z};
    assert(signedDistance(current) >= 0, `${connection.id} arrival pose starts beyond its doorway plane`);
    let crossed = false;
    for (let iteration = 0; iteration < iterationLimit; iteration += 1) {
      const previous = current;
      current = moveWithCollisions(
        previous,
        {
          x: -entrance.inwardNormal.x * stepDistance,
          z: -entrance.inwardNormal.z * stepDistance,
        },
        layout.playerRadius,
        layout.bounds,
        colliders,
        layout.spatialCells,
      );
      const detected = museumConnectionCrossed(source, previous, current);
      if (detected) {
        assert.equal(detected.id, connection.id, `${connection.id} movement triggered ${detected.id}`);
        crossed = true;
      }
      if (signedDistance(current) < 0) {
        assert(crossed, `${connection.id} passed its signed doorway plane without a transition`);
        break;
      }
    }
    assert(
      crossed && signedDistance(current) < 0,
      `${connection.id} could not cross its doorway plane within ${iterationLimit} collision-resolved steps (signed distance ${signedDistance(current).toFixed(3)})`,
    );
    const targetArrival = resolveMuseumHallArrival(
      source,
      target,
      connection.targetEntranceId,
      {...current, yaw: 0, pitch: 0},
    );
    assert(targetArrival, `${connection.id} cannot resolve a target arrival`);
    assert(
      isValidMuseumPosition(targetArrival, target.layout.playerRadius, target.layout.bounds, allColliders(target.layout), target.layout.spatialCells),
      `${connection.id} resolves to an invalid target arrival`,
    );
  }
});

check('bounded residency and blocked future reservations remain manifest-owned', () => {
  assert.equal(buildingManifest.residencyPolicy.maxResidentHallContents, 3);
  assert.equal(buildingManifest.residencyPolicy.recentHallCount, 1);
  assert(buildingManifest.residencyPolicy.approachDistance > 0);
  const syntheticApproaches = [
    'renaissance-reason-revolution',
    'modernity-freedom-critique',
    'logic-language-science',
    'mind-consciousness-self',
  ];
  for (const approachedHallId of syntheticApproaches) {
    const residents = resolveMuseumHallResidency({
      activeHallId: 'ancient-greek',
      approachedHallId,
      recentHallId: 'ethics-justice-political-life',
    });
    assert(residents.length <= 3, `degree-four approach to ${approachedHallId} exceeds the residency cap`);
    assert(residents.includes('ancient-greek'));
    assert(residents.includes(approachedHallId));
    assert.deepEqual(residents.filter((id) => syntheticApproaches.includes(id)), [approachedHallId], 'residency loaded unrelated approach targets');
  }
  assert.deepEqual(resolveMuseumHallResidency({activeHallId: 'ancient-greek', approachedHallId: 'ancient-greek', recentHallId: 'ancient-greek'}), ['ancient-greek']);
  const insertion = buildingManifest.reservations.filter(({reservationType}) => reservationType === 'insertion');
  const outward = buildingManifest.reservations.filter(({reservationType}) => reservationType === 'outward-expansion');
  assert.equal(insertion.length, 4);
  assert.equal(outward.length, 8);
  assert.deepEqual(outward.map(({expansionPortalId}) => expansionPortalId).sort(), ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8']);
  const connectionTokens = new Set(buildingManifest.connections.flatMap(({a, b}) => [a.nodeId, a.slotId, b.nodeId, b.slotId]));
  for (const reservation of buildingManifest.reservations) {
    assert.equal(reservation.label, 'Future gallery — not yet open');
    assert.equal(reservation.blocked, true);
    assert.equal(reservation.implementationStatus, 'reserved');
    assert(!connectionTokens.has(reservation.id));
    if (reservation.expansionPortalId) assert(!connectionTokens.has(reservation.expansionPortalId));
    if (reservation.targetProgramHallId) assert(!HALL_IDS.includes(reservation.targetProgramHallId));
  }
});

check('decoded hall-texture residency is measured and enforced within the 96 MiB manifest budget', () => {
  assert.equal(MUSEUM_DECODED_TEXTURE_BUDGET_MIB, buildingManifest.residencyPolicy.decodedTextureBudgetMiB);
  assert.equal(MUSEUM_DECODED_TEXTURE_BUDGET_BYTES, 96 * 1024 * 1024);
  assert.equal(ANCIENT_GREEK_HALL_DEFINITION.layout.signs?.length, MUSEUM_TEXTURE_SPECS.ancientGallerySignCount);
  assert.match(ancientArchitectureSource, /layout\.signs\?\.map/);
  assert.match(contemporaryArchitectureSource, /layout\.signs\?\.map\(\(sign\) => <PhysicalSign/);
  assert.match(plaqueTextureSource, /MUSEUM_TEXTURE_SPECS\.plaque\.width/);
  assert.match(plaqueTextureSource, /generateMipmaps = true/);
  assert.match(museumSceneMediaSource, /MUSEUM_TEXTURE_SPECS\.sceneFallback\.width/);
  assert.match(museumSceneMediaSource, /texture\.generateMipmaps = false/);
  assert.match(contemporaryArchitectureSource, /MUSEUM_TEXTURE_SPECS\.contemporarySignWidth/);
  assert.match(contemporaryExhibitsSource, /MUSEUM_TEXTURE_SPECS\.contemporaryNameStrip\.width/);
  assert.match(museumKioskSource, /MUSEUM_TEXTURE_SPECS\.visitorMapKiosk\.width/);

  const activeEstimates = HALL_IDS.map((hallId) => estimateMuseumHallTextureResidency(hallId, 'active'));
  const entryEstimates = HALL_IDS.map((hallId) => estimateMuseumHallTextureResidency(hallId, 'entry-resident'));
  for (const estimate of [...activeEstimates, ...entryEstimates]) {
    assert(estimate.totalBytes > 0, `${estimate.hallId}/${estimate.mode} has no measured texture allocation`);
    assert(estimate.sceneBytes > 0, `${estimate.hallId}/${estimate.mode} has no measured scene textures`);
    assert(estimate.generatedBytes > 0, `${estimate.hallId}/${estimate.mode} has no measured generated textures`);
    assert(estimate.totalBytes <= MUSEUM_DECODED_TEXTURE_BUDGET_BYTES, `${estimate.hallId}/${estimate.mode} alone exceeds the texture budget`);
  }

  let auditedPlans = 0;
  let budgetSkips = 0;
  let peakBytes = 0;
  for (const activeHallId of HALL_IDS) {
    for (const approachedHallId of HALL_IDS) {
      if (approachedHallId === activeHallId) continue;
      const approachPlan = resolveMuseumHallResidencyPlan({activeHallId, approachedHallId});
      assert(approachPlan.hallIds.includes(activeHallId), `${activeHallId} was evicted while active`);
      assert(approachPlan.hallIds.includes(approachedHallId), `${approachedHallId} could not be prepared from ${activeHallId}`);
      assert(approachPlan.decodedTextureBytes <= approachPlan.decodedTextureBudgetBytes, `${activeHallId} + ${approachedHallId} exceeds the measured budget`);
      for (const recentHallId of HALL_IDS) {
        if (recentHallId === activeHallId || recentHallId === approachedHallId) continue;
        const request = {activeHallId, approachedHallId, recentHallId};
        const plan = resolveMuseumHallResidencyPlan(request);
        auditedPlans += 1;
        peakBytes = Math.max(peakBytes, plan.decodedTextureBytes);
        budgetSkips += plan.skippedForTextureBudget.length;
        assert(plan.decodedTextureBytes <= plan.decodedTextureBudgetBytes, `${activeHallId}/${approachedHallId}/${recentHallId} exceeds the measured budget`);
        assert.deepEqual(resolveMuseumHallResidency(request), plan.hallIds);
        assert(plan.hallIds.includes(activeHallId));
        assert(plan.hallIds.includes(approachedHallId));
        if (!plan.hallIds.includes(recentHallId)) {
          assert(plan.skippedForTextureBudget.includes(recentHallId), `${recentHallId} was omitted without a texture-budget decision`);
        }
      }
    }
  }
  assert(budgetSkips > 0, 'the decoded texture budget never constrains optional recent content');
  const range = (estimates) => {
    const values = estimates.map(({totalMiB}) => totalMiB);
    return `${Math.min(...values).toFixed(2)}–${Math.max(...values).toFixed(2)} MiB`;
  };
  console.log(`  texture evidence: active ${range(activeEstimates)}; entry-resident ${range(entryEstimates)}; ${auditedPlans} three-hall plans; ${budgetSkips} optional recent halls rejected; peak admitted ${(peakBytes / 1024 / 1024).toFixed(2)} MiB`);
});

check('every generated physical sign class keeps measured text inside a plane-matched safe rectangle', () => {
  let exhibitPlaques = 0;
  let nameStrips = 0;
  let fallbackLabels = 0;
  let authoredHallSigns = 0;

  for (const definition of definitions) {
    const hall = hallsById.get(definition.id);
    assert(hall, `${definition.id} has no catalog hall for sign audit`);
    const exhibitById = new Map(hall.exhibits.map((exhibit) => [exhibit.id, exhibit]));
    for (const layout of definition.layout.exhibits) {
      const exhibit = exhibitById.get(layout.id);
      assert(exhibit, `${definition.id}/${layout.id} has no sign title`);
      assertPlaqueSurface({
        label: `${definition.id}/${layout.id} primary plaque`,
        planeWidth: layout.scene.plaque.width,
        planeHeight: layout.scene.plaque.height,
        reference: MUSEUM_TEXTURE_SPECS.plaque,
        title: exhibit.displayName,
        kicker: definition.id === 'ancient-greek'
          ? (exhibit.entityKind === 'philosopher' ? 'Philosopher bay' : 'School & tradition')
          : 'Philosopher · object · argument',
        subtitle: definition.id === 'ancient-greek'
          ? (exhibit.entityKind === 'philosopher'
              ? 'Documented likeness · text · question'
              : 'Tradition · practice · text · transmission')
          : 'Approach or select for interpretation',
      });
      const plaque = layout.scene.plaque;
      assert(plaque.bounds.size.width >= plaque.width, `${definition.id}/${layout.id} plaque frame is narrower than its plane`);
      assert(plaque.bounds.size.height >= plaque.height, `${definition.id}/${layout.id} plaque frame is shorter than its plane`);
      assert(Math.abs(plaque.position[0]) + plaque.width / 2 <= layout.scene.footprint.width / 2 + .02, `${definition.id}/${layout.id} plaque leaves its installation footprint`);
      assert(plaque.position[1] + plaque.height / 2 <= layout.scene.footprint.height + .02, `${definition.id}/${layout.id} plaque exceeds its installation height`);
      assert(Math.abs(plaque.position[2]) <= layout.scene.footprint.depth / 2 + .02, `${definition.id}/${layout.id} plaque leaves its installation depth`);
      exhibitPlaques += 1;

      if (definition.id !== 'ancient-greek') {
        const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'));
        assert(backing, `${definition.id}/${layout.id} lacks its name-strip backing`);
        assertPlaqueSurface({
          label: `${definition.id}/${layout.id} name strip`,
          planeWidth: backing.size.width - .18,
          planeHeight: .34,
          reference: MUSEUM_TEXTURE_SPECS.contemporaryNameStrip,
          title: exhibit.displayName,
          kicker: 'Philosophy Atlas',
          subtitle: 'Select for the full interpretation',
        });
        assert(backing.size.height >= .34, `${definition.id}/${layout.id} name strip exceeds its backing`);
        nameStrips += 1;
      }

      for (const mount of layout.scene.mediaMounts) {
        const asset = assetById.get(mount.assetId);
        assert(asset, `${definition.id}/${layout.id}/${mount.id} lacks fallback asset metadata`);
        assertPlaqueSurface({
          label: `${definition.id}/${layout.id}/${mount.id} fallback label`,
          planeWidth: mount.width,
          planeHeight: mount.height,
          reference: MUSEUM_TEXTURE_SPECS.sceneFallback,
          title: asset.title,
          kicker: 'Object image unavailable',
          subtitle: asset.objectDate,
        });
        assert(mount.bounds.size.width >= mount.width, `${definition.id}/${layout.id}/${mount.id} fallback plane exceeds its frame width`);
        assert(mount.bounds.size.height >= mount.height, `${definition.id}/${layout.id}/${mount.id} fallback plane exceeds its frame height`);
        fallbackLabels += 1;
      }
    }

    for (const sign of definition.layout.signs ?? []) {
      const reference = {
        width: MUSEUM_TEXTURE_SPECS.contemporarySignWidth,
        height: Math.round(MUSEUM_TEXTURE_SPECS.contemporarySignWidth * sign.height / sign.width),
        mipmaps: true,
      };
      assertPlaqueSurface({
        label: `${definition.id}/${sign.id}`,
        planeWidth: sign.width,
        planeHeight: sign.height,
        reference,
        title: sign.title,
        kicker: sign.kicker,
        subtitle: sign.subtitle,
      });
      assertPhysicalSignPlacement(definition, sign);
      authoredHallSigns += 1;
    }
  }

  const orientationPlinth = ANCIENT_GREEK_HALL_DEFINITION.layout.furnishings.find(({kind}) => kind === 'orientation-plinth');
  assert(orientationPlinth, 'Ancient orientation plinth is missing');
  assertPlaqueSurface({
    label: 'Ancient orientation plinth',
    planeWidth: orientationPlinth.size.width - .34,
    planeHeight: .74,
    reference: MUSEUM_TEXTURE_SPECS.ancientOrientationPlinth,
    title: 'Philosophy Atlas',
    kicker: 'Museum · Ancient wing',
    subtitle: 'Ancient thought: inquiry, practice, inheritance',
  });

  const kioskSpec = MUSEUM_TEXTURE_SPECS.visitorMapKiosk;
  const kioskPlaneAspect = MUSEUM_VISITOR_MAP_KIOSK.screen.width / MUSEUM_VISITOR_MAP_KIOSK.screen.height;
  const kioskTextureAspect = kioskSpec.width / kioskSpec.height;
  assert(
    Math.abs(kioskTextureAspect - kioskPlaneAspect) <= kioskPlaneAspect / Math.min(kioskSpec.width, kioskSpec.height),
    'visitor-map kiosk texture aspect does not match its physical screen',
  );
  const kioskContext = createDeterministicTextContext();
  const kioskTextRuns = [
    {text: 'PHILOSOPHY ATLAS · RING OF WINGS', x: 62, size: 25, right: 1140},
    {text: 'Main-level plan', x: 62, size: 58, right: 1140},
    {text: 'Live Ring pilot · 6 of 26 planned public halls open', x: 64, size: 21, right: 1140},
    ...MUSEUM_VISITOR_MAP_PROJECTION.map(({hall}) => ({text: hall.title, x: 832, size: 16, right: 1140})),
    {text: '4 planned gallery connections', x: 852, size: 14, right: 1140},
    {text: '8 reserved outward expansion portals', x: 852, size: 14, right: 1140},
    {text: 'Remaining planned halls appear as constructed', x: 790, size: 12, right: 1140},
    {text: 'E / ENTER · TAP TO OPEN', x: 62, size: 20, right: 1140},
  ];
  for (const run of kioskTextRuns) {
    kioskContext.font = `700 ${run.size}px system-ui, sans-serif`;
    assert(run.x + kioskContext.measureText(run.text).width <= run.right, `visitor-map kiosk clips “${run.text}”`);
  }
  assert.match(museumKioskSource, /canvas\.width = MUSEUM_TEXTURE_SPECS\.visitorMapKiosk\.width/);
  assert.match(museumKioskSource, /canvas\.height = MUSEUM_TEXTURE_SPECS\.visitorMapKiosk\.height/);

  const entranceNode = MUSEUM_RUNTIME_NODES.find(({id}) => id === buildingManifest.mainEntrance.nodeId);
  const entranceCell = entranceNode?.layout.spatialCells.find(({id}) => id.endsWith(':orientation-court'));
  const forumNode = MUSEUM_RUNTIME_NODES.find(({pilotRole}) => pilotRole === 'forum-location');
  const forumCell = forumNode?.layout.spatialCells.find(({id}) => id.endsWith(':forum-court'));
  assert(entranceNode && entranceCell && forumNode && forumCell, 'building sign host cells are missing');
  assert.match(museumBuildingArchitectureSource, /id\.endsWith\(':orientation-court'\)/);
  assert.match(museumBuildingArchitectureSource, /id\.endsWith\(':forum-court'\)/);
  const buildingSignCalls = [...museumBuildingArchitectureSource.matchAll(/<BuildingSign\b[\s\S]*?\/>/g)]
    .map(({0: source}) => source);
  assert.equal(buildingSignCalls.length, 2, 'the circulation renderer must mount exactly two building signs');
  const forumSignCall = buildingSignCalls.find((source) => source.includes('title="Core Questions Forum"'));
  const entranceSignCall = buildingSignCalls.find((source) => source.includes('title="Philosophy Atlas Museum"'));
  assert(forumSignCall && entranceSignCall, 'the Forum and entrance building signs must both be rendered');
  assert.match(forumSignCall, /kicker="Orientation court · Forum location"/);
  assert.match(forumSignCall, /subtitle="Four spokes reconnect the Ring · Exhibition program follows in a later phase"/);
  assert.match(forumSignCall, /position=\{\[forumSignX,\s*3\.6,\s*forumCell\.bounds\.maxZ - \.22\]\}/);
  assert.match(forumSignCall, /rotation=\{Math\.PI\}[\s\S]*width=\{5\.4\}/);
  assert.match(entranceSignCall, /kicker="Entrance and orientation"/);
  assert.match(entranceSignCall, /subtitle="Walk the full Ring in either direction · Central shortcuts are open"/);
  assert.match(entranceSignCall, /\(entranceCell\.bounds\.minX \+ entranceCell\.bounds\.maxX\) \/ 2,[\s\S]*?4\.25,[\s\S]*?entranceCell\.bounds\.maxZ - \.2/);
  assert.match(entranceSignCall, /rotation=\{Math\.PI\}[\s\S]*width=\{5\.6\}/);
  [
    {label: 'Museum entrance sign', width: 5.6, centerY: 4.25, ceilingHeight: entranceCell.ceilingHeight, eyeHeight: entranceNode.layout.eyeHeight, title: 'Philosophy Atlas Museum', kicker: 'Entrance and orientation', subtitle: 'Walk the full Ring in either direction · Central shortcuts are open'},
    {label: 'Forum sign', width: 5.4, centerY: 3.6, ceilingHeight: forumCell.ceilingHeight, eyeHeight: forumNode.layout.eyeHeight, title: 'Core Questions Forum', kicker: 'Orientation court · Forum location', subtitle: 'Four spokes reconnect the Ring · Exhibition program follows in a later phase'},
  ].forEach((sign) => {
    assertPlaqueSurface({
      ...sign,
      planeWidth: sign.width,
      planeHeight: sign.width * .27,
      reference: MUSEUM_TEXTURE_SPECS.buildingSign,
    });
    const frameHeight = sign.width * .27 + .12;
    assert(sign.centerY - frameHeight / 2 >= sign.eyeHeight + .45, `${sign.label} hangs in the ordinary eye line`);
    assert(sign.centerY + frameHeight / 2 <= sign.ceilingHeight - .04, `${sign.label} lacks ceiling clearance`);
  });

  for (const reservation of buildingManifest.reservations) {
    const body = getMuseumReservationBarrierBody(reservation);
    const labelWidth = body.size.width * .9;
    const labelHeight = body.size.width * .245;
    assertPlaqueSurface({
      label: `reservation ${reservation.id}`,
      planeWidth: labelWidth,
      planeHeight: labelHeight,
      reference: MUSEUM_TEXTURE_SPECS.reservationSign,
      title: reservation.label,
      kicker: reservation.expansionPortalId ? `Reserved outward portal · ${reservation.expansionPortalId}` : 'Reserved insertion bay',
      subtitle: 'The pilot route continues through the open Ring of Wings.',
    });
    assert(labelWidth <= body.size.width - .1, `reservation ${reservation.id} label exceeds its barrier`);
    const labelBottom = body.height + .18 - labelHeight / 2;
    const labelTop = body.height + .18 + labelHeight / 2;
    assert(labelBottom >= body.height * .5, `reservation ${reservation.id} label hangs below its barrier face`);
    assert(labelTop <= body.height + 1, `reservation ${reservation.id} label exceeds its mounting envelope`);
  }
  assert.match(museumBuildingArchitectureSource, /MUSEUM_BUILDING_MANIFEST\.reservations\.map\(\(reservation\) =>/);
  assert.match(museumBuildingArchitectureSource, /<ReservationBarrier reservation=\{reservation\}\/>/);
  assert.match(museumBuildingArchitectureSource, /const labelWidth = body\.size\.width \* \.9;/);
  assert.match(museumBuildingArchitectureSource, /const labelHeight = body\.size\.width \* \.245;/);
  assert.match(museumBuildingArchitectureSource, /position=\{\[0, body\.height \+ \.18, body\.size\.depth \/ 2 \+ \.02\]\}/);
  assert.match(museumBuildingArchitectureSource, /body\.size\.depth \/ 2 \+ \.02/);

  for (const status of [undefined, 'idle', 'loading', 'ready', 'failed']) {
    const expected = status === 'loading' || status === 'failed' ? status : 'idle';
    assert.equal(resolveMuseumReadinessGateStatus(status, false), expected, `readiness status ${status ?? 'unset'} does not render truthfully`);
    assert.equal(resolveMuseumReadinessGateStatus(status, true), undefined, `ready status ${status ?? 'unset'} leaves a gate mounted`);
  }

  let readinessSites = 0;
  for (const node of MUSEUM_RUNTIME_NODES) {
    for (const connection of getMuseumNodeConnections(node.id)) {
      const targetHallId = getMuseumConnectionTargetHallId(connection);
      if (!targetHallId) continue;
      const entrance = node.entrances.find(({id}) => id === connection.localEntranceId);
      const targetTitle = hallsById.get(targetHallId)?.title;
      assert(entrance && targetTitle, `${node.id}/${connection.localEntranceId} has no readiness target`);
      const geometry = resolveMuseumReadinessGateGeometry(entrance);
      for (const state of Object.values(MUSEUM_READINESS_PRESENTATIONS)) assertPlaqueSurface({
        label: `${node.id}/${entrance.id} readiness ${state.title}`,
        planeWidth: geometry.plaqueWidth,
        planeHeight: geometry.plaqueHeight,
        reference: MUSEUM_TEXTURE_SPECS.readinessSign,
        title: state.title,
        kicker: targetTitle,
        subtitle: state.subtitle,
      });
      const doorway = buildingManifest.nodes
        .find(({id}) => id === node.id)?.doorwaySlots
        .find(({id}) => id === entrance.id);
      assert(doorway, `${node.id}/${entrance.id} has no authored readiness opening`);
      assert(geometry.thresholdWidth < geometry.clearWidth, `${node.id}/${entrance.id} threshold line exceeds its opening`);
      assert(MUSEUM_READINESS_GATE_CONFIG.threshold.height <= .05, `${node.id}/${entrance.id} threshold treatment is no longer low profile`);
      assert(Math.abs(geometry.plaqueX) + geometry.plaqueWidth / 2 <= geometry.clearWidth / 2 - .02, `${node.id}/${entrance.id} readiness plaque intersects a doorway edge`);
      assert(
        MUSEUM_READINESS_GATE_CONFIG.plaque.centerY
          + (geometry.plaqueHeight + MUSEUM_READINESS_GATE_CONFIG.plaque.backingPadding) / 2
          <= doorway.clearHeight - .2,
        `${node.id}/${entrance.id} readiness plaque intrudes into its lintel`,
      );
      assert(
        geometry.stanchionOffset + MUSEUM_READINESS_GATE_CONFIG.stanchion.markerRadius
          <= geometry.clearWidth / 2 - .02,
        `${node.id}/${entrance.id} readiness stanchion intersects a doorway edge`,
      );
      const plaqueOcclusionRatio = geometry.plaqueWidth
        * (geometry.plaqueHeight + MUSEUM_READINESS_GATE_CONFIG.plaque.backingPadding)
        / (geometry.clearWidth * doorway.clearHeight);
      assert(plaqueOcclusionRatio <= .12, `${node.id}/${entrance.id} readiness plaque occludes too much of its doorway`);
      readinessSites += 1;
    }
  }

  assert.match(museumWorldSource, /const geometry = resolveMuseumReadinessGateGeometry\(entrance\);/);
  assert.match(museumWorldSource, /resolveMuseumReadinessGateStatus\(hallLoadStatus\[hallId\], ready\.has\(hallId\)\)/);
  assert.match(museumWorldSource, /if \(!status\) return \[\];/);
  assert.match(museumWorldSource, /<DoorReadinessGate key=\{gate\.id\}[\s\S]*status=\{gate\.status\}/);
  assert.match(museumWorldSource, /<MuseumReadinessGates definition=\{props\.definition\} readyHallIds=\{props\.readyHallIds\} hallLoadStatus=\{props\.hallLoadStatus\}\/>/);
  assert.match(museumWorldSource, /boxGeometry args=\{\[geometry\.thresholdWidth, MUSEUM_READINESS_GATE_CONFIG\.threshold\.height, MUSEUM_READINESS_GATE_CONFIG\.threshold\.depth\]\}/);
  assert.match(museumWorldSource, /planeGeometry args=\{\[geometry\.plaqueWidth, geometry\.plaqueHeight\]\}/);
  const readinessGateSource = museumWorldSource.match(/function DoorReadinessGate\b[\s\S]*?(?=function MuseumReadinessGates\b)/)?.[0];
  assert(readinessGateSource, 'the readiness gate renderer is missing');
  assert.equal([...readinessGateSource.matchAll(/<boxGeometry\b/g)].length, 2, 'readiness gate must remain a threshold line plus a small plaque backing');

  assert.equal(exhibitPlaques, 48);
  assert.equal(nameStrips, 40);
  assert.equal(fallbackLabels, 96);
  assert.equal(authoredHallSigns, 24);
  assert.equal(buildingManifest.reservations.length, 12);
  assert.equal(readinessSites, 16);
  const ancientOuterRingSign = ANCIENT_GREEK_HALL_DEFINITION.layout.signs.find(({id}) => id === 'gallery-02-wayfinding-sign');
  assert(ancientOuterRingSign, 'Ancient Gallery 02 wayfinding sign is missing');
  assert.deepEqual(ancientOuterRingSign.position, {x: 17.82, y: 3.8, z: -28.5});
  const ancientDoorFrameBottom = ancientOuterRingSign.position.y - (ancientOuterRingSign.height + .12) / 2;
  assert(ancientDoorFrameBottom >= 3.3, 'Ancient Gallery 02 sign does not preserve 0.1m above the 3.2m clear opening');
});

check('all 48 dedicated interpretations are active, substantial, linked, and asset-complete', () => {
  assert.equal(MUSEUM_INTERPRETATIONS.length, 48);
  assert(unique(MUSEUM_INTERPRETATIONS.map(({hallId, id}) => `${hallId}/${id}`)));
  for (const interpretation of MUSEUM_INTERPRETATIONS) {
    const ref = `${interpretation.hallId}/${interpretation.id}`;
    assert(activeExhibitRefs.has(ref), `${ref} is not an active Museum exhibit`);
    const hall = hallsById.get(interpretation.hallId);
    const exhibit = hall.exhibits.find(({id}) => id === interpretation.id);
    assert(exhibit);
    assert(wordCount(interpretation.lead) >= 100, `${ref} lead is too shallow (${wordCount(interpretation.lead)} words)`);
    assert(interpretation.keyIdeas.length >= 3, `${ref} needs at least three key ideas`);
    assert(interpretation.keyWorks.length >= 3, `${ref} needs at least three key works`);
    const isNewHall = interpretation.hallId !== 'ancient-greek';
    assert(interpretation.sections.length >= (isNewHall ? 4 : 3), `${ref} needs a complete interpretive section set`);
    assert(interpretation.sources.length >= 3, `${ref} needs at least three sources`);
    assert(interpretation.relatedExhibits.length >= (isNewHall ? 2 : 1), `${ref} needs active related-exhibit links`);
    for (const source of interpretation.sources) assert.equal(new URL(source.url).protocol, 'https:', `${ref} has a non-HTTPS source`);
    for (const related of interpretation.relatedExhibits) assert(activeExhibitRefs.has(`${related.hallId}/${related.exhibitId}`), `${ref} links to inactive exhibit ${related.hallId}/${related.exhibitId}`);
    const objectIds = Object.keys(interpretation.objectInterpretations).sort();
    assert.deepEqual(objectIds, [exhibit.principalAssetId, ...exhibit.supportingAssetIds].sort(), `${ref} object interpretation assets drifted`);
    assert(interpretation.articleRoute.kind === exhibit.entityKind, `${ref} article route kind disagrees with the exhibit entity`);
    assert.equal(interpretation.articleRoute[`${exhibit.entityKind}Id`], exhibit.entityId, `${ref} article route target drifted`);
  }
});

check('the active asset graph contains exactly two unique records per exhibit', () => {
  assert.equal(MUSEUM_ASSETS.length, 96);
  assert.equal(assetById.size, 96);
  const referencedIds = [];
  for (const hall of MUSEUM_HALLS) {
    for (const exhibit of hall.exhibits) {
      const ids = [exhibit.principalAssetId, ...exhibit.supportingAssetIds];
      assert.equal(ids.length, 2);
      for (const id of ids) {
        referencedIds.push(id);
        const asset = assetById.get(id);
        assert(asset, `${hall.id}/${exhibit.id} references missing asset ${id}`);
        assert.equal(asset.entityKind, exhibit.entityKind);
        assert.equal(asset.entityId, exhibit.entityId);
      }
    }
  }
  assert(unique(referencedIds), 'an active Museum asset is reused by multiple catalog slots');
  assert.deepEqual([...referencedIds].sort(), MUSEUM_ASSETS.map(({id}) => id).sort());
  assert(MUSEUM_ASSETS.every(({variants}) => !variants.scene.path.includes('/medieval-worlds/')), 'retired Medieval media must not remain active');
});

check('camera-session parsing is hall-qualified and rejects malformed or unsafe poses', () => {
  for (const definition of definitions) {
    const {layout} = definition;
    const valid = JSON.stringify({version: 1, hallId: layout.id, ...layout.spawn});
    assert(parseMuseumSession(valid, layout));
    assert.equal(parseMuseumSession('{bad json', layout), undefined);
    assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: 'wrong', ...layout.spawn}), layout), undefined);
    assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: layout.id, x: null, z: 0, yaw: 0, pitch: 0}), layout), undefined);
    assert.equal(sanitizeMuseumPose({...layout.spawn, x: Number.POSITIVE_INFINITY}, layout), undefined);
    const occupied = layout.exhibits[0].collider.center;
    assert.equal(sanitizeMuseumPose({...occupied, yaw: 0, pitch: 0}, layout), undefined);
  }
});

check('typed exhibit origins preserve explicit close, history, and resume policies', () => {
  const expected = {
    'active-exploration': {navigation: 'back', resumeExploration: true, restoreDirectory: false},
    'paused-hall': {navigation: 'back', resumeExploration: false, restoreDirectory: false},
    directory: {navigation: 'back', resumeExploration: false, restoreDirectory: true},
    guided: {navigation: 'back', resumeExploration: false, restoreDirectory: false},
    direct: {navigation: 'replace-hall', resumeExploration: false, restoreDirectory: false},
  };
  for (const [origin, policy] of Object.entries(expected)) {
    const context = createMuseumExhibitVisitContext('ancient-greek', origin);
    assert.deepEqual(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: context}, 'ancient-greek'), context);
    assert.deepEqual(resolveMuseumExitPolicy(context, 'gesture'), policy);
    const historyPolicy = resolveMuseumExitPolicy(context, 'history');
    assert.equal(historyPolicy.resumeExploration, origin === 'active-exploration');
    assert.equal(resolveMuseumCloseResumeStrategy(context, 'gesture'), origin === 'active-exploration' ? 'request-pointer-lock' : 'remain-paused');
    assert.equal(resolveMuseumCloseResumeStrategy(context, 'history'), origin === 'active-exploration' ? 'resume-drag-look' : 'remain-paused');
  }
  const direct = directMuseumVisitContext('modernity-freedom-critique');
  const carried = museumHistoryStateWithVisitContext({unrelated: 7}, direct);
  assert.equal(carried.unrelated, 7);
  assert.deepEqual(parseMuseumExhibitVisitContext(carried, 'modernity-freedom-critique'), direct);
  assert.equal(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: {...direct, version: 1}}, 'modernity-freedom-critique'), undefined);
  assert.equal(parseMuseumExhibitVisitContext(carried, 'not-a-hall'), undefined);
});

check('explicit hall travel history resumes exploration while direct hall loads remain unentered', () => {
  const exhibitContext = createMuseumExhibitVisitContext('ancient-greek', 'paused-hall');
  const travelContext = createMuseumHallTravelContext('ancient-greek');
  const state = museumHistoryStateWithHallTravelContext(
    museumHistoryStateWithVisitContext({unrelated: 11}, exhibitContext),
    travelContext,
  );
  assert.equal(state.unrelated, 11);
  assert.deepEqual(parseMuseumExhibitVisitContext(state, 'ancient-greek'), exhibitContext);
  assert.deepEqual(parseMuseumHallTravelContext(state, 'ancient-greek'), travelContext);
  assert.equal(parseMuseumHallTravelContext(state, 'renaissance-reason-revolution'), undefined);
  assert.equal(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: {...travelContext, version: 0}}, 'ancient-greek'), undefined);
  assert.equal(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: {...travelContext, resumeExploration: false}}, 'ancient-greek'), undefined);
  assert.equal(parseMuseumHallTravelContext({}, 'ancient-greek'), undefined, 'an untagged direct URL must remain unentered');
  assert.equal(transitionMuseumVisitPhase('unentered', 'resume-active-origin'), 'active');
  assert.match(museumPageSource, /const travelToHall = useCallback/);
  assert.match(museumPageSource, /createMuseumHallTravelContext\(sourceHallId\)/);
  assert.match(museumPageSource, /createMuseumHallTravelContext\(hallId\)/);
  assert.match(museumPageSource, /pendingHallTravelRef/);
  assert.match(museumPageSource, /parseMuseumHallTravelContext\(window\.history\.state, route\.hallId\)/);
  assert.match(museumPageSource, /resumeTravelWhenReady\(hallId, resumeLocked\)/);
  assert.match(museumPageSource, /controlsRef\.current\?\.resumeWithoutGesture\(\)/);
  assert.match(museumModalSource, /museum-page\[data-exploring="true"\][\s\S]*museum-scene-canvas/);
  assert.match(museumModalSource, /activeTarget !== document\.body && isVisibleFocusTarget\(activeTarget\)/);
});

check('Pointer Lock transitions preserve only a live overlay-close request through teardown', () => {
  let transition = MUSEUM_POINTER_LOCK_SETTLED;
  transition = transitionMuseumPointerLock(transition, {type: 'begin-overlay-close', requestId: 1});
  assert.deepEqual(transition, {kind: 'overlay-close', outcome: 'pending', requestId: 1, failureChannel: 'event'});
  assert.equal(museumPointerLockSurvivesBlockedOverlay(transition), true);
  transition = transitionMuseumPointerLock(transition, {type: 'lock-acquired'});
  assert.deepEqual(transition, {kind: 'overlay-close', outcome: 'acquired', requestId: 1, failureChannel: 'event'});
  assert.deepEqual(transitionMuseumPointerLock(transition, {type: 'lock-rejected', requestId: 1}), transition);
  assert.deepEqual(transitionMuseumPointerLock(transition, {type: 'complete-overlay-close'}), {kind: 'settled'});

  const sceneRequest = transitionMuseumPointerLock(MUSEUM_POINTER_LOCK_SETTLED, {type: 'begin-scene', requestId: 3});
  assert.deepEqual(sceneRequest, {kind: 'requesting', source: 'scene', requestId: 3, failureChannel: 'event'});
  assert.equal(museumPointerLockSurvivesBlockedOverlay(sceneRequest), false);
  assert.equal(museumPointerLockEventFailureRequestId(sceneRequest), 3);
  const promiseRequest = transitionMuseumPointerLock(sceneRequest, {type: 'use-promise-failure', requestId: 3});
  assert.equal(museumPointerLockEventFailureRequestId(promiseRequest), undefined);
  assert.deepEqual(transitionMuseumPointerLock(promiseRequest, {type: 'lock-rejected', requestId: 2}), promiseRequest);
  assert.deepEqual(transitionMuseumPointerLock(promiseRequest, {type: 'lock-rejected', requestId: 3}), {kind: 'settled'});
  const expectedRelease = transitionMuseumPointerLock(MUSEUM_POINTER_LOCK_SETTLED, {type: 'expect-release'});
  assert.deepEqual(transitionMuseumPointerLock(expectedRelease, {type: 'release-observed'}), {kind: 'settled'});
});

check('focus suspension and explicit pause retain the Museum visit-phase truth table', () => {
  const cases = [
    ['unentered', 'enter', 'active'],
    ['active', 'focus-lost', 'focus-suspended'],
    ['focus-suspended', 'focus-lost', 'focus-suspended'],
    ['focus-suspended', 'scene-reactivate', 'active'],
    ['active', 'explicit-pause', 'explicitly-paused'],
    ['focus-suspended', 'explicit-pause', 'explicitly-paused'],
    ['explicitly-paused', 'scene-reactivate', 'explicitly-paused'],
    ['explicitly-paused', 'resume-active-origin', 'active'],
    ['focus-suspended', 'resume-active-origin', 'active'],
    ['active', 'scene-error', 'explicitly-paused'],
  ];
  for (const [phase, event, expected] of cases) assert.equal(transitionMuseumVisitPhase(phase, event), expected, `${phase} + ${event}`);
  assert.equal(museumPhaseHasActiveIntent('unentered'), false);
  assert.equal(museumPhaseHasActiveIntent('active'), true);
  assert.equal(museumPhaseHasActiveIntent('focus-suspended'), true);
  assert.equal(museumPhaseHasActiveIntent('explicitly-paused'), false);
});

check('Museum controls leave modified browser shortcuts untouched', () => {
  assert.equal(hasMuseumBrowserModifier({altKey: true, ctrlKey: false, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: true, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: true}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: false}), false);
});

check('Standard, Fast, Shift, Controls, and touch share one bounded collision-safe pace', () => {
  assert.equal(MUSEUM_STANDARD_WALK_SPEED, 3.75);
  assert.equal(MUSEUM_FAST_WALK_SPEED, 6);
  assert.equal(resolveMuseumWalkingSpeed('standard'), MUSEUM_STANDARD_WALK_SPEED);
  assert.equal(resolveMuseumWalkingSpeed('standard', true), MUSEUM_FAST_WALK_SPEED);
  assert.equal(resolveMuseumWalkingSpeed('fast'), MUSEUM_FAST_WALK_SPEED);
  assert.equal(resolveMuseumWalkingSpeed('fast', true), MUSEUM_FAST_WALK_SPEED, 'Shift must not stack on Fast');
  assert.equal(createMuseumInputState().walkingSpeed, MUSEUM_STANDARD_WALK_SPEED);

  const playerRadius = .32;
  const bounds = {minX: -5, maxX: 5, minZ: -5, maxZ: 5};
  const spatialCells = [{id: 'speed-audit', bounds, ceilingHeight: 4, lightingGroupId: 'audit'}];
  for (const [id, collider] of [
    ['wall', {id: 'wall', center: {x: 0, z: 0}, size: {width: 8, depth: .05}, rotation: 0}],
    ['exhibit', {id: 'exhibit', center: {x: 0, z: 0}, size: {width: .7, depth: .7}, rotation: 0}],
    ['future barrier', {id: 'future', center: {x: 0, z: 0}, size: {width: 4, depth: .08}, rotation: 0}],
  ]) {
    const next = moveWithCollisions(
      {x: 0, z: -1},
      {x: 0, z: MUSEUM_FAST_WALK_SPEED * .05 * 8},
      playerRadius,
      bounds,
      [collider],
      spatialCells,
    );
    assert(!circleIntersectsCollider(next, playerRadius, collider), `Fast movement tunneled into ${id}`);
    assert(next.z <= -playerRadius, `Fast movement tunneled through ${id}`);
  }

  const maximumFastFrame = MUSEUM_FAST_WALK_SPEED * .05;
  for (const node of MUSEUM_RUNTIME_NODES) {
    for (const entrance of node.entrances) {
      const thresholdDepth = Math.abs(entrance.inwardNormal.x) > .5
        ? entrance.transitionBounds.size.width
        : entrance.transitionBounds.size.depth;
      assert(maximumFastFrame < thresholdDepth, `${node.id}/${entrance.id} can be skipped in one Fast frame`);
    }
  }
  assert.match(museumControlsSource, /ShiftLeft/);
  assert.match(museumControlsSource, /ShiftRight/);
  assert.match(museumControlsSource, /resolveMuseumWalkingSpeed/);
  assert.match(museumPageSource, /Preferred walking speed/);
  assert.match(museumPageSource, /walkingPace=\{controls\.walkingPace\}/);
  assert.match(museumTouchControlsSource, /className="museum-touch-actions"[\s\S]*className="museum-touch-speed"/);
  assert.match(museumTouchControlsSource, /aria-pressed=\{walkingPace === 'fast'\}/);
  assert.match(museumTouchControlsSource, /aria-label=\{nearbyLabel \? `Interact with \$\{nearbyLabel\}`/);
  assert.match(museumTouchControlsSource, /aria-label="Open Museum directory">Guide/);
  assert.match(museumCssSource, /@media\(any-pointer:coarse\) and \(max-width:760px\)\{[\s\S]*?\.museum-touch-actions\{flex-wrap:nowrap;gap:3px\}/);
  assert(6 * 44 + 5 * 3 <= 320 - 15 - 20, 'six touch actions do not fit a 320px viewport with a classic scrollbar');
  assert.match(museumPageSource, /const blocked = modalOpen \|\| Boolean\(sceneError\) \|\| activeHallLoading/);
  assert.match(museumCssSource, /\.museum-load-chip\{[^}]*pointer-events:none/);
});

check('the physical visitor-map source wiring reuses Museum interaction, overlay, directory, and navigation contracts', () => {
  assert.match(museumWorldSource, /const hallId = definition\.publicHallId;[\s\S]*hallId \? visitorMapInteractionAtPose\(hallId, poseRef\.current\) : undefined/);
  assert.match(museumWorldSource, /kind: 'exhibit'/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_KIOSK/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_NODE_PROJECTIONS\.forEach/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_EDGES\.forEach/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_RESERVATIONS\.forEach/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_DOORWAYS\.forEach/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_VIEWBOX/);
  assert.match(museumKioskSource, /hall\.id === MUSEUM_VISITOR_MAP_KIOSK\.hallId/);
  assert.match(museumKioskSource, /hall\.galleryNumber/);
  assert.match(museumKioskSource, /kiosk\.height/);
  assert.match(museumKioskSource, /onClick=\{activate\}/);
  assert.match(museumKioskSource, /CanvasTexture/);
  assert.match(museumVisitorMapSource, /MUSEUM_VISITOR_MAP_PROJECTION/);
  assert.match(museumVisitorMapSource, /MUSEUM_VISITOR_MAP_EDGES\.map/);
  assert.match(museumVisitorMapSource, /projectMuseumVisitorMapPoint\(currentNodeId, currentPose\)/);
  assert.match(museumVisitorMapSource, /data-current-hall=\{currentPhysicalHallId !== undefined && node\.publicHallId === currentPhysicalHallId/);
  assert.match(museumVisitorMapSource, /className="museum-visitor-map-scroll" tabIndex=\{0\}/);
  assert.match(museumVisitorMapSource, /aria-describedby=\{routeSummaryId\}/);
  assert.match(museumVisitorMapSource, /<MuseumModal/);
  assert.match(museumVisitorMapSource, /aria-current=\{current \? 'location'/);
  assert.match(museumVisitorMapSource, /onTravel\(selected\.hall\.id\)/);
  assert.match(museumModalSource, /event\.key === 'Escape'/);
  assert.match(museumModalSource, /event\.target === event\.currentTarget/);
  assert.match(museumModalSource, /visibleFocusable/);
  assert.match(museumModalSource, /target\?\.focus\(\{preventScroll: true\}\)/);
  assert.match(museumPageSource, /resolveMuseumVisitorMapDestination\(targetRegistration\.definition, node\)/);
  assert.match(museumPageSource, /travelToHall\(hallId, destination\)/);
  assert.match(museumPageSource, /saveMuseumSession\(getMuseumHallRegistration\(hallId\)!\.definition\.layout, destination\)/);
  assert.match(museumPageSource, /if \(hallId !== sourceHallId\)[\s\S]*push\(/);
  assert.match(museumPageSource, /visitorMapResumeRef/);
  assert.match(museumPageSource, /overlayReturnFocusPendingRef/);
  assert.match(museumPageSource, /onClose=\{dismissOverlay\}/);
  assert.match(museumPageSource, /requestOverlayCloseResume/);
  assert.match(museumPageSource, /completeOverlayCloseResume/);
  assert.match(museumPageSource, /resumeWithoutGesture/);
  assert.match(museumPageSource, /setAnnouncement\(`Opened \$\{getMuseumExhibitCatalog\(route\.hallId, route\.exhibitId\)\?\.displayName/);
  assert.match(museumPageSource, /setAnnouncement\(`Returned to \$\{returningHallTitle\}\. Continue exploring\.\`\)/);
  assert.match(museumPageSource, /Returned to \$\{returningHallTitle\}\. Resume the visit when ready\./);
  assert.match(museumPageSource, /onInteract=\{interactNearby\}/);
  assert.match(museumControlsSource, /event\.code === 'KeyM'[\s\S]*callbacksRef\.current\.onOpenDirectory\(\)/);
  assert.match(museumPageSource, /overlay === 'directory'[\s\S]*<Directory/);
  assert.match(museumPageSource, /MUSEUM_HALLS\.map/);
  assert.match(museumPageSource, /className="museum-control-map"[\s\S]*onClick=\{showVisitorMap\}/);
  assert.match(museumCssSource, /@media\(max-width:900px\)\{[\s\S]*?\.museum-visitor-map-layout\{grid-template-columns:1fr\}[\s\S]*?\.museum-visitor-map-destinations\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/);
  assert.match(museumCssSource, /@media\(max-width:760px\)\{[\s\S]*?\.museum-visitor-map-scroll\{[^}]*overflow-x:auto/);
  assert.match(museumVisitorMapSource, /Six of 26 planned public halls are open/);
  assert.match(museumVisitorMapSource, /constructed, walkable geometry only/);
  assert.match(museumVisitorMapSource, /planned gallery connections/);
  assert.match(museumVisitorMapSource, /reserved outward expansion portals/);
  assert.equal(MUSEUM_VISITOR_MAP_RESERVATIONS.filter(({reservationType}) => reservationType === 'insertion').length, 4);
  assert.equal(MUSEUM_VISITOR_MAP_RESERVATIONS.filter(({reservationType}) => reservationType === 'outward-expansion').length, 8);
});

check('physical wayfinding signs and decoded-texture remainder warming are runtime-derived', () => {
  assert.match(museumBuildingArchitectureSource, /forumCell/);
  assert.match(museumBuildingArchitectureSource, /entranceCell/);
  assert.doesNotMatch(museumBuildingArchitectureSource, /position=\{\[34\.5\s*,\s*3\.6|position=\{\[-12\.2\s*,\s*3\.6/);
  assert.match(museumPageSource, /ensureHallEntry\(activeHallId\)[\s\S]*?\.then\(\(\) => \{[\s\S]*?warmHallRemainder\(activeHallId\);/);
});

check('the world registry is the active six-hall lazy graph with no retired import', () => {
  assert.match(registrySource, /MUSEUM_WORLD_DEFINITIONS\.map/);
  assert.match(registrySource, /contentLoaders\[definition\.id\]/);
  assert.match(registrySource, /import\('\.\/AncientGreekHallScene'\)/);
  assert.match(registrySource, /import\('\.\/RenaissanceReasonRevolutionHallScene'\)/);
  assert.match(registrySource, /import\('\.\/ModernityFreedomCritiqueHallScene'\)/);
  assert.match(registrySource, /import\('\.\/LogicLanguageScienceHallScene'\)/);
  assert.match(registrySource, /import\('\.\/EthicsJusticePoliticalLifeHallScene'\)/);
  assert.match(registrySource, /import\('\.\/MindConsciousnessSelfHallScene'\)/);
  assert.doesNotMatch(registrySource, /medieval/i);
  assert.match(registrySource, /prefetchMuseumHallEntry/);
  assert.match(registrySource, /prefetchMuseumHallRemainder/);
});

check('the persistent runtime enforces manifest-bounded residency, rendered readiness, and failure recovery', () => {
  assert.match(museumWorldSource, /props\.registrations\.map/);
  assert.match(museumWorldSource, /connectedEntranceByHallId\.get\(registration\.definition\.id\)/);
  assert.match(museumWorldSource, /onNodeTransition\(connection\)/);
  assert.match(museumWorldSource, /getMuseumNodeConnections\(definition\.id\)/);
  assert.match(museumWorldSource, /MUSEUM_BUILDING_MANIFEST\.residencyPolicy\.approachDistance/);
  assert.match(museumWorldSource, /pose\.x = previousPosition\.x;[\s\S]*pose\.z = previousPosition\.z;/);
  assert.match(museumWorldSource, /nonOccluding: true/);
  assert.match(museumWorldSource, /readinessThreshold: true/);
  assert.match(museumWorldSource, /MUSEUM_READINESS_PRESENTATIONS\[status\]/);
  assert.equal(MUSEUM_READINESS_PRESENTATIONS.failed.title, 'Preparation failed');
  assert.match(MUSEUM_READINESS_PRESENTATIONS.failed.subtitle, /Use Retry on screen/);
  assert.doesNotMatch(museumWorldSource, /boxGeometry args=\{\[clearWidth,\s*3\.12/);
  assert.match(museumPageSource, /museum-hall-load-error" role="alert"[\s\S]*Retry gallery/);
  assert.match(museumPageSource, /route\.exhibitId \|\| modalOpen \|\| activeIntent \|\| activeHallLoadFailed/);
  assert.match(museumWorldSource, /frameloop=\{renderable \? 'demand' : 'never'\}/);
  assert.doesNotMatch(museumWorldSource, /frameloop=\{[^}]*'always'/);
  assert.match(museumWorldSource, /transitionTargetRef\.current[\s\S]*transitionTargetId !== definition\.id\) return;/);
  assert.match(museumWorldSource, /transitionTargetRef\.current = connection\.targetNodeId;[\s\S]*if \(!onNodeTransition\(connection\)\)/);
  assert.match(museumWorldSource, /if \(!onNodeTransition\(connection\)\) \{\s*transitionTargetRef\.current = undefined;\s*transitionLatchRef\.current = undefined;\s*pose\.x = previousPosition\.x;\s*pose\.z = previousPosition\.z;\s*applyPose\(\);\s*publishNearby\(\);\s*if \(input\.forward \|\| input\.strafe \|\| input\.lookX \|\| input\.lookY\) invalidate\(\);\s*\}/);
  assert.match(museumWorldSource, /inputRef\.current\.requestFrame = requestFrame/);
  assert.match(museumWorldSource, /onHallContentReady/);
  assert.match(museumPageSource, /preparedHallIdsRef/);
  assert.match(museumPageSource, /renderedHallIdsRef/);
  assert.match(museumPageSource, /residentHallIds/);
  assert.match(museumPageSource, /resolveMuseumHallResidency/);
  assert.match(museumResidencySource, /MUSEUM_BUILDING_MANIFEST\.residencyPolicy\.maxResidentHallContents/);
  assert.match(museumPageSource, /MUSEUM_WORLD_REGISTRY\.filter/);
  assert.match(museumPageSource, /MUSEUM_HALLS\.map/);
  assert.match(museumPageSource, /onHallActivate/);
  assert.match(museumPageSource, /onZoneViewpoint/);
  assert.match(museumPageSource, /replace\(\s*\{kind: 'museum', hallId: targetHallId\}/);
  assert.match(museumPageSource, /retryHallContent/);
  assert.match(museumPageSource, /isRouteLoadError\(hallLoadErrors\[hallId\]\)[\s\S]*saveCurrentHallSession\(\);[\s\S]*window\.location\.reload\(\);/);
  assert.match(museumPageSource, /key=\{sceneEpoch\}/);
  assert.doesNotMatch(museumPageSource, /key=\{(?:activeHallId|route\.hallId)\}/);
  assert.match(museumPageSource, /pendingHallTransitionRef/);
  assert.match(museumPageSource, /pendingCrossHallCloseRef/);
  assert.match(museumPageSource, /failedHallContentIdsRef/);
  assert.match(museumPageSource, /adjacentFailedHallIds\.map/);
  assert.match(museumPageSource, /activeHallLoading \|\| activeHallLoadFailed/);
  assert.match(museumPageSource, /role="group" aria-label="Choose a Museum gallery"/);
  assert.doesNotMatch(museumPageSource, /role="tablist"|role="tab"/);
  assert.match(museumPageSource, /returnFocus=\{overlayOpenerRef\.current\}/);
  assert.match(museumPageSource, /retryingHallIdsRef/);
  assert.match(museumPageSource, /connection\?\.saveData/);
  assert.match(museumPageSource, /lastSavedHallSignatureRef/);
});

check('the persistent Museum implementation contains exactly one React Three Fiber Canvas', () => {
  const tsxFiles = readdirSync(galleryRoot, {withFileTypes: true})
    .filter((entry) => entry.isFile() && extname(entry.name) === '.tsx')
    .map((entry) => resolve(galleryRoot, entry.name));
  const canvasOccurrences = tsxFiles.flatMap((path) => {
    const source = readFileSync(path, 'utf8');
    return [...source.matchAll(/<Canvas(?:\s|>)/g)].map(() => path);
  });
  assert.equal(canvasOccurrences.length, 1, `expected one persistent Canvas, found ${canvasOccurrences.length}`);
  assert(canvasOccurrences[0].endsWith('MuseumWorldScene.tsx'));
});

console.log(`\nMuseum audit passed: ${checks} groups covering 6 public halls, 48 exhibits, 96 assets, ${buildingManifest.connections.length} authored physical seams (${MUSEUM_DIRECTED_CONNECTIONS.length} conceptual directions), and the entrance visitor-map kiosk.`);
