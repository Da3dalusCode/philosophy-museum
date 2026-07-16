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
check(philosopherIds.length === 141, `Approved program: expected exactly 141 philosophers, found ${philosopherIds.length}`);
check(branchIds.length === 43, `Approved program: expected exactly 43 branches, found ${branchIds.length}`);
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
const normalTemplateIds = ['standard-rect', 'sequence-3', 'crossroads-4'];
check(program.status === 'approved-planning-contract', `hall-program.json: expected approved-planning-contract status, found ${program.status}`);
check(program.recommendedOptionId === 'worlds-with-questions-forum-expanded', `hall-program.json: approved option changed to ${program.recommendedOptionId}`);
check(program.wings.length === 10, `Approved program: expected 10 wings, found ${program.wings.length}`);
check(program.halls.length === 26, `Approved program: expected 26 halls, found ${program.halls.length}`);
check(program.rooms.length === 105, `Approved program: expected 105 rooms, found ${program.rooms.length}`);
check(program.templates.length === 4, `Approved program: expected three normal templates plus one rare focal template, found ${program.templates.length}`);
check(normalTemplateIds.every((id) => templateIds.has(id)), 'Approved program: normal template set must be standard-rect, sequence-3, and crossroads-4');
check(templateIds.has('focal-terminal'), 'Approved program: rare focal-terminal template is missing');
check(program.halls.every(({templateId}) => normalTemplateIds.includes(templateId)), 'Approved program: focal-terminal may be used only as a rare exception, not a normal hall assignment');
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

const beauvoir = philosophers.find(({id}) => id === 'beauvoir');
check(Boolean(beauvoir), 'Approved Beauvoir assignment is missing');
if (beauvoir) {
  check(beauvoir.primary_wing_id === 'wing-ethics-politics-society', `Beauvoir: primary wing changed to ${beauvoir.primary_wing_id}`);
  check(beauvoir.primary_hall_id === 'feminist-philosophies', `Beauvoir: primary hall changed to ${beauvoir.primary_hall_id}`);
  check(beauvoir.primary_room_id === 'feminist-situated-freedom', `Beauvoir: primary room changed to ${beauvoir.primary_room_id}`);
  check(beauvoir.tier === 'anchor-exhibit', `Beauvoir: expected anchor-exhibit tier, found ${beauvoir.tier}`);
  check(beauvoir.secondary_hall_ids.split(';').filter(Boolean).includes('phenomenology-existence-embodiment'), 'Beauvoir: Phenomenology, Existence, and Embodiment must remain an anchor secondary route');
  check(/anchor-strength/i.test(`${beauvoir.rationale} ${beauvoir.controversy_note}`), 'Beauvoir: anchor-strength secondary rationale is missing');
}

const recommended = program.optionSummaries.find(({id}) => id === program.recommendedOptionId);
check(Boolean(recommended), `Recommended option ${program.recommendedOptionId} is missing`);
if (recommended) {
  const actualCapacity = program.rooms.reduce((sum, room) => sum + room.recordCapacity, 0);
  check(recommended.wingCount === program.wings.length, 'Recommended option wing total mismatch');
  check(recommended.hallCount === program.halls.length, 'Recommended option hall total mismatch');
  check(recommended.roomCount === program.rooms.length, 'Recommended option room total mismatch');
  check(recommended.recordCapacity === actualCapacity, 'Recommended option capacity mismatch');
  check(actualCapacity === 258, `Approved program: expected 258 record slots, found ${actualCapacity}`);
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

const runtimeManifestPath = path.join(root, 'src', 'data', 'museum', 'museumBuildingManifest.json');
const runtimeManifest = JSON.parse(fs.readFileSync(runtimeManifestPath, 'utf8'));
const approvedPublicHallIds = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
];
const runtimeNodesById = new Map(runtimeManifest.nodes.map((node) => [node.id, node]));
const runtimeHallNodes = runtimeManifest.nodes.filter(({kind}) => kind === 'hall');
const runtimePublicHallIds = runtimeHallNodes.map(({publicHallId}) => publicHallId);
const runtimeConnectionIds = runtimeManifest.connections.map(({id}) => id);
const runtimeReservationIds = runtimeManifest.reservations.map(({id}) => id);

