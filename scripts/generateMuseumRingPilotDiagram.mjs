import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createServer} from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(root, 'docs/museum-masterplan/diagrams/ring-pilot-runtime.svg');

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const format = (value) => Number(value.toFixed(2));
const points = (items) => items.map(({x, y}) => `${format(x)},${format(y)}`).join(' ');

const server = await createServer({
  root,
  appType: 'custom',
  logLevel: 'silent',
  server: {middlewareMode: true},
});

try {
  const projection = await server.ssrLoadModule('/src/data/museum/museumVisitorMapProjection.ts');
  const {MUSEUM_BUILDING_MANIFEST} = await server.ssrLoadModule('/src/data/museum/museumBuildingManifest.ts');
  const {
    MUSEUM_VISITOR_MAP_DOORWAYS: doorways,
    MUSEUM_VISITOR_MAP_EDGES: edges,
    MUSEUM_VISITOR_MAP_ENTRANCE: entrance,
    MUSEUM_VISITOR_MAP_KIOSK_MARKER: kiosk,
    MUSEUM_VISITOR_MAP_NODE_PROJECTIONS: nodes,
    MUSEUM_VISITOR_MAP_PROJECTION: publicHalls,
    MUSEUM_VISITOR_MAP_RESERVATIONS: reservations,
    MUSEUM_VISITOR_MAP_VIEWBOX: viewBox,
  } = projection;

  const hallById = new Map(publicHalls.map(({hall}) => [hall.id, hall]));
  const nodePolygons = nodes.flatMap((node) => node.cells.map((cell) =>
    `<polygon class="node node-${escapeXml(node.kind)} role-${escapeXml(node.pilotRole)}" data-node="${escapeXml(node.id)}" points="${points(cell.points)}"/>`,
  )).join('\n    ');
  const walkingEdges = edges.map((edge) =>
    `<polyline class="edge edge-${escapeXml(edge.routeRole)}" data-connection="${escapeXml(edge.connectionId)}" points="${points(edge.points)}"/>`,
  ).join('\n    ');
  const doorwayLines = doorways.map((doorway) =>
    `<line class="door${doorway.isMainEntrance ? ' main-door' : ''}" x1="${format(doorway.start.x)}" y1="${format(doorway.start.y)}" x2="${format(doorway.end.x)}" y2="${format(doorway.end.y)}"/>`,
  ).join('\n    ');
  const reservationShapes = reservations.map((reservation) => {
    const shortLabel = reservation.reservationType === 'insertion'
      ? 'FUTURE'
      : reservation.expansionPortalId;
    return `<g data-reservation="${escapeXml(reservation.id)}"><polygon class="reservation reservation-${escapeXml(reservation.reservationType)}" points="${points(reservation.points)}"/><text class="reservation-label" x="${format(reservation.labelPoint.x)}" y="${format(reservation.labelPoint.y)}">${escapeXml(shortLabel)}</text></g>`;
  }).join('\n    ');
  const labels = nodes.filter(({kind}) => kind !== 'corridor').map((node) => {
    const hall = node.publicHallId ? hallById.get(node.publicHallId) : undefined;
    const parts = node.label.split('·').map((part) => part.trim());
    const first = hall?.galleryNumber ?? parts[0];
    const second = hall?.title.split(/,|\s+&\s+/u)[0] ?? parts[1];
    return `<text class="label label-${escapeXml(node.kind)}" x="${format(node.labelPoint.x)}" y="${format(node.labelPoint.y)}"><tspan x="${format(node.labelPoint.x)}" dy="-.25em">${escapeXml(first)}</tspan>${second ? `<tspan class="label-detail" x="${format(node.labelPoint.x)}" dy="1.25em">${escapeXml(second)}</tspan>` : ''}</text>`;
  }).join('\n    ');

  const metadata = escapeXml(JSON.stringify({
    generatedFrom: 'src/data/museum/museumBuildingManifest.json + compiled hall-local footprints',
    manifestVersion: MUSEUM_BUILDING_MANIFEST.manifestVersion,
    level: MUSEUM_BUILDING_MANIFEST.level.id,
    livePhysicalNodes: nodes.length,
    authoredConnections: MUSEUM_BUILDING_MANIFEST.connections.length,
    blockedReservations: reservations.length,
  }));
  const titleY = format(viewBox.minY + 4.5);
  const legendY = format(viewBox.minY + viewBox.height - 2.4);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${format(viewBox.minX)} ${format(viewBox.minY)} ${format(viewBox.width)} ${format(viewBox.height)}" role="img" aria-labelledby="title description">
  <title id="title">Ring of Wings six-shell physical pilot</title>
  <desc id="description">Manifest-derived main-level plan showing six live galleries, the entrance, central Forum location, closed outer loop, four spokes, entrance shortcut, active doorways, and twelve blocked future reservations.</desc>
  <metadata>${metadata}</metadata>
  <defs>
    <pattern id="future-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="#b98c6b" stroke-width=".7"/></pattern>
    <style>
      .background{fill:#0d1519}.grid{stroke:#d7c4a3;stroke-opacity:.08;stroke-width:.25}.node{fill:#172126;stroke:#59676d;stroke-width:.7}.node-hall{fill:#263239;stroke:#929a98}.node-court{fill:#353126;stroke:#b89a6d}.node-entrance{fill:#293536;stroke:#91a9a7}.role-outer-loop-link{fill:#18272c}.role-forum-spoke{fill:#233034}.role-shortcut{fill:#332d24}.edge{fill:none;stroke:#b78b55;stroke-width:.65;stroke-linecap:round;stroke-linejoin:round}.edge-forum-spoke{stroke:#a9c0c1;stroke-dasharray:2.5 2}.edge-shortcut{stroke:#d6b37b;stroke-dasharray:.7 2}.door{stroke:#e2e9e4;stroke-width:.65}.main-door{stroke:#f3c881;stroke-width:1.2}.reservation{fill:url(#future-hatch);stroke:#a97b60;stroke-width:.55;stroke-dasharray:1.8 1.2}.reservation-label{fill:#e1b894;font:700 1.65px system-ui,sans-serif;letter-spacing:.08em;text-anchor:middle;dominant-baseline:middle;paint-order:stroke;stroke:#171515;stroke-width:.45}.label{fill:#e7dfd3;font:700 2.5px system-ui,sans-serif;letter-spacing:.04em;text-anchor:middle;paint-order:stroke;stroke:#11171b;stroke-width:.8}.label-detail{fill:#c8d0ce;font-size:1.85px;letter-spacing:0}.label-court,.label-entrance{fill:#e3c89f;font-size:2.15px}.title{fill:#f0d7ad;font:700 2.7px system-ui,sans-serif;letter-spacing:.06em}.caption{fill:#9fa9a8;font:600 1.65px system-ui,sans-serif;letter-spacing:.04em}.entrance-line{stroke:#f1c57e;stroke-width:.8}.entrance-dot{fill:#f1c57e;stroke:#fff1d0;stroke-width:.35}.kiosk{fill:#efc884;stroke:#fff1d0;stroke-width:.4}.marker-label{fill:#efc884;font:700 1.65px system-ui,sans-serif;letter-spacing:.07em;paint-order:stroke;stroke:#11171b;stroke-width:.45}
    </style>
    <pattern id="minor-grid" width="8" height="8" patternUnits="userSpaceOnUse"><path class="grid" d="M 8 0 L 0 0 0 8" fill="none"/></pattern>
  </defs>
  <rect class="background" x="${format(viewBox.minX)}" y="${format(viewBox.minY)}" width="${format(viewBox.width)}" height="${format(viewBox.height)}"/>
  <rect fill="url(#minor-grid)" x="${format(viewBox.minX)}" y="${format(viewBox.minY)}" width="${format(viewBox.width)}" height="${format(viewBox.height)}"/>
  <text class="title" x="${format(viewBox.minX + 4)}" y="${titleY}">RING OF WINGS · SIX-SHELL PHYSICAL PILOT · L0</text>
  <g aria-label="Physical footprints">${nodePolygons}</g>
  <g aria-label="Walkable connections">${walkingEdges}</g>
  <g aria-label="Active doorways">${doorwayLines}</g>
  <g aria-label="Blocked future reservations">${reservationShapes}</g>
  <g aria-label="Building labels">${labels}</g>
  <g aria-label="Main entrance"><line class="entrance-line" x1="${format(entrance.position.x)}" y1="${format(entrance.position.y)}" x2="${format(entrance.inwardPoint.x)}" y2="${format(entrance.inwardPoint.y)}"/><circle class="entrance-dot" cx="${format(entrance.position.x)}" cy="${format(entrance.position.y)}" r="1.4"/><text class="marker-label" x="${format(entrance.position.x)}" y="${format(entrance.position.y + 4.5)}" text-anchor="middle">MAIN ENTRANCE</text></g>
  <g aria-label="Visitor map kiosk" transform="translate(${format(kiosk.point.x)} ${format(kiosk.point.y)})"><rect class="kiosk" x="-1.2" y="-1.2" width="2.4" height="2.4" transform="rotate(45)"/><text class="marker-label" x="2.6" y=".7">MAP KIOSK</text></g>
  <text class="caption" x="${format(viewBox.minX + 4)}" y="${legendY}">SOLID · OUTER LOOP   DASHED · FORUM SPOKES   DOTTED · ENTRANCE SHORTCUT   HATCHED · BLOCKED FUTURE AREA</text>
</svg>
`;

  await mkdir(dirname(outputPath), {recursive: true});
  await writeFile(outputPath, svg, 'utf8');
  console.log(`Generated ${outputPath}`);
} finally {
  await server.close();
}
