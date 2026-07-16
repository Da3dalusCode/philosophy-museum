import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const packageDir = path.join(root, 'docs', 'museum-masterplan');
const errors = [];
const checks = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const passed = (message) => checks.push(message);

function sourceSpecIds(file) {
  const fullPath = path.join(root, file);
  const source = fs.readFileSync(fullPath, 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let initializer;
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'specs') initializer = node.initializer;
    ts.forEachChild(node, visit);
  };
  visit(ast);
  check(Boolean(initializer), `${file}: specs array was not found`);
  if (!initializer) return [];
  while (ts.isAsExpression(initializer) || ts.isSatisfiesExpression(initializer)) initializer = initializer.expression;
  check(ts.isArrayLiteralExpression(initializer), `${file}: specs is not an array literal`);
  if (!ts.isArrayLiteralExpression(initializer)) return [];
  return initializer.elements.map((row, index) => {
    check(ts.isArrayLiteralExpression(row), `${file}: specs row ${index + 1} is not an array`);
    const id = ts.isArrayLiteralExpression(row) ? row.elements[0] : undefined;
    check(Boolean(id && ts.isStringLiteral(id)), `${file}: specs row ${index + 1} has no literal ID`);
    return id && ts.isStringLiteral(id) ? id.text : '';
  }).filter(Boolean);
}

function sourceAccuracyDateDisplays(file) {
  const fullPath = path.join(root, file);
  const source = fs.readFileSync(fullPath, 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let initializer;
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'accuracyDepth') initializer = node.initializer;
    ts.forEachChild(node, visit);
  };
  visit(ast);
  check(Boolean(initializer), `${file}: accuracyDepth object was not found`);
  while (initializer && (ts.isAsExpression(initializer) || ts.isSatisfiesExpression(initializer))) initializer = initializer.expression;
  check(Boolean(initializer && ts.isObjectLiteralExpression(initializer)), `${file}: accuracyDepth is not an object literal`);
  const result = new Map();
  if (!initializer || !ts.isObjectLiteralExpression(initializer)) return result;
  for (const property of initializer.properties) {
    if (!ts.isPropertyAssignment(property) || !ts.isObjectLiteralExpression(property.initializer)) continue;
    const id = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : undefined;
    if (!id) continue;
    const date = property.initializer.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText(ast) === 'dateDisplay');
    if (date && ts.isPropertyAssignment(date) && ts.isStringLiteral(date.initializer)) result.set(id, date.initializer.text);
  }
  return result;
}

function parseCsv(file) {
  const text = fs.readFileSync(path.join(packageDir, file), 'utf8');
  const records = [];
  let record = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') {
      record.push(field);
      field = '';
    } else if (char === '\n') {
      record.push(field.replace(/\r$/, ''));
      if (record.some((value) => value.length > 0)) records.push(record);
      record = [];
      field = '';
    } else field += char;
  }
  check(!quoted, `${file}: unterminated quoted field`);
  if (field || record.length) {
    record.push(field.replace(/\r$/, ''));
    records.push(record);
  }
  const [headers, ...rows] = records;
  check(Boolean(headers?.length), `${file}: missing header row`);
  if (!headers) return [];
  return rows.map((values, index) => {
    check(values.length === headers.length, `${file}: row ${index + 2} has ${values.length} columns; expected ${headers.length}`);
    return Object.fromEntries(headers.map((header, column) => [header, values[column] ?? '']));
  });
}

function exactCoverage(label, sourceIds, rows) {
  const source = new Set(sourceIds);
  const seen = new Map();
  for (const row of rows) seen.set(row.id, (seen.get(row.id) ?? 0) + 1);
  for (const id of source) check(seen.get(id) === 1, `${label}: ${id} has ${seen.get(id) ?? 0} primary assignment rows; expected 1`);
  for (const [id, count] of seen) {
    check(source.has(id), `${label}: unknown ID ${id}`);
    check(count === 1, `${label}: duplicate ID ${id}`);
  }
  check(rows.length === source.size, `${label}: ${rows.length} rows do not match ${source.size} source IDs`);
  if (rows.length === source.size && [...source].every((id) => seen.get(id) === 1)) passed(`${label}: ${source.size}/${source.size} assigned exactly once`);
}

