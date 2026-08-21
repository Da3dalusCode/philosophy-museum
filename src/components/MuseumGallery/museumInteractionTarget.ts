import {visitorMapInteractionAtPose} from '../../data/museum/museumVisitorMap';
import type {
  MuseumInteractionTarget,
  MuseumPose,
  MuseumRuntimeNodeDefinition,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {nearestInteractableItem} from './museumMovement';

const AUTHORED_VIEWPOINT_MATCH_EPSILON = 1e-7;

const isEligibleAuthoredViewpointTarget = (
  pose: MuseumPose,
  layout: MuseumSupplementalExhibitLayout,
): boolean => layout.authoredViewpointTarget === true
  && Math.hypot(pose.x - layout.viewpoint.x, pose.z - layout.viewpoint.z)
    <= AUTHORED_VIEWPOINT_MATCH_EPSILON
  && nearestInteractableItem(pose, [layout]) === layout;

/** The single production precedence contract for nearby Museum interactions. */
export const resolveMuseumInteractionTargetAtPose = (
  definition: MuseumRuntimeNodeDefinition,
  pose: MuseumPose,
): MuseumInteractionTarget | undefined => {
  const hallId = definition.publicHallId;
  const visitorMap = visitorMapInteractionAtPose(definition.id, pose);
  if (visitorMap) return visitorMap;

  const primary = nearestInteractableItem(pose, definition.layout.exhibits);
  const supplementalLayouts = definition.layout.supplementalExhibits ?? [];
  const supplemental = nearestInteractableItem(pose, supplementalLayouts);
  const authoredViewpointTarget = supplementalLayouts.find((layout) =>
    isEligibleAuthoredViewpointTarget(pose, layout));
  if (hallId && authoredViewpointTarget) {
    return {
      kind: 'supplemental-exhibit',
      hallId,
      supplementalExhibitId: authoredViewpointTarget.id,
    };
  }

  const primaryDistance = primary
    ? Math.hypot(pose.x - primary.position.x, pose.z - primary.position.z)
    : Number.POSITIVE_INFINITY;
  const supplementalDistance = supplemental
    ? Math.hypot(pose.x - supplemental.position.x, pose.z - supplemental.position.z)
    : Number.POSITIVE_INFINITY;

  return hallId && supplemental && supplementalDistance < primaryDistance
    ? {kind: 'supplemental-exhibit', hallId, supplementalExhibitId: supplemental.id}
    : hallId && primary
      ? {kind: 'exhibit', hallId, exhibitId: primary.id}
      : undefined;
};
