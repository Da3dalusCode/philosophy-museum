import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageDir = path.join(root, 'docs', 'museum-masterplan');
const errors = [];
let checks = 0;

const check = (condition, message) => {
  checks += 1;
  if (!condition) errors.push(message);
};
const same = (first, second) => JSON.stringify(first) === JSON.stringify(second);
const unique = (values) => new Set(values).size === values.length;
const sorted = (values) => [...values].sort();
const splitIds = (value) => value ? value.split(';').map((id) => id.trim()).filter(Boolean) : [];
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));

const parseCsv = (fileName) => {
  const text = fs.readFileSync(path.join(packageDir, fileName), 'utf8');
  const records = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field.replace(/\r$/, ''));
      if (row.some(Boolean)) records.push(row);
      row = [];
      field = '';
    } else field += character;
  }
  check(!quoted, `${fileName}: unterminated quoted field`);
  if (field || row.length) {
    row.push(field.replace(/\r$/, ''));
    records.push(row);
  }
  const [headers, ...values] = records;
  check(Boolean(headers?.length), `${fileName}: missing header row`);
  if (!headers) return [];
  return values.map((columns, index) => {
    check(columns.length === headers.length, `${fileName}: row ${index + 2} has ${columns.length} columns; expected ${headers.length}`);
    return Object.fromEntries(headers.map((header, column) => [header, columns[column] ?? '']));
  });
};