const philosopherIds = sourceSpecIds('src/data/philosophers.ts');
const philosopherAccuracyDates = sourceAccuracyDateDisplays('src/data/philosophers.ts');
const branchIds = ['stoicism', ...sourceSpecIds('src/data/branches.ts')];
const philosophers = parseCsv('philosopher-assignments.csv');
const branches = parseCsv('branch-assignments.csv');
exactCoverage('Philosophers', philosopherIds, philosophers);
exactCoverage('Branches', branchIds, branches);
for (const [id, dateDisplay] of philosopherAccuracyDates) {
  const row = philosophers.find((candidate) => candidate.id === id);
  check(row?.source_date_context === dateDisplay, `Philosopher ${id}: source_date_context does not match applied dateDisplay metadata`);
}
if ([...philosopherAccuracyDates].every(([id, dateDisplay]) => philosophers.find((row) => row.id === id)?.source_date_context === dateDisplay)) {
  passed(`Source date-display metadata: ${philosopherAccuracyDates.size}/${philosopherAccuracyDates.size} accuracy overrides preserved`);
}

const program = JSON.parse(fs.readFileSync(path.join(packageDir, 'hall-program.json'), 'utf8'));
const wingIds = new Set(program.wings.map(({id}) => id));
const hallIds = new Set(program.halls.map(({id}) => id));
const roomIds = new Set(program.rooms.map(({id}) => id));
const tierIds = new Set(program.tiers.map(({id}) => id));
const templateIds = new Set(program.templates.map(({id}) => id));
check(wingIds.size === program.wings.length, 'hall-program.json: duplicate wing ID');
check(hallIds.size === program.halls.length, 'hall-program.json: duplicate hall ID');
check(roomIds.size === program.rooms.length, 'hall-program.json: duplicate room ID');
check(tierIds.size === program.tiers.length, 'hall-program.json: duplicate tier ID');
check(templateIds.size === program.templates.length, 'hall-program.json: duplicate template ID');

const templateById = new Map(program.templates.map((template) => [template.id, template]));
for (const template of program.templates) {
  check(new Set(template.portalSlots).size === template.portalSlots.length, `Template ${template.id}: duplicate portal slot`);
  check(new Set(template.optionalPortalSlots ?? []).size === (template.optionalPortalSlots ?? []).length, `Template ${template.id}: duplicate optional portal slot`);
  for (const slot of template.optionalPortalSlots ?? []) check(template.portalSlots.includes(slot), `Template ${template.id}: optional slot ${slot} is not in portalSlots`);
  check(Array.isArray(template.roomRange) && template.roomRange.length === 2 && template.roomRange[0] <= template.roomRange[1], `Template ${template.id}: invalid roomRange`);
}

const hallById = new Map(program.halls.map((hall) => [hall.id, hall]));
const roomById = new Map(program.rooms.map((room) => [room.id, room]));
for (const wing of program.wings) {
  for (const hallId of wing.hallIds) {
    check(hallIds.has(hallId), `Wing ${wing.id}: unknown hall ${hallId}`);
    check(hallById.get(hallId)?.wingId === wing.id, `Wing ${wing.id}: hall ${hallId} points to ${hallById.get(hallId)?.wingId}`);
  }
  const wingHalls = program.halls.filter((hall) => hall.wingId === wing.id);
  const roomCount = wingHalls.reduce((sum, hall) => sum + hall.roomIds.length, 0);
  const capacity = wingHalls.reduce((sum, hall) => sum + hall.recordCapacity, 0);
  check(wing.hallIds.length === wingHalls.length, `Wing ${wing.id}: hall count mismatch`);
  check(wing.roomCount === roomCount, `Wing ${wing.id}: roomCount ${wing.roomCount} does not equal ${roomCount}`);
  check(wing.recordCapacity === capacity, `Wing ${wing.id}: capacity ${wing.recordCapacity} does not equal ${capacity}`);
}
for (const hall of program.halls) {
  check(wingIds.has(hall.wingId), `Hall ${hall.id}: unknown wing ${hall.wingId}`);
  check(templateIds.has(hall.templateId), `Hall ${hall.id}: unknown template ${hall.templateId}`);
  check(!Object.hasOwn(hall, 'implementationStatus'), `Hall ${hall.id}: runtime implementationStatus belongs in the physical manifest, not the hall program`);
  const template = templateById.get(hall.templateId);
  check(Boolean(template && hall.roomIds.length >= template.roomRange[0] && hall.roomIds.length <= template.roomRange[1]), `Hall ${hall.id}: room count is outside template ${hall.templateId} range`);
  for (const roomId of hall.roomIds) {
    check(roomIds.has(roomId), `Hall ${hall.id}: unknown room ${roomId}`);
    check(roomById.get(roomId)?.hallId === hall.id, `Hall ${hall.id}: room ${roomId} points to ${roomById.get(roomId)?.hallId}`);
  }
  const capacity = hall.roomIds.reduce((sum, roomId) => sum + (roomById.get(roomId)?.recordCapacity ?? 0), 0);
  check(hall.recordCapacity === capacity, `Hall ${hall.id}: capacity ${hall.recordCapacity} does not equal room total ${capacity}`);
}
for (const room of program.rooms) {
  check(hallIds.has(room.hallId), `Room ${room.id}: unknown hall ${room.hallId}`);
  check(Number.isInteger(room.recordCapacity) && room.recordCapacity >= 1, `Room ${room.id}: invalid capacity ${room.recordCapacity}`);
}