check(runtimeManifest.schemaVersion === 1, `Runtime building manifest: expected schemaVersion 1, found ${runtimeManifest.schemaVersion}`);
check(runtimeManifest.status === 'approved-live-pilot', `Runtime building manifest: expected approved-live-pilot, found ${runtimeManifest.status}`);
check(runtimeManifest.physicalOptionId === 'ring-of-wings', `Runtime building manifest: expected ring-of-wings, found ${runtimeManifest.physicalOptionId}`);
check(runtimeManifest.level?.id === 'L0', `Runtime building manifest: expected sole level L0, found ${runtimeManifest.level?.id}`);
check(runtimeManifest.nodes.every(({levelId}) => levelId === 'L0'), 'Runtime building manifest: every pilot node must remain on L0');
check(runtimeManifest.nodes.every(({implementationStatus}) => implementationStatus === 'live'), 'Runtime building manifest: every pilot node must be live');
check(runtimeManifest.connections.every(({implementationStatus}) => implementationStatus === 'live'), 'Runtime building manifest: every authored connection must be live');
check(runtimeHallNodes.length === 6, `Runtime building manifest: expected six live public hall nodes, found ${runtimeHallNodes.length}`);
check(JSON.stringify([...runtimePublicHallIds].sort()) === JSON.stringify([...approvedPublicHallIds].sort()), 'Runtime building manifest: public hall IDs changed');
check(new Set(runtimeManifest.nodes.map(({id}) => id)).size === runtimeManifest.nodes.length, 'Runtime building manifest: duplicate node ID');
check(new Set(runtimeConnectionIds).size === runtimeConnectionIds.length, 'Runtime building manifest: duplicate connection ID');
check(new Set(runtimeReservationIds).size === runtimeReservationIds.length, 'Runtime building manifest: duplicate reservation ID');
check(runtimeManifest.mainEntrance?.nodeId === 'place:entrance-orientation', 'Runtime building manifest: main entrance node changed');
check(runtimeManifest.forumLocationNodeId === 'place:forum-circulation-court', 'Runtime building manifest: Forum location node changed');

const physical = runtimeManifest.physicalContract;
check(physical?.doorClearWidth === 4 && physical?.doorClearHeight === 3.2 && physical?.transitionDepth === 1.2, 'Runtime building manifest: doorway dimensions changed from the approved contract');
check(physical?.safeLandingWidth === 4 && physical?.safeLandingDepth === 4 && physical?.stepFree === true, 'Runtime building manifest: safe landing or step-free contract changed');
const residency = runtimeManifest.residencyPolicy;
check(residency?.maxResidentHallContents === 3, `Runtime building manifest: max resident hall contents must be 3, found ${residency?.maxResidentHallContents}`);
check(residency?.recentHallCount === 1, `Runtime building manifest: recent hall count must be 1, found ${residency?.recentHallCount}`);
check(Number.isFinite(residency?.approachDistance) && residency.approachDistance > 0, 'Runtime building manifest: approachDistance must be positive');
check(residency?.decodedTextureBudgetMiB === 96, `Runtime building manifest: decoded texture budget must be 96 MiB, found ${residency?.decodedTextureBudgetMiB}`);

const slotByEndpoint = new Map();
for (const node of runtimeManifest.nodes) {
  check(Array.isArray(node.doorwaySlots) && node.doorwaySlots.length > 0, `Runtime node ${node.id}: doorwaySlots are missing`);
  check(new Set(node.doorwaySlots.map(({id}) => id)).size === node.doorwaySlots.length, `Runtime node ${node.id}: duplicate doorway slot ID`);
  for (const slot of node.doorwaySlots) {
    const prefix = `Runtime doorway ${node.id}/${slot.id}`;
    const numericValues = [slot.position?.x, slot.position?.z, slot.inwardNormal?.x, slot.inwardNormal?.z, slot.clearWidth, slot.clearHeight, slot.transitionDepth, slot.arrivalPose?.x, slot.arrivalPose?.z, slot.arrivalPose?.yaw, slot.arrivalPose?.pitch];
    check(numericValues.every(Number.isFinite), `${prefix}: position, normal, dimensions, and arrival pose must be finite`);
    check(slot.clearWidth >= physical.doorClearWidth && slot.clearHeight >= physical.doorClearHeight && slot.transitionDepth >= physical.transitionDepth, `${prefix}: dimensions fall below the approved contract`);
    check(close(Math.hypot(slot.inwardNormal.x, slot.inwardNormal.z), 1), `${prefix}: inward normal is not unit length`);
    const landingWidth = slot.landingBounds?.maxX - slot.landingBounds?.minX;
    const landingDepth = slot.landingBounds?.maxZ - slot.landingBounds?.minZ;
    check(Number.isFinite(landingWidth) && landingWidth + .001 >= physical.safeLandingWidth, `${prefix}: safe landing width is below ${physical.safeLandingWidth}m`);
    check(Number.isFinite(landingDepth) && landingDepth + .001 >= physical.safeLandingDepth, `${prefix}: safe landing depth is below ${physical.safeLandingDepth}m`);
    check(slot.arrivalPose.x >= slot.landingBounds.minX - .001 && slot.arrivalPose.x <= slot.landingBounds.maxX + .001 && slot.arrivalPose.z >= slot.landingBounds.minZ - .001 && slot.arrivalPose.z <= slot.landingBounds.maxZ + .001, `${prefix}: arrival pose lies outside its safe landing`);
    slotByEndpoint.set(`${node.id}:${slot.id}`, slot);
  }
}