const virtualEntry = 'virtual:philosophy-atlas-masterplan-validation';
const resolvedEntry = `\0${virtualEntry}`;
const result = await build({
  root,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'masterplan-validation-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export {philosophers} from '/src/data/philosophers.ts';
      export {branches} from '/src/data/branches.ts';
      export * from '/src/data/museum/museumCanonicalProgram.ts';
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
if (!entry) throw new Error('Vite did not produce an executable masterplan-validation entry.');
const data = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const {
  philosophers,
  branches,
  MUSEUM_CANONICAL_HALL_IDS,
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_HALL_ROUTE_ALIASES,
  MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY,
  MUSEUM_LIVE_HALL_TOTALS,
  MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY,
  MUSEUM_LIVE_PROGRAM_TOTALS,
  MUSEUM_LIVE_ROOM_TOTALS,
  MUSEUM_PRESENTATION_TIERS,
} = data;

const APPROVED_HALL_IDS = [
  'mediterranean-beginnings-classical',
  'renaissance-humanism-new-method',
  'phenomenology-existence-embodiment',
  'analytic-traditions',
  'justice-democratic-reason',
  'core-questions-forum',
];
const LEGACY_HALL_IDS = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
];
const EXPECTED_ALIASES = {
  'ancient-greek': 'mediterranean-beginnings-classical',
  'renaissance-reason-revolution': 'renaissance-humanism-new-method',
  'modernity-freedom-critique': 'phenomenology-existence-embodiment',
  'logic-language-science': 'analytic-traditions',
  'ethics-justice-political-life': 'justice-democratic-reason',
  'mind-consciousness-self': 'core-questions-forum',
};
const EXPECTED_LIVE_COUNTS = {
  'mediterranean-beginnings-classical': {rooms: 4, exhibits: 22, template: 'sequence-3'},
  'renaissance-humanism-new-method': {rooms: 3, exhibits: 5, template: 'sequence-3'},
  'phenomenology-existence-embodiment': {rooms: 5, exhibits: 9, template: 'sequence-3'},
  'analytic-traditions': {rooms: 5, exhibits: 7, template: 'sequence-3'},
  'justice-democratic-reason': {rooms: 3, exhibits: 5, template: 'sequence-3'},
  'core-questions-forum': {rooms: 9, exhibits: 15, template: 'crossroads-4'},
};
const EXPECTED_LIVE_TIERS = {
  'anchor-exhibit': 36,
  'standard-individual-exhibit': 23,
  'supporting-exhibit': 3,
  'thematic-cluster-participant': 0,
  'gallery-archive-or-study-wall-record': 1,
};
const EXPECTED_GLOBAL_TIERS = {
  'anchor-exhibit': 95,
  'standard-individual-exhibit': 79,
  'supporting-exhibit': 9,
  'thematic-cluster-participant': 5,
  'gallery-archive-or-study-wall-record': 1,
};

const program = readJson('docs/museum-masterplan/hall-program.json');
const buildingManifest = readJson('src/data/museum/museumBuildingManifest.json');
const planningManifest = readJson('docs/museum-masterplan/building-manifest.example.json');
const philosopherAssignments = parseCsv('philosopher-assignments.csv');
const branchAssignments = parseCsv('branch-assignments.csv');
const allAssignments = [
  ...philosopherAssignments.map((row) => ({...row, entityKind: 'philosopher'})),
  ...branchAssignments.map((row) => ({...row, entityKind: 'branch'})),
];

const philosopherById = new Map(philosophers.map((record) => [record.id, record]));
const branchById = new Map(branches.map((record) => [record.id, record]));
const assignmentById = new Map(allAssignments.map((row) => [row.id, row]));
const wingById = new Map(program.wings.map((wing) => [wing.id, wing]));
const hallById = new Map(program.halls.map((hall) => [hall.id, hall]));
const roomById = new Map(program.rooms.map((room) => [room.id, room]));
const tierIds = program.tiers.map(({id}) => id);
const templateById = new Map(program.templates.map((template) => [template.id, template]));

check(philosophers.length === 146, `Approved program: expected 146 philosophers, found ${philosophers.length}`);
check(branches.length === 43, `Approved program: expected 43 branches, found ${branches.length}`);
check(unique(philosophers.map(({id}) => id)), 'Philosopher registry contains duplicate IDs');
check(unique(branches.map(({id}) => id)), 'Branch registry contains duplicate IDs');
check(philosopherAssignments.length === 146, `philosopher-assignments.csv: expected 146 rows, found ${philosopherAssignments.length}`);
check(branchAssignments.length === 43, `branch-assignments.csv: expected 43 rows, found ${branchAssignments.length}`);
check(unique(philosopherAssignments.map(({id}) => id)), 'philosopher-assignments.csv contains duplicate IDs');
check(unique(branchAssignments.map(({id}) => id)), 'branch-assignments.csv contains duplicate IDs');
for (const philosopher of philosophers) check(philosopherAssignments.some(({id}) => id === philosopher.id), `Philosopher ${philosopher.id} has no primary assignment`);
for (const branch of branches) check(branchAssignments.some(({id}) => id === branch.id), `Branch ${branch.id} has no primary assignment`);
for (const row of philosopherAssignments) check(philosopherById.has(row.id), `Unknown philosopher assignment ${row.id}`);
for (const row of branchAssignments) check(branchById.has(row.id), `Unknown branch assignment ${row.id}`);

check(program.schemaVersion === 1, `hall-program.json: expected schemaVersion 1, found ${program.schemaVersion}`);
check(program.status === 'approved-planning-contract', `hall-program.json: expected approved-planning-contract, found ${program.status}`);
check(program.recommendedOptionId === 'worlds-with-questions-forum-expanded', `hall-program.json: approved option changed to ${program.recommendedOptionId}`);
check(program.wings.length === 10, `Approved program: expected 10 wings, found ${program.wings.length}`);
check(program.halls.length === 26, `Approved program: expected 26 halls, found ${program.halls.length}`);
check(program.rooms.length === 105, `Approved program: expected 105 rooms, found ${program.rooms.length}`);
check(program.templates.length === 4, `Approved program: expected 4 templates, found ${program.templates.length}`);
check(unique(program.wings.map(({id}) => id)), 'hall-program.json contains duplicate wing IDs');
check(unique(program.halls.map(({id}) => id)), 'hall-program.json contains duplicate hall IDs');
check(unique(program.rooms.map(({id}) => id)), 'hall-program.json contains duplicate room IDs');
check(unique(tierIds), 'hall-program.json contains duplicate tier IDs');
check(unique(program.templates.map(({id}) => id)), 'hall-program.json contains duplicate template IDs');
check(same(tierIds, MUSEUM_PRESENTATION_TIERS), 'Runtime presentation tiers do not match the approved masterplan order');
check(same(program.assignmentCounts, {branches: 43, philosophers: 146, totalPrimaryRecords: 189}), 'Approved assignmentCounts must be 43 branches, 146 philosophers, and 189 total');

const normalTemplateIds = ['standard-rect', 'sequence-3', 'crossroads-4'];
check(normalTemplateIds.every((id) => templateById.has(id)), 'The approved normal template set is incomplete');
check(templateById.has('focal-terminal'), 'The approved focal-terminal template is missing');
check(program.halls.every(({templateId}) => normalTemplateIds.includes(templateId)), 'The rare focal-terminal template must not be assigned as a normal hall');
for (const template of program.templates) {
  check(unique(template.portalSlots), `Template ${template.id} contains duplicate portal slots`);
  check(unique(template.optionalPortalSlots ?? []), `Template ${template.id} contains duplicate optional portal slots`);
  for (const slot of template.optionalPortalSlots ?? []) check(template.portalSlots.includes(slot), `Template ${template.id}: optional slot ${slot} is not a declared portal`);
  check(Array.isArray(template.roomRange) && template.roomRange.length === 2 && template.roomRange[0] <= template.roomRange[1], `Template ${template.id} has an invalid room range`);
}
check(same(templateById.get('sequence-3')?.footprintMetres, {width: 24, depth: 56}), 'sequence-3 must retain its 24 × 56 metre footprint');
check(same(templateById.get('crossroads-4')?.footprintMetres, {width: 28, depth: 28}), 'crossroads-4 must retain its 28 × 28 metre footprint');

for (const wing of program.wings) {
  check(unique(wing.hallIds), `Wing ${wing.id} contains duplicate hall IDs`);
  const owned = program.halls.filter(({wingId}) => wingId === wing.id);
  check(same(sorted(wing.hallIds), sorted(owned.map(({id}) => id))), `Wing ${wing.id} hall roster does not reconcile`);
  check(wing.roomCount === owned.reduce((sum, hall) => sum + hall.roomIds.length, 0), `Wing ${wing.id} roomCount does not reconcile`);
  check(wing.recordCapacity === owned.reduce((sum, hall) => sum + hall.recordCapacity, 0), `Wing ${wing.id} recordCapacity does not reconcile`);
}
for (const hall of program.halls) {
  check(wingById.has(hall.wingId), `Hall ${hall.id} references unknown wing ${hall.wingId}`);
  check(templateById.has(hall.templateId), `Hall ${hall.id} references unknown template ${hall.templateId}`);
  check(!Object.hasOwn(hall, 'implementationStatus'), `Hall ${hall.id} leaks physical implementation status into the intellectual program`);
  check(unique(hall.roomIds), `Hall ${hall.id} contains duplicate room IDs`);
  const rooms = hall.roomIds.map((id) => roomById.get(id));
  check(rooms.every(Boolean), `Hall ${hall.id} references an unknown room`);
  check(rooms.every((room) => room?.hallId === hall.id), `Hall ${hall.id} contains a room owned by another hall`);
  check(hall.recordCapacity === rooms.reduce((sum, room) => sum + (room?.recordCapacity ?? 0), 0), `Hall ${hall.id} recordCapacity does not equal its room capacities`);
  const template = templateById.get(hall.templateId);
  check(Boolean(template && hall.roomIds.length >= template.roomRange[0] && hall.roomIds.length <= template.roomRange[1]), `Hall ${hall.id} room count is outside ${hall.templateId}'s range`);
}
for (const room of program.rooms) {
  check(hallById.has(room.hallId), `Room ${room.id} references unknown hall ${room.hallId}`);
  check(Number.isInteger(room.recordCapacity) && room.recordCapacity >= 1, `Room ${room.id} has invalid capacity ${room.recordCapacity}`);
}

const roomOccupancy = new Map(program.rooms.map((room) => [room.id, 0]));
for (const row of allAssignments) {
  const label = `${row.entityKind} ${row.id}`;
  const hall = hallById.get(row.primary_hall_id);
  const room = roomById.get(row.primary_room_id);
  check(Boolean(wingById.get(row.primary_wing_id)), `${label}: unknown wing ${row.primary_wing_id}`);
  check(Boolean(hall), `${label}: unknown hall ${row.primary_hall_id}`);
  check(Boolean(room), `${label}: unknown room ${row.primary_room_id}`);
  check(hall?.wingId === row.primary_wing_id, `${label}: hall and wing disagree`);
  check(room?.hallId === row.primary_hall_id, `${label}: room and hall disagree`);
  check(tierIds.includes(row.tier), `${label}: unknown tier ${row.tier}`);
  check(row.rationale.trim().length >= 24, `${label}: rationale is too shallow`);
  const secondaryHallIds = splitIds(row.secondary_hall_ids);
  check(unique(secondaryHallIds), `${label}: duplicate secondary hall`);
  check(!secondaryHallIds.includes(row.primary_hall_id), `${label}: primary hall is duplicated as a secondary route`);
  for (const hallId of secondaryHallIds) check(hallById.has(hallId), `${label}: unknown secondary hall ${hallId}`);
  if (!secondaryHallIds.length) check(!/\bsecondar(?:y|ies)\b|\blinks?\b/i.test(row.rationale), `${label}: rationale claims a secondary/link but secondary_hall_ids is blank`);
  if (secondaryHallIds.length) check(!/\bno (?:additional )?hall route\b|\bno secondar(?:y|ies)\b/i.test(row.rationale), `${label}: rationale denies a route but secondary_hall_ids is populated`);
  if (room) roomOccupancy.set(room.id, (roomOccupancy.get(room.id) ?? 0) + 1);
}
for (const room of program.rooms) check((roomOccupancy.get(room.id) ?? 0) <= room.recordCapacity, `Room ${room.id} occupancy ${roomOccupancy.get(room.id)} exceeds capacity ${room.recordCapacity}`);
for (const philosopher of philosophers) {
  const assignment = assignmentById.get(philosopher.id);
  check(
    typeof assignment?.source_date_context === 'string' && assignment.source_date_context.trim().length >= 3,
    `Philosopher ${philosopher.id}: source_date_context is missing`,
  );
  if (typeof philosopher.dateDisplay === 'string') check(
    assignment?.source_date_context === philosopher.dateDisplay,
    `Philosopher ${philosopher.id}: source_date_context ${JSON.stringify(assignment?.source_date_context)} differs from applied dateDisplay ${JSON.stringify(philosopher.dateDisplay)}`,
  );
}
const globalTierCounts = Object.fromEntries(MUSEUM_PRESENTATION_TIERS.map((tier) => [tier, allAssignments.filter((row) => row.tier === tier).length]));
check(same(globalTierCounts, EXPECTED_GLOBAL_TIERS), `Global assignment tier counts changed: ${JSON.stringify(globalTierCounts)}`);

const beauvoir = assignmentById.get('beauvoir');
check(Boolean(beauvoir), 'Approved Beauvoir assignment is missing');
check(beauvoir?.primary_wing_id === 'wing-ethics-politics-society', `Beauvoir primary wing changed to ${beauvoir?.primary_wing_id}`);
check(beauvoir?.primary_hall_id === 'feminist-philosophies', `Beauvoir primary hall changed to ${beauvoir?.primary_hall_id}`);
check(beauvoir?.primary_room_id === 'feminist-situated-freedom', `Beauvoir primary room changed to ${beauvoir?.primary_room_id}`);
check(beauvoir?.tier === 'anchor-exhibit', `Beauvoir expected anchor-exhibit, found ${beauvoir?.tier}`);
check(splitIds(beauvoir?.secondary_hall_ids).includes('phenomenology-existence-embodiment'), 'Beauvoir must retain Phenomenology, Existence, and Embodiment as a secondary route');
check(/anchor-strength/i.test(`${beauvoir?.rationale ?? ''} ${beauvoir?.controversy_note ?? ''}`), 'Beauvoir anchor-strength rationale is missing');

const recommendedOption = program.optionSummaries.find(({id}) => id === program.recommendedOptionId);
check(Boolean(recommendedOption), `Recommended option ${program.recommendedOptionId} is missing`);
const approvedCapacity = program.rooms.reduce((sum, room) => sum + room.recordCapacity, 0);
check(recommendedOption?.wingCount === program.wings.length, 'Recommended option wing total does not match the approved program');
check(recommendedOption?.hallCount === program.halls.length, 'Recommended option hall total does not match the approved program');
check(recommendedOption?.roomCount === program.rooms.length, 'Recommended option room total does not match the approved program');
check(recommendedOption?.recordCapacity === approvedCapacity, 'Recommended option capacity does not match the approved program');
check(approvedCapacity === 260, `Approved program capacity changed from 260 to ${approvedCapacity}`);
for (const option of program.optionSummaries) {
  const breakdown = program.optionWingBreakdowns[option.id];
  check(Array.isArray(breakdown), `Option ${option.id} has no wing breakdown`);
  if (!Array.isArray(breakdown)) continue;
  check(unique(breakdown.map(({id}) => id)), `Option ${option.id} repeats a wing breakdown id`);
  const totals = breakdown.reduce((sum, wing) => ({
    wings: sum.wings + 1,
    halls: sum.halls + wing.hallCount,
    rooms: sum.rooms + wing.roomCount,
    capacity: sum.capacity + wing.recordCapacity,
  }), {wings: 0, halls: 0, rooms: 0, capacity: 0});
  check(option.wingCount === totals.wings, `Option ${option.id} wing total does not reconcile`);
  check(option.hallCount === totals.halls, `Option ${option.id} hall total does not reconcile`);
  check(option.roomCount === totals.rooms, `Option ${option.id} room total does not reconcile`);
  check(option.recordCapacity === totals.capacity, `Option ${option.id} capacity does not reconcile`);
  check(option.recordCapacity >= philosophers.length + branches.length, `Option ${option.id} cannot hold every primary record`);
}

const krishnamurti = philosopherById.get('jiddu-krishnamurti');
const krishnamurtiAssignment = assignmentById.get('jiddu-krishnamurti');
check(Boolean(krishnamurti), 'Jiddu Krishnamurti is missing from the philosopher registry');
check(krishnamurtiAssignment?.primary_wing_id === 'wing-core-questions', 'Krishnamurti must belong to the Core Questions wing');
check(krishnamurtiAssignment?.primary_hall_id === 'core-questions-forum', 'Krishnamurti must be primary in the Core Questions Forum');
check(krishnamurtiAssignment?.primary_room_id === 'core-mind-self', 'Krishnamurti must be primary in Mind & Self');
check(krishnamurtiAssignment?.tier === 'standard-individual-exhibit', 'Krishnamurti must be a standard individual exhibit');
check(splitIds(krishnamurtiAssignment?.secondary_hall_ids).includes('classical-south-asian-worlds'), 'Krishnamurti requires a South Asian secondary route');
const inheritedMembershipIds = new Set(['yoga', 'vedanta', 'advaita-vedanta', 'buddhism', 'buddhist-philosophy', 'jainism']);
check(!(krishnamurti?.branchMemberships ?? []).some(({branchId, status}) => inheritedMembershipIds.has(branchId) && status === 'member'), 'Krishnamurti must not be classified as a member of an inherited South Asian school');
check((krishnamurti?.branchMemberships ?? []).some(({branchId, status}) => branchId === 'philosophy-of-religion' && status === 'critic'), 'Krishnamurti requires a critic relationship to Philosophy of Religion');

check(same(MUSEUM_CANONICAL_HALL_IDS, APPROVED_HALL_IDS), 'Canonical hall IDs or their public order changed');
check(same(MUSEUM_CANONICAL_PROGRAM.map(({id}) => id), APPROVED_HALL_IDS), 'Canonical program order changed');
const canonicalRooms = MUSEUM_CANONICAL_PROGRAM.flatMap((hall) => hall.rooms.map((room) => ({hall, room})));
const canonicalExhibits = canonicalRooms.flatMap(({hall, room}) => room.exhibits.map((exhibit) => ({hall, room, exhibit})));
check(canonicalRooms.length === 29, `Canonical live program must contain 29 rooms, found ${canonicalRooms.length}`);
check(canonicalExhibits.length === 63, `Canonical live program must contain 63 primary exhibits, found ${canonicalExhibits.length}`);
check(unique(canonicalRooms.map(({room}) => room.id)), 'Canonical live room IDs are not unique');
check(unique(canonicalExhibits.map(({exhibit}) => exhibit.entityId)), 'A primary entity appears more than once in the live Museum');
for (const hall of MUSEUM_CANONICAL_PROGRAM) {
  const expected = EXPECTED_LIVE_COUNTS[hall.id];
  const planningHall = hallById.get(hall.id);
  check(Boolean(expected), `Unexpected live hall ${hall.id}`);
  check(Boolean(planningHall), `Live hall ${hall.id} is absent from hall-program.json`);
  check(hall.templateId === expected?.template, `Live hall ${hall.id} template changed`);
  check(hall.rooms.length === expected?.rooms, `Live hall ${hall.id} must contain ${expected?.rooms} rooms`);
  check(hall.rooms.reduce((sum, room) => sum + room.exhibits.length, 0) === expected?.exhibits, `Live hall ${hall.id} must contain ${expected?.exhibits} exhibits`);
  check(hall.wingId === planningHall?.wingId, `Live hall ${hall.id} wing differs from the masterplan`);
  check(hall.title === planningHall?.title, `Live hall ${hall.id} title differs from the masterplan`);
  check(hall.templateId === planningHall?.templateId, `Live hall ${hall.id} template differs from the masterplan`);
  check(hall.recordCapacity === planningHall?.recordCapacity, `Live hall ${hall.id} capacity differs from the masterplan`);
  check(same(hall.rooms.map(({id}) => id), planningHall?.roomIds), `Live hall ${hall.id} room program differs from the masterplan`);
  for (const room of hall.rooms) {
    const planningRoom = roomById.get(room.id);
    check(Boolean(planningRoom), `Live room ${room.id} is absent from hall-program.json`);
    check(room.title === planningRoom?.title, `Live room ${room.id} title differs from the masterplan`);
    check(room.recordCapacity === planningRoom?.recordCapacity, `Live room ${room.id} capacity differs from the masterplan`);
    check(room.exhibits.length <= room.recordCapacity, `Live room ${room.id} exceeds its capacity`);
  }
}
for (const {hall, room, exhibit} of canonicalExhibits) {
  const assignment = assignmentById.get(exhibit.entityId);
  check(Boolean(assignment), `Live exhibit ${exhibit.entityId} has no authoritative assignment`);
  check(assignment?.entityKind === exhibit.entityKind, `Live exhibit ${exhibit.entityId} entity kind differs from its assignment`);
  check(assignment?.primary_wing_id === hall.wingId, `Live exhibit ${exhibit.entityId} wing differs from its assignment`);
  check(assignment?.primary_hall_id === hall.id, `Live exhibit ${exhibit.entityId} hall differs from its assignment`);
  check(assignment?.primary_room_id === room.id, `Live exhibit ${exhibit.entityId} room differs from its assignment`);
  check(assignment?.tier === exhibit.tier, `Live exhibit ${exhibit.entityId} tier differs from its assignment`);
  check(same(sorted(splitIds(assignment?.secondary_hall_ids)), sorted(exhibit.secondaryHallIds)), `Live exhibit ${exhibit.entityId} secondary routes differ from its assignment`);
  check(exhibit.question.trim().length >= 24, `Live exhibit ${exhibit.entityId} lacks a substantive framing question`);
}
const plannedLiveAssignments = allAssignments.filter(({primary_hall_id}) => APPROVED_HALL_IDS.includes(primary_hall_id));
check(plannedLiveAssignments.length === 63, `Masterplan assigns ${plannedLiveAssignments.length}, not 63, primaries to the six live halls`);
check(same(sorted(plannedLiveAssignments.map(({id}) => id)), sorted(canonicalExhibits.map(({exhibit}) => exhibit.entityId))), 'The canonical live roster is not the exact authoritative masterplan subset');
const liveTierCounts = Object.fromEntries(MUSEUM_PRESENTATION_TIERS.map((tier) => [tier, canonicalExhibits.filter(({exhibit}) => exhibit.tier === tier).length]));
check(same(liveTierCounts, EXPECTED_LIVE_TIERS), `Live presentation-tier counts changed: ${JSON.stringify(liveTierCounts)}`);
check(MUSEUM_LIVE_PROGRAM_TOTALS.hallCount === 6 && MUSEUM_LIVE_PROGRAM_TOTALS.roomCount === 29 && MUSEUM_LIVE_PROGRAM_TOTALS.exhibitCount === 63, 'Exported live program totals are stale');
check(MUSEUM_LIVE_PROGRAM_TOTALS.recordCapacity === 80 && MUSEUM_LIVE_PROGRAM_TOTALS.reserveCapacity === 17, 'Live program capacity totals must be 80 installed / 17 reserved');
check(same(MUSEUM_LIVE_PROGRAM_TOTALS.tierCounts, EXPECTED_LIVE_TIERS), 'Exported live tier totals are stale');
check(MUSEUM_LIVE_HALL_TOTALS.length === 6, 'Exported live hall totals must contain six records');
check(MUSEUM_LIVE_ROOM_TOTALS.length === 29, 'Exported live room totals must contain 29 records');

const krishnamurtiExhibit = canonicalExhibits.find(({exhibit}) => exhibit.entityId === 'jiddu-krishnamurti');
check(krishnamurtiExhibit?.hall.id === 'core-questions-forum' && krishnamurtiExhibit?.room.id === 'core-mind-self', 'Krishnamurti is not installed in the Forum Mind & Self room');
check(krishnamurtiExhibit?.exhibit.tier === 'standard-individual-exhibit', 'Krishnamurti exhibit tier changed');
check(krishnamurtiExhibit?.exhibit.secondaryHallIds.includes('classical-south-asian-worlds'), 'Krishnamurti exhibit lacks the South Asian secondary route');
check(krishnamurtiExhibit?.exhibit.roomComparisons?.some(({targetHallId, targetRoomId, targetExhibitId, relationType}) => targetHallId === 'core-questions-forum' && targetRoomId === 'core-religion' && targetExhibitId === 'philosophy-of-religion' && relationType === 'comparison'), 'Krishnamurti lacks the room-level Philosophy of Religion comparison');

check(same(MUSEUM_HALL_ROUTE_ALIASES, EXPECTED_ALIASES), 'The six retired hall aliases changed');
check(MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY.length === 21, `Expected 21 carried legacy exhibits, found ${MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY.length}`);
check(MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY.length === 27, `Expected 27 displaced legacy exhibits, found ${MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY.length}`);
const compatibility = [...MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY, ...MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY];
check(compatibility.length === 48, `The legacy route inventory must contain 48 records, found ${compatibility.length}`);
check(unique(compatibility.map(({formerHallId, exhibitId}) => `${formerHallId}/${exhibitId}`)), 'Legacy compatibility routes are not unique');
for (const formerHallId of LEGACY_HALL_IDS) check(compatibility.filter((record) => record.formerHallId === formerHallId).length === 8, `${formerHallId} must preserve exactly eight former exhibit routes`);
for (const record of compatibility) {
  const assignment = assignmentById.get(record.entityId);
  check(Boolean(assignment), `Compatibility record ${record.formerHallId}/${record.exhibitId} has no Atlas entity assignment`);
  check(record.plannedHallId === assignment?.primary_hall_id, `Compatibility record ${record.formerHallId}/${record.exhibitId} names the wrong planned hall`);
  if (record.disposition === 'live-primary') {
    check(Boolean(record.liveExhibitRef), `Live compatibility record ${record.exhibitId} has no destination`);
    check(record.liveExhibitRef?.hallId === record.plannedHallId, `Live compatibility record ${record.exhibitId} destination differs from its planned hall`);
  } else check(!record.liveExhibitRef, `Displaced compatibility record ${record.exhibitId} must not claim a live destination`);
}

check(Boolean(planningManifest.manifestVersion), 'Planning manifest example is missing manifestVersion');
check(Boolean(planningManifest.physicalOptionId), 'Planning manifest example is missing physicalOptionId');
check(Boolean(planningManifest.coordinateFrames?.safeArrivalPoses), 'Planning manifest example does not declare its safe-arrival coordinate frame');
const planningLevelIds = new Set(planningManifest.levels.map(({id}) => id));
const planningNodeIds = new Set(planningManifest.nodes.map(({id}) => id));
const planningConnectionIds = new Set(planningManifest.connections.map(({id}) => id));
const planningReservationIds = new Set(planningManifest.reservations.map(({id}) => id));
check(planningLevelIds.size === planningManifest.levels.length, 'Planning manifest example contains duplicate level IDs');
check(planningNodeIds.size === planningManifest.nodes.length, 'Planning manifest example contains duplicate node IDs');
check(planningConnectionIds.size === planningManifest.connections.length, 'Planning manifest example contains duplicate connection IDs');
check(planningReservationIds.size === planningManifest.reservations.length, 'Planning manifest example contains duplicate reservation IDs');
const planningNodeById = new Map(planningManifest.nodes.map((node) => [node.id, node]));
const usedPlanningSlots = new Set();
const polygonBounds = (polygon) => ({
  minX: Math.min(...polygon.map(([x]) => x)),
  maxX: Math.max(...polygon.map(([x]) => x)),
  minZ: Math.min(...polygon.map(([, z]) => z)),
  maxZ: Math.max(...polygon.map(([, z]) => z)),
});
const close = (first, second) => Math.abs(first - second) <= .001;
for (const node of planningManifest.nodes) {
  check(planningLevelIds.has(node.levelId), `Planning manifest node ${node.id} references unknown level ${node.levelId}`);
  check(['planned', 'live', 'retired'].includes(node.implementationStatus), `Planning manifest node ${node.id} has invalid status ${node.implementationStatus}`);
  check(unique(node.doorwaySlots), `Planning manifest node ${node.id} repeats a doorway slot`);
  check(Array.isArray(node.mapFootprint) && node.mapFootprint.length >= 4, `Planning manifest node ${node.id} has an invalid map footprint`);
  check(node.mapFootprint?.every((point) => Array.isArray(point) && point.length === 2 && point.every(Number.isFinite)), `Planning manifest node ${node.id} has non-finite map coordinates`);
  check(Number.isFinite(node.physicalFootprint?.width) && node.physicalFootprint.width > 0, `Planning manifest node ${node.id} has invalid physical width`);
  check(Number.isFinite(node.physicalFootprint?.depth) && node.physicalFootprint.depth > 0, `Planning manifest node ${node.id} has invalid physical depth`);
  if (node.kind === 'hall') {
    check(hallById.has(node.programHallId), `Planning manifest node ${node.id} references unknown program hall ${node.programHallId}`);
    check(wingById.has(node.wingId), `Planning manifest node ${node.id} references unknown wing ${node.wingId}`);
  }
  if (node.templateId) {
    const template = templateById.get(node.templateId);
    check(Boolean(template), `Planning manifest node ${node.id} references unknown template ${node.templateId}`);
    for (const slot of node.doorwaySlots) check(template?.portalSlots.includes(slot), `Planning manifest node ${node.id}/${slot} is not declared by ${node.templateId}`);
    const physicalDimensions = [node.physicalFootprint.width, node.physicalFootprint.depth].sort((a, b) => a - b);
    const templateDimensions = [template?.footprintMetres.width, template?.footprintMetres.depth].sort((a, b) => a - b);
    check(close(physicalDimensions[0], templateDimensions[0]) && close(physicalDimensions[1], templateDimensions[1]), `Planning manifest node ${node.id} footprint differs from ${node.templateId}`);
  }
  if (Array.isArray(node.mapFootprint) && node.mapFootprint.length >= 4) {
    const bounds = polygonBounds(node.mapFootprint);
    const mapDimensions = [bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ].sort((a, b) => a - b);
    const physicalDimensions = [node.physicalFootprint.width, node.physicalFootprint.depth].sort((a, b) => a - b);
    check(close(mapDimensions[0], physicalDimensions[0]) && close(mapDimensions[1], physicalDimensions[1]), `Planning manifest node ${node.id} map and physical footprints differ`);
  }
}
for (const connection of planningManifest.connections) {
  check(['planned', 'live', 'blocked'].includes(connection.implementationStatus), `Planning connection ${connection.id} has invalid status ${connection.implementationStatus}`);
  check(typeof connection.accessible === 'boolean', `Planning connection ${connection.id} accessibility is not boolean`);
  for (const endpoint of [connection.a, connection.b]) {
    const node = planningNodeById.get(endpoint.nodeId);
    check(Boolean(node), `Planning connection ${connection.id} references unknown node ${endpoint.nodeId}`);
    check(Boolean(node?.doorwaySlots.includes(endpoint.slotId)), `Planning connection ${connection.id} references missing slot ${endpoint.nodeId}/${endpoint.slotId}`);
    check(Boolean(node?.safeArrivalPoses?.[endpoint.slotId]), `Planning connection ${connection.id} has no safe arrival for ${endpoint.nodeId}/${endpoint.slotId}`);
    const key = `${endpoint.nodeId}:${endpoint.slotId}`;
    check(!usedPlanningSlots.has(key), `Planning connection ${connection.id} reuses doorway ${key}`);
    usedPlanningSlots.add(key);
  }
  const first = planningNodeById.get(connection.a.nodeId);
  const second = planningNodeById.get(connection.b.nodeId);
  if (first && second) {
    check(first.levelId === second.levelId, `Planning connection ${connection.id} crosses levels without a vertical connector`);
    const a = polygonBounds(first.mapFootprint);
    const b = polygonBounds(second.mapFootprint);
    const xGap = Math.max(0, a.minX - b.maxX, b.minX - a.maxX);
    const zGap = Math.max(0, a.minZ - b.maxZ, b.minZ - a.maxZ);
    check(xGap <= .001 && zGap <= .001, `Planning connection ${connection.id} has an unmodelled physical gap`);
    if (connection.implementationStatus === 'live') check(first.implementationStatus === 'live' && second.implementationStatus === 'live', `Planning connection ${connection.id} has a non-live endpoint`);
  }
}
for (const reservation of planningManifest.reservations) {
  const host = planningNodeById.get(reservation.host?.nodeId);
  const targetHall = hallById.get(reservation.targetProgramHallId);
  check(Boolean(host), `Planning reservation ${reservation.id} references unknown host ${reservation.host?.nodeId}`);
  check(Boolean(host?.doorwaySlots.includes(reservation.host?.slotId)), `Planning reservation ${reservation.id} references missing host slot ${reservation.host?.slotId}`);
  check(!usedPlanningSlots.has(`${reservation.host?.nodeId}:${reservation.host?.slotId}`), `Planning reservation ${reservation.id} reuses a connected slot`);
  check(reservation.blocked === true && reservation.implementationStatus === 'reserved', `Planning reservation ${reservation.id} must remain blocked and reserved`);
  check(['insertion', 'expansion'].includes(reservation.reservationType), `Planning reservation ${reservation.id} has invalid type ${reservation.reservationType}`);
  check(planningLevelIds.has(reservation.levelId), `Planning reservation ${reservation.id} references unknown level ${reservation.levelId}`);
  check(wingById.has(reservation.wingId), `Planning reservation ${reservation.id} references unknown wing ${reservation.wingId}`);
  check(Boolean(targetHall), `Planning reservation ${reservation.id} references unknown target hall ${reservation.targetProgramHallId}`);
  for (const templateId of reservation.allowedTemplateIds ?? []) check(templateById.has(templateId), `Planning reservation ${reservation.id} references unknown template ${templateId}`);
  check(host?.levelId === reservation.levelId, `Planning reservation ${reservation.id} and its host are on different levels`);
  check(targetHall?.wingId === reservation.wingId, `Planning reservation ${reservation.id} target hall and wing disagree`);
  check(Boolean(targetHall && reservation.allowedTemplateIds?.includes(targetHall.templateId)), `Planning reservation ${reservation.id} omits target template ${targetHall?.templateId}`);
  check(Array.isArray(reservation.mapFootprint) && reservation.mapFootprint.length >= 4, `Planning reservation ${reservation.id} has an invalid map footprint`);
  if (host && Array.isArray(reservation.mapFootprint) && reservation.mapFootprint.length >= 4) {
    const hostBounds = polygonBounds(host.mapFootprint);
    const reserveBounds = polygonBounds(reservation.mapFootprint);
    const xGap = Math.max(0, hostBounds.minX - reserveBounds.maxX, reserveBounds.minX - hostBounds.maxX);
    const zGap = Math.max(0, hostBounds.minZ - reserveBounds.maxZ, reserveBounds.minZ - hostBounds.maxZ);
    check(xGap <= .001 && zGap <= .001, `Planning reservation ${reservation.id} does not touch its host`);
    const mapDimensions = [reserveBounds.maxX - reserveBounds.minX, reserveBounds.maxZ - reserveBounds.minZ].sort((a, b) => a - b);
    const reservedDimensions = [reservation.reservedFootprint?.width, reservation.reservedFootprint?.depth].sort((a, b) => a - b);
    check(close(mapDimensions[0], reservedDimensions[0]) && close(mapDimensions[1], reservedDimensions[1]), `Planning reservation ${reservation.id} map and reserved footprints differ`);
    for (const node of planningManifest.nodes) {
      if (node.id === host.id || node.levelId !== reservation.levelId) continue;
      const nodeBounds = polygonBounds(node.mapFootprint);
      const overlapX = Math.min(reserveBounds.maxX, nodeBounds.maxX) - Math.max(reserveBounds.minX, nodeBounds.minX);
      const overlapZ = Math.min(reserveBounds.maxZ, nodeBounds.maxZ) - Math.max(reserveBounds.minZ, nodeBounds.minZ);
      check(overlapX <= .001 || overlapZ <= .001, `Planning reservation ${reservation.id} overlaps ${node.id}`);
    }
  }
}

check(buildingManifest.schemaVersion === 1, `Building manifest: expected schemaVersion 1, found ${buildingManifest.schemaVersion}`);
check(buildingManifest.manifestVersion === 'canonical-six-v1', `Building manifest version changed to ${buildingManifest.manifestVersion}`);
check(buildingManifest.status === 'approved-canonical-six', `Building manifest status changed to ${buildingManifest.status}`);
check(buildingManifest.physicalOptionId === 'ring-of-wings', 'Building manifest must retain the Ring of Wings');
check(buildingManifest.level?.id === 'L0' && buildingManifest.nodes.every(({levelId}) => levelId === 'L0'), 'All live physical nodes must remain on L0');
check(buildingManifest.nodes.every(({implementationStatus}) => implementationStatus === 'live'), 'All constructed nodes must be live');
check(buildingManifest.connections.every(({implementationStatus, accessible}) => implementationStatus === 'live' && accessible === true), 'All authored connections must be live, step-free, and accessible');

const nodeById = new Map(buildingManifest.nodes.map((node) => [node.id, node]));
const publicHallNodes = buildingManifest.nodes.filter(({publicHallId}) => Boolean(publicHallId));
check(unique(buildingManifest.nodes.map(({id}) => id)), 'Building manifest contains duplicate node IDs');
check(unique(buildingManifest.connections.map(({id}) => id)), 'Building manifest contains duplicate connection IDs');
check(unique(buildingManifest.reservations.map(({id}) => id)), 'Building manifest contains duplicate reservation IDs');
check(publicHallNodes.length === 6, `Building manifest must contain six public halls, found ${publicHallNodes.length}`);
check(same(sorted(publicHallNodes.map(({publicHallId}) => publicHallId)), sorted(APPROVED_HALL_IDS)), 'Building manifest public hall roster differs from the canonical six');
check(!buildingManifest.nodes.some(({id, publicHallId}) => LEGACY_HALL_IDS.includes(publicHallId) || LEGACY_HALL_IDS.some((legacyId) => id === `hall:${legacyId}`)), 'A retired temporary shell remains public in the building manifest');
check(buildingManifest.forumLocationNodeId === 'place:core-questions-forum', 'The Core Questions Forum must occupy the central Forum location');
check(nodeById.get(buildingManifest.forumLocationNodeId)?.publicHallId === 'core-questions-forum', 'The central Forum node does not own the Core Questions Forum program');
check(buildingManifest.mainEntrance?.nodeId === 'place:entrance-orientation', 'The main entrance node changed');
check(buildingManifest.kiosk?.publicHallId === 'mediterranean-beginnings-classical', 'The entrance map kiosk must remain owned by the first permanent hall');

const physical = buildingManifest.physicalContract;
check(physical.wallThickness === .36, 'Canonical wall thickness must be 0.36 m');
check(physical.doorClearWidth === 4 && physical.doorClearHeight === 3.2 && physical.transitionDepth === 1.2, 'Canonical doorway dimensions changed');
check(physical.safeLandingWidth === 4 && physical.safeLandingDepth === 4 && physical.stepFree === true, 'Canonical safe-landing or step-free contract changed');
const residency = buildingManifest.residencyPolicy;
check(residency.maxResidentHallContents === 3 && residency.recentHallCount === 1, 'Bounded hall-content residency changed');
check(residency.decodedTextureBudgetMiB === 96, 'Decoded texture budget must remain 96 MiB');
check(Number.isFinite(residency.approachDistance) && residency.approachDistance > 0, 'Residency approachDistance must be positive');

for (const node of publicHallNodes) {
  const hall = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === node.publicHallId);
  const template = templateById.get(hall?.templateId);
  check(node.templateId === hall?.templateId, `${node.id} template differs from its intellectual program`);
  check(!node.geometryAdapterId && !node.legacyGeometryAdapterId, `${node.id} must not use a legacy geometry adapter`);
  check(same(sorted(node.doorwaySlots.map(({id}) => id)), sorted(template?.portalSlots ?? [])), `${node.id} does not author the exact canonical portal-slot interface`);
  for (const slot of node.doorwaySlots) {
    check(slot.clearWidth === physical.doorClearWidth && slot.clearHeight === physical.doorClearHeight && slot.transitionDepth === physical.transitionDepth, `${node.id}/${slot.id} doorway dimensions differ from the shared contract`);
    const landingWidth = slot.landingBounds.maxX - slot.landingBounds.minX;
    const landingDepth = slot.landingBounds.maxZ - slot.landingBounds.minZ;
    check(Math.abs(landingWidth - physical.safeLandingWidth) < 1e-6 && Math.abs(landingDepth - physical.safeLandingDepth) < 1e-6, `${node.id}/${slot.id} landing is not 4 × 4 m`);
    check(Math.abs(slot.arrivalPose.x - (slot.position.x + slot.inwardNormal.x * 2)) < 1e-6 && Math.abs(slot.arrivalPose.z - (slot.position.z + slot.inwardNormal.z * 2)) < 1e-6, `${node.id}/${slot.id} safe arrival is not 2 m inside the portal`);
    check(slot.arrivalPose.x >= slot.landingBounds.minX && slot.arrivalPose.x <= slot.landingBounds.maxX && slot.arrivalPose.z >= slot.landingBounds.minZ && slot.arrivalPose.z <= slot.landingBounds.maxZ, `${node.id}/${slot.id} safe arrival lies outside its landing`);
  }
}