const roomOccupancy = new Map(program.rooms.map((room) => [room.id, 0]));
for (const [label, rows] of [['Philosopher', philosophers], ['Branch', branches]]) {
  for (const row of rows) {
    const hall = hallById.get(row.primary_hall_id);
    const room = roomById.get(row.primary_room_id);
    check(wingIds.has(row.primary_wing_id), `${label} ${row.id}: unknown wing ${row.primary_wing_id}`);
    check(Boolean(hall), `${label} ${row.id}: unknown hall ${row.primary_hall_id}`);
    check(Boolean(room), `${label} ${row.id}: unknown room ${row.primary_room_id}`);
    check(hall?.wingId === row.primary_wing_id, `${label} ${row.id}: wing/hall mismatch`);
    check(room?.hallId === row.primary_hall_id, `${label} ${row.id}: hall/room mismatch`);
    check(tierIds.has(row.tier), `${label} ${row.id}: unknown tier ${row.tier}`);
    check(Boolean(row.rationale.trim()), `${label} ${row.id}: missing rationale`);
    for (const secondary of row.secondary_hall_ids.split(';').filter(Boolean)) {
      check(hallIds.has(secondary), `${label} ${row.id}: unknown secondary hall ${secondary}`);
      check(secondary !== row.primary_hall_id, `${label} ${row.id}: primary hall repeated as secondary`);
    }
    const secondaries = row.secondary_hall_ids.split(';').filter(Boolean);
    check(new Set(secondaries).size === secondaries.length, `${label} ${row.id}: duplicate secondary hall reference`);
    if (!secondaries.length) check(!/\bsecondar(?:y|ies)\b|\blinks?\b/i.test(row.rationale), `${label} ${row.id}: rationale claims a secondary/link but secondary_hall_ids is blank`);
    if (secondaries.length) check(!/\bno (?:additional )?hall route\b|\bno secondar(?:y|ies)\b/i.test(row.rationale), `${label} ${row.id}: rationale denies a route but secondary_hall_ids is populated`);
    if (room) roomOccupancy.set(room.id, roomOccupancy.get(room.id) + 1);
  }
}
for (const room of program.rooms) check(roomOccupancy.get(room.id) <= room.recordCapacity, `Room ${room.id}: occupancy ${roomOccupancy.get(room.id)} exceeds capacity ${room.recordCapacity}`);
passed('All assignment references, tiers, rationales, and secondary halls resolve');