const transformPoint = (node, point) => {
  const cosine = Math.cos(node.transform.yaw);
  const sine = Math.sin(node.transform.yaw);
  return {x: node.transform.x + point.x * cosine + point.z * sine, z: node.transform.z - point.x * sine + point.z * cosine};
};
const transformDirection = (node, direction) => {
  const cosine = Math.cos(node.transform.yaw);
  const sine = Math.sin(node.transform.yaw);
  return {x: direction.x * cosine + direction.z * sine, z: -direction.x * sine + direction.z * cosine};
};
const runtimeUsedSlots = new Set();
for (const connection of runtimeManifest.connections) {
  check(connection.accessible === true, `Runtime connection ${connection.id}: pilot connections must be accessible`);
  for (const endpoint of [connection.a, connection.b]) {
    const key = `${endpoint.nodeId}:${endpoint.slotId}`;
    check(runtimeNodesById.has(endpoint.nodeId), `Runtime connection ${connection.id}: unknown node ${endpoint.nodeId}`);
    check(slotByEndpoint.has(key), `Runtime connection ${connection.id}: unknown doorway ${key}`);
    check(!runtimeUsedSlots.has(key), `Runtime connection ${connection.id}: doorway ${key} is already connected`);
    runtimeUsedSlots.add(key);
  }
  const aNode = runtimeNodesById.get(connection.a.nodeId);
  const bNode = runtimeNodesById.get(connection.b.nodeId);
  const aSlot = slotByEndpoint.get(`${connection.a.nodeId}:${connection.a.slotId}`);
  const bSlot = slotByEndpoint.get(`${connection.b.nodeId}:${connection.b.slotId}`);
  if (aNode && bNode && aSlot && bSlot) {
    const aWorld = transformPoint(aNode, aSlot.position);
    const bWorld = transformPoint(bNode, bSlot.position);
    const aNormal = transformDirection(aNode, aSlot.inwardNormal);
    const bNormal = transformDirection(bNode, bSlot.inwardNormal);
    check(Math.hypot(aWorld.x - bWorld.x, aWorld.z - bWorld.z) <= .001, `Runtime connection ${connection.id}: doorway world positions do not meet`);
    check(close(aNormal.x * bNormal.x + aNormal.z * bNormal.z, -1), `Runtime connection ${connection.id}: doorway normals are not opposed`);
    check(close(aSlot.clearWidth, bSlot.clearWidth) && close(aSlot.clearHeight, bSlot.clearHeight) && close(aSlot.transitionDepth, bSlot.transitionDepth), `Runtime connection ${connection.id}: doorway dimensions do not match`);
  }
}

const conceptualDirections = runtimeManifest.connections.flatMap((connection) => [
  `${connection.id}:${connection.a.nodeId}->${connection.b.nodeId}`,
  `${connection.id}:${connection.b.nodeId}->${connection.a.nodeId}`,
]);
check(conceptualDirections.length === runtimeManifest.connections.length * 2, 'Runtime building manifest: each authored undirected connection must create two conceptual directions');
check(new Set(conceptualDirections).size === conceptualDirections.length, 'Runtime building manifest: duplicate conceptual connection direction');