const usedEndpoints = new Set();
for (const connection of buildingManifest.connections) {
  for (const endpoint of [connection.a, connection.b]) {
    const node = nodeById.get(endpoint.nodeId);
    check(Boolean(node), `Connection ${connection.id} references missing node ${endpoint.nodeId}`);
    check(node?.doorwaySlots.some(({id}) => id === endpoint.slotId), `Connection ${connection.id} references missing slot ${endpoint.nodeId}/${endpoint.slotId}`);
    const key = `${endpoint.nodeId}/${endpoint.slotId}`;
    check(!usedEndpoints.has(key), `Doorway endpoint ${key} is owned by more than one active connection`);
    usedEndpoints.add(key);
  }
  check(connection.accessible === true, `Connection ${connection.id} must be step-free and accessible`);
}

const addEdge = (graph, left, right) => {
  if (!graph.has(left)) graph.set(left, new Set());
  if (!graph.has(right)) graph.set(right, new Set());
  graph.get(left).add(right);
  graph.get(right).add(left);
};
const outerConnections = buildingManifest.connections.filter(({routeRole}) => routeRole === 'outer-loop');
const outerGraph = new Map();
for (const {a, b} of outerConnections) addEdge(outerGraph, a.nodeId, b.nodeId);
check(outerConnections.length === 12, `Outer loop must contain 12 seams, found ${outerConnections.length}`);
check(outerGraph.size === 12 && [...outerGraph.values()].every((neighbors) => neighbors.size === 2), 'Outer loop must be one 12-node cycle');
for (const hallId of APPROVED_HALL_IDS.slice(0, 5)) check(outerGraph.has(`hall:${hallId}`), `${hallId} is missing from the compact outer loop`);
check(!outerGraph.has('place:core-questions-forum'), 'The central Forum must not masquerade as an outer-loop hall');