const recommended = program.optionSummaries.find(({id}) => id === program.recommendedOptionId);
check(Boolean(recommended), `Recommended option ${program.recommendedOptionId} is missing`);
if (recommended) {
  const actualCapacity = program.rooms.reduce((sum, room) => sum + room.recordCapacity, 0);
  check(recommended.wingCount === program.wings.length, 'Recommended option wing total mismatch');
  check(recommended.hallCount === program.halls.length, 'Recommended option hall total mismatch');
  check(recommended.roomCount === program.rooms.length, 'Recommended option room total mismatch');
  check(recommended.recordCapacity === actualCapacity, 'Recommended option capacity mismatch');
}
for (const option of program.optionSummaries) {
  const breakdown = program.optionWingBreakdowns[option.id];
  check(Array.isArray(breakdown), `Option ${option.id}: missing wing breakdown`);
  if (!Array.isArray(breakdown)) continue;
  check(new Set(breakdown.map((wing) => wing.id)).size === breakdown.length, `Option ${option.id}: duplicate wing breakdown ID`);
  const totals = breakdown.reduce((sum, wing) => ({wings: sum.wings + 1, halls: sum.halls + wing.hallCount, rooms: sum.rooms + wing.roomCount, capacity: sum.capacity + wing.recordCapacity}), {wings: 0, halls: 0, rooms: 0, capacity: 0});
  check(option.wingCount === totals.wings, `Option ${option.id}: wing total ${option.wingCount} does not equal ${totals.wings}`);
  check(option.hallCount === totals.halls, `Option ${option.id}: hall total ${option.hallCount} does not equal ${totals.halls}`);
  check(option.roomCount === totals.rooms, `Option ${option.id}: room total ${option.roomCount} does not equal ${totals.rooms}`);
  check(option.recordCapacity === totals.capacity, `Option ${option.id}: capacity ${option.recordCapacity} does not equal ${totals.capacity}`);
  check(option.recordCapacity >= philosopherIds.length + branchIds.length, `Option ${option.id}: capacity cannot hold all ${philosopherIds.length + branchIds.length} primary records`);
}
passed('All three program-option counts and capacities reconcile');

check(program.assignmentCounts.philosophers === philosopherIds.length, 'Program philosopher assignment count mismatch');
check(program.assignmentCounts.branches === branchIds.length, 'Program branch assignment count mismatch');
check(program.assignmentCounts.totalPrimaryRecords === philosopherIds.length + branchIds.length, 'Program total assignment count mismatch');

const manifest = JSON.parse(fs.readFileSync(path.join(packageDir, 'building-manifest.example.json'), 'utf8'));
check(Boolean(manifest.manifestVersion), 'Building manifest: missing manifestVersion');
check(Boolean(manifest.physicalOptionId), 'Building manifest: missing physicalOptionId');
check(Boolean(manifest.coordinateFrames?.safeArrivalPoses), 'Building manifest: safe-arrival coordinate frame is not declared');
const levelIds = new Set(manifest.levels.map((level) => level.id));
const nodeIds = new Set(manifest.nodes.map((node) => node.id));
const connectionIds = new Set(manifest.connections.map((connection) => connection.id));
const reservationIds = new Set(manifest.reservations.map((reservation) => reservation.id));
check(levelIds.size === manifest.levels.length, 'Building manifest: duplicate level ID');
check(nodeIds.size === manifest.nodes.length, 'Building manifest: duplicate node ID');
check(connectionIds.size === manifest.connections.length, 'Building manifest: duplicate connection ID');
check(reservationIds.size === manifest.reservations.length, 'Building manifest: duplicate reservation ID');

