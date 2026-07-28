import type {NavigableAppRoute} from '../../routing/routes';
import type {MuseumExhibitId, MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import type {
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export type SupplementalExhibitAuthoring = {
  id: MuseumSupplementalExhibitId;
  assetId: MuseumAssetId;
  displayName: string;
  shortTitle: string;
  workLabel: string;
  dateLabel: string;
  question: string;
  frontSubtitle: string;
  lead: string;
  keyIdeas: readonly string[];
  cautions: readonly string[];
  sections: readonly {heading: string; paragraph: string}[];
  sources: readonly MuseumSupplementalInterpretationSource[];
  articleRoute?: NavigableAppRoute;
  entityKind: 'philosopher' | 'branch';
  panelKicker: string;
  articleActionLabel?: string;
};

export const authorSupplementalExhibit = (
  input: SupplementalExhibitAuthoring,
): MuseumSupplementalExhibit => ({
  id: input.id,
  displayName: input.displayName,
  shortTitle: input.shortTitle,
  workLabel: input.workLabel,
  dateLabel: input.dateLabel,
  question: input.question,
  frontSubtitle: input.frontSubtitle,
  lead: input.lead,
  keyIdeas: input.keyIdeas,
  cautions: input.cautions,
  sections: input.sections.map(({heading, paragraph}) => ({heading, paragraphs: [paragraph]})),
  sources: input.sources,
  assetId: input.assetId,
  panelAssetId: input.assetId,
  ...(input.articleRoute ? {articleRoute: input.articleRoute} : {}),
  presentation: {
    panelKicker: input.panelKicker,
    proximityKicker: input.shortTitle,
    factRows: [
      {label: 'Focus', value: input.workLabel},
      {label: 'Question', value: input.question},
      {label: 'Evidence', value: input.dateLabel},
    ],
    articleActionLabel: input.articleActionLabel ?? (
      input.entityKind === 'philosopher'
        ? 'Open the philosopher in the Atlas'
        : 'Open the related tradition in the Atlas'
    ),
    entityKind: input.entityKind,
    keyIdeasLabel: 'Interpretive anchors',
    cautionsLabel: 'Keep in view',
  },
});

const volume = (
  id: string,
  center: MuseumSceneVolume['center'],
  size: MuseumSceneVolume['size'],
): MuseumSceneVolume => ({id, role: 'media', center, size});

const mediaMount = (
  id: MuseumSupplementalExhibitId,
  assetId: MuseumAssetId,
  width: number,
  height: number,
): MuseumMediaMountDefinition => {
  const y = 2.14;
  return {
    id: `${id}-hero-media`,
    assetId,
    kind: 'wall-frame',
    position: [0, y, -.39],
    rotation: [0, 0, 0],
    width,
    height,
    frameDepth: .1,
    supportHeight: 0,
    anchorId: `${id}-backing`,
    bounds: volume(`${id}-media-bounds`, {x: 0, y, z: -.39}, {width: width + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-media-support`, {x: 0, y, z: -.55}, {width: width * .74, height: height * .74, depth: .18}),
  };
};

const cameraFor = (position: MuseumPoint, rotationY: number, distance = 5.1): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance,
  z: position.z + Math.cos(rotationY) * distance,
});

export const authorSupplementalLayout = ({
  id,
  parentExhibitId,
  guidedAfterExhibitId,
  zoneId,
  position,
  rotationY,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
  width = 4.35,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: MuseumExhibitId;
  guidedAfterExhibitId?: MuseumExhibitId;
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
  width?: number;
}): MuseumSupplementalExhibitLayout => ({
  id,
  parentExhibitId,
  ...(guidedAfterExhibitId ? {guidedAfterExhibitId} : {}),
  zoneId,
  spatialCellId: zoneId,
  position,
  rotationY,
  interactionRadius: 3.65,
  collider: {id: `supplemental:${id}`, center: position, size: {width, depth: 1.05}, rotation: rotationY},
  viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.055},
  assetId,
  mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
  label: {position: [0, 4.04, -.3], width: width - .36, height: .72},
  footprint: {width, height: 4.44, depth: 1.05},
  installationKind,
  accent,
});