const spokeConnections = buildingManifest.connections.filter(({routeRole}) => routeRole === 'forum-spoke');
const spokeGraph = new Map();
for (const {a, b} of spokeConnections) addEdge(spokeGraph, a.nodeId, b.nodeId);
const spokeNodes = buildingManifest.nodes.filter(({pilotRole}) => pilotRole === 'forum-spoke');
check(spokeNodes.length === 4, `Expected four Forum spokes, found ${spokeNodes.length}`);
check(spokeConnections.length === 8, `Four Forum spokes require eight seams, found ${spokeConnections.length}`);
check(spokeNodes.every(({id}) => spokeGraph.get(id)?.size === 2), 'Every Forum spoke must join exactly two endpoints');
check(spokeGraph.get(buildingManifest.forumLocationNodeId)?.size === 4, 'The central Forum must receive all four real spokes');
const shortcutConnections = buildingManifest.connections.filter(({routeRole}) => routeRole === 'shortcut');
check(shortcutConnections.length === 2, 'The entrance–Forum shortcut must contain two seams');

const fullGraph = new Map();
for (const {a, b} of buildingManifest.connections) addEdge(fullGraph, a.nodeId, b.nodeId);
const reached = new Set();
const queue = [buildingManifest.mainEntrance.nodeId];
while (queue.length) {
  const current = queue.shift();
  if (reached.has(current)) continue;
  reached.add(current);
  queue.push(...(fullGraph.get(current) ?? []));
}
check(buildingManifest.nodes.every(({id}) => reached.has(id)), 'The constructed subset is not continuously walkable from the entrance');