const nodeById = new Map(manifest.nodes.map((node) => [node.id, node]));
const usedConnectionSlots = new Set();
const bounds = (polygon) => ({
  minX: Math.min(...polygon.map(([x]) => x)),
  maxX: Math.max(...polygon.map(([x]) => x)),
  minZ: Math.min(...polygon.map(([, z]) => z)),
  maxZ: Math.max(...polygon.map(([, z]) => z))
});
const close = (a, b) => Math.abs(a - b) <= 0.001;
for (const node of manifest.nodes) {
  check(levelIds.has(node.levelId), `Building manifest node ${node.id}: unknown level ${node.levelId}`);
  check(['planned', 'live', 'retired'].includes(node.implementationStatus), `Building manifest node ${node.id}: invalid implementationStatus ${node.implementationStatus}`);
  check(new Set(node.doorwaySlots).size === node.doorwaySlots.length, `Building manifest node ${node.id}: duplicate doorway slot`);
  check(Array.isArray(node.mapFootprint) && node.mapFootprint.length >= 4, `Building manifest node ${node.id}: invalid map footprint`);
  if (node.kind === 'hall') {
    check(hallIds.has(node.programHallId), `Building manifest node ${node.id}: unknown program hall ${node.programHallId}`);
    check(wingIds.has(node.wingId), `Building manifest node ${node.id}: unknown wing ${node.wingId}`);
  }
  if (node.templateId) {
    check(templateIds.has(node.templateId), `Building manifest node ${node.id}: unknown template ${node.templateId}`);
    const template = templateById.get(node.templateId);
    for (const slot of node.doorwaySlots) check(template?.portalSlots.includes(slot), `Building manifest node ${node.id}: slot ${slot} is not defined by template ${node.templateId}`);
    const nodeDimensions = [node.physicalFootprint.width, node.physicalFootprint.depth].sort((a, b) => a - b);
    const templateDimensions = [template?.footprintMetres.width, template?.footprintMetres.depth].sort((a, b) => a - b);
    check(close(nodeDimensions[0], templateDimensions[0]) && close(nodeDimensions[1], templateDimensions[1]), `Building manifest node ${node.id}: footprint does not match template ${node.templateId}`);
  }
  if (Array.isArray(node.mapFootprint) && node.mapFootprint.length >= 4) {
    const box = bounds(node.mapFootprint);
    const mapDimensions = [box.maxX - box.minX, box.maxZ - box.minZ].sort((a, b) => a - b);
    const physicalDimensions = [node.physicalFootprint.width, node.physicalFootprint.depth].sort((a, b) => a - b);
    check(close(mapDimensions[0], physicalDimensions[0]) && close(mapDimensions[1], physicalDimensions[1]), `Building manifest node ${node.id}: map footprint does not match physical footprint`);
  }
}

for (const connection of manifest.connections) {
  check(['planned', 'live', 'blocked'].includes(connection.implementationStatus), `Building connection ${connection.id}: invalid implementationStatus ${connection.implementationStatus}`);
  check(typeof connection.accessible === 'boolean', `Building connection ${connection.id}: accessible must be boolean`);
  const endpoints = [connection.a, connection.b];
  for (const endpoint of endpoints) {
    const node = nodeById.get(endpoint.nodeId);
    check(Boolean(node), `Building connection ${connection.id}: unknown node ${endpoint.nodeId}`);
    check(Boolean(node?.doorwaySlots.includes(endpoint.slotId)), `Building connection ${connection.id}: node ${endpoint.nodeId} has no slot ${endpoint.slotId}`);
    check(Boolean(node?.safeArrivalPoses?.[endpoint.slotId]), `Building connection ${connection.id}: node ${endpoint.nodeId} has no safe arrival for ${endpoint.slotId}`);
    const key = `${endpoint.nodeId}:${endpoint.slotId}`;
    check(!usedConnectionSlots.has(key), `Building connection ${connection.id}: doorway slot ${key} is already connected`);
    usedConnectionSlots.add(key);
  }
  const aNode = nodeById.get(connection.a.nodeId);
  const bNode = nodeById.get(connection.b.nodeId);
  if (aNode && bNode) {
    check(aNode.levelId === bNode.levelId, `Building connection ${connection.id}: endpoints are on different levels without a vertical connector`);
    const a = bounds(aNode.mapFootprint);
    const b = bounds(bNode.mapFootprint);
    const xGap = Math.max(0, a.minX - b.maxX, b.minX - a.maxX);
    const zGap = Math.max(0, a.minZ - b.maxZ, b.minZ - a.maxZ);
    check(xGap <= 0.001 && zGap <= 0.001, `Building connection ${connection.id}: endpoint footprints have an unmodelled physical gap`);
    if (connection.implementationStatus === 'live') check(aNode.implementationStatus === 'live' && bNode.implementationStatus === 'live', `Building connection ${connection.id}: live connection has a non-live endpoint`);
  }
}