const roleGraph = (routeRole) => {
  const graph = new Map();
  for (const connection of runtimeManifest.connections.filter((candidate) => candidate.routeRole === routeRole)) {
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
const outerGraph = roleGraph('outer-loop');
check(runtimeManifest.connections.filter(({routeRole}) => routeRole === 'outer-loop').length === 12, 'Runtime building manifest: outer loop must have 12 authored seams');
check(outerGraph.size === 12 && [...outerGraph.values()].every((neighbors) => neighbors.size === 2), 'Runtime building manifest: outer loop must be one closed 12-node cycle');
check(approvedPublicHallIds.every((hallId) => outerGraph.has(`hall:${hallId}`)), 'Runtime building manifest: every public hall must sit on the outer loop');
if (outerGraph.size) {
  const firstOuterNode = outerGraph.keys().next().value;
  check(reachable(outerGraph, firstOuterNode).size === outerGraph.size, 'Runtime building manifest: outer loop is not fully reachable in both authored directions');
}

const spokeNodes = runtimeManifest.nodes.filter(({pilotRole}) => pilotRole === 'forum-spoke');
const spokeGraph = roleGraph('forum-spoke');
check(spokeNodes.length === 4, `Runtime building manifest: expected four Forum spokes, found ${spokeNodes.length}`);
check(runtimeManifest.connections.filter(({routeRole}) => routeRole === 'forum-spoke').length === 8, 'Runtime building manifest: four Forum spokes must have eight authored seams');
check(spokeNodes.every(({id}) => spokeGraph.get(id)?.size === 2), 'Runtime building manifest: every Forum spoke must connect one hall to the Forum court');
check(spokeGraph.get(runtimeManifest.forumLocationNodeId)?.size === 4, 'Runtime building manifest: Forum court must receive four spokes');
const shortcutNodes = runtimeManifest.nodes.filter(({pilotRole}) => pilotRole === 'shortcut' || pilotRole === 'entrance-forum-shortcut');
const shortcutGraph = roleGraph('shortcut');
check(shortcutNodes.length === 1, `Runtime building manifest: expected one entrance–Forum shortcut, found ${shortcutNodes.length}`);
check(runtimeManifest.connections.filter(({routeRole}) => routeRole === 'shortcut').length === 2, 'Runtime building manifest: entrance–Forum shortcut must have two authored seams');
if (shortcutNodes[0]) {
  check(shortcutGraph.get(shortcutNodes[0].id)?.size === 2, 'Runtime building manifest: shortcut corridor must connect the entrance and Forum exactly once each');
  check(shortcutGraph.has(runtimeManifest.mainEntrance.nodeId) && shortcutGraph.has(runtimeManifest.forumLocationNodeId), 'Runtime building manifest: shortcut endpoints must be entrance and Forum');
}

const insertionReservations = runtimeManifest.reservations.filter(({reservationType}) => reservationType === 'insertion');
const outwardReservations = runtimeManifest.reservations.filter(({reservationType}) => reservationType === 'outward-expansion');
check(insertionReservations.length === 4, `Runtime building manifest: expected four insertion reservations, found ${insertionReservations.length}`);
check(outwardReservations.length === 8, `Runtime building manifest: expected eight outward reservations, found ${outwardReservations.length}`);
check(JSON.stringify(outwardReservations.map(({expansionPortalId}) => expansionPortalId).sort()) === JSON.stringify(['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8']), 'Runtime building manifest: outward portals must be exactly R1–R8');
const publicRouteIds = new Set(approvedPublicHallIds);
const connectionEndpointTokens = new Set(runtimeManifest.connections.flatMap(({a, b}) => [a.nodeId, a.slotId, b.nodeId, b.slotId]));
for (const reservation of runtimeManifest.reservations) {
  check(reservation.label === 'Future gallery — not yet open', `Runtime reservation ${reservation.id}: public label changed`);
  check(reservation.blocked === true && reservation.implementationStatus === 'reserved', `Runtime reservation ${reservation.id}: reservation must remain blocked and reserved`);
  check(runtimeNodesById.has(reservation.hostNodeId), `Runtime reservation ${reservation.id}: unknown host ${reservation.hostNodeId}`);
  check(!connectionEndpointTokens.has(reservation.id), `Runtime reservation ${reservation.id}: reservation ID leaked into authored connections`);
  if (reservation.expansionPortalId) check(!connectionEndpointTokens.has(reservation.expansionPortalId), `Runtime reservation ${reservation.id}: reserved portal leaked into authored connections`);
  if (reservation.targetProgramHallId) check(!publicRouteIds.has(reservation.targetProgramHallId), `Runtime reservation ${reservation.id}: future hall leaked into live public routes`);
}

const hallSourceFiles = [
  'ancientGreekHall.ts',
  'renaissanceReasonRevolutionHall.ts',
  'modernityFreedomCritiqueHall.ts',
  'logicLanguageScienceHall.ts',
  'ethicsJusticePoliticalLifeHall.ts',
  'mindConsciousnessSelfHall.ts',
];
for (const file of hallSourceFiles) {
  const source = fs.readFileSync(path.join(root, 'src', 'data', 'museum', file), 'utf8');
  check(!/\badjacentHallIds\b/.test(source), `${file}: hall content must not author adjacentHallIds`);
  check(!/\bconnections\s*:/.test(source), `${file}: hall content must not author physical connections`);
}
const runtimeSource = fs.readFileSync(path.join(root, 'src', 'data', 'museum', 'museumBuildingRuntime.ts'), 'utf8');
check(/MUSEUM_BUILDING_MANIFEST\.connections\.flatMap/.test(runtimeSource) && /:a-to-b/.test(runtimeSource) && /:b-to-a/.test(runtimeSource), 'Museum runtime: authored undirected connections are not expanded to both conceptual directions');
passed('Approved Ring of Wings runtime manifest resolves its L0 loop, spokes, shortcut, seams, reservations, and bounded residency contract');

if (errors.length) {
  console.error(`Museum masterplan validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Museum masterplan validation passed.');
for (const message of checks) console.log(`- ${message}`);
console.log(`- Recommended program: ${program.wings.length} wings, ${program.halls.length} halls, ${program.rooms.length} rooms, ${recommended.recordCapacity} record slots`);