const insertionReservations = buildingManifest.reservations.filter(({reservationType}) => reservationType === 'insertion');
const outwardReservations = buildingManifest.reservations.filter(({reservationType}) => reservationType === 'outward-expansion');
check(insertionReservations.length === 3, `Expected three truthful planned-gallery connections, found ${insertionReservations.length}`);
check(outwardReservations.length === 8, `Expected eight outward reservations, found ${outwardReservations.length}`);
check(same(sorted(outwardReservations.map(({expansionPortalId}) => expansionPortalId)), ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8']), 'Outward expansion portals must be exactly R1–R8');
for (const reservation of buildingManifest.reservations) {
  check(reservation.implementationStatus === 'reserved' && reservation.blocked === true, `Reservation ${reservation.id} must remain visibly blocked`);
  check(nodeById.has(reservation.hostNodeId), `Reservation ${reservation.id} references missing host ${reservation.hostNodeId}`);
  check(Number.isFinite(reservation.barrierWidth) && reservation.barrierWidth > 0, `Reservation ${reservation.id} has no physical barrier width`);
  if (reservation.targetProgramHallId) check(hallById.has(reservation.targetProgramHallId) && !APPROVED_HALL_IDS.includes(reservation.targetProgramHallId), `Reservation ${reservation.id} leaks a live or unknown target hall`);
}

if (errors.length) {
  console.error(`Museum masterplan validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'} across ${checks} checks):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Museum masterplan validation passed (${checks} checks).`);
console.log('  approved program: 10 wings · 26 halls · 105 rooms · 146 philosophers · 43 branches');
console.log('  canonical live subset: 6 halls · 29 rooms · 63 primary exhibits · 80 capacity · 17 reserve');
console.log('  tiers: 36 anchor · 23 standard · 3 supporting · 0 cluster · 1 archive');
console.log('  compatibility: 21 carried legacy routes · 27 truthful not-installed handoffs');
console.log('  physical subset: compact five-hall outer loop · central Forum · four spokes · entrance shortcut · 11 blocked reservations');