for (const reservation of manifest.reservations) {
  const host = nodeById.get(reservation.host?.nodeId);
  const targetHall = hallById.get(reservation.targetProgramHallId);
  check(Boolean(host), `Building reservation ${reservation.id}: unknown host node ${reservation.host?.nodeId}`);
  check(Boolean(host?.doorwaySlots.includes(reservation.host?.slotId)), `Building reservation ${reservation.id}: host slot ${reservation.host?.slotId} does not exist`);
  check(!usedConnectionSlots.has(`${reservation.host?.nodeId}:${reservation.host?.slotId}`), `Building reservation ${reservation.id}: host slot is already connected`);
  check(reservation.blocked === true, `Building reservation ${reservation.id}: reservation must be physically blocked`);
  check(reservation.implementationStatus === 'reserved', `Building reservation ${reservation.id}: implementationStatus must be reserved`);
  check(['insertion', 'expansion'].includes(reservation.reservationType), `Building reservation ${reservation.id}: invalid reservationType`);
  check(levelIds.has(reservation.levelId), `Building reservation ${reservation.id}: unknown level ${reservation.levelId}`);
  check(wingIds.has(reservation.wingId), `Building reservation ${reservation.id}: unknown wing ${reservation.wingId}`);
  check(hallIds.has(reservation.targetProgramHallId), `Building reservation ${reservation.id}: unknown target hall ${reservation.targetProgramHallId}`);
  for (const templateId of reservation.allowedTemplateIds ?? []) check(templateIds.has(templateId), `Building reservation ${reservation.id}: unknown template ${templateId}`);
  check(host?.levelId === reservation.levelId, `Building reservation ${reservation.id}: host and reservation are on different levels`);
  check(targetHall?.wingId === reservation.wingId, `Building reservation ${reservation.id}: target hall and wing do not match`);
  check(Boolean(targetHall && reservation.allowedTemplateIds?.includes(targetHall.templateId)), `Building reservation ${reservation.id}: allowed templates omit target hall template ${targetHall?.templateId}`);
  check(Array.isArray(reservation.mapFootprint) && reservation.mapFootprint.length >= 4, `Building reservation ${reservation.id}: invalid map footprint`);
  if (host && Array.isArray(reservation.mapFootprint) && reservation.mapFootprint.length >= 4) {
    const hostBox = bounds(host.mapFootprint);
    const reserveBox = bounds(reservation.mapFootprint);
    const xGap = Math.max(0, hostBox.minX - reserveBox.maxX, reserveBox.minX - hostBox.maxX);
    const zGap = Math.max(0, hostBox.minZ - reserveBox.maxZ, reserveBox.minZ - hostBox.maxZ);
    check(xGap <= 0.001 && zGap <= 0.001, `Building reservation ${reservation.id}: reserved footprint does not touch its host`);
    const mapDimensions = [reserveBox.maxX - reserveBox.minX, reserveBox.maxZ - reserveBox.minZ].sort((a, b) => a - b);
    const reservedDimensions = [reservation.reservedFootprint?.width, reservation.reservedFootprint?.depth].sort((a, b) => a - b);
    check(close(mapDimensions[0], reservedDimensions[0]) && close(mapDimensions[1], reservedDimensions[1]), `Building reservation ${reservation.id}: map footprint does not match reserved footprint`);
    for (const node of manifest.nodes) {
      if (node.id === host.id || node.levelId !== reservation.levelId) continue;
      const nodeBox = bounds(node.mapFootprint);
      const overlapX = Math.min(reserveBox.maxX, nodeBox.maxX) - Math.max(reserveBox.minX, nodeBox.minX);
      const overlapZ = Math.min(reserveBox.maxZ, nodeBox.maxZ) - Math.max(reserveBox.minZ, nodeBox.minZ);
      check(overlapX <= 0.001 || overlapZ <= 0.001, `Building reservation ${reservation.id}: reserved footprint overlaps node ${node.id}`);
    }
  }
}
passed('Building-manifest example resolves nodes, slots, poses, connections, footprints, status, and reservations');

if (errors.length) {
  console.error(`Museum masterplan validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Museum masterplan validation passed.');
for (const message of checks) console.log(`- ${message}`);
console.log(`- Recommended program: ${program.wings.length} wings, ${program.halls.length} halls, ${program.rooms.length} rooms, ${recommended.recordCapacity} record slots`);
