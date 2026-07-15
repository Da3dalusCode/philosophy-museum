import {getMuseumHallCatalog, type MuseumHallCatalog, type MuseumHallId} from '../museumCatalog';
import {getMuseumVisitorMapNode, type MuseumVisitorMapNode} from './museumVisitorMap';
import {MUSEUM_WORLD_DEFINITIONS} from './museumWorldDefinitions';

export type MuseumVisitorMapProjectionNode = {
  hall: MuseumHallCatalog;
  node: MuseumVisitorMapNode;
};

export type MuseumVisitorMapProjectionEdge = {
  key: string;
  fromHallId: MuseumHallId;
  toHallId: MuseumHallId;
  from: MuseumVisitorMapNode['mapPosition'];
  to: MuseumVisitorMapNode['mapPosition'];
};

const requireProjectionNode = (hallId: MuseumHallId): MuseumVisitorMapProjectionNode => {
  const hall = getMuseumHallCatalog(hallId);
  const node = getMuseumVisitorMapNode(hallId);
  if (!hall || !node) throw new Error(`Museum visitor-map projection is incomplete for ${hallId}.`);
  return {hall, node};
};

/** Catalog copy and authored coordinates joined to the same manifest as the runtime registry. */
export const MUSEUM_VISITOR_MAP_PROJECTION = MUSEUM_WORLD_DEFINITIONS.map(({id}) =>
  requireProjectionNode(id));

const projectionByHallId = new Map(
  MUSEUM_VISITOR_MAP_PROJECTION.map((projection) => [projection.hall.id, projection]),
);

/** Unique, bidirectional floor-plan edges derived from registered hall connections. */
export const MUSEUM_VISITOR_MAP_EDGES: readonly MuseumVisitorMapProjectionEdge[] = (() => {
  const seen = new Set<string>();
  return MUSEUM_WORLD_DEFINITIONS.flatMap(({id, connections}) => connections.flatMap(({targetHallId}) => {
    const key = [id, targetHallId].sort().join('::');
    if (seen.has(key)) return [];
    seen.add(key);
    const from = projectionByHallId.get(id)?.node.mapPosition;
    const to = projectionByHallId.get(targetHallId)?.node.mapPosition;
    if (!from || !to) throw new Error(`Museum visitor-map edge ${key} has no projected endpoint.`);
    return [{key, fromHallId: id, toHallId: targetHallId, from, to}];
  }));
})();
