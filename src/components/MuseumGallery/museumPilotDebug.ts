import type {MuseumPose} from '../../data/museum/museumWorldTypes';

export type MuseumPilotCameraRequest = {
  position: readonly [number, number, number];
  target: readonly [number, number, number];
};

export type MuseumPilotMaterialTelemetry = {
  uuid: string;
  type: string;
  color?: string;
  emissive?: string;
  roughness?: number;
  metalness?: number;
  opacity?: number;
  transparent?: boolean;
};

export type MuseumPilotStructuralTelemetry = {
  id: string;
  category: string;
  ownerHallId?: string;
  ownerNodeId?: string;
  residencyLayer?: string;
  openingId?: string;
  bounds: {
    min: readonly [number, number, number];
    max: readonly [number, number, number];
  };
  materials: readonly MuseumPilotMaterialTelemetry[];
};

export type MuseumPilotSceneTelemetry = {
  camera: {
    position: readonly [number, number, number];
    rotation: readonly [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  viewport: {
    width: number;
    height: number;
    dpr: number;
  };
  renderer: {
    calls: number;
    triangles: number;
    lines: number;
    points: number;
    geometries: number;
    textures: number;
    programs: number;
    toneMapping: number;
    exposure: number;
  };
  structuralMeshes: readonly MuseumPilotStructuralTelemetry[];
  lights: readonly {
    id: string;
    role: string;
    ownerHallId?: string;
    uuid: string;
    type: string;
    intensity: number;
    color: string;
    position: readonly [number, number, number];
  }[];
};

export type MuseumPilotPageTelemetry = {
  activeNodeId: string;
  activeNodeLabel: string;
  activeHallId: string;
  activePhysicalHallId?: string;
  approachedHall?: {hallId: string; entranceId: string};
  recentHallId?: string;
  residentHallIds: readonly string[];
  readyHallEntryKeys: readonly string[];
  hallLoadStatus: Readonly<Record<string, string>>;
  hallEntryLoadStatus: Readonly<Record<string, string>>;
  hallContentEpochs: Readonly<Record<string, number>>;
  hallStates: Readonly<Record<string, {
    residency: 'absent' | 'loading' | 'entry-resident' | 'recent-resident' | 'active';
    loadStatus?: string;
    entryLoadStatus?: string;
  }>>;
};

export type MuseumPilotSnapshot = {
  capturedAt: string;
  page: MuseumPilotPageTelemetry;
  scene?: MuseumPilotSceneTelemetry;
};

export type MuseumPilotDebugApi = {
  setCamera: (request: MuseumPilotCameraRequest) => {
    localPose: MuseumPose;
    naturalApproach?: {hallId: string; entranceId: string};
  };
  requestRender: () => void;
  snapshot: () => MuseumPilotSnapshot;
};

type MuseumPilotDebugWindow = Window & {
  __MUSEUM_PILOT__?: MuseumPilotDebugApi;
};

let sceneReader: (() => MuseumPilotSceneTelemetry) | undefined;
let sceneInvalidator: (() => void) | undefined;

export const museumPilotDebugEnabled = (): boolean =>
  import.meta.env.DEV
  && typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).get('museumPilot') === '1';

export const registerMuseumPilotSceneReader = (
  reader: () => MuseumPilotSceneTelemetry,
  invalidate: () => void,
): (() => void) => {
  if (!museumPilotDebugEnabled()) return () => undefined;
  sceneReader = reader;
  sceneInvalidator = invalidate;
  return () => {
    if (sceneReader === reader) sceneReader = undefined;
    if (sceneInvalidator === invalidate) sceneInvalidator = undefined;
  };
};

export const readMuseumPilotSceneTelemetry = (): MuseumPilotSceneTelemetry | undefined =>
  sceneReader?.();

export const requestMuseumPilotSceneRender = (): void => {
  sceneInvalidator?.();
};

export const installMuseumPilotDebugApi = (
  api: MuseumPilotDebugApi,
): (() => void) => {
  if (!museumPilotDebugEnabled()) return () => undefined;
  const target = window as MuseumPilotDebugWindow;
  target.__MUSEUM_PILOT__ = api;
  return () => {
    if (target.__MUSEUM_PILOT__ === api) delete target.__MUSEUM_PILOT__;
  };
};
